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
6. **Derived card images — same pass, from the hero.** Reuse the hero so the card matches the page:
   - **Featured study** → featured card (16:9) → `public/images/featured/[slug].jpg`, wire `app/data/featured.ts` `image:`; plus an adjacent card (16:10) → `public/images/work/[slug]/adjacent.jpg`, wire the neighbours' `prev.image` / `next.image`.
   - **Index study** → Index hover preview (3:4) → `public/images/index/[slug].jpg`, wire `app/data/projects.ts` `preview:`; plus an adjacent card (16:10).
   - **How:** centre-crop a photographic hero; **re-render** a composed (HTML) hero at the target aspect — cropping a wide composition cuts the edges. The 3:4 Index preview rarely crops cleanly from a wide hero; use a portrait-friendly gallery shot if needed. Update each card `alt` to match its derived image.
7. **Resources.** PDFs → `public/files/[slug]-*.pdf`, referenced as `/files/...`. External URLs as-is. `type` ∈ `pdf | github | demo | web | video`. **Title each row in the resource's own language.** Drop any stub rows. (Full schema: `POPULATING.md` §resources.)
8. **Regenerate + verify.** `NODE_OPTIONS=--use-system-ca npm run generate`. Confirm: link-check passes, the page references the new images, srcset is real (not `_ipx/w_1`/`w_2`), files land in `.output/public/images/...` and `.output/public/files/`. An OG-image `createImage timeout` is flaky (Satori) — just re-run.
9. **Present for review.** Show what changed, flag any compromises, wait for sign-off before the next study.

Then update the **tracker** (§7).

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
- **Flaky OG-image timeout.** `generate` sometimes dies with `[@nuxtjs/og-image] renderer.createImage timeout` for a random `/work/<slug>` (Satori under load). It's not your change — re-run `generate`. Link-check runs *before* it, so a passing link-check + this timeout means the content is fine.
- **Derived cards reuse the hero:** centre-crop photographic heroes, re-render composed (HTML) heroes at the target aspect. Keep the composed-hero HTML/assets handy — you'll need them again for cards and OG.
- **Verify "clean" supplied assets before publishing.** A user-supplied `…-NO-LOGO.pdf` still carried the UBS keys watermark on its red divider slides (p8/p17) and an embedded lesson-video frame (p15) — the de-logo pass was incomplete. Always render/scan a supplied file (mupdf contact sheet) before wiring it as a resource. Same for prototype screen-recordings: the logo can hide in one embedded clip (here, a UBS-watermarked coaching video late in the kid walkthrough), so scan the full timeline and trim or blur.
- **Index hover preview needs a raw `<img>`, not `<NuxtImg>`.** The hover rail and the mobile tap-reveal render the preview only on interaction, so the static IPX pass never crawls them and never builds their `_ipx` variants. On a static host the optimised URL (e.g. `/_ipx/w_300&q_80/images/index/<slug>.jpg`) 404s while the source file 200s — a broken thumbnail on hover. `app/pages/index.vue` now serves the source file directly for both (an unoptimised ~300px decoration is a fair trade). This bites *every* Index preview, not just the first one; the case-study hero/gallery/artifact and the prev/next adjacent cards are unaffected because they render in crawled HTML. Verify a new preview with a static serve of `.output/public` + a scripted hover, not just `npm run dev` (dev has a live IPX server that masks it).
- **Capturing a live web-app's states (clean, centred frames).** For an app whose route is driven by an ML/state machine (Wama reads a camera), block the camera so your hash sticks: `page.evaluateOnNewDocument` to make `navigator.mediaDevices.getUserMedia` reject — otherwise the (fake) camera classifies a state and navigates off your chosen hash. Disable any per-state CSS `*-walk`/move animations (`animation:none!important`) and force `justify-content/align-items:center` to get a centred character instead of a mid-walk frame. Portrait-tuned `vh`/`dvh` sizes overflow a landscape viewport — cap the character (`max-height:~58vh`). Keep the status-title element (don't blanket-hide `#app-header`); hide only the debug panel / control buttons.
- **Artifacts are content-only, not slides.** The page already renders the section label/title + each artifact's caption + `Decision ·` line, so don't bake an eyebrow/title/subhead/footer into the image. The image is just the screen (capture at the 16:10 artifact aspect, e.g. a 1280×800 viewport, so nothing crops) or just the diagram; the markdown caption/decision carries the words. The gallery is fixed `aspect-[4/3]` (crops landscape), so landscape screens belong in artifacts (`aspect-[16/10]`), not the gallery.
- **Orphaned chromium starves the OG renderer.** Every `generate` that dies on a `[@nuxtjs/og-image] renderer.createImage timeout` leaves chromium processes behind; they pile up (saw 44) and starve the *next* run's renderer, so timeouts snowball (3 → 15 → all). Before retrying a failed generate, **sweep chrome/chromium** (`Get-Process chrome,chromium | Stop-Process -Force`) — a clean slate with idle CPU builds first try. Don't keep re-running without sweeping. (Headless puppeteer capture scripts also leave chromium if they error — sweep after those too.)
- **Commits:** no `Co-Authored-By: Claude` trailer; the user works on `main`.

---

