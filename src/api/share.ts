import { ApiCfg } from "../lib/net-server";
import { i_query_share_qr_code } from "../interface/share";

const apis: ApiCfg[] = [
  // 获取个人分享二维码
  {
    url: "/api/share/user/qrcode",
    method: "get",
    handler: {
      version: "1.0.0",
      cb: i_query_share_qr_code,
    },
  },
];

export default [...apis];
