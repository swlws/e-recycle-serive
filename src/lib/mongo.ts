// https://www.mongodb.com/zh-cn/docs/drivers/node/current/

// const { MongoClient } = require("mongodb");
import {
  AuthMechanism,
  BulkWriteOptions,
  DeleteOptions,
  FindOneAndDeleteOptions,
  FindOneAndUpdateOptions,
  FindOptions,
  InsertOneOptions,
  MongoClient,
  MongoClientOptions,
  UpdateFilter,
  UpdateOptions,
} from "mongodb";
import { getMongodbConfig } from "../config";

interface MongoDbConfig {
  host: string;
  port: number;
  journal?: boolean;
  poolSize?: number;
  loggerLevel?: string;
  authMechanism?: AuthMechanism;
  forceServerObjectId?: boolean;
  database: string;
  maxTimeMS: number;
  auth?: {
    username: string;
    password: string;
  };
}

interface ConnectOptions {
  j?: boolean;
  poolSize?: number;
  loggerLevel?: string;
  forceServerObjectId?: boolean;
  authMechanism?: string;
  auth?: {
    username: string;
    password: string;
  };
}

// see https://mongodb.github.io/node-mongodb-native/3.5/api/MongoClient.html
class MongoAccess {
  maxTimeMS!: number;
  dbName!: string;
  client!: MongoClient;

  /**
   * @param {String} conf.host 数据库主机地址
   * @param {String} conf.port 数据库端口号
   * @param {String} conf.journal journal策略
   * @param {String} conf.poolSize 连接池子大小
   * @param {String} conf.loggerLevel 日志级别
   * @param {String} conf.authMechanism 用户认证机制
   * @param {String} conf.forceServerObjectId  指定由服务端产生_id
   * @param {String} conf.database  操作的数据库名
   * @param {String} conf.maxTimeMS 数据库操作最大超时时间
   * @param {Object} conf.auth 认证配置
   * @param {String} conf.auth.user 认证用户
   * @param {String} conf.auth.password 认证密码
   */
  constructor(conf: MongoDbConfig) {
    let connString = `mongodb://${conf.host}:${conf.port}/${conf.database}`;
    let connectOptions: MongoClientOptions = {
      // j: conf.journal,
      // poolSize: conf.poolSize,
      // loggerLevel: conf.loggerLevel,
      forceServerObjectId: conf.forceServerObjectId,
    };

    if (conf.auth) {
      connectOptions.authMechanism = conf.authMechanism;
      connectOptions.auth = conf.auth;
    }

    this.maxTimeMS = conf.maxTimeMS;
    this.dbName = conf.database;
    this.client = new MongoClient(connString, connectOptions);
  }

  /**
   * 连接数据库，返回连接的mongo实例
   * @returns {Promise-resolve-MongoClient}
   */
  connect() {
    // const client = this.client;

    // if (client.isConnected()) {
    //   return Promise.resolve(client);
    // } else {
    //   return this.client.connect();
    // }

    return this.client.connect();
  }

  disconnect() {
    return this.client?.close();
  }

  /**
   * 切换数据库
   *
   * @param {String} dbName  数据库名
   * @param {Object} options 针对数据库级别操作的配置
   * @returns {Object-db}
   */
  async selectDatabase(dbName: string, options?: any) {
    this.dbName = dbName;

    // const client = this.client;

    // if (!client.isConnected()) {
    //   await this.connect();
    // }

    return this.client.db(dbName, options);
  }

  /**
   * 获取数据库连接实例
   *
   * @returns {Promise-Object-db} 返回数据库实例
   */
  async getDatabase() {
    const client = await this.connect();

    return client.db(this.dbName); // Child db instances are cached
  }

  /**
   * 使用maxTimeMS选项设置操作最大超时值
   * http://mongodb.github.io/node-mongodb-native/3.0/reference/faq/
   *
   * 支持maxTimeMS选项的操作：
   *      aggregate
   *      count
   *      distinct
   *      dropIndex
   *      dropIndexes
   *      find
   *      findOne
   *      findOneAndDelete
   *      findOneAndReplace
   *      findOneAndUpdate
   */

