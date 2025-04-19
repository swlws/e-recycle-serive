export interface FormFile extends File {
  // 文件临时存储路径
  path: string;
}

export interface UploadFileDao {
  // 文件上传
  file: FormFile;
}
