import { PlainObject } from "../../../typings/public";
import { ReqCtx } from "../../lib/net-server";
import { query_all_task } from "./query_all_task";
import { query_self_published_task } from "./query_self_published_task";
import { query_sell_out_task } from "./query_sell_out_task";
import { query_buy_in_task } from "./query_buy_in_task";

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

  const publisedTaskInfo = await query_self_published_task(
    ctx,
    params,
    headers
  );
  const selloutTaskInfo = await query_sell_out_task(ctx, params, headers);
  const buyinTaskInfo = await query_buy_in_task(ctx, params, headers);

  return {
    published: publisedTaskInfo.total,
    sellout: selloutTaskInfo.total,
    buyin: buyinTaskInfo.total,
  };
}
