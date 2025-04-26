import { PlainObject } from "../../typings/public";
import { ENUM_HEADERS } from "../constant/headers";
import logger from "../lib/logger";
import { ReqWrapper } from "../lib/net-server";

/**
 * 获取公共头部参数
 *
 * @param req
 * @returns
 */
export function getHeaders(
  req: ReqWrapper,
  throwException = true
): PlainObject {
  const keys = [ENUM_HEADERS.UID, ENUM_HEADERS.ENV];

  const headers: PlainObject = {};
  for (const key of keys) {
    const value = req.header(key);
    if (value) {
      headers[key] = value;
    } else if (throwException) {
      throw new Error(`The Header Field [ ${key} ] Is Required.`);
    }
  }

  logger.info(`[ getHeaders ] - ${JSON.stringify(headers)}`);

  return headers;
}
