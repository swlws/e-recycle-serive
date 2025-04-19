import { ObjectId } from "mongodb";

/**
 * 用户信息
 */
export interface IUser {
  _id?: ObjectId | string;
  openid?: string;
  nickName?: string;
  avatarUrl?: string;
  phoneNumber: string;
  countryCode: string;
  createTime: string;
  updateTime: string;
  lastLoginTime: string;
}
