import * as Joi from "@hapi/joi";

import Model from "../shared/Model";

const schema = Joi.object({
  userId: Joi.string().required(),
  password: Joi.string().required()
});

export default class Credential extends Model {
  public static fromJson(json: object): Credential {
    return Model.fromJson(json, schema) as Credential;
  }

  public readonly userId: string;
  public readonly password: string;
}
