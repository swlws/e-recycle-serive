import { Request, Response, Next } from "restify";
import { ENUM_HEADERS } from "../constant/headers";
import {
  ENUM_REASON,
  generateToken,
  verifyToken,
} from "../business/auth/helper/token";
import CustomError from "../lib/custom-error";

/**
 * Token 校验拦截器
 * @param req
 * @param res
 * @param next
 * @returns
 */
export default function auth_token_interceptor(
  req: Request,
  res: Response,
  next: Next,
  options?: any
) {
  if (options?.authSession === false) {
    return next();
  }

  // const useToken = req.header(ENUM_HEADERS.USE_TOKEN);
  // if (useToken !== "true") {
  //   return next();
  // }

  // 校验 token
  const token = req.header(ENUM_HEADERS.TOKEN);
  const { result, reason } = verifyToken(token);
  if (result) {
    // token 即将过期
    if (reason === ENUM_REASON.WILL_EXPIRED) {
      const uid = req.header(ENUM_HEADERS.UID);
      // 生成新的 token
      if (uid) {
        const nextToken = generateToken(uid);
        res.set(ENUM_HEADERS.NEXT_TOKEN, nextToken);
      }
    }

    return next();
  }

  res.send({
    r0: 401,
    r1: reason,
    res: "",
  });
  // return next(new CustomError(reason));
}
