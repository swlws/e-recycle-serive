import { Next, Response } from "restify";
import { ReqWrapper } from "../lib/net-server";
import { getHeaders } from "../tools/header";
import { query_share_qr_code } from "../business/share/query_share_qr_code";

/**
 * 获取个人分享二维码
 *
 * @param req
 * @param res
 * @param next
 */
export async function i_query_share_qr_code(
  req: ReqWrapper,
  res: Response,
  next: Next
) {
  const ctx = req.getCtx();
  try {
    const params = req.params;
    const headers = getHeaders(req, false);
    const result = await query_share_qr_code(ctx, params, headers);

    if (result instanceof Buffer) {
      res.set("Content-Type", "image/png");
      res.set("Cache-Control", "max-age=0, no-cache, no-store");
    }

    // 请求成功时，返回 Buffer 类型；异常时，返回 Error 类型
    ctx.data = result;
  } catch (e) {
    ctx.error = e;
  } finally {
    next();
  }
}