## 7. Per-study tracker

Legend: ✅ done · 🟡 in progress · ⬜ to do · ⛔ blocked

### Featured (home section 02)
| Study | Images | Resources | Status |
|---|---|---|---|
| `databloom` | ✅ | ✅ | Done |
| `wematch` | ✅ | ✅ | Done |
| `family-space` | ✅ | ✅ | **Done.** Images: composed flat paired-phone hero, 4 re-rendered artifacts (research quote, affinity, big-idea pillars, real 03.png activation), 5-item gallery (personas Sophie/Leo, limits, analytics, goal, kebab) — all phones are flat app screens (no device-frame / notch / black bezel). Resources: presentation deck (PDF, user-supplied NO-LOGO export, p15 watermark blurred by the user) + 2 video walkthroughs (parent full; kid trimmed to 0:41 to drop the watermarked lesson clip). |

### Index-linked (home section 03)
| Study | Images | Resources | Status |
|---|---|---|---|
| `an-aura-of-words` | ✅ | ✅ | **Done.** Images: live-site captures (clean 21:8 five-aura map hero; gallery opening / comparison / map / word-map / contribution-with-live-classification) + a composed six-lens framework board (real category data, project-styled) + the methodology lab promoted to a Lexicon artifact, with the comparison view swapped into the gallery to avoid duplication. Resources: live demo, repo, a self-hosted 24 MB walkthrough (facade), and the Parco Tassino park poster (PDF). Index hover preview wired (see the raw-`<img>` learning below). |
| `elen` | ✅ | ✅ | **Done.** Images: object-portrait hero (Front artsy still-life) + 3 approach artifacts (re-rendered system-architecture diagram in ELEN's blue/mono at 2x; museum apparition capture with hex-only IDs for Translation; in-hand scan for The object) + Framing dropped to prose-only + 6-item gallery (in-use, three-quarter object, two apparition captures [lake + church], Back-view internals relabelled "The hardware", interlocking-box unboxing). Apparition captures with personal device names avoided/anonymised: museum + lake (Output-1/4) are hex/generic; the church (Output-3) "Anna's SmartWatch" label was blurred. Index preview = vertical "Detail 1" (verified on static serve, raw-`<img>` hover loads). Adjacent card wired into bereal (next) + beau-rivage (prev). Resources: Digital Design Week / Milan Design Week (web), public GitHub repo, two self-hosted facades (8.8 MB project walkthrough + 4.9 MB Saceba exhibition film, transcoded from the LR masters, posters pulled from the 4K HR), and the print brochure PDF cropped to its cutting line (CropBox set to the TrimBox via mupdf — bleed + crop marks removed, vector preserved). |
| `wama` | ✅ | ✅ | **Done.** Images are **content-only** (no slide chrome — the markdown caption/decision explains each). Side-view sink-rig hero (21:8); Sensing artifact = just the presence × water four-class **matrix** (worried cell in signal yellow, axis legend `PRESENCE→/WATER↓` right-aligned to the grid); Response = **three separate per-screen artifacts** (clean landscape PWA screens: ask-for-music with 👍/👎 `half`, dancing `half`, worried `wide`); Integration is **prose-only** (no artifact). 4-photo gallery (greet / task-active / hand-at-tap / holder close-up). Concept prose-only. Index preview = holder portrait (3:4, raw-`<img>`); adjacent (16:10, hero scene) into human-loci (next) + an-aura-of-words (prev). heroAlt + Index alt rewritten off "kitchen sink" (it's a built test rig). Resources: public GitHub repo only (the live demo link and the walkthrough video were dropped on review). Notion read by rendering the public `notion.site` page in headless Chrome (MCP can't reach the teamspace; user is a guest). |
| `brushbuddy` | ✅ | ✅ | **Done.** Photographic set on seamless grey. Hero = worried monster face with a hand lifting the brush (1472), anchored to its real left edge and extended right to 21:8 with clean grey (edge-copy on the left smeared the arm/shadow into streaks — pad only the empty side). Two artifacts: the hand-drawn 6-step interaction storyboard (letterboxed 16:10 on light grey) and the opened-cube internals (1524); Concept + Sprint prose-only. 5-tile gallery, all landscape sources for clean 4:3 (three-quarter beauty 1489 / branded plywood side 1460 / brush alone 1463 / face close-up 1498 / powered reward 1505). Index preview = front face (1420, 3:4, kept unique to the Index); adjacent (16:10 hero crop) wired into an-aura-of-words (next), meeting-pond (next), uefa-female-coaches (prev). Resources: two public GitHub repos (cube firmware + toothbrush sensor — the "two microcontrollers" story is literally two repos), the Fritzing wiring diagram (PDF), and the interaction film (self-hosted facade, transcoded 4K→720p, **2.6 MB**, poster from 1489). Project-description PDF and Notion dropped on review. All deliverables English → titles/alts English. |
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

## 8. Final pass (after the studies)

Card images (featured / Index preview / adjacent) are now produced **per study** in §3 step 6. The only asset not derived from a study hero:

- **About — portrait** (4:5, a real photo of Jérémy) → `app/pages/about.vue` + `app/pages/index.vue` (`:src`). User-provided, wired once.
