import { Next, Request, Response } from "restify";
import { ReqWrapper } from "../lib/net-server";
import { getHeaders } from "../tools/header";
import { publish_task } from "../business/task/publish-task";
import { query_all_task } from "../business/task/query_all_task";
import { query_user_published_task } from "../business/task/query_user_published_task";
import { query_user_sell_out_task } from "../business/task/query_user_sell_out_task";
import { query_user_buy_in_task } from "../business/task/query_user_buy_in_task";
import { user_task_count } from "../business/task/task_count";

/**
 * 发布任务
 * @param req
 * @param res
 * @param next
 */
export async function i_publish_task(
  req: ReqWrapper,
  res: Response,
  next: Next
) {
  const ctx = req.getCtx();
  try {
    const params = req.params;
    const headers = getHeaders(req, false);

    await publish_task(ctx, params, headers);
  } catch (e) {
    ctx.error = e;
  } finally {
    next();
  }
}

/**
 * 发布任务
 * @param req
 * @param res
 * @param next
 */
export async function i_query_all_task(
  req: ReqWrapper,
  res: Response,
  next: Next
) {
  const ctx = req.getCtx();
  try {
    const params = req.params;
    const headers = getHeaders(req, false);

    ctx.data = { r0: 0, res: await query_all_task(ctx, params, headers) };
  } catch (e) {
    ctx.error = e;
  } finally {
    next();
  }
}

/**
 * 用户自己发布过的任务
 *
 * @param req
 * @param res
 * @param next
 */
export async function i_query_user_published_task(
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
      res: await query_user_published_task(ctx, params, headers),
    };
  } catch (e) {
    ctx.error = e;
  } finally {
    next();
  }
}

/**
 * 用户自己发布过的任务
 *
 * @param req
 * @param res
 * @param next
 */
export async function i_query_user_sell_out_task(
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
      res: await query_user_sell_out_task(ctx, params, headers),
    };
  } catch (e) {
    ctx.error = e;
  } finally {
    next();
  }
}

/**
 * 用户自己发布过的任务
 *
 * @param req
 * @param res
 * @param next
 */
export async function i_query_user_buy_in_task(
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
      res: await query_user_buy_in_task(ctx, params, headers),
    };
  } catch (e) {
    ctx.error = e;
  } finally {
    next();
  }
}

/**
 * 任务统计
 *
 * @param req
 * @param res
 * @param next
 */
export async function i_user_task_count(
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
      res: await user_task_count(ctx, params, headers),
    };
  } catch (e) {
    ctx.error = e;
  } finally {
    next();
  }
}
