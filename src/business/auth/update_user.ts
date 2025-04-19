import { PlainObject } from "../../../typings/public";
import { ReqCtx } from "../../lib/net-server";
import { update_user } from "./helper/update_user";

/**
 * 更新用户信息
 * @param ctx
 * @param params
 * @param headers
 */
export async function update_user_info(
  ctx: ReqCtx,
  params: any,
  headers: PlainObject
) {
  const { _id, ...rest } = params;

  await update_user(_id, rest);
}
