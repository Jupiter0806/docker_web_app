import * as Joi from "@hapi/joi";

export default class Model {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static fromJson(json: any, schema: Joi.ObjectSchema): Model {
    Joi.assert(json, schema);
    return Object.assign(new Model(), json);
  }
}
