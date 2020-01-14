import * as Joi from "@hapi/joi";

export default class Model {
  public static fromJson(json: any, schema: Joi.ObjectSchema): Model {
    Joi.assert(json, schema);
    return Object.assign(new Model(), json);
  }
}
