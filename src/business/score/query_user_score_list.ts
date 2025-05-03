import { FindOptions } from "mongodb";
import { PlainObject } from "../../../typings/public";
import { ENUM_COLLECTION } from "../../constant/collection_name";
import { ENUM_HEADERS } from "../../constant/headers";
import { getMongo } from "../../lib/mongo";
import { ReqCtx } from "../../lib/net-server";
import { toObjectId } from "../../tools/utils";
import { query_table } from "../../helper/table_query";

export async function query_user_score_list(
  ctx: ReqCtx,
  params: PlainObject,
  headers: PlainObject
) {
  const uid = headers[ENUM_HEADERS.UID];

  const {
    page = 1,
    size = 20,
    sortField = "createTime",
    sortType = "desc",
  } = params;

  const query: PlainObject = {
    uid: toObjectId(uid),
  };

  // 排序
  const sort: PlainObject = {};
  if (sortField) {
    sort[sortField] = sortType === "asc" ? 1 : -1;
  }

  const options: FindOptions = {
    sort,
  };

  return await query_table(ENUM_COLLECTION.T_SCORE, query, options, page, size);
}
