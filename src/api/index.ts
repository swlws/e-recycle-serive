import TestApi from "./test";
import File from "./file";
import share from "./share";
import log from "./log";

export default [
  ...TestApi,
  ...File,
  ...share,
  ...log,
];
