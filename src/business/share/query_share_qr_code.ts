import { PlainObject } from "../../../typings/public";
import { ReqCtx } from "../../lib/net-server";
import { ENUM_HEADERS } from "../../constant/headers";
import { query_wx_access_token } from "../../tools/wx_access_token";
import { send_post } from "../../lib/http";
import { check_required_keys } from "../../helper/check_required_key";

/**
 * 获取个人的分享图片
 *  https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/qrcode-link/qr-code/getUnlimitedQRCode.html
 * @param ctx
 * @param info
 */
export async function query_share_qr_code(
  ctx: ReqCtx,
  params: { uid: string },
  headers: PlainObject
) {
  check_required_keys(params, ["uid"]);

  const wx_access_token = await query_wx_access_token();
  if (!wx_access_token) {
    return "";
  }

  const { uid } = params;

  const qr_code_url = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${wx_access_token}`;

  const code_params = {
    scene: uid, // 分享人ID
    // path: "pages/welcome/index", // 默认跳转到小程序的首页
    check_path: false, // 默认是true，检查page 是否存在，为 true 时 page 必须是已经发布的小程序存在的页面（否则报错）；为 false 时允许小程序未发布或者 page 不存在， 但page 有数量上限（60000个）请勿滥用。
    env_version: "release", // 要打开的小程序版本。正式版为 "release"，体验版为 "trial"，开发版为 "develop"。默认是正式版。
  };

  const result = await send_post(qr_code_url, code_params);

  process.logger.info(
    "query_share_qr_code",
    result instanceof Buffer ? "Buffer" : result
  );

  return result;
}
