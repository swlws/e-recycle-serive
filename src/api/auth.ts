import { ApiCfg } from "../lib/net-server";
import { i_login, i_update_user_info, i_user_list } from "../interface/auth";

const apis: ApiCfg[] = [
  // loign
  {
    url: "/api/login",
    method: "post",
    handler: {
      version: "1.0.0",
      cb: i_login,
    },
    auth: false,
  },
  // 更新用户信息
  {
    url: "/api/user/update",
    method: "post",
    handler: {
      version: "1.0.0",
      cb: i_update_user_info,
    },
  },
  {
    url: "/api/user/list",
    method: "get",
    handler: {
      version: "1.0.0",
      cb: i_user_list,
    },
  },
];

export default apis;
