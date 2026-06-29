# French locale — translation review

Status: **draft, pending owner review.** Every French string on the site was machine-drafted by Claude following the rules below and must be reviewed by Jérémy before the French locale is announced. English remains the default at `/`; French lives under `/fr`.

This file is also the **shared glossary** every translation workstream follows, so the French reads consistently across pages and case studies.

## Voice rules (French)

- Native, warm-and-precise Swiss-French register. Not a literal gloss of the English.
- **First person stays first person** where the English is ("I'm Jérémy" → "Je suis Jérémy"). Impersonal/neutral phrasing elsewhere.
- **No em-dashes in body prose.** Em-dashes are fine in chrome, meta, captions, mono labels, and titles (matches the English rule).
- Swiss number formatting: thousands separator is `'` (e.g. `1'000`, `1'482`). Normalize any non-conforming number found in the source (e.g. `1482` → `1'482`).
- Keep the positioning **"expériences agentiques (AX)"** — always keep the `(AX)` tag.
- Banned phrases stay banned (no "passionné par", "leader d'opinion", "axé résultats", "synergie", etc.).
- Only real numbers/claims. Never invent a metric; if a sentence can't be rendered truthfully, keep the source meaning.
- Proper nouns and brand names are **not** translated: Jérémy Martin, DataBloom, WeMatch, Thea, SUPSI, HEIG-VD, EPFL, HEIA-FR, MEI, CarbonViz Home, Baleinev, UBS, WeRoad, Arduino UNO Q, jeremymartin.ch, hi@jeremymartin.ch, jermarti, jerem-marti.
- Slugs, image paths, URLs, resource `url`/`provider`/`id`, and `status`/`type` enums are **never** changed.
- **Resource titles are never translated** (owner rule). Every `resources[].title` in a French twin keeps the English source title verbatim — French source titles stay French, English source titles stay English.

## Keep verbatim (already French in the English source — do NOT re-translate or alter)

- **databloom**: the participant quotes `"ça m'a un peu freiné quand j'ai vu la réaction."` and `"je pourrais télécharger la musique et l'écouter en local."`; resource titles `Travail de Bachelor`, `Affiche du projet`, `Article du blog de recherche du MEI`.
- **beau-rivage**: French slide-title alts/captions (`Revue des éléments du site non écoconçus`, `Comment retranscrire le luxe de manière écoconçue?`, `Le Beau Rivage`, `Chambres et Suites`, `Suite Riviera`, `Restaurants et Bars`, `La Terrasse`, …) and resource titles (`Version éconçue du site (démo)`, `Code source (Nuxt 3)`, `Présentation du projet`, `Déclaration d'écoconception (RGESN)`).
- **a-ta-dispo**: `À ta Dispo`, `Basique, Évolutif, Premium`, resource titles (`Rapport de projet — version retravaillée`, `Pitch — projet initial`, `Business plan — projet initial`, `Finances — projet initial`).
- **cultural-trails**: French slide titles (`Onglet Accueil`, `Page d'un sentier`, `Sentiers culturels`, …) and resource titles (`Code source du projet (Laravel)`, `Rapport de projet`, `Schéma relationnel de la base de données`).
- **uefa-female-coaches**: `Why Not You?` and the French news resource title `Why Not You? : le concept présenté à la finale de l'UEFA Women's Euro 2025`.

## Glossary

### Controlled-vocabulary tags (`tags.*`)
| English | French |
|---|---|
| UX research | UX research *(kept English)* |
| Interaction design | Design d'interaction |
| Prototyping | Prototypage |
| Information architecture | Architecture de l'information |
| UX writing | UX writing *(kept English)* |
| Design systems | Design systems *(kept English)* |
| Accessibility | Accessibilité |
| Tangible interface | Interface tangible |
| Front-end build | Front-end *(both EN + FR shortened to "Front-end")* |
| Back-end build | Back-end *(both EN + FR shortened to "Back-end")* |
| Brand / Editorial | Marque / Éditorial |
| AI evaluation | Évaluation IA |
| Machine learning | Machine learning |
| Hardware | Hardware |
| Sustainability | Durabilité |
| Business strategy | Stratégie Business |
| Marketing strategy | Stratégie marketing |
| Design thinking | Design thinking |
| Scrollytelling | Scrollytelling |
| Data visualization | Visualisation de données |
| Small data | Small data |
| DevOps | DevOps |

