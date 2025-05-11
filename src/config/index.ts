import fs from "fs";
import path from "path";
import { PlainObject } from "../../typings/public";

let cosCondig: PlainObject;

/**
 * 获取cos配置
 * @returns
 */
export function getCosConfig() {
  if (cosCondig) {
    return cosCondig;
  }

  try {
    const configPath = path.resolve(
      process.cwd(),
      "..",
      "e-recycle-env",
      "env",
      "cos.json"
    );
    const configStr = fs.readFileSync(configPath, "utf-8");
    cosCondig = JSON.parse(configStr);
    return cosCondig;
  } catch (e) {
    console.error(e);
    return {};
  }
}

let dbConfig: PlainObject;
/**
 * 获取数据库配置
 * @returns
 */
export function getMongodbConfig() {
  if (dbConfig) {
    return dbConfig;
  }

  try {
    const configPath = path.resolve(
      process.cwd(),
      "..",
      "e-recycle-env",
      "env",
      "mongodb.json"
    );
    const configStr = fs.readFileSync(configPath, "utf-8");
    dbConfig = JSON.parse(configStr);
    return dbConfig;
  } catch (e) {
    console.error(e);
    return {};
  }
}

let wxConfig: PlainObject;
/**
 * 获取微信配置
 * @returns
 */
export function getWxConfig() {
  if (wxConfig) {
    return wxConfig;
  }
  try {
    const configPath = path.resolve(
      process.cwd(),
      "..",
      "e-recycle-env",
      "env",
      "wx.json"
    );
    const configStr = fs.readFileSync(configPath, "utf-8");
    wxConfig = JSON.parse(configStr);
    return wxConfig;
  } catch (e) {
    console.error(e);
    return {};
  }
}
