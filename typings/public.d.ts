// 纯对象
export type PlainObject = Record<string, any>;

// 空对象
export type EmptyObject = Record<string, never>;

/**
 * 分页参数
 */
export interface Pagination {
  page_size: number; // 每页显示多少条
  page_num: number; // 页码。从 1 开始
  sort_field: string; // 排序字段
  sort_type: "desc" | "asc"; // 排序类型 desc 降序 asc 升序
}

/**
 * 表格查询参数
 */
export interface TableQueryParams<T extends Record<string, any>>
  extends Pagination,
    T {}

/**
 * 表格结果
 */
export interface TableResult<T> {
  total: number; // 总条数
  list: T[]; // 列表数据
}

/**
 * 日志类型
 */
export type LogType = "custom" | "system";

/**
 * 日志参数
 */
export interface LogPayload {
  type: LogType;
  [key: string]: any;
}
