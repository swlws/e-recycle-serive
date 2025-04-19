import { Next, Response } from "restify";
import { ReqWrapper } from "../lib/net-server";
import { getHeaders } from "../tools/header";
import { login } from "../business/auth/login";

/**
 * 登录
 *
 * @param req
 * @param res
 * @param next
 */
export async function i_login(req: ReqWrapper, res: Response, next: Next) {
  const ctx = req.getCtx();
  try {
    const params = req.params;
    const headers = getHeaders(req, false);

    const res = await login(ctx, params, headers);

    ctx.data = {
      r0: 0,
      res,
    };
  } catch (e) {
    ctx.error = e;
  } finally {
    next();
  }
}
