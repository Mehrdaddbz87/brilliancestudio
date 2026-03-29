/** @jest-environment node */

import handler from "@/pages/api/health";

function createMockRes() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

describe("/api/health", () => {
  it('returns { status: "ok" }', () => {
    const res = createMockRes();

    handler({}, res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});
