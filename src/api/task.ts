import { ApiCfg } from "../lib/net-server";
import {
  i_publish_task,
  i_query_all_task,
  i_query_self_published_task,
} from "../interface/task";

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
  // 任务大厅。所有的任务
  {
    url: "/api/task/all",
    method: "post",
    handler: {
      version: "1.0.0",
      cb: i_query_all_task,
    },
  },
  // 自己发布过的任务
  {
    url: "/api/task/self/published",
    method: "post",
    handler: {
      version: "1.0.0",
      cb: i_query_self_published_task,
    },
  },
];

export default apis;
