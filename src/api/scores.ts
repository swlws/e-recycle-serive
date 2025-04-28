import { ApiCfg } from "../lib/net-server";
import { i_query_user_score, i_query_user_score_list } from "../interface/score";

const apis: ApiCfg[] = [
  //
  {
    url: "/api/user/score",
    method: "get",
    handler: {
      version: "1.0.0",
      cb: i_query_user_score,
    },
  },
  {
    url: "/api/user/score_list",
    method: "get",
    handler: {
      version: "1.0.0",
      cb: i_query_user_score_list,
    },
  },
];

export default [...apis];
