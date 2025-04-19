import { Next, Response } from "restify";
import { ReqWrapper } from "../lib/net-server";
import { getHeaders } from "../tools/header";

/**
 * 登录
 *
 * @param req
 * @param res
 * @param next
 */
export async function i_login(
  req: ReqWrapper,
  res: Response,
  next: Next
) {
  const ctx = req.getCtx();
  try {
    const params = req.params;
    const headers = getHeaders(req, false);

    ctx.data = {
      r0:0,
      res: {
        nickName: 'xx'
      }
    }
  } catch (e) {
    ctx.error = e;
  } finally {
    next();
  }
}
