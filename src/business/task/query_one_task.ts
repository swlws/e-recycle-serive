import { PlainObject } from "../../../typings/public";
import { ReqCtx } from "../../lib/net-server";
import { toObjectId } from "../../tools/utils";
import { getMongo } from "../../lib/mongo";
import { ENUM_COLLECTION } from "../../constant/collection_name";

/**
 * 查找任务
 *
 * @param ctx
 * @param params
 * @param headers
 */
export async function query_one_task(
  ctx: ReqCtx,
  params: any,
  headers: PlainObject
) {
  const query = {
    _id: toObjectId(params._id),
  };

  const mongo = await getMongo();
  return await mongo.findOne(ENUM_COLLECTION.T_TASK, query);
}
