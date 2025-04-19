import OpsApi from "./ops";
import AuthApi from "./auth";
import File from "./file";
import share from "./share";
import log from "./log";

export default [
  ...OpsApi,
  ...AuthApi,
  ...File,
  ...share,
  ...log,
];