### Section labels & recurring chrome
| English | French |
|---|---|
| Problem | Problème |
| Role | Rôle |
| Approach | Approche |
| Outcome | Résultat |
| Reflection | Réflexion |
| Gallery | Galerie |
| Resources | Ressources |
| More work | Autres projets |
| Selected work | Travaux sélectionnés |
| Index | Index |
| Contents | Sommaire |
| Section | Section |
| Led | Piloté |
| Contributed to | Contribué à |
| Not touched | Non touché |
| Team | Équipe |
| Previous / Next | Précédent / Suivant |
| Read the case study / Read case study | Lire l'étude de cas |
| More about Jérémy | En savoir plus sur Jérémy |
| Open case study | Ouvrir l'étude de cas |
| Work / About / Contact (nav) | Travaux / À propos / Contact |
| Skip to content | Aller au contenu |
| Decision | Décision |
| Year / Host / Scope / Shipped | Année / Cadre / Périmètre / Livré |

### Recurring sentences
- Interaction and product designer → **kept in English** (the job title stays "Interaction and product designer" in French copy too; schema.org keeps a French value — `Designer d'interaction et de produit`)
- Available for internships from August 2026 → **Disponible pour un stage dès août 2026**
- Replies in French or English, usually within a few working days. → **Réponse en français ou en anglais, généralement sous quelques jours ouvrables.**
- Process is the artifact. → **La méthode comme matière.**

## Drafted surfaces (review checklist)

- [ ] `i18n/locales/fr.json` — full UI catalog + `llms` namespace (chrome, home, about, contact, error, work UI, tags, data prose, OG/schema, llms twins)
- [ ] `content/fr/work/databloom.md`
- [ ] `content/fr/work/wematch.md`
- [ ] `content/fr/work/thea.md`
- [ ] `content/fr/work/an-aura-of-words.md`
- [ ] `content/fr/work/elen.md`
- [ ] `content/fr/work/meeting-pond.md`
- [ ] `content/fr/work/wama.md`
- [ ] `content/fr/work/brushbuddy.md`
- [ ] `content/fr/work/family-space.md`
- [ ] `content/fr/work/human-loci.md`
- [ ] `content/fr/work/beau-rivage.md`
- [ ] `content/fr/work/uefa-female-coaches.md`
- [ ] `content/fr/work/a-ta-dispo.md`
- [ ] `content/fr/work/bereal.md`
- [ ] `content/fr/work/cultural-trails.md`

## Owner decisions (round 1 — applied)

- **"E-mail"** — confirmed, kept.
- **OG card footer** — kept English `INTERACTION & PRODUCT DESIGN` (both locales).
- **schema.org `jobTitle` / `websiteName`** — keep the French values on `/fr` (`Designer d'interaction et de produit`). Note: this is the one place the job title stays French; everywhere else in copy it's the English "Interaction and product designer".
- **Visitor-facing register** — `tu` confirmed (owner to recheck later).
- **Index title** — `Beau-Rivage Éco-Refonte` → `Beau-Rivage éco-conception`. (`BeReal Like Web App` / `Cultural Trails Web App` descriptors stay English.)
- **Resource titles** — not translated; reverted every FR twin's `resources[].title` to the English source (this also fixed the databloom duplicate-poster issue: `Project poster` restored).
- **Tags** — `UX research` / `UX writing` / `Design systems` kept English; `Front-end build`→`Front-end`, `Back-end build`→`Back-end` (both locales); `AI evaluation`→`Évaluation IA`; `Business strategy`→`Stratégie Business`.

Still open (owner to confirm during page review): terminology kept in English with no glossary entry — `Calm Technology`, `Action Window`, `How Might We`, `MoSCoW`, `Brand book`, `Deck`, `stateless`/`middleware`/`props`/`firmware`, `microtechnique`. And the in-sentence job-title occurrences (home lede, about hero) now read "Interaction and product designer" — confirm they read well in context.

**Page-by-page review is next** — the per-file translator notes returned with each draft list idiom/word-choice calls for that pass.
