import { Next, Response } from "restify";
import { ReqWrapper } from "../lib/net-server";
import { getHeaders } from "../tools/header";
import { insert_log } from "../business/log/insert_log";

/**
 * 添加日志
 *
 * @param req
 * @param res
 * @param next
 */
export async function i_insert_log(req: ReqWrapper, res: Response, next: Next) {
  const ctx = req.getCtx();
  try {
    const params = req.params;
    const headers = getHeaders(req, false);
    await insert_log(ctx, params, headers);
  } catch (e) {
    ctx.error = e;
  } finally {
    next();
  }
}
