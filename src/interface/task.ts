import { Next, Request, Response } from "restify";
import { ReqWrapper } from "../lib/net-server";
import { getHeaders } from "../tools/header";
import { publish_task } from "../business/task/publish-task";

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

    //   ctx.data = { r0: 0, res };
  } catch (e) {
    ctx.error = e;
  } finally {
    next();
  }
}
