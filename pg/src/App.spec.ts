import * as chai from "chai";
import "chai-http";
import { describe, it, before, after } from "mocha";
import * as sinon from "sinon";

import app from "./App";

import * as Register from "./components/Register";
import * as Login from "./components/Login";

// eslint-disable-next-line @typescript-eslint/no-var-requires
chai.use(require("chai-http"));

app.listen();

const _sandbox = sinon.createSandbox();

describe("App", () => {
  after(() => _sandbox.restore());

  describe("/register", () => {
    let _registerStub = null;

    before(() => {
      _registerStub = _sandbox.stub(Register, "register").resolves();
    });

    it("response post", () =>
      chai
        .request(app)
        .post("/register")
        .then(res => chai.expect(res.status).eq(200)));

    it("calls register", () => {
      const body = {};
      chai
        .request(app)
        .post("/register")
        .send(body)
        .then(() => chai.expect(_registerStub.calledWith(body)).true);
    });
  });

  describe("/login", () => {
    let _loginStub = null;

    before(() => {
      _loginStub = _sandbox.stub(Login, "login").resolves();
    });

    it("response post", () =>
      chai
        .request(app)
        .post("/login")
        .then(res => chai.expect(res.status).eq(200)));

    it("calls login", () => {
      const body = {};
      chai
        .request(app)
        .post("/login")
        .send(body)
        .then(() => chai.expect(_loginStub.calledWith(body)).true);
    });
  });
});
