import OpsApi from "./ops";
import AuthApi from "./auth";
import TaskApi from "./task";
import FileApi from "./file";
import ShareApi from "./share";
import LogAPi from "./log";
import ScoreApi from "./score";

export default [
  ...OpsApi,
  ...AuthApi,
  ...TaskApi,
  ...FileApi,
  ...ShareApi,
  ...LogAPi,
  ...ScoreApi,
];
