import wx_config from "../../config/wx.json";
import { send_get } from "../../lib/http";

/**
 * js code 换取 session_key
 *
 * @param js_code code
 * @returns
 */
export function get_user_session_info(js_code: string) {
  const { wx_app_id, wx_app_secret } = wx_config;
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${wx_app_id}&secret=${wx_app_secret}&js_code=${js_code}&grant_type=authorization_code`;

  return send_get(url);
}
