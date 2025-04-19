import { ENUM_HEADERS } from "./../../constant/headers";
import { PlainObject } from "../../../typings/public";
import { UploadFileDao } from "../../dao/file";
import { ReqCtx } from "../../lib/net-server";
import file_center from "../../tools/file_center";
import { getNowYM } from "../../tools/time";
import { logger } from "process";

/**
 * upsert task
 *
 * @param ctx
 * @param info
 */
export async function upload_file(
  ctx: ReqCtx,
  params: UploadFileDao,
  headers: PlainObject
) {
  const { file } = params;
  if (!file) {
    throw new Error("file is required");
  }

  const { size, path, name, type } = file;
  logger.info(size, path, name, type);

  // 10 MB
  const limitSize = 10 * 1024 * 1024;
  if (size > limitSize) {
    throw new Error("file size can't be larger than 10MB");
  }

  // 图片
  if (!type.startsWith("image/")) {
    throw new Error("file type is not support");
  }

  const uid = headers[ENUM_HEADERS.UID];

  // 易回收
  const project_name = "yhs";

  const nowYM = getNowYM();
  const storePath = `${project_name}/${nowYM}/${uid}/${name}`;

  const info = await file_center.upload(storePath, path);
  return `https://${info.Location}`;
}