  /**
   * 根据query查询集合collection,返回对应集合里面的所有查询到的记录
   *
   * @param {String} collectName 集合的名字
   * @param {Object} query 查询条件
   * @param {Object} options 查询选项
   *
   * @param {Object} projection         字段过滤
   * @param {Array|Object} sort         排序
   * @param {Number} skip               跳过文档数目
   * @returns {Promise-resolve-Array}   由多个记录文档组成的Array
   */
  async find(collectName: string, query: any, options: FindOptions = {}) {
    const db = await this.getDatabase();
    const collect = db.collection(collectName);

    options.maxTimeMS = this.maxTimeMS;
    let cursor = collect.find(query, options);

    return await cursor.toArray();
  }

  /**
   * 根据query查询集合collection,返回对应集合里面的所有查询到的记录
   *
   * @param {String} collectName 集合的名字
   * @param {Object} query 查询条件
   * @param {Object} options 查询选项
   *
   * @param {Object} projection         字段过滤
   * @param {Array|Object} sort         排序
   * @param {Number} skip               跳过文档数目
   * @returns {Promise-resolve-Array}   由多个记录文档组成的Array
   */
  async findCursor(collectName: string, query: any, options: FindOptions = {}) {
    const db = await this.getDatabase();
    const collect = db.collection(collectName);

    options.maxTimeMS = this.maxTimeMS;
    return collect.find(query, options);
  }

  /**
   * 根据query查询集合collection,返回对应集合里面的所有查询到的记录
   *
   * @param {String} collectName 集合的名字
   * @param {Object} query 查询条件
   * @param {Object} options 查询选项
   *
   * @param {Object} projection         字段过滤
   * @param {Array|Object} sort         排序
   * @param {Number} skip               跳过文档数目
   * @returns {Promise-resolve-Array}   由多个记录文档组成的Array
   */
  async findOne(collectName: string, query: any, options: FindOptions = {}) {
    const db = await this.getDatabase();
    const collect = db.collection(collectName);

    options.maxTimeMS = this.maxTimeMS;
    return await collect.findOne(query, options);
  }

  /**
   * 将data指定的单个记录插入collection指定的集合中
   *
   * @param {String} collectName         集合的名字
   * @param {Object} doc                 具体插入的数据
   * @returns {Promise-resolve-Object}   具体插入的数据
   */
  async insertOne(
    collectName: string,
    doc: any,
    options: InsertOneOptions = {}
  ) {
    const db = await this.getDatabase();
    const collect = db.collection(collectName);

    options.maxTimeMS = this.maxTimeMS;
    options.forceServerObjectId = false;

    const r = await collect.insertOne(doc, options);
    const successFlag = r.acknowledged;

    if (successFlag) {
      return r.insertedId;
    } else {
      const insertOneErr = new Error(`insertOne successFlag: [${successFlag}]`);
      insertOneErr.name = "insertOneErr";

      return Promise.reject(insertOneErr.stack);
    }
  }

  /**
   * 将docs指定的多个记录插入collection指定的集合中
   *
   * @param {String} collectName        集合的名字
   * @param {Array}  docs               具体插入的数据
   * @param {Object} options            选项
   * @returns {Promise-resolve-Array}   具体插入的数据
   */
  async insertMany(
    collectName: string,
    docs: any[],
    options: BulkWriteOptions = {}
  ) {
    // insertMany 基于bulk操作，如果array为空数组，底层的驱动会抛出错误“MongoError: Invalid Operation, no operations specified”
    if (docs.length === 0) return docs;

    const db = await this.getDatabase();
    const collect = db.collection(collectName);

    options.maxTimeMS = this.maxTimeMS;

    const r = await collect.insertMany(docs, options);
    const successFlag = r.acknowledged;

    if (successFlag) {
      return r.insertedIds;
    } else {
      const insertManyErr = new Error(
        `insertManyErr successFlag: [${successFlag}]`
      );
      insertManyErr.name = "insertManyErr";

      return Promise.reject(insertManyErr.stack);
    }
  }

  /**
   *
   * @param {String} collectName         集合的名字
   * @param {Object} filter              匹配条件
   * @param {Object} update              具体更新的数据
   * @param {Object} options             选项
   * @returns {Promise-resolve-Object}   更新后的数据
   */
  async upsertOne(
    collectName: string,
    filter: any,
    update: any,
    options: FindOneAndUpdateOptions = {}
  ) {
    const db = await this.getDatabase();
    const collect = db.collection(collectName);

    const updateObj = {
      $set: update,
    };

    options.maxTimeMS = this.maxTimeMS;
    options.upsert = true;
    options.includeResultMetadata = false;

    // 插入时，若是文档存在，则返回值为文档；否则为null
    await collect.findOneAndUpdate(filter, updateObj, options);
  }

