import assert from "node:assert/strict";
import { test } from "node:test";
import { clampBody } from "./clamp.ts";
import { MAX_BODY_BYTES } from "./limits.ts";

test("a body under the limit is read whole", () => {
  assert.equal(clampBody(512), 512);
});

test("a body over the limit is cut to it", () => {
  assert.equal(clampBody(MAX_BODY_BYTES + 1), MAX_BODY_BYTES);
});

test("a negative size reads nothing", () => {
  assert.equal(clampBody(-5), 0);
});
