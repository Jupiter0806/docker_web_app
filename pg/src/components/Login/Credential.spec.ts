import { expect } from "chai";
import { describe, it } from "mocha";
import * as sinon from "sinon";

import Credential from "./Credential";

describe("Login: Credential", () => {
  describe("has property", () => {
    it("userId", () => {
      const credential = Credential.fromJson({
        userId: "userId",
        password: "password"
      });

      expect(credential).property("userId");
    });

    it("password", () => {
      const credential = Credential.fromJson({
        userId: "userId",
        password: "password"
      });

      expect(credential).property("password");
    });
  });

  it("gets instance from json", () => {
    const credentialJson = Credential.fromJson({
      userId: "userId",
      password: "password"
    });

    const credential = Credential.fromJson(credentialJson);

    sinon.assert.match(credential, credentialJson);
  });
});
