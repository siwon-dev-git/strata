---
name: research
description: Evidence-based research with falsification loops. Use when investigating domains, technologies, or architectural decisions.
---

# Research

$ARGUMENTS Time-boxed research. Evidence-based analysis + falsification loops.

## Scope

goal · in_scope · out_scope · done (3 bullets) · min_loops (default 3)

## Three-file Workflow

Maintain 3 files in `output/research/<domain>/` directory:

1. **working-raw.md** — Unverified hypotheses, initial ideas. Write before starting research
2. **proved-archive.md** — Falsified items. Preserve reasoning + evidence
3. **proved-curated.md** — Verified conclusions. Final claims

State transitions: idea → working-raw → falsified: proved-archive / verified: proved-curated

**Immediate recording rule**: No batching. Record each finding immediately to the appropriate file. Delayed batch recording = FAIL.

## Routine (strict order)

A. **Ideation** — Candidate hypotheses + analysis structure + uncertainty log → working-raw
B. **Evidence** — Source collection + claim-evidence mapping (C#-E#). On tool failure, record gap + fallback
C. **Validation** — Attempt to falsify own claims. Failure → proved-archive. Support → proved-curated
D. **Final** — 3-bucket summary: confirmed / uncertain / follow-up

## Falsification Loop (repeat until min_loops)

1. Identify weaknesses/gaps in current conclusions
2. Collect additional verification or new evidence
3. Attempt to falsify current conclusions
4. Immediately update working/proved files
5. Re-assess confidence → plan next loop

Each loop requires a **material update** (new evidence, falsification result, structural revision). 0 updates = FAIL.

## C#-E# Mapping

Every key claim (C#) must link to evidence (E#). Each E#: source_url/file_path · fetched_at · key quote (1-3 lines)

Tags: [FACT] · [INFERENCE] · [HYPOTHESIS]. Numerical superiority claims require measurement basis.
Falsification obligation: at least 1 counter-hypothesis + falsification test per claim.

## Source Hierarchy

L1 (law/regulation/standards/primary data) · L2 (research institutions/academic/official tech docs) · L3 (news/blogs/community)

Core conclusions require L1 anchor. L3-only conclusions = invalid.

## Heritage Integration

After research completion:

1. Extract heritage patterns from proved-curated → register in adr.md/fmea.md
2. Burn: proved-curated → deletion candidate after heritage condensation complete (user confirmation)
3. working-raw + proved-archive → eligible for immediate deletion

## FAIL Gate

If any of the following are unmet → INCOMPLETE:

- Scope declaration · 3-file creation · min_loops met · C#-E# mapping · L1 anchor · falsification loop · immediate recording compliance

## Output

```
═══ Research Complete ═══
Domain: [domain]
Loops: N
Confirmed: [core conclusions]
Uncertain: [unresolved]
Follow-up: [next tasks]
Heritage: [registered pattern count]
Status: COMPLETE | INCOMPLETE
═══════════════════════
```
