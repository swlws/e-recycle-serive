// YYYY-MM-DD HH:mm:ss 这个格式吧

/**
 * 获取当前时间
 * @returns
 */
export function getNowISOString() {
  return new Date().toISOString();
}

/**
 * 获取当天的年月时
 */
export function getNowYMD() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份是从0开始的，所以需要+1
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}

/**
 * 获取当前的年月
 * @returns
 */
export function getNowYM() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份是从0开始的，所以需要+1

  return `${year}/${month}`;
}

export function getNowYMDHMS() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份是从0开始的，所以需要+1
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}
