import { PlainObject } from "../../../typings/public";
import { ENUM_COLLECTION } from "../../constant/collection_name";
import { getMongo } from "../../lib/mongo";
import { ReqCtx } from "../../lib/net-server";

/**
 * 用户列表
 * @param ctx
 * @param params
 * @param headers
 */
export async function user_list(
  ctx: ReqCtx,
  params: any,
  headers: PlainObject
) {
  const mongo = await getMongo();
  return await mongo.find(ENUM_COLLECTION.T_USER, {});
}
