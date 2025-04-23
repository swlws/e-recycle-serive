import { PlainObject } from "../../../typings/public";
import { ReqCtx } from "../../lib/net-server";
import { query_user_published_task } from "./query_user_published_task";
import { query_user_sell_out_task } from "./query_user_sell_out_task";
import { query_user_buy_in_task } from "./query_user_buy_in_task";
import { query_user_in_trading_task } from "./query_user_in_trading_task";

/**
 * 任务统计
 * @param ctx
 * @param params
 * @param headers
 */
export async function user_task_count(
  ctx: ReqCtx,
  params: any,
  headers: PlainObject
) {
  params.page = 1;
  params.size = 1;

  const publisedTaskInfo = await query_user_published_task(
    ctx,
    params,
    headers
  );
  const inTradingTaskInfo = await query_user_in_trading_task(
    ctx,
    params,
    headers
  );
  const selloutTaskInfo = await query_user_sell_out_task(ctx, params, headers);
  const buyinTaskInfo = await query_user_buy_in_task(ctx, params, headers);

  return {
    published: publisedTaskInfo.total,
    inTrading: inTradingTaskInfo.total,
    sellout: selloutTaskInfo.total,
    buyin: buyinTaskInfo.total,
  };
}
