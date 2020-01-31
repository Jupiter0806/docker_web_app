import * as sinon from "sinon";
import { expect } from "chai";
import { describe, it, before, after } from "mocha";

import * as db from "../DB";
import User from "./User";
import { ErrorCode } from "../AppError";
import * as Encrypt from "../shared/Encrypt";
import * as Login from "../Login";

import { register } from "./index";

const _sandbox = sinon.createSandbox();

const _users = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isExist: (userId: string): Promise<boolean> => Promise.resolve(false),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set: (user: any): Promise<any> => Promise.resolve(user),
  get: sinon.fake.resolves({}),
  initialNewSession: sinon.fake.resolves({}),
  find: sinon.fake.resolves({}),
  update: sinon.fake.resolves({})
};

describe("Register", () => {
  before(() => {
    _sandbox.stub(db, "getDB").returns({
      users: _users,
      finalise: sinon.fake.resolves({})
    });
  });

  after(() => {
    _sandbox.restore();
  });

  it("calls User.fromJson to validate and create user", async () => {
    const userFromJsonSpy = _sandbox.spy(User, "fromJson");
    const user = {
      firstname: "firstname",
      userId: "123@gmail.com",
      lastname: "lastname",
      password: "raw_password",
      provider: db.AuthProvider.Email,
      role: db.Role.GeneralPublic
    };

    await register(user);

    sinon.assert.calledWith(userFromJsonSpy, user);

    userFromJsonSpy.restore();
  });

  it("checks if user is already exist", async () => {
    const isExistStub = _sandbox.stub(_users, "isExist");
    isExistStub.withArgs("123@gmail.com").resolves(true);

    const res = await register({
      firstname: "firstname",
      userId: "123@gmail.com",
      lastname: "lastname",
      password: "password",
      provider: db.AuthProvider.Email,
      role: db.Role.GeneralPublic
    });

    expect(res)
      .property("status")
      .property("code", ErrorCode.USER_EXIST);

    isExistStub.restore();
  });

  it("encrypts password", async () => {
    const encryptSpy = _sandbox.spy(Encrypt, "encrypt");

    await register({
      firstname: "firstname",
      userId: "123@gmail.com",
      lastname: "lastname",
      password: "raw_password",
      provider: db.AuthProvider.Email,
      role: db.Role.GeneralPublic
    });

    expect(encryptSpy.calledWith("raw_password")).true;

    encryptSpy.restore();
  });

  it("sets user into db after encrypting password", async () => {
    const encryptSpy = _sandbox.spy(Encrypt, "encrypt");
    const setUserSpy = _sandbox.spy(_users, "set");

    await register({
      firstname: "firstname",
      userId: "123@gmail.com",
      lastname: "lastname",
      password: "raw_password",
      provider: db.AuthProvider.Email,
      role: db.Role.GeneralPublic
    });

    expect(setUserSpy.calledAfter(encryptSpy)).true;

    encryptSpy.restore();
    setUserSpy.restore();
  });

  it("calls login", async () => {
    const loginSpy = _sandbox.spy(Login, "login");

    await register({
      firstname: "firstname",
      userId: "123@gmail.com",
      lastname: "lastname",
      password: "password",
      provider: db.AuthProvider.Email,
      role: db.Role.GeneralPublic
    });

    expect(loginSpy.calledOnce).true;

    loginSpy.restore();
  });

  describe("validates user.id", () => {
    it("validates email", async () => {
      const res = await register({
        firstname: "firstname",
        userId: "userId",
        lastname: "lastname",
        password: "password",
        provider: db.AuthProvider.Email,
        role: db.Role.GeneralPublic
      });

      expect(res)
        .property("status")
        .property("code", ErrorCode.INCORRECT_USER_ID);
    });
  });
});
