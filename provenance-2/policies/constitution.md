# ProvenanceCode Enforcement Constitution

This document defines the three enforcement presets and the answer to:
"When does the bot block me, and when does it leave me alone?"

## Presets

### Light (Startup / MVP / Speed First)
Philosophy: move fast with advisory governance.

Behavior:
- Specs optional (recommended). Decisions optional.
- Blocking: never by default. Missing items produce warnings only.
- Bot role: advisor.

Triggers:
- Specs auto-drafted when PR label = feature (future automation).
- Decisions required (warn only) when label = security or breaking-change.
- Spec status allowed: draft, review, approved.

### Standard (Scale-Up / Serious Product Teams) [Default]
Philosophy: specs drive work, decisions guard risk.

Behavior:
- Specs required for meaningful changes.
- Decisions required for risky changes.
- Blocking: selective (missing required items blocks).
- Bot role: gatekeeper.

Triggers:
- Specs required when labels include feature, enhancement, breaking-change
  OR paths touch src/api/, src/core/, frontend/state/.
- Spec status must be review or approved.
- Decisions required when labels include security, breaking-change, risk-high
  OR paths touch auth/, payments/, infra/.
- Decision status:
  - Medium risk: draft or accepted allowed.
  - High risk: accepted required.
- Drift detection: warn when spec scope does not match the diff.
- Invalid spec/decision links: block.

### Regulated (Enterprise / Safety-Critical)
Philosophy: nothing ships without provenance.

Behavior:
- Specs mandatory for any non-doc PR.
- Decisions mandatory for any spec and for infra/security/model behavior.
- Blocking: always (missing required items blocks).
- Bot role: authority.
- AI attribution required in PR body (include "AI Attribution").

Triggers:
- Spec status must be approved.
- Decisions must be accepted (review.human or reviewed_by required).
- Acceptance criteria required in specs.
- Spec and decision coherence enforced.
- Drift detection: block when spec scope does not match the diff.
