import OpsApi from "./ops";
import AuthApi from "./auth";
import TaskApi from "./task";
import FileApi from "./file";
import ShareApi from "./share";
import LogAPi from "./log";

export default [
  ...OpsApi,
  ...AuthApi,
  ...TaskApi,
  ...FileApi,
  ...ShareApi,
  ...LogAPi,
];
