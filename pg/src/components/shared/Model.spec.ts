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
  public static fromJson(json: object): User {
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
      // Arrange
      const userJson = {
        firstname: "firstname",
        id: "id",
        lastname: "lastname",
        password: "password"
      };

      // Act
      const user = User.fromJson(userJson);

      // Assert
      sinon.assert.match(user, userJson);
    });

    it("with missing data", () => {
      // Arrange
      const userJson = {
        firstname: "firstname",
        id: "id",
        password: "password"
      };

      try {
        // Act
        User.fromJson(userJson);
      } catch (e) {
        // Assert
        expect(e.message).includes(`"lastname" is required`);
      }
    });

    it("with extra data", () => {
      // Arrange
      const user = {
        extra: "extra",
        firstname: "firstname",
        id: "id",
        lastname: "lastname",
        password: "password"
      };

      try {
        // Act
        User.fromJson(user);
      } catch (e) {
        // Assert
        expect(e.message).includes(`"extra" is not allowed`);
      }
    });
  });
});