  /**
   *
   * @param {String} collectName         集合的名字
   * @param {Object} filter              匹配条件
   * @param {Object} update              具体更新的数据
   * @param {Object} options             选项
   * @returns {Promise-resolve-Object}   更新后的数据
   */
  async upsertMany(
    collectName: string,
    filter: any,
    update: UpdateFilter<any>,
    options: UpdateOptions
  ) {
    const db = await this.getDatabase();
    const collect = db.collection(collectName);

    Object.assign(options, { upsert: true });

    let updateObj = {
      $set: update,
    };

    options.maxTimeMS = this.maxTimeMS;
    // options.upsert = true;
    // options.returnOriginal = false;

    let r = await collect.updateMany(filter, updateObj, options);
    let successFlag = r.acknowledged;

    if (successFlag) {
      return r.upsertedId;
    } else {
      let upsertManyErr = new Error(
        `upsertManyErr successFlag: [${successFlag}]`
      );
      upsertManyErr.name = "upsertManyErr";

      return Promise.reject(upsertManyErr.stack);
    }
  }

  /**
   *
   * @param {String} collectName         集合的名字
   * @param {Object} filter              匹配条件
   * @param {Object} update              具体更新的数据
   * @param {Object} options             选项
   * @returns {Promise-resolve-Object}   更新后的数据
   */
  async updateMany(
    collectName: string,
    filter: any,
    update: UpdateFilter<any>,
    options: UpdateOptions
  ) {
    const db = await this.getDatabase();
    const collect = db.collection(collectName);

    Object.assign(options, { upsert: false });

    let updateObj = {
      $set: update,
    };

    options.maxTimeMS = this.maxTimeMS;
    // options.upsert = true;
    // options.returnOriginal = false;

    let r = await collect.updateMany(filter, updateObj, options);
    let successFlag = r.acknowledged;

    if (successFlag) {
      return r;
    } else {
      let upsertManyErr = new Error(
        `upsertManyErr successFlag: [${successFlag}]`
      );
      upsertManyErr.name = "upsertManyErr";

      return Promise.reject(upsertManyErr.stack);
    }
  }

  /**
   *
   * @param {String} collectName         集合的名字
   * @param {Object} filter              匹配条件
   * @param {Object} update              具体更新的数据
   * @param {Object} options             选项
   * @returns {Promise-resolve-Object}   更新后的数据
   *
   * http://127.0.0.1:8080/mongo/reference/method/db.collection.findOneAndUpdate.html
   */
  async findOneAndUpdate(
    collectName: string,
    filter: any,
    update: any,
    options: FindOneAndUpdateOptions = {}
  ) {
    const db = await this.getDatabase();
    const collect = db.collection(collectName);

    options.maxTimeMS = this.maxTimeMS;

    const r = await collect.findOneAndUpdate(filter, update, options);
    const successFlag = !!r;

    if (successFlag) {
      return r;
    } else {
      const findOneAndUpdateErr = new Error(
        `findOneAndUpdateErr successFlag: [${successFlag}]`
      );
      findOneAndUpdateErr.name = "findOneAndUpdateErr";

      return Promise.reject(findOneAndUpdateErr.stack);
    }
  }

  /**
   *
   * @param {String} collectName         集合的名字
   * @param {Object} filter              匹配条件
   * @param {Object} update              具体更新的数据
   * @param {Object} options             选项
   * @returns {Promise-resolve-Object}   更新后的数据
   *
   * http://127.0.0.1:8080/mongo/reference/method/db.collection.findOneAndUpdate.html
   */
  async findOneAndDelete(
    collectName: string,
    filter: any,
    options: FindOneAndDeleteOptions = {}
  ) {
    const db = await this.getDatabase();
    const collect = db.collection(collectName);

    options.maxTimeMS = this.maxTimeMS;

    const r = await collect.findOneAndDelete(filter, options);

    if (r) {
      return true;
    } else {
      const findOneAndDeleteErr = new Error(`findOneAndDeleteErr`);
      findOneAndDeleteErr.name = "findOneAndDeleteErr";

      return Promise.reject(findOneAndDeleteErr.stack);
    }
  }

