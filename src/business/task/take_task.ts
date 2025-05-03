import { PlainObject } from "../../../typings/public";
import { ReqCtx } from "../../lib/net-server";
import { ENUM_HEADERS } from "../../constant/headers";
import { toObjectId } from "../../tools/utils";
import { getMongo } from "../../lib/mongo";
import { ENUM_COLLECTION } from "../../constant/collection_name";
import {
  ENUM_PATH_PATH,
  ENUM_TASK_STATE,
  ENUM_WX_ENV,
} from "../../constant/public";
import { find_user_via_id } from "../auth/helper/find_user";
import {
  send_subscribe_message,
  TemplateId,
  WhenUserTakeTaskBody,
} from "../wx-openapi/send_subscribe_message";
import { query_wx_access_token } from "../../tools/wx_access_token";
import logger from "../../lib/logger";
import { phoneNumberFormatter } from "../../tools/formatter";

async function notify_publisher(env: string, taskId: string) {
  const query = { _id: toObjectId(taskId) };

  const mongo = await getMongo();
  const taskInfo = await mongo.findOne(ENUM_COLLECTION.T_TASK, query);
  if (!taskInfo) return false;

  const {
    _id,
    dealwithPerson: name3,
    dealWithPhoneNumber: phone_number6,
  } = taskInfo;
  const whenUserTakeTaskBody: WhenUserTakeTaskBody = {
    character_string1: {
      value: _id.toString(),
    },
    name3: {
      value: name3,
    },
    phone_number6: {
      value: phoneNumberFormatter(phone_number6, true),
    },
    thing11: {
      value: "您发布的任务已被接单",
    },
  };

  const userInfo = await find_user_via_id(taskInfo.uid);
  if (!userInfo) return false;

  const access_token = await query_wx_access_token();
  await send_subscribe_message(env as ENUM_WX_ENV, access_token, {
    touser: userInfo.openid,
    template_id: TemplateId.WHEN_USER_TAKE_TASK,
    page: `${ENUM_PATH_PATH.TASK_DETAIL}?_id=${_id.toString()}`,
    data: whenUserTakeTaskBody,
  });
  return true;
}

/**
 * 任务抢单
 *
 * @param ctx
 * @param params
 * @param headers
 */
export async function take_task(
  ctx: ReqCtx,
  params: any,
  headers: PlainObject
) {
  const uid = headers[ENUM_HEADERS.UID];
  const env = headers[ENUM_HEADERS.ENV];

  logger.info("uid", uid, "env", env);

  const userInfo = await find_user_via_id(uid);
  if (!userInfo) {
    throw new Error("user not found");
  }

  const query = {
    _id: toObjectId(params._id),
    $or: [
      { dealWithUid: { $exists: false } },
      { dealWithUid: null },
      { dealWithUid: "" },
    ],
  };
  const update = {
    $set: {
      dealWithUid: toObjectId(uid),
      dealwithPerson: userInfo.nickName,
      dealWithPhoneNumber: userInfo.phoneNumber,
      state: ENUM_TASK_STATE.WILL_RESOLVE,
    },
  };

  try {
    const mongo = await getMongo();
    await mongo.findOneAndUpdate(ENUM_COLLECTION.T_TASK, query, update);

    // 通知发布者
    notify_publisher(env, params._id);

    return true;
  } catch (err) {
    return false;
  }
}
