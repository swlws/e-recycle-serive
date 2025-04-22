import { PlainObject } from "../../../typings/public";
import { ReqCtx } from "../../lib/net-server";
import { ENUM_HEADERS } from "../../constant/headers";
import { toObjectId } from "../../tools/utils";
import { getMongo } from "../../lib/mongo";
import { ENUM_COLLECTION } from "../../constant/collection_name";
import { ENUM_TASK_STATE } from "../../constant/public";

/**
 * 放弃已抢到的任务
 *
 * @param ctx
 * @param params
 * @param headers
 */
export async function untake_task(
  ctx: ReqCtx,
  params: any,
  headers: PlainObject
) {
  const uid = headers[ENUM_HEADERS.UID];

  const query = {
    _id: toObjectId(params._id),
    dealWithUid: toObjectId(uid),
  };
  const update = {
    $set: {
      dealWithUid: null,
      dealwithPerson: null,
      dealWithPhoneNumber: null,
      state: ENUM_TASK_STATE.PENDDING,
    },
  };

  try {
    const mongo = await getMongo();
    await mongo.findOneAndUpdate(ENUM_COLLECTION.T_TASK, query, update);
    return true;
  } catch (err) {
    return false;
  }
}
