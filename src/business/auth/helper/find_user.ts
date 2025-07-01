import { ENUM_COLLECTION } from "../../../constant/collection_name";
import { getMongo } from "../../../lib/mongo";
import { toObjectId } from "../../../tools/utils";
import crypto from "crypto";

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

const PASSWORD_SALT = "KmJimnnjkHJHdkINjdkKHJndhJNHHJnjsd";
/**
 * 通过手机号和密码查询用户
 * @param phoneNumber
 * @param password
 * @returns
 */
export async function find_user_via_pwd(phoneNumber: string, password: string) {
  const signature = crypto
    .createHash("sha256")
    .update(phoneNumber + password + PASSWORD_SALT)
    .digest("hex");

  const query = {
    phoneNumber,
    password: signature,
  };

  const mongo = await getMongo();
  return await mongo.findOne(ENUM_COLLECTION.T_USER, query);
}
