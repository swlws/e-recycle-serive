import { ApiCfg } from "../lib/net-server";
import { server_alive } from "../interface/ops";

const apis: ApiCfg[] = [
  {
    url: "/api/ops/alive",
    method: "get",
    handler: {
      version: "1.0.0",
      cb: server_alive,
    },
  },
];

export default [...apis];
