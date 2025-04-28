import { PlainObject } from "../../../../typings/public";
import { ENUM_COLLECTION } from "../../../constant/collection_name";
import {
  ENUM_SCORE_SOURCE_TYPE,
  SCORE_SOURCE_TYPE_MAP,
} from "../../../constant/public";
import { getMongo } from "../../../lib/mongo";
import { getNowYMDHMS } from "../../../tools/time";
import { toObjectId } from "../../../tools/utils";

/**
 * 增加邀请人的积分
 * @param inviter_id
 * @param newUseInfo
 */
export async function increase_score_for_invitation(
  inviter_id: string,
  newUseInfo: PlainObject
) {
  const type = ENUM_SCORE_SOURCE_TYPE.INVITE;
  const { _id, nickName } = newUseInfo;

  const rowData = {
    uid: toObjectId(inviter_id),
    type,
    score: SCORE_SOURCE_TYPE_MAP[type],
    payload: {
      uid: _id,
      nickName,
    },
    createTime: getNowYMDHMS(),
  };

  const mongo = await getMongo();
  await mongo.insertOne(ENUM_COLLECTION.T_SCORE, rowData);
}
