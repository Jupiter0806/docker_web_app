import * as mongoose from "mongoose";
import { getLogger } from "ta-common";

import { DB, Users, DBOptions } from "../Interfaces";
import * as Collections from "./Collections";

const logger = getLogger("mongoose");

export interface Options extends DBOptions {
  others: string;
}

export default class implements DB {
  users: Users;

  private _conn: mongoose.Connection;

  constructor(options: DBOptions) {
    mongoose.connect(options.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // stop warning - DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
      useCreateIndex: true
    });

    this._conn = mongoose.connection;

    // TODO
    // need use global error handler
    this._conn.on("error", logger.error);
    this._conn.once("open", () => {
      this.users = new Collections.Users();
    });
  }

  finalise(): void {
    this._conn && this._conn.close();
  }
}
