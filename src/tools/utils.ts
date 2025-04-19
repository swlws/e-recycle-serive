import { ObjectId } from "mongodb";

/**
 * 普通字符串转ObjectId
 *
 * @param str
 * @returns
 */
export function toObjectId(str: string | ObjectId) {
  if (!str) throw new Error("Invalid ObjectId, The Origin Value is null");

  try {
    return new ObjectId(str);
  } catch (e) {
    throw new Error(`Invalid ObjectId, The Origin Value is ${str}`);
  }
}