  /**
   *
   * @param {String} collectName         集合的名字
   * @param {Object} filter              匹配条件
   * @param {Object} options             选项
   * @returns {Promise-resolve-Object}   更新后的数据
   *
   * http://127.0.0.1:8080/mongo-manual-v4.2/reference/method/db.collection.deleteOne.html
   */
  async deleteOne(
    collectName: string,
    filter: any,
    options: DeleteOptions = {}
  ) {
    const db = await this.getDatabase();
    const collect = db.collection(collectName);

    options.maxTimeMS = this.maxTimeMS;

    let r = await collect.deleteOne(filter, options);
    let successFlag = r.deletedCount === 1;

    if (successFlag) {
      return r.deletedCount;
    } else {
      let deleteOneErr = new Error(
        `deleteOneErr successFlag: [${successFlag}]`
      );
      deleteOneErr.name = "deleteOneErr";

      return Promise.reject(deleteOneErr.stack);
    }
  }

  /**
   *
   * @param {String} collectName         集合的名字
   * @param {Object} filter              匹配条件
   * @param {Object} options             选项
   * @returns {Promise-resolve-Object}   更新后的数据
   *
   * http://127.0.0.1:8080/mongo-manual-v4.2/reference/method/db.collection.deleteMany.html
   */
  async deleteMany(
    collectName: string,
    filter: any,
    options: DeleteOptions = {}
  ) {
    const db = await this.getDatabase();
    const collect = db.collection(collectName);

    options.maxTimeMS = this.maxTimeMS;

    let r = await collect.deleteMany(filter, options);
    let successFlag = r.acknowledged;

    if (successFlag) {
      return r.deletedCount;
    } else {
      let deleteManyErr = new Error(
        `deleteManyErr successFlag: [${successFlag}]`
      );
      deleteManyErr.name = "deleteManyErr";

      return Promise.reject(deleteManyErr.stack);
    }
  }

  async drop(collectName: string) {
    try {
      const db = await this.getDatabase();
      const collect = db.collection(collectName);
      if (collect == null) {
        return Promise.reject(collectName + "not existed");
      }
      let successFlag = await collect.drop();
      if (successFlag) {
        return successFlag;
      } else {
        let dropErr = new Error(`dropErr successFlag: [${successFlag}]`);
        dropErr.name = "dropErr";
        return Promise.reject(dropErr.stack);
      }
    } catch (error: any) {
      if (error.code == 26) return Promise.reject(collectName + " not existed");
      else return Promise.reject(error);
    }
  }

  /**
   * 聚合操作的封装
   *
   * @param {*} collectName 集合名
   * @param {*} pipelines      聚合操作，必须为Array
   */
  async aggregate(collectName: string, pipelines: any[], options: any = {}) {
    const db = await this.getDatabase();
    const collect = db.collection(collectName);

    options.maxTimeMS = this.maxTimeMS;
    return await collect.aggregate(pipelines, options);
  }

  /**
   * watch操作的封装
   *
   * @param {*} pipelines      聚合操作，必须为Array
   */
  async watch(pipelines: any[], options: any = {}) {
    const db = await this.getDatabase();

    options.maxAwaitTimeMS = this.maxTimeMS;
    return await db.watch(pipelines, options);
  }
}

let mongo: MongoAccess;

export async function getMongo() {
  if (mongo) {
    return mongo;
  } else {
    const { host, port, database, username, password } = getMongodbConfig();
    const mongoConf: MongoDbConfig = {
      // loggerLevel: "warn", // mongodb日志级别
      // host: "192.168.5.110",
      host,
      port,
      database,
      maxTimeMS: 30000, //(30 * 1000) 超时30秒 (使用错误日志中的时间戳来确定是哪个操作)
      authMechanism: "SCRAM-SHA-256", //用户认证机制
      forceServerObjectId: true, // 指定_id由服务端产生
      auth: {
        username,
        password,
      },
    };

    mongo = new MongoAccess(mongoConf);
    await mongo.selectDatabase(mongoConf.database);

    return mongo;
  }
}
