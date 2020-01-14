import * as mongoose from "mongoose";

import * as Interfaces from "../../Interfaces";
import * as Schemas from "../Schemas";

export interface User extends mongoose.Document, Interfaces.User {
  id: string;
}

const User = mongoose.model<User>("User", Schemas.User);

export class Users implements Interfaces.Users {
  initialNewSession: (id: string) => Promise<Interfaces.User>;
  isExist: (id: string) => Promise<boolean>;
  get: (id: string) => Promise<Interfaces.User>;
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
}
