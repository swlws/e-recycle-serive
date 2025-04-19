import { get_user_session_info } from "../../wx-openapi/jscode-to-session";

/**
 * 获取用户session_key
 * @param code
 * @returns
 */
export async function get_user_seesion_key(
  code: string
): Promise<{ session_key: string; openid: string }> {
  const sessionInfo = await get_user_session_info(code);

  if (!sessionInfo || !sessionInfo.session_key || !sessionInfo.openid) {
    console.error("获取用户session_key失败", sessionInfo);
    throw new Error("获取用户session_key失败");
  }

  return sessionInfo;
}
