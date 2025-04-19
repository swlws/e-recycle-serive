import { PlainObject } from "../../typings/public";
import { getMongo } from "../lib/mongo";
import { ENUM_COLLECTION } from "../constant/collection_name";

/**
 * 通用表格查询方法
 * @param collectName
 * @param query
 * @param options
 * @param page
 * @param size
 * @returns
 */
export async function query_table(
  collectName: ENUM_COLLECTION,
  query: PlainObject,
  options: PlainObject,
  page: number,
  size: number
) {
  const mongo = await getMongo();
  const cursor = await mongo.findCursor(collectName, query, options);
  const total = await cursor.count();

  let list;

  // 返回全部数据
  if (page === 0) {
    list = await cursor.toArray();
  } else {
    // 返回分页数据
    const skip = (page - 1) * size;
    list = await cursor.skip(skip).limit(size).toArray();
  }

  return {
    total,
    list,
  };
}
