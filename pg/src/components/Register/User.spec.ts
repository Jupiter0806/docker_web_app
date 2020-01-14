// import { expect } from "chai";
import { describe, it } from "mocha";
import * as sinon from "sinon";

import User from "./User";

describe("Register: User", () => {
  describe("has property", () => {
    // User properties are readonly
    // need another way test those
    // it("firstname", () => {
    //   // Act
    //   const user = new User();
    //   user.firstname = "firstname";
    //   // Assert
    //   expect(user).property("firstname");
    // });
    // it("userId", () => {
    //   // Act
    //   const user = new User();
    //   user.userId = "userId";
    //   // Assert
    //   expect(user).property("userId");
    // });
    // it("lastname", () => {
    //   // Act
    //   const user = new User();
    //   user.lastname = "lastname";
    //   // Assert
    //   expect(user).property("lastname");
    // });
    // it("password", () => {
    //   // Act
    //   const user = new User();
    //   user.password = "password";
    //   // Assert
    //   expect(user).property("password");
    // });
  });

  describe("get instance from json", () => {
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
  });
});
