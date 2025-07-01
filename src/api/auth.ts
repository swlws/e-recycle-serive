import { ApiCfg } from "../lib/net-server";
import {
  i_login,
  i_make_token,
  i_update_user_info,
  i_user_list,
} from "../interface/auth";

const apis: ApiCfg[] = [
  // loign
  {
    url: "/api/login",
    method: "post",
    handler: {
      version: "1.0.0",
      cb: i_login,
    },
    options: {
      authSession: false,
    },
  },
  // 获取token
  {
    url: "/api/token",
    method: "post",
    handler: {
      version: "1.0.0",
      cb: i_make_token,
    },
    options: {
      authSession: false,
    },
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
    method: "post",
    handler: {
      version: "1.0.0",
      cb: i_user_list,
    },
  },
];

export default apis;
