import { Next, Response } from "restify";
import { ReqWrapper } from "../lib/net-server";
import { getHeaders } from "../tools/header";
import { query_user_score } from "../business/score/query_user_score";
import { query_user_score_list } from "../business/score/query_user_score_list";

/**
 * 查询用户积分
 *
 * @param req
 * @param res
 * @param next
 */
export async function i_query_user_score(
  req: ReqWrapper,
  res: Response,
  next: Next
) {
  const ctx = req.getCtx();
  try {
    const params = req.params;
    const headers = getHeaders(req, false);

    ctx.data = {
      r0: 0,
      res: await query_user_score(ctx, params, headers),
    };
  } catch (e) {
    ctx.error = e;
  } finally {
    next();
  }
}

/**
 * 查询用户积分列表
 *
 * @param req
 * @param res
 * @param next
 */
export async function i_query_user_score_list(
  req: ReqWrapper,
  res: Response,
  next: Next
) {
  const ctx = req.getCtx();
  try {
    const params = req.params;
    const headers = getHeaders(req, false);

    ctx.data = {
      r0: 0,
      res: await query_user_score_list(ctx, params, headers),
    };
  } catch (e) {
    ctx.error = e;
  } finally {
    next();
  }
}
