import { PlainObject } from "../../../typings/public";
import { ReqCtx } from "../../lib/net-server";
import { ENUM_HEADERS } from "../../constant/headers";
import { toObjectId } from "../../tools/utils";
import { getMongo } from "../../lib/mongo";
import { ENUM_COLLECTION } from "../../constant/collection_name";
import { ENUM_TASK_STATE, ENUM_WX_ENV } from "../../constant/public";
import {
  send_subscribe_message,
  TemplateId,
  WhenUserUntakeTaskBody,
} from "../wx-openapi/send_subscribe_message";
import { find_user_via_id } from "../auth/helper/find_user";
import { query_wx_access_token } from "../../tools/wx_access_token";
import { find_task_via_id } from "./helper/find_task";

async function notify_publisher(env: string, taskInfo: any) {
  if (!taskInfo) return false;

  const {
    _id,
    dealwithPerson: name3,
    dealWithPhoneNumber: phone_number6,
  } = taskInfo;
  const whenUserUntakeTaskBody: WhenUserUntakeTaskBody = {
    character_string1: {
      value: _id.toString(),
    },
    thing4: {
      value: name3,
    },
    thing5: {
      value: `师傅【${name3}】因故已取消您发布的任务，请及时关注任务进度`,
    },
  };

  const userInfo = await find_user_via_id(taskInfo.uid);
  if (!userInfo) return false;

  const access_token = await query_wx_access_token();
  await send_subscribe_message(env as ENUM_WX_ENV, access_token, {
    touser: userInfo.openid,
    template_id: TemplateId.WHEN_USER_UNTAKE_TASK,
    page: `/pages/task-detail/index?_id=${_id.toString()}`,
    data: whenUserUntakeTaskBody,
  });
  return true;
}

/**
 * 放弃已抢到的任务
 *
 * @param ctx
 * @param params
 * @param headers
 */
export async function untake_task(
  ctx: ReqCtx,
  params: any,
  headers: PlainObject
) {
  const uid = headers[ENUM_HEADERS.UID];
  const env = headers[ENUM_HEADERS.ENV];

  const taskInfo = await find_task_via_id(params._id);

  const query = {
    _id: toObjectId(params._id),
    dealWithUid: toObjectId(uid),
  };
  const update = {
    $set: {
      dealWithUid: null,
      dealwithPerson: null,
      dealWithPhoneNumber: null,
      state: ENUM_TASK_STATE.PENDDING,
    },
  };

  try {
    const mongo = await getMongo();
    await mongo.findOneAndUpdate(ENUM_COLLECTION.T_TASK, query, update);

    // 通知发布者
    notify_publisher(env, taskInfo);

    return true;
  } catch (err) {
    return false;
  }
}
