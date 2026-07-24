# DEC-000019: Gate BasicSide Route URL Sync on Navigation Mode

**Status**: implemented  
**Created**: 2026-07-15  
**Jira**: [DESKTOP-1041](https://plantquest-team.atlassian.net/browse/DESKTOP-1041)  
**Tags**: #basicside #navigation #routing #sprinkler

---

## Context

`BasicSide.vue` watchers on `$store.state.trigger.search.a` and `.search.b` always wrote
`mode=route` to the URL whenever those values changed — including when **clearing**
`search.b` or when exiting navigation to asset search.

That forced the app back into route mode after `selectAssocAsset` had switched to
`mode=assetsearch`, contributing to stale routes and empty navigation panels.

---

## Decision

- **`search.a` watcher**: call `router.replace` with `mode=route` only when
  `$route.query.mode === 'route'` **and** `showSearch2` is true.
- **`search.b` watcher**: call `router.replace` with `mode=route` only when
  `showSearch2` is true.

When navigation is closed (`showSearch2 === false`), search field changes must not
re-impose route mode on the URL.

---

## Consequences

- `clearFilter` and pqs-frontend `selectAssocAsset` own URL mode transitions.
- Search combobox values can sync without overriding assetsearch query params.

---

## Related

- **pqs-frontend DEC-000023**: Associated asset popout navigation exit
- **MR-000029**: pathData watcher URL race

---

## Files Changed

| File | Change |
|------|--------|
| `src/components/BasicSide.vue` | Gate route `router.replace` on `showSearch2` |
