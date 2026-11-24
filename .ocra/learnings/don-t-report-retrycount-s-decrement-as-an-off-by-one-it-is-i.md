---
title: Don't report retryCount's decrement as an off-by-one; it is intended
paths:
  - app.ts
symbols:
  - retryCount
keywords:
  - retry budget
  - first attempt
  - retry count
source:
  kind: review-feedback
  ref: dea3e19571537101
created: 2026-11-24
---

`retryCount` returns `requested - 1` on purpose. Its callers pass values from `RETRY_LIMITS`, which are all at least 1, and the caller already counts the first attempt. The result is the number of retries after that first attempt, so the subtraction is correct and cannot go negative for these inputs.

Do not flag the decrement as an off-by-one, and do not flag the missing `Math.max(0, ...)` clamp, unless a change adds a caller that can pass 0 or a negative value, or a caller that does not count the first attempt itself. If a diff adds such a path, check that the input is still at least 1 before accepting the subtraction.
