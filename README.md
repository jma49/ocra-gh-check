# ocra-gh-check

Scratch repository for testing [Ocra](https://ocracloud.com)'s GitHub App review setup end to end. The [GitHub setup guide](https://ocracloud.com/docs/github#a-review-your-own-developers-cannot-change) is the reference for new installations; this repository keeps the test fixture, not the latest workflow template.

## How this repository runs reviews

1. The [workflow](.github/workflows/ocra.yml) listens for `pull_request_target`. Opening, updating, or reopening a PR starts a review for an owner, member, or collaborator. Adding the `ocra-review` label starts a review regardless of the author's association.
2. The job uses the `ocra-review` environment, restricted to `main`. It exchanges the App's client ID (`OCRA_APP_CLIENT_ID`, a variable) and private key (`OCRA_APP_KEY`, a secret) for an installation token and checks out the default branch, not the PR head. The pull request is reviewed as data; its code is not executed.
3. The pinned [Open-CR-Agent Action](https://github.com/ocrahq/Open-CR-Agent/commit/324c6abae8a145e71392511f3a731db3c6e29fbb) runs with that token. The [fixture configuration](.ocra/config.json) uses the direct runtime and one OpenRouter model for all tiers (`OPENROUTER_API_KEY`), with a one-dollar review budget set in the workflow. Ocra posts as `ocra-review-check[bot]` and trusts earlier review summaries only from that account.

[CODEOWNERS](.github/CODEOWNERS) assigns owners to workflow and Ocra configuration changes. For a setup that contributors with push access cannot change on their own, the default branch must also require code-owner approval; the file alone does not enforce it.

## What was verified

[Open-CR-Agent #289](https://github.com/ocrahq/Open-CR-Agent/issues/289) records the original test on [PR #1](https://github.com/ocrahq/ocra-gh-check/pull/1). GitHub denied a job on a branch not allowed to use the protected environment, and Ocra ignored a summary from the wrong account. In the [successful run](https://github.com/ocrahq/ocra-gh-check/actions/runs/37172985700), the App posted a summary and an inline finding; resolving the thread as the PR author did not dismiss that finding on re-review.

That is historical evidence, not a live health check. A [more recent run](https://github.com/ocrahq/ocra-gh-check/actions/runs/45302876441) stopped before review because the GitHub API did not find an installation of the configured App for this repository.
