import { PlainObject } from "../../../typings/public";
import { ENUM_HEADERS } from "../../constant/headers";
import { ReqCtx } from "../../lib/net-server";
import { getNowYMDHMS } from "../../tools/time";
import { toObjectId } from "../../tools/utils";
import { create_task } from "./helper/create_taks";

/**
 * 发布任务
 * @param ctx
 * @param params
 * @param headers
 */
export async function publish_task(
  ctx: ReqCtx,
  params: any,
  headers: PlainObject
) {
  const uid = headers[ENUM_HEADERS.UID];

  const now = getNowYMDHMS();

  const info = {
    uid: toObjectId(uid),
    ...params,
    createTime: now,
    updateTime: now,
  };

  await create_task(info);
}
