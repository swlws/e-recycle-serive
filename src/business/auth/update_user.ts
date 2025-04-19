import { PlainObject } from "../../../typings/public";
import { ReqCtx } from "../../lib/net-server";
import { decrypt_data } from "../../tools/decrypt-wx-data";
import { find_user_via_open_id } from "./helper/find_user";
import { get_user_seesion_key } from "./helper/get_user_seesion_key";
import { update_user_via_openid } from "./helper/update_user";

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
  // 获取参数
  const { iv, encryptedData, code } = params;

  // 获取用户session_key
  const { session_key, openid } = await get_user_seesion_key(code);

  // 解密用户信息
  const { openId, avatarUrl, nickName } = await decrypt_data(
    encryptedData,
    iv,
    session_key
  );

  // 如果用户没有修改昵称, 则直接返回用户信息
  if (nickName === "微信用户") {
    return await find_user_via_open_id(openId);
  }

  // 更新用户信息
  return await update_user_via_openid(openId, {
    avatarUrl,
    nickName,
  });
}
