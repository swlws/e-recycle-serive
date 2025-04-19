import { ApiCfg } from "../lib/net-server";
import { i_upload_file } from "../interface/file";

const apis: ApiCfg[] = [
  // 文件上传
  {
    url: "/api/file/upload",
    method: "post",
    handler: {
      version: "1.0.0",
      cb: i_upload_file,
    },
  },
];

export default apis;
