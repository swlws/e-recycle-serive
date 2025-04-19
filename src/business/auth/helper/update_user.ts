import { ObjectId } from "mongodb";
import { IUser } from "../../../../typings/user";
import { ENUM_COLLECTION } from "../../../constant/collection_name";
import { getMongo } from "../../../lib/mongo";
import { toObjectId } from "../../../tools/utils";

/**
 * 更新用户信息, 以_id为条件
 * @param params
 * @returns
 */
export async function update_user(
  _id: ObjectId | string,
  params: Partial<IUser>
) {
  const query = {
    _id: toObjectId(_id),
  };
  const update = {
    $set: params,
  };

  const mongo = await getMongo();
  return await mongo.findOneAndUpdate(ENUM_COLLECTION.T_USER, query, update);
}

/**
 * 更新用户信息, 以openid为条件
 * @param openid
 * @param params
 * @returns
 */
export async function update_user_via_openid(
  openid: string,
  params: Partial<IUser>
) {
  const query = { openid };
  const update = {
    $set: params,
  };

  const mongo = await getMongo();
  return await mongo.findOneAndUpdate(ENUM_COLLECTION.T_USER, query, update);
}
