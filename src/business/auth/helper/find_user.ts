import { ENUM_COLLECTION } from "../../../constant/collection_name";
import { getMongo } from "../../../lib/mongo";
import { toObjectId } from "../../../tools/utils";

/**
 * 使用openid查询用户
 * @param openid
 * @returns
 */
export async function find_user_via_open_id(openid: string) {
  const query = {
    openid,
  };
  const mongo = await getMongo();
  return await mongo.findOne(ENUM_COLLECTION.T_USER, query);
}

/**
 * 使用id查询用户
 * @param openid
 */
export async function find_user_via_id(_id: string) {
  const query = {
    _id: toObjectId(_id),
  };

  const mongo = await getMongo();
  return await mongo.findOne(ENUM_COLLECTION.T_USER, query);
}

/**
 * 使用手机号查询用户
 * @param phoneNumber
 * @returns
 */
export async function find_user_via_phone_number(phoneNumber: string) {
  const query = {
    phoneNumber,
  };

  const mongo = await getMongo();
  return await mongo.findOne(ENUM_COLLECTION.T_USER, query);
}
