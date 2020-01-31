import { expect } from "chai";
import { describe, it } from "mocha";
import * as sinon from "sinon";

import User from "./User";
import { AuthProvider, Role } from "../DB";

describe("Register: User", () => {
  describe("has property", () => {
    it("firstname", () => {
      // Act
      const user = User.fromJson({
        firstname: "firstname",
        userId: "userId",
        lastname: "lastname",
        password: "password",
        provider: AuthProvider.Email,
        role: Role.GeneralPublic
      });

      // Assert
      expect(user).property("firstname");
    });
    it("userId", () => {
      // Act
      const user = User.fromJson({
        firstname: "firstname",
        userId: "userId",
        lastname: "lastname",
        password: "password",
        provider: AuthProvider.Email,
        role: Role.GeneralPublic
      });

      // Assert
      expect(user).property("userId");
    });
    it("lastname", () => {
      // Act
      const user = User.fromJson({
        firstname: "firstname",
        userId: "userId",
        lastname: "lastname",
        password: "password",
        provider: AuthProvider.Email,
        role: Role.GeneralPublic
      });

      // Assert
      expect(user).property("lastname");
    });
    it("password", () => {
      // Act
      const user = User.fromJson({
        firstname: "firstname",
        userId: "userId",
        lastname: "lastname",
        password: "password",
        provider: AuthProvider.Email,
        role: Role.GeneralPublic
      });

      // Assert
      expect(user).property("password");
    });
  });

  describe("get instance from json", () => {
    it("with all data", () => {
      // Arrange
      const userJson = {
        firstname: "firstname",
        userId: "userId",
        lastname: "lastname",
        password: "password",
        provider: AuthProvider.Email,
        role: Role.GeneralPublic
      };

      // Act
      const user = User.fromJson(userJson);

      // Assert
      sinon.assert.match(user, userJson);
    });
  });
});
