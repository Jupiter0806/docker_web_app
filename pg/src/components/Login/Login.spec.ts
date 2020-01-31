import * as sinon from "sinon";
import { expect } from "chai";
import { describe, it, before, after } from "mocha";

import * as db from "../DB";
import * as Encrypt from "../shared/Encrypt";
import Credential from "./Credential";
import { ErrorCode } from "../AppError";

import { login } from "./index";

const _sandbox = sinon.createSandbox();

const _users = {
  isExist: sinon.fake.resolves({}),
  set: sinon.fake.resolves({}),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: (userId: string): Promise<any> => Promise.resolve(userId),
  initialNewSession: sinon.fake.resolves({}),
  find: sinon.fake.resolves({}),
  update: sinon.fake.resolves({})
};

describe("Login", () => {
  before(() => {
    _sandbox.stub(db, "getDB").returns({
      users: _users,
      finalise: sinon.fake.resolves({})
    });
  });

  after(() => {
    _sandbox.restore();
  });

  it("validates body", async () => {
    expect(await login({}))
      .property("status")
      .property("code", ErrorCode.WRONG_PAYLOAD_STRUCTURE);
  });

  it("calls Credential.fromJson", async () => {
    const credentialFromJsonSpy = _sandbox.spy(Credential, "fromJson");
    const credential = {
      userId: "userId",
      password: "password"
    };

    await login(credential);

    sinon.assert.calledWith(credentialFromJsonSpy, credential);

    credentialFromJsonSpy.restore();
  });

  it("gets user from db with userId", async () => {
    const getUserSpy = _sandbox.spy(_users, "get");

    await login({
      userId: "userId",
      password: "password"
    });

    expect(getUserSpy.calledWith("userId")).true;

    getUserSpy.restore();
  });

  it("compares password", async () => {
    const getUserStub = _sandbox
      .stub(_users, "get")
      .resolves({ password: "password" });
    const compareStub = _sandbox.stub(Encrypt, "compare").returns(false);

    const res = await login({
      userId: "userId",
      password: "password"
    });

    expect(res)
      .property("status")
      .property("code", ErrorCode.USER_ID_PASSWORD_NOT_MATCH);

    getUserStub.restore();
    compareStub.restore();
  });

  it("returns user info", async () => {
    const user = {
      id: "id",
      firstname: "firstname",
      lastname: "lastname",
      fullname: "fullname",
      role: "role",
      permissions: "permissions"
    };
    const getUserStub = _sandbox.stub(_users, "get").resolves(user);
    const compareStub = _sandbox.stub(Encrypt, "compare").returns(true);

    const userInfo = await login({
      userId: "userId",
      password: "password"
    });

    sinon.assert.match(userInfo, {
      status: { code: 0, message: "" },
      user
    });

    getUserStub.restore();
    compareStub.restore();
  });
});
