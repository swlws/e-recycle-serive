import { ApiCfg } from "../lib/net-server";
import { i_publish_task } from "../interface/task";

const apis: ApiCfg[] = [
  // 发布任务
  {
    url: "/api/task/create",
    method: "post",
    handler: {
      version: "1.0.0",
      cb: i_publish_task,
    },
  },
];

export default apis;
