import { send_post } from "../../lib/http";

export enum TemplateId {
  ORDER_STATUS = "TEMPLATE_ID_1",
  DELIVERY_UPDATE = "TEMPLATE_ID_2",
  // TODO: 添加更多模板
}

export interface SendSubscribeMessageBody {
  // 用户的openid
  touser: string;
  // 订阅消息的模板id
  template_id: TemplateId;
  // 点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转。
  page?: string;
  // 模板内容，格式形如 { "key1": { "value": any }, "key2": { "value": any } }
  data: Record<string, { value: string }>;
  // 跳转小程序类型：developer为开发版；trial为体验版；formal为正式版；默认为正式版
  miniprogram_state?: "developer" | "trial" | "formal";
}

export function send_subscribe_message(
  access_token: string,
  params: SendSubscribeMessageBody
): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${access_token}`;
  return send_post(url, params);
}
