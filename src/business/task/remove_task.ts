import { PlainObject } from "../../../typings/public";
import { ReqCtx } from "../../lib/net-server";
import { ENUM_HEADERS } from "../../constant/headers";
import { toObjectId } from "../../tools/utils";
import { getMongo } from "../../lib/mongo";
import { ENUM_COLLECTION } from "../../constant/collection_name";
import {
  send_subscribe_message,
  TemplateId,
  WhenDeleteTaskBody,
  WhenUserTakeTaskBody,
} from "../wx-openapi/send_subscribe_message";
import { find_task_via_id } from "./helper/find_task";
import logger from "../../lib/logger";
import { find_user_via_id } from "../auth/helper/find_user";
import { query_wx_access_token } from "../../tools/wx_access_token";
import { ENUM_WX_ENV } from "../../constant/public";
import { getNowYMDHMS } from "../../tools/time";

async function notify_publisher(env: string, taskInfo: any) {
  if (!taskInfo) return false;

  const { _id, person, pickupTime, dealWithUid } = taskInfo;

  // 任务未接单时，不用发送通知
  if (!dealWithUid) return false;
  const userInfo = await find_user_via_id(dealWithUid);
  if (!userInfo) return false;

  const whenDeleteTaskBody: WhenDeleteTaskBody = {
    character_string33: {
      value: _id.toString(),
    },
    date7: {
      value: pickupTime,
    },
    date8: {
      value: getNowYMDHMS(),
    },
    thing6: {
      value: `任务发布者【${person}】因故已【删除】任务，请及时关注任务最新进度！`,
    },
  };

  const access_token = await query_wx_access_token();
  await send_subscribe_message(env as ENUM_WX_ENV, access_token, {
    touser: userInfo.openid,
    template_id: TemplateId.WHEN_DELETE_TASK,
    // 页面 - 个人交易中的任务列表
    page: `/pages/in-trading-list/index`,
    data: whenDeleteTaskBody,
  });
  return true;
}

/**
 * 删除任务
 *
 * @param ctx
 * @param params
 * @param headers
 */
export async function remove_task(
  ctx: ReqCtx,
  params: any,
  headers: PlainObject
) {
  const uid = headers[ENUM_HEADERS.UID];
  const env = headers[ENUM_HEADERS.ENV];

  const taskInfo = await find_task_via_id(params._id);

  const query = {
    uid: toObjectId(uid),
    _id: toObjectId(params._id),
  };

  try {
    const mongo = await getMongo();
    await mongo.findOneAndDelete(ENUM_COLLECTION.T_TASK, query);

    // 通知任务接受者
    notify_publisher(env, taskInfo);

    return true;
  } catch (e) {
    logger.error(e);
    return false;
  }
}
