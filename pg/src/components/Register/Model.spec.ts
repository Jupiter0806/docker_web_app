import * as Joi from "@hapi/joi";
import { expect } from "chai";
import { describe, it } from "mocha";
import * as sinon from "sinon";

import Model from "./Model";

const schema = Joi.object({
  firstname: Joi.string().required(),
  id: Joi.string().required(),
  lastname: Joi.string().required(),
  password: Joi.string().required()
});

export default class User extends Model {
  public static fromJson(json: any): User {
    return Model.fromJson(json, schema) as User;
  }

  public firstname: string;
  public id: string;
  public lastname: string;
  public password: string;
}

describe("Model", () => {
  describe("parses from json", () => {
    it("with all data", () => {
      const user = {
        firstname: "firstname",
        id: "id",
        lastname: "lastname",
        password: "password"
      };
      sinon.assert.match(User.fromJson(user), user);
    });

    it("with missing data", () => {
      const user = {
        firstname: "firstname",
        id: "id",
        password: "password"
      };
      try {
        User.fromJson(user);
      } catch (e) {
        expect(e.message).includes(`"lastname" is required`);
      }
    });

    it("with extra data", () => {
      const user = {
        extra: "extra",
        firstname: "firstname",
        id: "id",
        lastname: "lastname",
        password: "password"
      };
      try {
        User.fromJson(user);
      } catch (e) {
        expect(e.message).includes(`"extra" is not allowed`);
      }
    });
  });
});
