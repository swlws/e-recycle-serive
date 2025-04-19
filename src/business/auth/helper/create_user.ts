import { IUser } from "../../../../typings/user";
import { ENUM_COLLECTION } from "../../../constant/collection_name";
import { getMongo } from "../../../lib/mongo";

/**
 * 创建用户
 * @param params
 * @returns
 */
export async function create_user(params: IUser) {
  const mongo = await getMongo();
  return await mongo.insertOne(ENUM_COLLECTION.T_USER, params);
}
