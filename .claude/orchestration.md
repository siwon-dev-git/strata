# Delegation Strategy

Uses Task built-in agents. Skills: `.claude/skills/` (YAML frontmatter based).

## Skill Map

| Skill         | Mode     | Input                                       | Output                                              | Verification                    |
| ------------- | -------- | ------------------------------------------- | --------------------------------------------------- | ------------------------------- |
| `/sprint`     | BUILD    | quest + N cycles                            | sprint→review→commit→retro→forge cycle              | Commit hash + heritage update   |
| `/sprint`     | MAINTAIN | N cycles (default 1)                        | HRM dual loop: sense→decide→execute→learn→recurse   | Hard PASS + Soft ✅ convergence |
| `/research`   | —        | domain + quest                              | 3-file workflow: ideation→evidence→validation→final | C#-E# mapping + L1 anchor       |
| `/convention` | AUDIT    | `audit`                                     | Full Tier status report (no changes)                | Gap report                      |
| `/convention` | APPLY    | component name \| `all` \| `md` \| `tier N` | analyze→classify→extract→generate→verify            | typecheck PASS + 0 empty files  |

## Rules

- Parallel mandatory: 2+ independent tasks → concurrent execution
- Sequential enforced: when output→input dependency exists
- 10min/100k scope: split if exceeded

## Mutation Safety (sw-mutation-safety)

- constitution.md modification attempt → unconditional REJECT
- self-model.md, orchestration.md modification → must pass 5 checks: axiom preservation / hard constraints / priority chain / terminal goal / constitution immutability
- Risk High or above → requires explicit user approval
