import { ObjectId } from "mongodb";
import { PlainObject } from "../../../typings/public";
import { ReqCtx } from "../../lib/net-server";
import { decrypt_data } from "../../tools/decrypt-wx-data";
import { get_user_session_info } from "../wx-openapi/jscode-to-session";
import { find_user_via_phone_number } from "./helper/find_user";
import { getNowYMDHMS } from "../../tools/time";
import { create_user } from "./helper/create_user";
import { update_user } from "./helper/update_user";
import { get_user_seesion_key } from "./helper/get_user_seesion_key";

// async function get_user_seesion_key(
//   code: string
// ): Promise<{ session_key: string; openid: string }> {
//   const sessionInfo = await get_user_session_info(code);

//   if (!sessionInfo || !sessionInfo.session_key || !sessionInfo.openid) {
//     console.error("获取用户session_key失败", sessionInfo);
//     throw new Error("获取用户session_key失败");
//   }

//   return sessionInfo;
// }

/**
 * 登录
 * @param ctx
 * @param params
 * @param headers
 */
export async function login(ctx: ReqCtx, params: any, headers: PlainObject) {
  const { iv, encryptedData, code } = params;

  // 获取用户session_key
  const { session_key, openid } = await get_user_seesion_key(code);

  // 解密用户信息
  const { phoneNumber, countryCode } = await decrypt_data(
    encryptedData,
    iv,
    session_key
  );

  // 查询用户是否存在
  let userInfo = await find_user_via_phone_number(phoneNumber);
  if (userInfo) {
    // 更新用户登录时间
    await update_user(userInfo._id, {
      lastLoginTime: getNowYMDHMS(),
    });

    return userInfo;
  }

  // 创建用户
  const now = getNowYMDHMS();
  let newUser = {
    _id: new ObjectId(),
    openid,
    phoneNumber,
    countryCode,
    createTime: now,
    updateTime: now,
    lastLoginTime: now,
  };
  await create_user(newUser);
  return newUser;
}
