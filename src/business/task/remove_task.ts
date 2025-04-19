import { PlainObject } from "../../../typings/public";
import { ReqCtx } from "../../lib/net-server";
import { ENUM_HEADERS } from "../../constant/headers";
import { toObjectId } from "../../tools/utils";
import { getMongo } from "../../lib/mongo";
import { ENUM_COLLECTION } from "../../constant/collection_name";

/**
 * 删除任务
 *
 * @param ctx
 * @param params
 * @param headers
 */
export async function remove_task(
  ctx: ReqCtx,
  params: any,
  headers: PlainObject
) {
  const uid = headers[ENUM_HEADERS.UID];
  const query = {
    uid: toObjectId(uid),
    _id: toObjectId(params._id),
  };

  const mongo = await getMongo();
  await mongo.findOneAndDelete(ENUM_COLLECTION.T_TASK, query);
}
