# ocra-gh-check

Scratch repository for an end-to-end check of ocra's GitHub setup that people with push access cannot change (Open-CR-Agent#289): `pull_request_target`, secrets in an environment only `main` may use, a GitHub App as ocra's account, and code owner review for `.github/workflows/` and `.ocra/`.

## Retries

`shouldRetry(attempt)` allows up to `MAX_ATTEMPTS` (5) attempts and then gives up, waiting `retryAfterMs(header, attempt)` between them.
