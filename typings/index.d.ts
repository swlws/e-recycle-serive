import { bunyan } from "restify";

global {
  namespace NodeJS {
    interface Process extends EventEmitter {
      logger: bunyan;
    }
  }
}

declare module "*.json";
