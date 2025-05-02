import { ApiCfg } from "../lib/net-server";
import { i_insert_log } from "../interface/log";

const apis: ApiCfg[] = [
  // 添加日志
  {
    url: "/api/log/record",
    method: "post",
    handler: {
      version: "1.0.0",
      cb: i_insert_log,
    },
    auth: false,
  },
];

export default apis;
