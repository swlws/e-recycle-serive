import { PlainObject } from "../../../typings/public";
import { ReqCtx } from "../../lib/net-server";
import { ENUM_HEADERS } from "../../constant/headers";
import { query_wx_access_token } from "../../tools/wx_access_token";
import { send_post } from "../../lib/http";
import { find_user_via_id } from "../auth/helper/find_user";
import { update_user_via_openid } from "../auth/helper/update_user";
import FileCenter from "../../tools/file_center";
import { ENUM_WX_ENV } from "../../constant/public";
import logger from "../../lib/logger";

function getQrCodeKey(env: ENUM_WX_ENV) {
  return `${env}QrCode`;
}

/**
 * 查询个人的分享二维码
 * @param uid
 * @returns
 */
async function query_qr_code_in_db(uid: string, env: ENUM_WX_ENV) {
  const userInfo = await find_user_via_id(uid);

  const openid = userInfo?.openid;
  const qrCodeKey = getQrCodeKey(env);
  const shareQrCode = userInfo?.[qrCodeKey];

  logger.info("query_qr_code_in_db", {
    openid,
    shareQrCode,
  });

  return [openid, shareQrCode];
}

/**
 * 更新个人的分享二维码
 * @param uid
 * @param shareQrCode
 */
async function save_qr_code_in_db(
  opnid: string,
  env: ENUM_WX_ENV,
  shareQrCode: string
) {
  const qrCodeKey = getQrCodeKey(env);
  await update_user_via_openid(opnid, { [qrCodeKey]: shareQrCode });
}

function envMap(env: ENUM_WX_ENV) {
  switch (env) {
    case ENUM_WX_ENV.RELEASE:
      return "release";
    case ENUM_WX_ENV.DEVELOP:
      return "develop";
    case ENUM_WX_ENV.TRIAL:
      return "trial";
    default:
      return "release";
  }
}

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
  const uid = headers[ENUM_HEADERS.UID];
  const env = headers[ENUM_HEADERS.ENV];

  // 先从数据库查询
  const [openid, shareQrCode] = await query_qr_code_in_db(uid, env);
  if (shareQrCode) return shareQrCode;

  const wx_access_token = await query_wx_access_token();
  if (!wx_access_token) return "";

  const qr_code_url = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${wx_access_token}`;

  const code_params = {
    scene: uid, // 分享人ID
    // path: "pages/welcome/index", // 默认跳转到小程序的首页
    check_path: false, // 默认是true，检查page 是否存在，为 true 时 page 必须是已经发布的小程序存在的页面（否则报错）；为 false 时允许小程序未发布或者 page 不存在， 但page 有数量上限（60000个）请勿滥用。
    env_version: envMap(env), // 要打开的小程序版本。正式版为 "release"，体验版为 "trial"，开发版为 "develop"。默认是正式版。
  };

  const result = await send_post(qr_code_url, code_params);

  if (result instanceof Buffer) {
    const cosStorePath = `/e/share_qr_code/${openid}_${env}.png`;
    const rt = await FileCenter.uploadByBuffer(cosStorePath, result);
    // 保存到数据库
    await save_qr_code_in_db(openid, env, rt.Location);
    //  COS 上的存储路径
    return rt.Location;
  }

  process.logger.info(
    "query_share_qr_code",
    result instanceof Buffer ? "Buffer" : result
  );

  return "";
}
