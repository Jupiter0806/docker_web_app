import * as Joi from "@hapi/joi";

import Model from "./Model";

const schema = Joi.object({
  firstname: Joi.string().required(),
  userId: Joi.string().required(),
  lastname: Joi.string().required(),
  password: Joi.string().required()
});

//   SYSTEM_ADMIN,
//   SERVICE_CLIENT,
//   GENERAL_PUBLIC,
//   VISITOR
export enum Role {}

export default class User extends Model {
  public static fromJson(json: object): User {
    return Model.fromJson(json, schema) as User;
  }

  public firstname: string;
  public userId: string;
  public lastname: string;
  public password: string;
}
