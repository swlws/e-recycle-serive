import { ApiCfg } from "../lib/net-server";
import { i_login } from "../interface/auth";

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
  
];

export default apis;
