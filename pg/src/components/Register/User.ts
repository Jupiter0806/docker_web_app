import * as Joi from "@hapi/joi";

import Model from "../shared/Model";

import { AuthProvider, Role } from "../DB";

const schema = Joi.object({
  firstname: Joi.string().required(),
  userId: Joi.string().required(),
  lastname: Joi.string().required(),
  password: Joi.string().required(),
  provider: Joi.number()
    .valid(...Object.values(AuthProvider))
    .required(),
  role: Joi.number()
    .valid(...Object.values(Role))
    .required(),
  mobileNumber: Joi.string(),
  address: Joi.string(),
  avatarUri: Joi.string()
});

export default class User extends Model {
  public static fromJson(json: object): User {
    return Model.fromJson(json, schema) as User;
  }

  public readonly firstname: string;
  public readonly userId: string;
  public readonly lastname: string;
  public readonly password: string;
  public readonly provider: AuthProvider;
  public readonly role: Role;
  public readonly mobileNumber?: string;
  public readonly address?: string;
  public readonly avatarUri?: string;
}
