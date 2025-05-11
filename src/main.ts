import { getMongodbConfig } from "./config";
import NetServer from "./lib/net-server";
import apis from "./api/index";

// 加载定时任务
import "./corn/index";

const { host, port, database } = getMongodbConfig();
console.log("\n=== Database Connection Info ===");
console.log(`Host: ${host}`);
console.log(`Port: ${port}`);
console.log(`Database: ${database}`);
console.log("=============================\n");
console.log("");

const server = new NetServer({
  name: "e-recycle-server",
  host: "127.0.0.1",
  port: 8808,
  api_version: "1.0.0",
  apis: apis,
  interceptors: [
    // 拦截器,检查请求头
    // check_header_interceptor,
    // 拦截器,检查系统升级状态
    // check_system_upgrade_state_interceptor,
  ],
});
server.build();
