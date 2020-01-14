import * as mongoose from "mongoose";

import * as Interfaces from "../../Interfaces";
import * as Schemas from "../Schemas";
import { AppError, ErrorCode } from "../../../AppError";

const _loggerText = "DB.Users";

export interface User extends mongoose.Document, Interfaces.User {
  id: string;
}

const User = mongoose.model<User>("User", Schemas.User);

export class Users implements Interfaces.Users {
  initialNewSession: (id: string) => Promise<Interfaces.User>;

  find: (options: Interfaces.UserFindOptions) => Promise<Interfaces.User[]>;
  update: (
    id: string,
    updates: Interfaces.UserUpdates
  ) => Promise<Interfaces.User>;

  async set(user: Interfaces.User): Promise<Interfaces.User> {
    const newUser = new User(user);
    await newUser.save();
    return user;
  }

  async isExist(id: string): Promise<boolean> {
    return (await User.find({ id })).length > 0;
  }

  async get(id: string): Promise<Interfaces.User> {
    const result = await User.findOne({ id });
    if (result) {
      return result.toObject();
    }

    throw new AppError("No user record for " + id, {
      isOperational: true,
      code: ErrorCode.NO_USER_RECORD,
      logger: _loggerText
    });
  }
}
