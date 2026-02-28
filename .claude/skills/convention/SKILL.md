---
name: convention
description: Strata Convention. Tier-based component file structure. Use when organizing, auditing, or scaffolding Strata components.
---

# Convention — Strata File Convention

$ARGUMENTS Apply file convention to target component(s). Analyze → Tier classification → File creation/refactoring.

## Argument Parsing

- `audit` → Full component Tier status report (no changes)
- `{ComponentName}` → Apply convention to single component
- `all` → Apply convention to all components (includes Tier 0 .md batch generation)
- `tier {N}` → Apply convention only to components at or above the given Tier
- `md` → Generate .md files only for all components (safest entry point)

## Tier Classification Criteria

| Tier            | Criteria                                             | File Structure                                               |
| --------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| **0 Leaf**      | ≤100 lines, no variants, no sub-components           | `.tsx` `.test.tsx` `.stories.tsx` `.md`                      |
| **1 Styled**    | 2+ variant maps OR >100 lines                        | + `.variant.ts`                                              |
| **2 Composite** | 3+ sub-components OR >150 lines                      | + `.type.ts` + `index.ts`                                    |
| **3 Domain**    | validation/policy logic, 3+ useState, business rules | + `.hook.ts` `.policy.ts` `.const.ts` `index.ts` (as needed) |

Auto-classification logic:

1. Measure file line count
2. Count `as const` object maps → 2+ = Tier 1+
3. Count `export function` declarations → 3+ = Tier 2+
4. Count `useState`/`useEffect`/`useCallback` → 3+ = Tier 3 candidate
5. Check for validation/policy patterns → Tier 3

## File Role Definitions

### .md (Tier 0+, required)

AI collaboration contract for the component. Present at every Tier.
**Template reference**: `templates/component.md.tpl`

Additional sections by Tier:

- Tier 1+: `## Variants` — Variant list and purposes
- Tier 2+: `## Composition` — Sub-component relationships
- Tier 3: `## Policy` — Validation/error policy summary

### .variant.ts (Tier 1+)

Style variant maps + derived type extraction.
**Template reference**: `templates/variant.ts.tpl`

Extraction rule: Move `as const` objects + derived `type` declarations from `.tsx`. The `.tsx` imports and uses them.

### .type.ts (Tier 2+)

Shared Props interfaces, Context types.

Separation triggers:

- 3+ Props interfaces
- Types imported by other components
- Context type definitions present

### .hook.ts (Tier 3, as needed)

Component-specific React hooks. 3+ `useState`/`useEffect` or reusable hooks.

### .policy.ts (Tier 3, as needed)

Declarative business rules: validation rules, state→feedback mappings, a11y policies.

### .const.ts (Tier 3, as needed)

Magic numbers, defaults, error messages. Separate when 5+ accumulate.

### index.ts — Public API Barrel (Tier 2+, required)

Re-exports the component's public interface. Required for Tier 2+ (composite/domain) components.

Barrel rules:

- **Tier 0–1**: No barrel. Import directly from `.tsx` (single export = no API boundary needed)
- **Tier 2+**: Barrel required. Consolidates multi-export composite into one import path
- Category-level barrels (`primitives/index.ts`, `disclosure/index.ts`, etc.) always exist
- Barrel must only re-export — no logic, no transformations
- Named exports only (no `export default` in barrels)

```ts
// index.ts — Tier 2+ barrel example
export {
  DialogRoot,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from './Dialog';
export type { DialogProps, DialogContentProps } from './Dialog.type';
```

## File Naming Alignment (FSD Segment Mapping)

File suffixes map to FSD segments for consistent mental model:

