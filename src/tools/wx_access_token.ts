import wx_config from "../config/wx.json";
import { send_get } from "../lib/http";

// 微信 access_token
let wx_access_token = "";
// 上次更新时间
let last_update_time = 0;
// 有效时长，一小时。小程序目前默认是7200s（2小时）
let expires_in = 60 * 60 * 1000;

/**
 * 获取微信access_token
 * https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/mp-access-token/getAccessToken.html
 *  获取小程序全局唯一后台接口调用凭据，token有效期为7200s，开发者需要进行
 *
 * @returns {string}  access_token
 */
export async function query_wx_access_token() {
  if (wx_access_token && Date.now() - last_update_time < expires_in) {
    return wx_access_token;
  }

  const { wx_app_id, wx_app_secret } = wx_config;

  const url =
    "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" +
    wx_app_id +
    "&secret=" +
    wx_app_secret;

  return send_get(url)
    .then((res) => {
      if (res.access_token) {
        wx_access_token = res.access_token;
        last_update_time = Date.now();

        return wx_access_token;
      }

      return "";
    })
    .catch((res) => {
      process.logger.error("query_wx_access_token error");
      process.logger.error(res);

      return "";
    });
}
