# Archived Failure Patterns (Hardened)

> Patterns that have been fixed and hardened into infrastructure. Kept for historical reference.
> Graduated from `fmea.md` on 2026-03-01.

- **ci-blind-merge**: 6-gate chain (G0–G5) with sequential enforcement. Hardened: PR #14–#17
- **maintain-sense-decide-gap**: Hard/soft 2-tier separation. No threshold escape
- **script-name-phantom**: Verify script names against package.json when writing SKILL
- **protection-check-name-drift**: CI job name must match branch protection. Hardened: PR #20
- **template-dollar-expansion**: Avoid awk `$N` in SKILLs — use letter-named bash variables. Hardened: sprint/commit SKILL.md
- **lockfile-specifier-drift**: G1 gate runs `pnpm install --frozen-lockfile` pre-flight. Hardened: PR #23
- **skill-frontmatter-invalid**: Only supported keys: argument-hint, compatibility, description, disable-model-invocation, license, metadata, name, user-invokable
- **commit-delay-after-build**: Immediate commit mandatory (enforced by sprint ❼)
- **ghost-dependency**: Verify at least 1 import on install
- **mcp-addon-breaking**: Pin @storybook/addon-mcp version. llms.md = stable fallback
- **poc-quality-ceiling**: Merged into analysis-quality-bias
- **poc-feelgood-pass**: Merged into analysis-quality-bias
- **shallow-extraction**: Merged into analysis-quality-bias
- **ci-comment-gate-blind**: Merged into ci-gate-bypass
- **type-regression**: Merged into type-drift
- **type-impl-drift**: Merged into type-drift
- **config-without-seed**: Merged into creation-pair-missing
- **artifact-gitignore-gap**: Merged into creation-pair-missing
- **npx-pnpm-passthrough**: Merged into package-manager-gotchas
- **npm-remnants**: Merged into package-manager-gotchas
