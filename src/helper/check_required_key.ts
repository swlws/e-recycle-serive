import { PlainObject } from "../../typings/public";

/**
 * 检查 dao 参数的 key 是否合法
 *
 * @param paramsValue
 * @param keyList
 */
export function check_required_keys<T extends PlainObject>(
  paramsValue: T,
  requiredKeys: string[]
) {
  const primaryTypeList = ["number", "boolean"];

  for (const key of requiredKeys) {
    const value = paramsValue[key];

    const type = typeof value;
    if (primaryTypeList.includes(type)) {
      continue;
    }

    if (type === "string" && !value) {
      throw new Error(`Field [ ${key} ] Is Required`);
    }

    if (!value) {
      throw new Error(`Field [ ${key} ] Is Required`);
    }
  }
}
