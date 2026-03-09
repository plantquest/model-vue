# DEC-MODEL-VUE-003 Draft - Tag-Based Release Flow

## Context
This repository uses `develop` as the main development branch and `prod` as the production-ready branch. We need a stable CI/CD release flow that maps environment names to tags without renaming or moving the long-lived branches.

## Options
1) Keep releases tied directly to branch names
2) Use environment tags that are force-refreshed from the stable branches
3) Rename `prod` to `production`

## Outcome
Use annotated environment tags. `dev` is refreshed from `refs/heads/develop`, and `production` is refreshed from `refs/heads/prod`. This keeps `develop` unchanged and avoids branch/tag ambiguity around the production branch.

## Risks
Medium risk. Force-refreshing tags can surprise consumers if tag movement is not expected, so the workflow and scripts must use explicit refs and clearly document the tag meaning.

## Next steps
- Keep tag refresh commands scoped to `refs/heads/develop` and `refs/heads/prod`
- Validate `dev` and `production` tags in CI on tag pushes
- Document the production branch choice in release notes or operator guidance
