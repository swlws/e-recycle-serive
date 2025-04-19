import { PlainObject } from "../../../typings/public";
import { ReqCtx } from "../../lib/net-server";
import { decrypt_data } from "../../tools/decrypt-wx-data";
import { get_user_seesion_key } from "./helper/get_user_seesion_key";

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
  const { iv, encryptedData, code } = params;

  // 获取用户session_key
  const { session_key, openid } = await get_user_seesion_key(code);

  // 解密用户信息
  const decryptInfo = await decrypt_data(encryptedData, iv, session_key);

  console.log("decryptInfo", decryptInfo);
}
