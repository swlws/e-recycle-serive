import restify, { Request, Response, Next, RequestHandler } from "restify";
import http from "http";
import CustomError, { ENUM_CUSTOM_ERROR_CODE } from "./custom-error";
import createLogger from "./logger";
import Logger from "bunyan";
import { getMongo } from "./mongo";

const REQUEST_CONTEXT_KEY = "r_ctx";

// type ResponseBody =
//   | string
//   | number
//   | boolean
//   | { r0: number; r1?: string; res?: any };

type ResponseBody = any;

/**
 * 单个请求的上下文对象
 *
 */
export type ReqCtx = {
  error?: CustomError | unknown;
  logger: Logger;
  data: ResponseBody;
  getMongo: typeof getMongo;
};

/**
 * 请求对象的包装
 *
 */
export type ReqWrapper = Request & {
  getCtx: () => ReqCtx;
};

/**
 * http.IncomingMessage 添加getCtx方法，返回ReqCtx
 */
const prototype = http.IncomingMessage.prototype as any;
prototype.getCtx = function (): ReqCtx {
  return (<any>this).get(REQUEST_CONTEXT_KEY);
};

export type ServeRequestInterceptor = (
  req: ReqWrapper,
  res: Response,
  next: Next
) => any;

export interface ServeCfg {
  name: string;
  host: string;
  port: number;
  static?: string;
  api_version: string;
  apis: ApiCfg[];
  interceptors?: ServeRequestInterceptor[];
}

export type RequestHandlerWrapper = (
  req: ReqWrapper,
  res: Response,
  next: Next
) => any;

export interface ApiCfg {
  url: string;
  method: "get" | "post" | "del" | "put";
  handler: {
    version: string;
    cb: RequestHandlerWrapper;
  };
  auth?: boolean;
}

export default class NetServer {
  private option: ServeCfg;
  private server: restify.Server;
  private logger: Logger;

  constructor(option: ServeCfg) {
    this.option = option;
    process.title = option.name;

    this.logger = createLogger(option.name);
    process.logger = this.logger;

    this.server = restify.createServer({
      ...this.option,
    });
  }

  pre() {
    this.server.pre(restify.plugins.pre.dedupeSlashes());
    this.server.pre(restify.plugins.pre.sanitizePath());
    this.server.pre(restify.plugins.pre.context());

    this.server.pre(this.set_ctx.bind(this));
  }

  use() {
    this.server.use(restify.plugins.acceptParser(this.server.acceptable));
    this.server.use(
      restify.plugins.queryParser({
        mapParams: true,
        // arrayLimit: 0,
        // depth: 0,
        // parameterLimit: 8,
        // parseArrays: true,
      })
    );
    this.server.use(
      restify.plugins.bodyParser({
        mapParams: true,
      })
    );

    this.server.use((req, res, next) => {
      if (req.method === "GET" && typeof req.body === "string") {
        try {
          let parsedBody = {};
          try {
            parsedBody = JSON.parse(req.body);
          } catch (err) {}

          req.params = {
            ...req.query, // 合并查询字符串参数
            ...parsedBody, // 合并解析后的请求体参数
          };
        } catch (error) {
          return res.send(400, { message: "Invalid JSON in request body" });
        }
      } else if (req.method !== "GET") {
        req.params = {
          ...req.query,
          ...req.body,
        };
      }

      // 打印请求信息
      this.logger.info(
        `${req.method} ${req.url} -> ${JSON.stringify(req.params)}`
      );

      return next();
    });

    if (this.option.static) {
      // don't forget the `/*`
      this.server.get(
        "/s/*",
        restify.plugins.serveStaticFiles(this.option.static)
      );
    }

    // 自定义拦截器
    if (this.option.interceptors) {
      this.option.interceptors.forEach((interceptor) => {
        this.server.use(interceptor as RequestHandler);
      });
    }

    // 路由版本控制
    // http://restify.com/docs/plugins-api/#conditionalhandler
    const router_version = this.option.api_version;
    this.server.use(
      restify.plugins.conditionalHandler({
        version: router_version,
        handler: function (req, res, next) {
          next();
        },
      })
    );
  }

  /**
   * 设置上下文对象
   *
   * @param req
   * @param res
   * @param next
   */
  set_ctx(req: Request, res: Response, next: Next) {
    const ctx: ReqCtx = {
      logger: this.logger,
      data: { r0: ENUM_CUSTOM_ERROR_CODE.SUCCESS, r1: "", res: "" },
      getMongo,
    };

    (<any>req).set(REQUEST_CONTEXT_KEY, ctx);

    next();
  }

  add_interfaces() {
    let apis = this.option.apis;
    if (!Array.isArray(apis)) return;

    apis.forEach(({ url, method, handler: { version, cb } }) => {
      const handlers = restify.plugins.conditionalHandler([
        {
          version,
          handler: [cb as RequestHandler, this.end_request_chain.bind(this)],
        },
      ]);

      switch (method) {
        case "get":
          this.server.get(url, handlers);
          break;
        case "post":
          this.server.post(url, handlers);
          break;
        case "put":
          this.server.put(url, handlers);
          break;
        case "del":
          this.server.del(url, handlers);
          break;
        default:
          break;
      }
    });
  }

  end_request_chain(req: Request, res: Response, next: Next) {
    const ctx = (<ReqWrapper>req).getCtx();
    // delete ctx.logger;

    const { error, data } = ctx;
    if (error) {
      this.logger.error(error);
      let code = (error as CustomError).code;
      res.send({
        r0: code || ENUM_CUSTOM_ERROR_CODE.ERROR,
        r1: error instanceof Error ? error.message : error,
      });
    } else {
      if (data instanceof Buffer) {
        res.end(data);
      } else if (["string", "number", "boolean"].includes(typeof data)) {
        res.send({ r0: ENUM_CUSTOM_ERROR_CODE.SUCCESS, res: data });
      } else {
        res.send(data);
      }
    }

    this.logger.info("end_request_handler_chain");
    next();
  }

  set_error_handler() {
    const logger = this.logger;
    this.server.on("restifyError", function (req, res, err, callback) {
      logger.error(err);
      return callback();
    });

    this.server.on("uncaughtException", function (req, res, route, err) {
      logger.error(err);
      logger.error(route);
    });
  }

  listen() {
    const { host, port } = this.option;

    const logger = this.logger;
    this.server.listen(port, host, () => {
      const { name, url } = this.server;
      logger.info("Backend Serve【%s】listening at %s", name, url);
    });
  }

  build() {
    this.pre();
    this.use();
    this.set_error_handler();
    this.add_interfaces();
    this.listen();
  }
}
