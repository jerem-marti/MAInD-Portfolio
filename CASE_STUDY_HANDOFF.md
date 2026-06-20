# Case-study population handoff

The operational handoff for adding **images and resources** to a case study. Every remaining study is already written and `status: live`; what they lack is imagery and the resources block. This file bootstraps a fresh conversation so we don't re-derive the workflow each time.

- **Schema reference** (every frontmatter field, widths, types): `POPULATING.md`
- **Brand, voice, locked decisions**: `CLAUDE.md`
- **This file**: how we actually run a population pass, the learnings, and the tracker.

Work **one study per conversation** — populating a study is context-heavy, and a fresh start keeps the context clean.

---

## 1. Kickoff prompt

Fill the slots and paste this to start a study's conversation:

```
You're a senior content specialist populating IMAGES + RESOURCES for the `[slug]`
case study. The content is already written and live — do not rewrite prose.

Read CASE_STUDY_HANDOFF.md, POPULATING.md, and CLAUDE.md first, then follow the
workflow in the handoff.

PROCESS (hard rule): confirm each step with me before applying it. Propose a plan,
wait for my OK, then do it. Never batch-apply unconfirmed work.

DEPTH: lean by default — hero + 2 to 4 key artifacts + a small gallery + resources.
Go deeper only where the material is genuinely rich.

MATERIAL for this study:
- Source photos / renders folder: [path]
- Figma file / slides / board: [links]
- Notion pages: [links]
- Deliverable PDFs (report, poster, deck): [paths]
- Live URLs / repos / videos: [links]

Start by reading the study's existing content (problem / role / approach / gallery)
and proposing an image plan.
```

If material is missing, ask for it before producing anything. Some studies (NDA, lost files) will only get a hero + resources — that is fine and honest.

---

## 2. Material checklist (gather before kickoff)

- [ ] **Source photos / renders** — local folder of the real artefacts (prototype, screens, process shots)
- [ ] **Figma** — design file, slide deck, and/or FigJam board node links
- [ ] **Notion** — project pages (reachable via the Notion MCP)
- [ ] **Deliverable PDFs** — thesis/report, posters, presentation decks (become `pdf` resources + a source for artifact renders)
- [ ] **Live URLs** — demos, repos, write-ups, videos (become `demo` / `web` / `github` / `video` resources)
- [ ] **Language of each deliverable** — resource titles are written in the document's own language

---

## 3. Workflow

