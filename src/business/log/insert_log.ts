import { ENUM_HEADERS } from "../../constant/headers";
import { PlainObject } from "../../../typings/public";
import { ENUM_COLLECTION } from "../../constant/collection_name";
import { ReqCtx } from "../../lib/net-server";
import { getMongo } from "../../lib/mongo";
import { getNowYMDHMS } from "../../tools/time";

/**
 * 添加日志记录
 *
 * @param ctx
 * @param info
 */
export async function insert_log(
  ctx: ReqCtx,
  params: any,
  headers: PlainObject
) {
  const env = headers[ENUM_HEADERS.ENV];
  const uid = headers[ENUM_HEADERS.UID];

  const list: any[] = [];
  if (Array.isArray(params)) {
    list.push(...params);
  } else {
    list.push(params);
  }

  const now = getNowYMDHMS();

  const rows = [];
  for (const param of list) {
    rows.push({
      env,
      uid,
      payload: param,
      createTime: now,
    });
  }

  const mongo = await getMongo();
  await mongo.insertMany(ENUM_COLLECTION.T_LOG, rows);
}
