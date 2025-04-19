import crypto from "crypto";

interface WxDecryptedData {
  openId: string;
  nickName: string;
  gender: number;
  language: string;
  city: string;
  province: string;
  country: string;
  avatarUrl: string;
  watermark: {
    timestamp: number;
    appid: string;
  };
  phoneNumber: string;
  countryCode: string; // 区号 86
  [key: string]: any;
}

/**
 * 解密微信加密数据
 * @param encryptedData 加密数据
 * @param iv 加密算法的初始向量
 * @param sessionKey 会话密钥
 * @returns 解密后的数据对象
 */
export function decrypt_data(
  encryptedData: string,
  iv: string,
  sessionKey: string
): WxDecryptedData {
  try {
    // 创建解密器
    const decipher = crypto.createDecipheriv(
      "aes-128-cbc",
      Buffer.from(sessionKey, "base64"),
      Buffer.from(iv, "base64")
    );

    // 设置自动填充
    decipher.setAutoPadding(true);

    // 解密数据
    let decoded = decipher.update(encryptedData, "base64", "utf8");
    decoded += decipher.final("utf8");

    // 解析JSON数据
    const data = JSON.parse(decoded) as WxDecryptedData;

    // 验证数据完整性
    if (!data.watermark || !data.watermark.appid) {
      throw new Error("Invalid decrypted data: missing watermark");
    }

    return data;
  } catch (error) {
    throw new Error(`微信数据解密失败: ${(error as Error).message}`);
  }
}
