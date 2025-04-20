import fs from "fs";
import COS, { StorageClass } from "cos-nodejs-sdk-v5";
// 腾讯云 COS 配置
import config from "../config/cos.json";

/**
 * COS 文件上传
 */
class FileCenter {
  _cosIns!: COS;

  constructor() {
    this.initCosIns();
  }

  initCosIns() {
    if (this._cosIns) return;

    this._cosIns = new COS({
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
    });
  }

  /**
   * 文件上传
   * @param storeFilePath COS 上的存储路径
   * @param willUploadFilePath 待上传的本地文件路径
   * @returns
   */
  upload(
    storeFilePath: string,
    willUploadFilePath: string
  ): Promise<{ Location: string }> {
    return new Promise((resolve) => {
      this._cosIns.putObject(
        {
          Bucket: config.Bucket,
          Region: config.Region,
          StorageClass: config.StorageClass as StorageClass,
          Key: storeFilePath,
          Body: fs.createReadStream(willUploadFilePath),
          ContentLength: fs.statSync(willUploadFilePath).size,
        },
        function (error, data) {
          if (error) {
            process.logger.error(error);

            return resolve({ Location: "" });
          }
          resolve(data);
        }
      );
    });
  }

  /**
   * 文件上传，使用 Buffer
   * @param storeFilePath COS 上的存储路径
   * @param willUploadBuffer 待上传的 Buffer
   * @returns
   */
  uploadByBuffer(
    storeFilePath: string,
    willUploadBuffer: Buffer
  ): Promise<{ Location: string }> {
    return new Promise((resolve) => {
      this._cosIns.putObject(
        {
          Bucket: config.Bucket,
          Region: config.Region,
          StorageClass: config.StorageClass as StorageClass,
          Key: storeFilePath,
          Body: willUploadBuffer,
          ContentLength: willUploadBuffer.length,
        },
        function (error, data) {
          if (error) {
            process.logger.error(error);
            return resolve({ Location: "" });
          }
          resolve(data);
        }
      );
    });
  }

  /**
   * 删除文件
   * @param storeFilePath COS 上的存储路径
   * @returns
   */
  rm(storeFilePath: string) {
    return new Promise((resolve, reject) => {
      this._cosIns.deleteObject(
        {
          Bucket: config.Bucket,
          Region: config.Region,
          Key: storeFilePath,
        },
        function (error, data) {
          if (error) {
            process.logger.error(error);
            return resolve(error);
          }
          resolve(data);
        }
      );
    });
  }
}

export default new FileCenter();

// 上报成功
// {
//   statusCode: 200,
//   headers: {
//     'content-length': '0',
//     connection: 'keep-alive',
//     date: 'Fri, 23 Aug 2024 00:57:43 GMT',
//     etag: '"bdbe7c73d136e3a5e3ae3330a129ec8d"',
//     server: 'tencent-cos',
//     vary: 'Origin, Access-Control-Request-Headers, Access-Control-Request-Method',
//     'x-cos-hash-crc64ecma': '18149058986216848453',
//     'x-cos-request-id': 'NjZjN2RlODdfYTAzNTQwMGJfMWM2YjFfMTYxYWJlYg==',
//     'x-cos-storage-class': 'STANDARD'
//   },
//   Location: 'swlws-1302729739.cos.ap-guangzhou.myqcloud.com/2024-08/file.png',
//   ETag: '"bdbe7c73d136e3a5e3ae3330a129ec8d"',
//   RequestId: 'NjZjN2RlODdfYTAzNTQwMGJfMWM2YjFfMTYxYWJlYg=='
// }
// https://swlws-1302729739.cos.ap-guangzhou.myqcloud.com/2024-08/file.png

// 删除成功
// {
//   statusCode: 200,
//   headers: {
//     'content-length': '0',
//     connection: 'keep-alive',
//     date: 'Fri, 23 Aug 2024 00:57:43 GMT',
//     etag: '"bdbe7c73d136e3a5e3ae3330a129ec8d"',
//     server: 'tencent-cos',
//     vary: 'Origin, Access-Control-Request-Headers, Access-Control-Request-Method',
//     'x-cos-hash-crc64ecma': '18149058986216848453',
//     'x-cos-request-id': 'NjZjN2RlODdfYTAzNTQwMGJfMWM2YjFfMTYxYWJlYg==',
//     'x-cos-storage-class': 'STANDARD'
//   },
//   Location: 'swlws-1302729739.cos.ap-guangzhou.myqcloud.com/2024-08/file.png',
//   ETag: '"bdbe7c73d136e3a5e3ae3330a129ec8d"',
//   RequestId: 'NjZjN2RlODdfYTAzNTQwMGJfMWM2YjFfMTYxYWJlYg=='
// }
