import { Next, Response } from "restify";
import { ReqWrapper } from "../lib/net-server";
import { getHeaders } from "../tools/header";
import { upload_file } from "../business/file/upload_file";

/**
 * 文件上传
 *
 * @param req
 * @param res
 * @param next
 */
export async function i_upload_file(
  req: ReqWrapper,
  res: Response,
  next: Next
) {
  const ctx = req.getCtx();
  try {
    const file = req.files?.file;

    const params = req.params;
    const headers = getHeaders(req, false);
    const result = await upload_file(ctx, { ...params, file }, headers);

    ctx.data = {
      r0: 0,
      res: result,
    };
  } catch (e) {
    ctx.error = e;
  } finally {
    next();
  }
}
