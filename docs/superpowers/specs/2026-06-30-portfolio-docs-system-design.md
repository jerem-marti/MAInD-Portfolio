# Portfolio documentation system — design spec

- **Date:** 2026-06-30
- **Status:** Approved (brainstorming complete) — ready for implementation plan
- **Owner:** Jérémy Martin
- **Topic:** A committed, dual-reader (human + AI agent) documentation system for the
  `nuxt-portfolio` repo, generated via a ReAct, sub-agent-driven, divide-and-conquer process.

---

## 1. Problem

A no-context agent (or human) that clones this repo today is under-served:

- `README.md` is **untouched Nuxt boilerplate** — zero project information.
- `CLAUDE.md` — the richest source of truth (brand thesis, architecture, voice locks, locked
  decisions) — is **gitignored**, so it never reaches a fresh clone or a cloud agent.
- `POPULATING.md` and `CASE_STUDY_HANDOFF.md` are strong but **scoped to content authoring**
  (case studies, Index rows, images, SEO); `CASE_STUDY_HANDOFF.md` also mixes in
  machine-specific gotchas (TLS, chromium sweeps).
- There is **no `AGENTS.md`**, `.cursorrules`, or any committed agent entry point.

Net: the spec lives only on the owner's machine; the public-facing entry point is boilerplate;
the committed docs cover only *populating* content. The goal "easily modified by an agent having
no context" cannot be met until a committed, complete, agent-readable documentation system exists.

## 2. Goals / non-goals

**Goals**
- A committed documentation system covering **code + content + ops** end to end.
- Readable by **two audiences in one file**: a cold AI agent and a human developer.
- An agent can make any change (add a case study, edit a component, change a token, run a deploy)
  using the docs alone, and verify it.
- Single source of truth, no contradictory duplicates.

**Non-goals**
- Not changing the site's behavior, design, or content.
- Not building doc tooling/site generators — these are plain Markdown in the repo.
- Not auto-generating API reference from code; runbooks + concept docs, hand-grounded in code.

## 3. Decisions (locked during brainstorming)

1. **Scope:** Everything — code + content + ops (architecture, components, tokens, i18n, build,
   deploy/nginx, llms pipeline, content authoring, image pipeline, troubleshooting).
2. **Public/private:** Commit the full spec. Everything goes into the repo; no private curation
   pass needed. Machine-specific items are **kept but fenced** under a "Local environment" label
   so a cloud agent does not treat them as universal.
3. **Structure:** Consolidate into a clean `docs/` system with `AGENTS.md` as the canonical agent
   entry point; existing playbooks folded in via `git mv` (history preserved).

## 4. Principles ("what good looks like")

- **Actionability over prose** — runbooks: numbered steps → exact file + field → verify command +
  expected output. (Extends the "At a glance" table pattern already used in `POPULATING.md`.)
- **Grounded, not invented** — every path/command/API traced to real code (`path:line`).
  Unverifiable claims are marked `TODO: verify`, never guessed. This is the primary failure mode
  of agent-written docs and the design defends against it explicitly (§7 quality gates).
- **A map before the territory** — each doc opens with a one-line purpose and an
  "I need to… → Edit → Verify" table.
- **Constraints made explicit** — the locks (voice rules, UBS-logo rule, no em-dash in body copy,
  Swiss number format, "process is the artifact", locked featured trio) stated as rules an agent
  must not break, each with its *why*.
- **Local vs portable separated** — local `D:\` paths, personal email, PAT steps, the
  `NODE_OPTIONS=--use-system-ca` TLS quirk, Windows specifics, chromium sweeps: kept but fenced
  under "Local environment".

## 5. Target architecture (the artifact)

```
README.md              Human entry: what this is, 60-sec quickstart, links into docs/ + AGENTS.md
AGENTS.md              Canonical agent entry: orientation + repo map + golden rules + pointers
CLAUDE.md              Thin committed pointer that imports AGENTS.md (removed from .gitignore)
docs/
  architecture.md      Nuxt 4 app/ structure, SSG/render model, data flow, key modules,
                       interaction principles, a11y + perf budgets
  brand-voice.md       Brand thesis, design tokens, typography, voice rules, controlled
                       vocabulary, background bio facts
  content-authoring.md (← absorbs POPULATING.md) case studies, Index rows, featured cards,
                       SEO, resources, frontmatter schema
  images.md            (← absorbs CASE_STUDY_HANDOFF.md image strategy + pipeline) image roles,
                       aspect ratios, sharp/mupdf/puppeteer pipeline
  i18n.md              FR locale system, the i18n catalog, per-locale collections, check:i18n
  build-deploy.md      generate, hosting (Cloudflare/Netlify/Vercel), nginx-i18n, smoke tests
  llms.md              llms.txt pipeline overview, points to server/llms/README.md
  troubleshooting.md   aggregated gotchas (TLS, chromium sweeps, OG timeouts, IPX previews, CRLF)
