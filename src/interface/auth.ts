import { Next, Response } from "restify";
import { ReqWrapper } from "../lib/net-server";
import { getHeaders } from "../tools/header";
import { login } from "../business/auth/login";
import { update_user_info } from "../business/auth/update_user";
import { user_list } from "../business/auth/user_list";

/**
 * 登录
 * @param req
 * @param res
 * @param next
 */
export async function i_login(req: ReqWrapper, res: Response, next: Next) {
  const ctx = req.getCtx();
  try {
    const params = req.params;
    const headers = getHeaders(req, false);

    const res = await login(ctx, params, headers);

    ctx.data = { r0: 0, res };
  } catch (e) {
    ctx.error = e;
  } finally {
    next();
  }
}

/**
 * 更新用户信息
 * @param req
 * @param res
 * @param next
 */
export async function i_update_user_info(
  req: ReqWrapper,
  res: Response,
  next: Next
) {
  const ctx = req.getCtx();
  try {
    const params = req.params;
    const headers = getHeaders(req, false);

    // 更新用户信息
    const res = await update_user_info(ctx, params, headers);
    ctx.data = { r0: 0, res };
  } catch (e) {
    ctx.error = e;
  } finally {
    next();
  }
}

/**
 * 用户列表
 * @param req
 * @param res
 * @param next
 */
export async function i_user_list(req: ReqWrapper, res: Response, next: Next) {
  const ctx = req.getCtx();
  try {
    const params = req.params;
    const headers = getHeaders(req, false);

    // 用户列表
    const res = await user_list(ctx, params, headers);
    ctx.data = { r0: 0, res };
  } catch (e) {
    ctx.error = e;
  } finally {
    next();
  }
}
