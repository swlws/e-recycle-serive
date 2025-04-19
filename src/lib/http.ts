import superagent from "superagent";
import { PlainObject } from "../../typings/public";

/**
 * 发送 GET 请求
 * @param url
 * @returns
 */
export function send_get(url: string) {
  return superagent.get(url).then((res) => {
    try {
      return JSON.parse(res.text);
    } catch {
      return res.text;
    }
  });
}

/**
 * 发送 post 请求
 *
 * @param url
 * @param data
 * @returns
 */
export function send_post(url: string, data: string | PlainObject) {
  return superagent
    .post(url)
    .send(data)
    .set("Content-Type", "application/json")
    .then((res) => {
      return res.body;
    });
}
