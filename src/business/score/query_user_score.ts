import { PlainObject } from "../../../typings/public";
import { ENUM_COLLECTION } from "../../constant/collection_name";
import { ENUM_HEADERS } from "../../constant/headers";
import { getMongo } from "../../lib/mongo";
import { ReqCtx } from "../../lib/net-server";
import { toObjectId } from "../../tools/utils";

export async function query_user_score(
  ctx: ReqCtx,
  params: PlainObject,
  headers: PlainObject
) {
  const uid = headers[ENUM_HEADERS.UID];
  const mongo = await getMongo();

  // 查询积分总数
  const totalScoreResult: any = await mongo
    .aggregate(ENUM_COLLECTION.T_SCORE, [
      { $match: { uid: { $eq: toObjectId(uid) } } },
      { $group: { _id: "$uid", sum: { $sum: "$score" } } },
    ])
    .then((cursor) => cursor.toArray());

  return totalScoreResult.length > 0 ? totalScoreResult[0].sum : 0;
}
