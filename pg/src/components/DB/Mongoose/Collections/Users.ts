import * as mongoose from "mongoose";

import * as Interfaces from "../../Interfaces";

const schema = new mongoose.Schema({
  firstname: String
});

export interface User extends mongoose.Document {
  firstname: string;
}

const User = mongoose.model<User>("User", schema);

export class Users implements Interfaces.Users {
  async set(user: Interfaces.User): Promise<Interfaces.User> {
    const newUser = new User({
      firstname: user.firstname
    });
    await newUser.save();

    return user;
  }

  initialNewSession: (id: string) => Interfaces.User;
  isExist: (id: string) => boolean;
  get: (id: string) => Interfaces.User;
  find: (options: Interfaces.UserFindOptions) => Interfaces.User[];
  update: (id: string, updates: Interfaces.UserUpdates) => Interfaces.User;
}
