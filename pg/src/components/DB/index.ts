import Mongoose from "./Mongoose";
import { DB, DBOptions } from "./Interfaces";

export * from "./Interfaces";

export enum DBType {
  Mongoose = "mongoose"
}

let db: DB;

export function initialiseDB(dbType: DBType, options: DBOptions): DB {
  switch (dbType) {
    case DBType.Mongoose:
    default:
      db = new Mongoose(options);
      return db;
  }
}

export function getDB(): DB {
  return db;
}

export function parseDBType(name: string): DBType {
  if (DBType[name.toString()]) {
    return DBType[name.toString()];
  } else {
    // TODO
    // need to dispatch an error
    return null;
  }
}
