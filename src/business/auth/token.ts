import { PlainObject } from "../../../typings/public";
import { ENUM_HEADERS } from "../../constant/headers";
import { ReqCtx } from "../../lib/net-server";
import { generateToken } from "./helper/token";

/**
 * 更新用户信息
 * @param ctx
 * @param params
 * @param headers
 */
export async function make_token(
  ctx: ReqCtx,
  params: any,
  headers: PlainObject
) {
  const uid = headers[ENUM_HEADERS.UID];

  if (!uid) {
    throw new Error("uid is required");
  }

  return generateToken(uid);
}
