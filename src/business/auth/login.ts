import { ObjectId } from "mongodb";
import { PlainObject } from "../../../typings/public";
import { ReqCtx } from "../../lib/net-server";
import { decrypt_data } from "../../tools/decrypt-wx-data";
import { get_user_session_info } from "../wx-openapi/jscode-to-session";
import {
  find_user_via_phone_number,
  find_user_via_pwd,
} from "./helper/find_user";
import { getNowYMDHMS } from "../../tools/time";
import { create_user } from "./helper/create_user";
import { update_user } from "./helper/update_user";
import { get_user_seesion_key } from "./helper/get_user_seesion_key";
import { generate_random_name } from "./helper/random_name";
import { increase_score_for_invitation } from "../score/helper/increase_score_for_invitation";
import { generateToken } from "./helper/token";

/**
 * 账号密码登录
 * @param parms
 * @returns
 */
async function loginViaPwd(parms: any) {
  const { account, pwd } = parms;
  const user = await find_user_via_pwd(account, pwd);
  if (!user) {
    throw new Error("账号或密码错误");
  }

  return generateToken(user._id.toString());
}

/**
 * 登录
 * @param ctx
 * @param params
 * @param headers
 */
export async function login(ctx: ReqCtx, params: any, headers: PlainObject) {
  const { auth, iv, encryptedData, code, inviter } = params;
  if (auth === "password") {
    return await loginViaPwd(params);
  }

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
  const _id = new ObjectId();
  let newUser = {
    _id,
    openid,
    phoneNumber,
    countryCode,
    nickName: generate_random_name(),
    avatarUrl: `https://robohash.org/${_id.toString()}`,
    createTime: now,
    updateTime: now,
    lastLoginTime: now,
  };

  await create_user(newUser);

  // 如果有邀请者，增加邀请者的积分
  if (inviter) {
    await increase_score_for_invitation(inviter, newUser);
  }

  return newUser;
}
