import { FindOptions } from "mongodb";
import { PlainObject } from "../../../typings/public";
import { ENUM_COLLECTION } from "../../constant/collection_name";
import { getMongo } from "../../lib/mongo";
import { ReqCtx } from "../../lib/net-server";
import { query_table } from "../../helper/table_query";

/**
 * 用户列表
 * @param ctx
 * @param params
 * @param headers
 */
export async function user_list(
  ctx: ReqCtx,
  params: any,
  headers: PlainObject
) {
  const {
    page = 1,
    size = 20,
    sortField = "createTime",
    sortType = "desc",
    ...rest
  } = params;

  const query: PlainObject = {};
  for (const key in rest) {
    query[key] = rest[key];
  }

  // 可接单的任务

  // 排序
  const sort: PlainObject = {};
  if (sortField) {
    sort[sortField] = sortType === "asc" ? 1 : -1;
  }

  const options: FindOptions = {
    sort,
  };

  return await query_table(ENUM_COLLECTION.T_USER, query, options, page, size);
}