1. **Read the existing content.** Open `content/work/[slug].md`. Note which `approach[]` steps make a claim that an artifact could *prove*, what the `gallery` captions imply, and the hero concept.
2. **Audit material.** Map each available source to a slot. Flag gaps and ask the user. Access Figma via MCP, Notion via MCP.
3. **Propose the image plan → CONFIRM.** Hero concept; one artifact per approach step (each proving a specific claim); a small gallery showing range. State what each image is and why it earns its place. Wait for OK.
4. **Produce images.** See the pipeline in §5. Targets: hero 21:8, artifacts 16:10, gallery 4:3 (floors in `POPULATING.md`). Write to `public/images/work/[slug]/`.
5. **Wire frontmatter.** Set `hero`, `approach[].artifacts[].src`, `gallery[].src`. Write real `alt` (what's in it + what it shows) and `caption`. **Alts/captions in the document's language where the artwork is language-specific.**
6. **Resources.** PDFs → `public/files/[slug]-*.pdf`, referenced as `/files/...`. External URLs as-is. `type` ∈ `pdf | github | demo | web | video`. **Title each row in the resource's own language.** Drop any stub rows. (Full schema: `POPULATING.md` §resources.)
7. **Regenerate + verify.** `NODE_OPTIONS=--use-system-ca npm run generate`. Confirm: link-check passes, the page references the new images, srcset is real (not `_ipx/w_1`/`w_2`), files land in `.output/public/images/...` and `.output/public/files/`.
8. **Present for review.** Show what changed, flag any compromises, wait for sign-off before the next study.

Then update the **tracker** (§7) and the **derived assets** note (§8).

---

## 4. Image strategy

- **Each image proves a specific claim** — the thinking *and* the actual deliverables. Show **breadth**, don't retell one story in five frames.
- **Process is the artifact; outputs are evidence.** That is the portfolio's thesis — the images carry it.
- **Roles:** hero = the concept in one frame · approach artifact = one decision each · gallery = the range of what shipped.
- When unsure what an image is *for*, cut it. A placeholder beats a decorative image.

---

## 5. Production pipeline

All image production runs in the **main thread** — background subagents get code-execution denied.

Transient deps (reinstall if pruned):
```
NODE_OPTIONS=--use-system-ca npm i sharp mupdf puppeteer-core --no-save
```

- **`sharp`** — resize / cover / letterbox / compose.
  - Letterbox to a target aspect: `resize({ width, height, fit: 'contain', background }).flatten({ background })`.
  - Cannot read and write the **same** file in one pipeline — buffer it first (`fs.readFileSync`) then write.
  - Feather an extracted element to blend: composite a radial-gradient alpha with `{ blend: 'dest-in' }`.
- **`mupdf`** (WASM, ESM-only) — render a PDF page to PNG:
  ```js
  import * as mupdf from 'mupdf'; import fs from 'fs'
  const doc = mupdf.Document.openDocument(fs.readFileSync(path), 'application/pdf')
  const pix = doc.loadPage(0).toPixmap(mupdf.Matrix.scale(1.4, 1.4), mupdf.ColorSpace.DeviceRGB, false, true)
  fs.writeFileSync(out, pix.asPNG())
  ```
  Use for thesis/report/poster/deck pages, and to confirm a document's language.
- **`puppeteer-core`** driving installed Chrome (`C:/Program Files/Google/Chrome/Application/chrome.exe`):
  - **Live sites** (scrollytelling one-pager, agent demo): `defaultViewport` + `deviceScaleFactor: 2`, scroll in frames, screenshot the scene you want. Use a tall viewport and pick a frame where characters aren't mid-transition / cropped.
  - **Composed images** (diagrams, heroes): write an HTML file in the brand language (General Sans / Geist, brand colours, coral/cream for WeMatch) and screenshot it at 2x. To rescue a hero where a slide crops the character or breaks a word: extract + feather the character, recompose the tagline cleanly in HTML over a matching gradient.
- **Figma MCP** — `get_screenshot(fileKey, nodeId, maxDimension)` returns a short-lived asset URL. Download it with `node` `fetch(...)` + `NODE_OPTIONS=--use-system-ca` (curl hits a TLS error on this machine). Good for slide/board nodes.

Keep scratch in `scripts/_prev/` and **delete it before committing**.

---

## 6. Learnings / gotchas (append as we hit new ones)

- **`@nuxt/image` v2 `sizes` is breakpoint-format, not HTML.** Use `sizes="sm:50vw md:33vw lg:33vw xl:33vw 2xl:33vw"`, NOT `(min-width: 768px) 33vw`. The HTML form is parsed as a `1px` breakpoint → srcset of `w_1`/`w_2` → every image renders at 2px. The components are already fixed — copy their existing `sizes` strings.
- **The hairline frame and the indented content column are intentional.** The "thin line at the bottom" of an image is the card border every image gets; the approach layout puts the `03.0N / LABEL` number in a narrow left column with the heading/prose in the column beside it. Don't "fix" either.
- **Subagents can't execute code.** Do all image work in the main thread; use agents only for read-only curation.
- **Resource titles follow the document's language.** A French report → `Travail de Bachelor`; the English version of the same poster → `Project poster`. Drop placeholder rows (no fake repo/video).
- **Mind big PDFs.** The DataBloom thesis is 18.6 MB in-repo; consider hosting very large deliverables externally and linking out.
- **External resource URLs are link-checked** at `generate`. If a third-party site flakes, add it to `linkChecker.excludeLinks` in `nuxt.config.ts` (don't disable link-check).
- **TLS on this machine:** prefix network commands with `NODE_OPTIONS=--use-system-ca` (`UNABLE_TO_VERIFY_LEAF_SIGNATURE` otherwise).
- **Commits:** no `Co-Authored-By: Claude` trailer; the user works on `main`.

---

## 7. Per-study tracker

Legend: ✅ done · 🟡 in progress · ⬜ to do · ⛔ blocked

### Featured (home section 02)
| Study | Images | Resources | Status |
|---|---|---|---|
| `databloom` | ✅ | ✅ | Done |
| `wematch` | ✅ | ✅ | Done |
| `family-space` | ⬜ | ⬜ | ⛔ Waiting on FigJam exports (affinity diagram, Sophie/Leo personas, big idea, kebab mechanic). **No UBS logo in any image.** |

### Index-linked (home section 03)
| Study | Images | Resources | Status |
|---|---|---|---|
| `an-aura-of-words` | ⬜ | ⬜ | To do |
| `elen` | ⬜ | ⬜ | To do |
| `wama` | ⬜ | ⬜ | To do |
| `brushbuddy` | ⬜ | ⬜ | To do |
| `human-loci` | ⬜ | ⬜ | To do |
| `beau-rivage` | ⬜ | ⬜ | To do |
| `uefa-female-coaches` | ⬜ | ⬜ | To do (a `hero:` path is set but the file isn't produced yet) |
| `a-ta-dispo` | ⬜ | ⬜ | To do |
| `bereal` | ⬜ | ⬜ | To do |
| `cultural-trails` | ⬜ | ⬜ | To do |

### Off-Index pages (kept, not linked from home)
| Study | Images | Resources | Status |
|---|---|---|---|
| `goldilocks-worlds` | ⬜ | ⬜ | Low priority — hero + resources only |
| `meeting-pond` | ⬜ | ⬜ | Low priority — hero + resources only |

---

## 8. Derived assets (do after the studies)

These reuse case-study imagery, so populate them last:

- **Work / home — Featured card heroes** (16:9) → `app/data/featured.ts` `image:`
- **Home — Index hover previews** (3:4) → `app/data/projects.ts` `preview:`
- **Adjacent cards** (prev/next, 16:10) → each study's `prev.image` / `next.image`
- **About — portrait** (4:5) → `app/pages/about.vue` + `app/pages/index.vue` (`:src`)
