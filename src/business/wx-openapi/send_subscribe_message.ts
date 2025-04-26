import { ENUM_WX_ENV } from "../../constant/public";
import { send_post } from "../../lib/http";

export enum TemplateId {
  /** 当师傅接单 */
  WHEN_USER_TAKE_TASK = "zx06aI1Gj2s4UESFqwMgcXUK7Ck5wPN_OyDE8xokM0s",
  /** 当师傅取消订单 */
  WHEN_USER_UNTAKE_TASK = "RgYL3cHvNJXFjDCWR_joPDx-7k7QnYuejQ7HR2khHNc",
  /** 当发布者删除任务 */
  WHEN_DELETE_TASK = "TV8NHyuOumNGad-rX-LqzvvUfzsr491aXKKjgvUlrww",
}

/** 消息体 - 接单 */
export type WhenUserTakeTaskBody = {
  // 订单编号
  character_string1: {
    value: string;
  };
  // 师傅姓名
  name3: {
    value: string;
  };
  // 师傅电话
  phone_number6: {
    value: string;
  };
  // 温馨提示
  thing11: {
    value: string;
  };
};

/** 消息体 - 取消师傅任务 */
export type WhenUserUntakeTaskBody = {
  // 订单编号
  character_string1: {
    value: string;
  };
  // 师傅姓名
  thing4: {
    value: string;
  };
  // 温馨提示
  thing5: {
    value: string;
  };
};

/** 消息体 - 发布者删除任务 */
export type WhenDeleteTaskBody = {
  // 工单编号
  character_string33: {
    value: string;
  };
  // 原服务时间
  date7: {
    value: string;
  };
  // 取消时间
  date8: {
    value: string;
  };
  // 取消理由
  thing6: {
    value: string;
  };
};

export interface SendSubscribeMessageBody {
  // 用户的openid
  touser: string;
  // 订阅消息的模板id
  template_id: TemplateId;
  // 点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转。
  page?: string;
  // 模板内容，格式形如 { "key1": { "value": any }, "key2": { "value": any } }
  data: WhenUserTakeTaskBody | WhenUserUntakeTaskBody | WhenDeleteTaskBody;
  // 跳转小程序类型：developer为开发版；trial为体验版；formal为正式版；默认为正式版
  miniprogram_state?: "developer" | "trial" | "formal";
}

function envMap(env: ENUM_WX_ENV) {
  switch (env) {
    case ENUM_WX_ENV.RELEASE:
      return "formal";
    case ENUM_WX_ENV.DEVELOP:
      return "developer";
    case ENUM_WX_ENV.TRIAL:
      return "trial";
  }
}

/**
 * 发送订阅消息
 * @param access_token
 * @param params
 * @returns
 */
export function send_subscribe_message(
  env: ENUM_WX_ENV,
  access_token: string,
  params: SendSubscribeMessageBody
) {
  const url = `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${access_token}`;

  params.miniprogram_state = envMap(env);

  return send_post(url, params).then((res) => {
    console.log("send_subscribe_message", res);
    return res;
  });
}
