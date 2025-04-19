import { ApiCfg } from "../lib/net-server";
import {
  i_publish_task,
  i_query_all_task,
  i_query_user_buy_in_task,
  i_query_user_published_task,
  i_query_user_sell_out_task,
  i_user_task_count,
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
  // 用户发布过的任务
  {
    url: "/api/task/user/published",
    method: "post",
    handler: {
      version: "1.0.0",
      cb: i_query_user_published_task,
    },
  },
  // 用户卖出的任务
  {
    url: "/api/task/user/sellout",
    method: "post",
    handler: {
      version: "1.0.0",
      cb: i_query_user_sell_out_task,
    },
  },
  // 用户买入的任务
  {
    url: "/api/task/user/buyin",
    method: "post",
    handler: {
      version: "1.0.0",
      cb: i_query_user_buy_in_task,
    },
  },
  // 用户的任务统计
  {
    url: "/api/task/user/count",
    method: "get",
    handler: {
      version: "1.0.0",
      cb: i_user_task_count,
    },
  },
];

export default apis;
