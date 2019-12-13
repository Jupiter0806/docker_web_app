import * as Joi from '@hapi/joi';

import Model from './Model';

const schema = Joi.object({
  id: Joi.string().required(),
  password: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
});

export enum Role {
  SYSTEM_ADMIN,
  SERVICE_CLIENT,
  GENERAL_PUBLIC,
  VISITOR
}

export default class User extends Model {
  id: string;
  password: string;
  firstname: string;
  lastname: string;


  public static fromJson(json: any): User {
    return Model.fromJson(json, schema) as User;
  }
}

