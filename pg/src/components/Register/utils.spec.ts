import { expect } from "chai";
import * as sinon from "sinon";
import { describe, it } from "mocha";

import * as utils from "./utils";
import { Role, AuthProvider } from "../DB";

describe("Register: utils", () => {
  describe("getPermissions", () => {
    it("gets permissions for SystemAdmin", () => {
      sinon.assert.match(utils.getPermissions(Role.SystemAdmin), {
        editingSiteInfo: true,
        reporting: {
          access: true,
          downloading: true,
          uploading: true
        },
        inputOutputRecording: true,
        uploadingPhotos: true,
        comments: true
      });
    });

    it("gets permissions for ServiceClient", () => {
      sinon.assert.match(utils.getPermissions(Role.ServiceClient), {
        editingSiteInfo: false,
        reporting: {
          access: true,
          downloading: false,
          uploading: true
        },
        inputOutputRecording: true,
        uploadingPhotos: false,
        comments: true
      });
    });

    it("gets permissions for GeneralPublic", () => {
      sinon.assert.match(utils.getPermissions(Role.GeneralPublic), {
        editingSiteInfo: false,
        reporting: {
          access: false,
          downloading: false,
          uploading: false
        },
        inputOutputRecording: true,
        uploadingPhotos: false,
        comments: true
      });
    });

    it("gets permissions for Visitor", () => {
      sinon.assert.match(utils.getPermissions(Role.Visitor), {
        editingSiteInfo: false,
        reporting: {
          access: false,
          downloading: false,
          uploading: false
        },
        inputOutputRecording: false,
        uploadingPhotos: false,
        comments: false
      });
    });

    it("get permissions for Visitor as default", () => {
      sinon.assert.match(utils.getPermissions(null), {
        editingSiteInfo: false,
        reporting: {
          access: false,
          downloading: false,
          uploading: false
        },
        inputOutputRecording: false,
        uploadingPhotos: false,
        comments: false
      });
    });
  });

  describe("validateUserId", () => {
    it("validates email", () => {
      expect(utils.validateUserId("123@gmail.com", AuthProvider.Email)).true;
      expect(utils.validateUserId("123@gmail", AuthProvider.Email)).false;
    });
  });

  describe("wrapResponse", () => {
    it("wraps response into standard response", () => {
      const res = {};
      sinon.assert.match(utils.wrapResponse(res, "user"), {
        status: { code: 0, message: "" },
        user: res
      });
    });
  });
});