```

**File movements / changes**
- `POPULATING.md` → `docs/content-authoring.md` (`git mv`, then restructure into runbooks).
- `CASE_STUDY_HANDOFF.md` → `docs/images.md` (`git mv`; the per-study tracker + machine learnings
  either move to `docs/images.md` under "Local environment" or stay as a working journal — decide
  during planning; default: keep the tracker, fence the machine learnings).
- `FR-REVIEW.md`, `FR-DECALQUAGE.md` — **stay** as working journals; linked from `docs/i18n.md`,
  not folded in.
- `server/llms/README.md` — **stays**; `docs/llms.md` summarizes and links it.
- `README.md` — rewritten for humans (was boilerplate).
- `CLAUDE.md` — content migrated into `AGENTS.md` + `docs/*`; the file becomes a thin committed
  pointer (`See AGENTS.md` + `@AGENTS.md` import so Claude Code still auto-loads the canonical
  instructions). Removed from `.gitignore`.
- `.gitignore` — remove the `CLAUDE.md` line; **keep** `docs/superpowers/` ignored (working specs
  stay local); `.claude` stays ignored.

**Canonical-file rule:** `AGENTS.md` is the single source of truth for agent instructions.
`CLAUDE.md` imports it. `README.md` is the human front door and links into `docs/`. No instruction
content is duplicated across the three — each points inward to `docs/`.

## 6. Content map (source → destination)

| New doc | Primary sources to mine |
|---|---|
| `docs/architecture.md` | `CLAUDE.md` (tech stack, site structure, interaction principles, perf, a11y), `nuxt.config.ts`, `app/` tree, `content.config.ts` |
| `docs/brand-voice.md` | `CLAUDE.md` (brand thesis, tokens, typography, voice rules, vocab, bio), `app/assets/css/main.css` |
| `docs/content-authoring.md` | `POPULATING.md`, `content.config.ts`, `app/data/*.ts`, `content/en/work/*.md` |
| `docs/images.md` | `CASE_STUDY_HANDOFF.md`, `app/components/ui/MediaPlaceholder.vue`, `@nuxt/image` config |
| `docs/i18n.md` | `CLAUDE.md` (French locale section), `nuxt.config.ts` i18n block, `i18n/locales/*.json`, `modules/llms.ts`, `deploy/nginx-i18n.conf`, `FR-REVIEW.md` |
| `docs/build-deploy.md` | `POPULATING.md` (build/deploy sections), `package.json` scripts, `deploy/*`, `nuxt.config.ts` |
| `docs/llms.md` | `server/llms/README.md`, `server/llms/builders.ts`, `server/llms/handler.ts`, `modules/llms.ts` |
| `docs/troubleshooting.md` | `CASE_STUDY_HANDOFF.md` learnings, `POPULATING.md` "Common issues", scattered gotchas |
| `AGENTS.md` | Synthesis of all of the above + `CLAUDE.md` top-level rules |
| `README.md` | Synthesis: what/why, quickstart from `package.json`, links |

## 7. Generation strategy (ReAct + divide-and-conquer)

**Orchestrator = main thread (me), running a ReAct loop:** Reason about what is known/unknown →
Act by dispatching a sub-agent → Observe its return → repeat. The orchestrator keeps the
through-line, cross-links, and runs all verification.

**Hard constraint from prior sessions:** sub-agents can **read/search but cannot execute code**.
Therefore any step that runs `npm run generate`, `npx nuxi typecheck`, or `npm run check:i18n`
happens in the **main thread**, never inside an agent.

**Per-domain two-stage pipeline**
1. **Map** — a read-only `Explore` agent inventories the real files, exports, config keys, and
   commands for that domain.
2. **Draft** — a `general-purpose` agent writes the doc from the map + existing sources, grounding
   every claim with `path:line`.

**Dependency-ordered fan-out**
1. Foundational (first): `architecture`, `brand-voice` (other docs reference them).
2. Parallel fan-out: `content-authoring`, `images`, `i18n`, `build-deploy`, `llms`.
3. Aggregate: `troubleshooting` (pulls gotchas from the set), then `AGENTS.md` + `README.md`
   (summarize/link the finished docs).
4. Quality gates (main thread):
   - **Accuracy critic** agent — checks every cited path/command/API against the code; returns a
     list of unverifiable or wrong claims.
   - **Owner verification** (main thread) — run the verify commands (`npm run generate`,
     `npx nuxi typecheck`, `npm run check:i18n`) and confirm every referenced file path exists.

**Process skills:** drive with `superpowers:subagent-driven-development` and
`superpowers:dispatching-parallel-agents`. The heavyweight `Workflow` tool is **not** used unless
the owner later wants deterministic orchestration — ReAct via the Agent tool matches the request.

## 8. The prompt (deliverable)

Two parts, both reproduced verbatim in the implementation plan.

### 8a. Orchestrator (ReAct) framing
The main thread, per domain: (1) Reason — state what the doc must cover and what is still unknown;
(2) Act — dispatch the Map agent, then the Draft agent with the filled template; (3) Observe — read
the draft + its unverified-claims list; (4) decide: accept, request a fix, or escalate a claim to a
main-thread check. After all domains: run the two quality gates, then assemble `AGENTS.md`/`README.md`.

### 8b. Reusable sub-agent template (parameterized per domain)

```
<role>
You are a senior technical writer + Nuxt 4 engineer. You write docs a future AI
agent with ZERO context can use to modify this repo correctly on the first try,
and a human can skim. Precision over prose.
</role>

<project_context>{brand thesis + stack one-liner; docs are the committed source of truth}</project_context>

<audience>
Two readers, one doc: (1) a cold AI agent — needs where things live, exact steps,
verify commands, and constraints it must not break; (2) a human skimming. Never
invent paths/APIs/behavior; if unverified, mark "TODO: verify" or omit.
</audience>

<your_domain>{DOMAIN}: {one-line scope}. You own documenting: {globs/paths}</your_domain>

<sources_of_truth>
Ground every claim here. Read first: {existing docs}. Inspect (cite file:line): {globs}.
Align with / don't duplicate: {sibling docs}.
</sources_of_truth>

<method> <!-- think before writing; don't show scratch work -->
1) Map: list real files, exports, config keys, commands.
2) Find the change-scenarios a cold agent hits ("how do I add/change X?").
3) Write each as a runbook: numbered steps -> exact file+field -> verify command + expected output.
4) Extract hard constraints (the locks) and the why.
5) Self-check: every path exists, every command real, every API matches code.
</method>

<output_format>
Markdown body for docs/{FILE}:
# Title  ·  > one-sentence purpose
## At a glance  (table: I need to... | Edit | Verify)
## Concepts (scaled to complexity)
## Runbooks: "How to {scenario}" (copy-pasteable)
## Constraints (the locks + why)
## Verify (commands + expected output)
## Related (cross-links)
Real paths as `path:line`; commands in fences; fence machine-specific bits as "Local environment".
</output_format>

<definition_of_done>
Return: (1) the complete Markdown body; (2) claims you could NOT verify; (3) cross-doc
dependencies you assumed.
</definition_of_done>
```

### 8c. Anthropic prompt-engineering standards applied
- **Clear, explicit role + task** — `<role>`, `<your_domain>`, `<method>`.
- **Context up front** — `<project_context>`, `<audience>`.
- **Reduce hallucination by grounding** — `<sources_of_truth>` + "never invent / mark TODO".
- **Structure with XML tags** — the whole template.
- **Chain-of-thought** — `<method>` step list ("think before writing").
- **Multishot / examples** — the orchestrator injects a worked example (the `POPULATING.md`
  "At a glance" table + a sample runbook) into `<output_format>` per domain.
- **Success criteria** — `<definition_of_done>`.

## 9. Verification plan
- `npm run generate` succeeds (site still builds; docs are Markdown, not wired into the build).
- `npx nuxi typecheck` clean (no code touched, but confirm `git mv` / pointer edits broke nothing).
- `npm run check:i18n` passes (i18n untouched).
- Every `path:line` and command referenced in the new docs exists / runs (accuracy-critic gate +
  spot checks).
- `CLAUDE.md` still loads in Claude Code via the `@AGENTS.md` import.
- No instruction content duplicated across `AGENTS.md` / `CLAUDE.md` / `README.md`.

## 10. Risks & mitigations
- **Hallucinated paths/commands** → grounding rule + accuracy-critic gate + main-thread command runs.
- **Doc drift over time** → every doc ends with a `Verify` block, so docs are testable.
- **Machine-specific noise leaking into universal docs** → "Local environment" fencing rule.
- **Losing the private spec** → `CLAUDE.md` content is migrated, not deleted; becomes the mined
  source, then a committed pointer.
- **Breaking Claude Code auto-load** → `CLAUDE.md` keeps the `@AGENTS.md` import; verified in §9.
- **History loss on move** → use `git mv` for `POPULATING.md` / `CASE_STUDY_HANDOFF.md`.

## 11. Assumptions / open questions (resolve in planning)
- `npm run check:i18n` exists as a script (referenced in `CLAUDE.md`) — confirm in `package.json`.
- The `CASE_STUDY_HANDOFF.md` per-study tracker: keep in `docs/images.md` vs. spin out to a
  working journal. Default: keep the tracker, fence the machine learnings under "Local environment".
- Spec is committed on a feature branch and **not pushed** until the owner reviews/merges.

## 12. Definition of done
- All files in §5 exist, committed, with no boilerplate and no `TODO: verify` left unresolved
  (or each remaining TODO is explicitly owner-flagged).
- A cold-clone test passes: starting from `AGENTS.md`, an agent can locate the runbook for
  "add a case study", "change a design token", and "deploy" without reading code first.
- Verification plan (§9) green.