| File Suffix    | FSD Segment | Role                        |
| -------------- | ----------- | --------------------------- |
| `.tsx`         | ui          | Visual rendering + assembly |
| `.type.ts`     | model       | Shared interfaces + context |
| `.variant.ts`  | config      | Style variant declarations  |
| `.hook.ts`     | model       | Stateful logic extraction   |
| `.policy.ts`   | lib         | Business rules + validation |
| `.const.ts`    | config      | Constants + defaults        |
| `.test.tsx`    | —           | Unit + behavioral tests     |
| `.stories.tsx` | —           | Visual documentation        |
| `.md`          | —           | AI collaboration contract   |
| `index.ts`     | api         | Public API boundary         |

This mapping does NOT change file names — it clarifies each file's architectural role within the component slice.

## Dependency Direction (unidirectional, enforced)

```
.type.ts ← .variant.ts ← .hook.ts ← .tsx
                              ↑
                        .policy.ts
                        .const.ts
```

`.tsx` is the final assembly point. Reverse imports are forbidden.

## Execution Procedure

### Single Component (`/convention Button`)

1. **ANALYZE**: Read Button.tsx → measure line count, map count, export count, hook count
2. **CLASSIFY**: Determine Tier + compare with current file structure
3. **PLAN**: Output list of files to create/extract. Wait for user confirmation
4. **EXTRACT**: Extract `.variant.ts`, `.type.ts`, etc. (move code from existing `.tsx`)
5. **GENERATE**: Create `.md` (template-based + component analysis)
6. **VERIFY**: Confirm import paths are correct + `pnpm typecheck` passes

### Full Audit (`/convention audit`)

1. Scan all components → auto-classify Tiers
2. Compare current file structure vs convention
3. Output gap report (no changes)

```
═══ Convention Audit ═══
Component       Tier  Current    Required   Gap
────────────────────────────────────────────────
Button          T1    tsx/test/stories  +variant +md   2 files
Select          T2    tsx/test/stories  +type +md      2 files
Divider         T0    tsx/test/stories  +md            1 file
...
────────────────────────────────────────────────
Total: N gaps across M components
═══════════════════
```

### Full Apply (`/convention all`)

1. Run audit → generate gap list
2. Batch-generate Tier 0 .md files (safest)
3. Extract Tier 1 .variant.ts (after user confirmation)
4. Extract Tier 2 .type.ts (after user confirmation)
5. Final `pnpm typecheck` + `pnpm test:ci`

### Batch .md Generation (`/convention md`)

1. Scan all components
2. Auto-generate .md for each component by analyzing `.tsx` (using template)
3. Skip if .md already exists
4. No code changes — safest first step

## Tier Promotion Rules

```
Trigger                              Action
─────────────────────────────────────────────
Variant map added                    T0→T1: create .variant.ts
Props interfaces reach 3             T1→T2: create .type.ts + index.ts
Sub-components reach 3               T1→T2: create .type.ts + index.ts
3+ useState/custom hooks             →T3: create .hook.ts
Validation/policy logic appears      →T3: create .policy.ts
5+ magic numbers/defaults accumulate →T3: create .const.ts
```

Promotion only, no demotion. Once a file is separated, it stays.

## Invariant Rules

1. **No empty files** — File exists = role exists
2. **.md required** — Regardless of Tier, all components
3. **Single file under 100 lines** — Tier 0 keeps everything in .tsx. No excessive splitting
4. **No reverse imports** — Only type ← variant ← hook ← tsx direction allowed
5. **typecheck must pass** — Roll back if `pnpm typecheck` fails after extraction
6. **Barrel = Tier 2+** — index.ts required for Tier 2+ (composite), forbidden for Tier 0–1 (leaf/styled) unless category-level

## Output Format

```
═══ Convention {Audit|Apply|Complete} ═══
Target: {ComponentName | all | md}
Components: N scanned, M modified
Tier Distribution: T0:{n} T1:{n} T2:{n} T3:{n}
Files: +{created} ~{modified} -{removed}
Typecheck: PASS | FAIL
Status: COMPLETE | INCOMPLETE
═══════════════════════════════════
```

## FAIL Gate

- typecheck failure → INCOMPLETE (rollback)
- Empty file created → REJECT
- Reverse import detected → REJECT
- .md missing → INCOMPLETE
