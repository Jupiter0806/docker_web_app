import * as sinon from "sinon";
import { describe, it } from "mocha";

import { wrapResponse } from "./Response";

describe("wrapResponse", () => {
  it("wraps response into standard response", () => {
    const res = {};
    sinon.assert.match(wrapResponse(res, "user"), {
      status: { code: 0, message: "" },
      user: res
    });
  });
});
