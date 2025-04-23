import { Next, Request, Response } from "restify";
import { ReqWrapper } from "../lib/net-server";
import { getHeaders } from "../tools/header";
import { publish_task } from "../business/task/publish-task";
import { query_all_task } from "../business/task/query_all_task";
import { query_user_published_task } from "../business/task/query_user_published_task";
import { query_user_sell_out_task } from "../business/task/query_user_sell_out_task";
import { query_user_buy_in_task } from "../business/task/query_user_buy_in_task";
import { user_task_count } from "../business/task/task_count";
import { remove_task } from "../business/task/remove_task";
import { finish_task } from "../business/task/finish_task";
import { take_task } from "../business/task/take_task";
import { query_one_task } from "../business/task/query_one_task";
import { untake_task } from "../business/task/untake_task";
import { query_user_in_trading_task } from "../business/task/query_user_in_trading_task";

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
 * 查询单个任务
 * @param req
 * @param res
 * @param next
 */
export async function i_query_one_task(
  req: ReqWrapper,
  res: Response,
  next: Next
) {
  const ctx = req.getCtx();
  try {
    const params = req.params;
    const headers = getHeaders(req, false);

    const info = await query_one_task(ctx, params, headers);
    ctx.data = { r0: 0, res: info };
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
 * 查询用户处于交易中的任务
 * @param req
 * @param res
 * @param next
 */
export async function i_query_user_in_trading_task(
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
      res: await query_user_in_trading_task(ctx, params, headers),
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

/**
 * 删除任务
 *
 * @param req
 * @param res
 * @param next
 */
export async function i_remove_task(
  req: ReqWrapper,
  res: Response,
  next: Next
) {
  const ctx = req.getCtx();
  try {
    const params = req.params;
    const headers = getHeaders(req, false);

    await remove_task(ctx, params, headers);
  } catch (e) {
    ctx.error = e;
  } finally {
    next();
  }
}

/**
 * 完成任务
 *
 * @param req
 * @param res
 * @param next
 */
export async function i_finish_task(
  req: ReqWrapper,
  res: Response,
  next: Next
) {
  const ctx = req.getCtx();
  try {
    const params = req.params;
    const headers = getHeaders(req, false);

    await finish_task(ctx, params, headers);
  } catch (e) {
    ctx.error = e;
  } finally {
    next();
  }
}

/**
 * 任务抢单
 *
 * @param req
 * @param res
 * @param next
 */
export async function i_take_task(req: ReqWrapper, res: Response, next: Next) {
  const ctx = req.getCtx();
  try {
    const params = req.params;
    const headers = getHeaders(req, false);

    ctx.data = { r0: 0, res: await take_task(ctx, params, headers) };
  } catch (e) {
    ctx.error = e;
  } finally {
    next();
  }
}

/**
 * 放弃已抢到的任务
 *
 * @param req
 * @param res
 * @param next
 */
export async function i_untake_task(
  req: ReqWrapper,
  res: Response,
  next: Next
) {
  const ctx = req.getCtx();
  try {
    const params = req.params;
    const headers = getHeaders(req, false);

    ctx.data = { r0: 0, res: await untake_task(ctx, params, headers) };
  } catch (e) {
    ctx.error = e;
  } finally {
    next();
  }
}
