import { ApiCfg } from "../lib/net-server";
import {
  i_finish_task,
  i_publish_task,
  i_query_all_task,
  i_query_one_task,
  i_query_user_buy_in_task,
  i_query_user_in_trading_task,
  i_query_user_published_task,
  i_query_user_sell_out_task,
  i_remove_task,
  i_take_task,
  i_untake_task,
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
  // 查找单个任务
  {
    url: "/api/task/one",
    method: "post",
    handler: {
      version: "1.0.0",
      cb: i_query_one_task,
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
  // 查询用户处于交易中的任务
  {
    url: "/api/task/user/in_trading",
    method: "post",
    handler: {
      version: "1.0.0",
      cb: i_query_user_in_trading_task,
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
  // 删除任务
  {
    url: "/api/task/remove",
    method: "post",
    handler: {
      version: "1.0.0",
      cb: i_remove_task,
    },
  },
  // 完成任务
  {
    url: "/api/task/finish",
    method: "post",
    handler: {
      version: "1.0.0",
      cb: i_finish_task,
    },
  },
  // 任务抢单
  {
    url: "/api/task/take",
    method: "post",
    handler: {
      version: "1.0.0",
      cb: i_take_task,
    },
  },
  // 放弃已抢到的任务
  {
    url: "/api/task/untake",
    method: "post",
    handler: {
      version: "1.0.0",
      cb: i_untake_task,
    },
  },
];

export default apis;
