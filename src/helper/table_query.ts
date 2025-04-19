import { FindOptions } from "mongodb";
import {
  Pagination,
  PlainObject,
  TableQueryParams,
} from "../../typings/public";
import { getMongo } from "../lib/mongo";

// 非查询字段
const NOT_QUERY_FIELDS: (keyof Pagination)[] = [
  "page_size",
  "page_num",
  "sort_field",
  "sort_type",
];

/**
 * 通用表格查询方法
 *
 * @param collectionName 集合名称
 * @param params 查询参数
 * @param projection 需要过滤的字段
 */
export async function table_query_helper<T extends PlainObject>(
  collectionName: string,
  params: TableQueryParams<T>,
  projection: PlainObject = {}
) {
  // 默认排序
  if (!params.sort_field) {
    params.sort_field = "create_at";
    params.sort_type = "desc";
  }

  const { page_size = 20, page_num = 0, sort_field, sort_type } = params;

  // 提取查询字段
  const query: Record<string, any> = {};
  for (const key in params) {
    if (NOT_QUERY_FIELDS.includes(key as any)) {
      continue;
    }
    query[key] = params[key];
  }

  // 排序
  const sort: PlainObject = {};
  if (sort_field) {
    sort[sort_field] = sort_type === "asc" ? 1 : -1;
  }

  const options: FindOptions = {
    sort,
    projection,
  };

  const mongo = await getMongo();
  const cursor = await mongo.findCursor(collectionName, query, options);
  const total = await cursor.count();

  let list;

  // 返回全部数据
  if (page_num === 0) {
    list = await cursor.toArray();
  } else {
    // 返回分页数据
    const skip = (page_num - 1) * page_size;
    list = await cursor.skip(skip).limit(page_size).toArray();
  }

  // 合并被邀请人

  return {
    total,
    list,
  };
}
