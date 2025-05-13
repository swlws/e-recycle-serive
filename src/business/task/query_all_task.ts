import { FindOptions } from "mongodb";
import { PlainObject } from "../../../typings/public";
import { ENUM_HEADERS } from "../../constant/headers";
import { ReqCtx } from "../../lib/net-server";
import { toObjectId } from "../../tools/utils";
import { ENUM_COLLECTION } from "../../constant/collection_name";
import { query_table } from "../../helper/table_query";
import { ENUM_TASK_STATE } from "../../constant/public";

/**
 * 发布任务
 * @param ctx
 * @param params
 * @param headers
 */
export async function query_all_task(
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

  // 过滤掉区的检索限制
  delete rest.district;
  for (const key in rest) {
    if (["province", "city", "district"].includes(key)) {
      query[`location.${key}`] = rest[key];
    } else {
      query[key] = rest[key];
    }
  }

  // 可接单的任务
  query.state = ENUM_TASK_STATE.PENDDING;

  // 排序
  const sort: PlainObject = {};
  if (sortField) {
    sort[sortField] = sortType === "asc" ? 1 : -1;
  }

  const options: FindOptions = {
    sort,
  };

  return await query_table(ENUM_COLLECTION.T_TASK, query, options, page, size);
}
