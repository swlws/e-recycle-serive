import crypto from "crypto";

const SECRET = "kmsdjfjsnfsjHjnsfiinsdnfnkandsnfin";
const TOKEN_EXPIRATION = 2 * 3600 * 1000; // 2 hour

/**
 * 验证token的结果
 */
export enum ENUM_REASON {
  /** 过期 */
  TOKEN_EXPIRED = "token expired",
  /** 即将过期 */
  WILL_EXPIRED = "will expired",
  /** 无效 */
  INVALID_TOKEN = "invalid token",
  /** 异常 */
  EXCEPTION = "exception",
}

/**
 * Generates a token for a given user ID.
 * @param userId
 * @returns
 */
export function generateToken(userId: string) {
  const timestamp = Date.now();
  const signature = crypto
    .createHash("sha256")
    .update(userId + timestamp + SECRET)
    .digest("hex");
  return `${userId}.${timestamp}.${signature}`;
}

/**
 * Verifies a token for a given user ID.
 * @param token
 * @returns
 */
export function verifyToken(token: string) {
  try {
    const [userId, timestamp, signature] = token.split(".");
    const now = Date.now();
    const time = new Date(timestamp).getTime();

    const isExpired = now - time > TOKEN_EXPIRATION;
    if (isExpired) {
      return {
        result: false,
        reason: ENUM_REASON.TOKEN_EXPIRED,
      };
    }

    const expectedSig = crypto
      .createHash("sha256")
      .update(userId + timestamp + SECRET)
      .digest("hex");

    const isWillExpired = now - time > TOKEN_EXPIRATION / 2;
    const result = signature === expectedSig;
    let reason = "";
    if (!result) {
      reason = ENUM_REASON.INVALID_TOKEN;
    } else if (isWillExpired) {
      reason = ENUM_REASON.WILL_EXPIRED;
    }

    return { result, reason };
  } catch (e) {
    console.error(e);
    return {
      result: false,
      reason: ENUM_REASON.EXCEPTION,
    };
  }
}
