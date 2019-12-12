import { expect } from "chai";
import { describe, it } from 'mocha';

import { clone } from "./clone";

describe("clone", () => {
  it("should shallow clone the object", () => {
    const origin = { a: { b: "c" } };
    const copied = clone(origin);

    expect(copied).not.eq(origin);
    expect(copied.a).eq(origin.a);
  });

  it("should shallow clone the array", () => {
    const origin = [{ b: "c" }];
    const copied = clone(origin);

    expect(copied).not.eq(origin);
    expect(copied[0]).eq(origin[0]);
  });

  it("should deep clone the object", () => {
    const origin = { a: { b: "c" } };
    const copied = clone(origin, true);

    expect(copied).not.eq(origin);
    expect(copied.a).not.eq(origin.a);
  });

  it("should deep clone the array", () => {
    const origin = [{ b: "c" }];
    const copied = clone(origin, true);

    expect(copied.slice).not.undefined;
    expect(copied).not.eq(origin);
    expect(copied[0]).not.eq(origin[0]);
  });

  it("should return null or undefined if null or undefined send", () => {
    expect(clone()).be.undefined;
    expect(clone(null)).be.null;

    expect(clone(undefined, true)).be.undefined;
    expect(clone(null, true)).be.null;
  });

  it("should be able to handle function as object attribute value", () => {
    var origin = { a: function() {} };
    var copied = clone(origin);
    expect(copied).not.eq(origin);
    expect(copied.a).eq(origin.a);

    copied = clone(origin, true);
    expect(copied).not.eq(origin);
    expect(copied.a).a("function");
    expect(copied.a).not.eq(origin.a);

    origin = { a: () => {} };
    copied = clone(origin);
    expect(copied).not.eq(origin);
    expect(copied.a).eq(origin.a);

    copied = clone(origin, true);
    expect(copied).not.eq(origin);
    expect(copied.a).a("function");
    expect(copied.a).not.eq(origin.a);
  });
});
