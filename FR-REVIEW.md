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
| UX research | Recherche UX |
| Interaction design | Design d'interaction |
| Prototyping | Prototypage |
| Information architecture | Architecture de l'information |
| UX writing | Rédaction UX |
| Design systems | Systèmes de design |
| Accessibility | Accessibilité |
| Tangible interface | Interface tangible |
| Front-end build | Développement front-end |
| Back-end build | Développement back-end |
| Brand / Editorial | Marque / Éditorial |
| AI evaluation | Évaluation d'IA |
| Machine learning | Machine learning |
| Hardware | Hardware |
| Sustainability | Durabilité |
| Business strategy | Stratégie d'entreprise |
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
- Interaction and product designer → **Designer d'interaction et de produit**
- Available for internships from August 2026 → **Disponible pour un stage dès août 2026**
- Replies in French or English, usually within a few working days. → **Réponse en français ou en anglais, généralement sous quelques jours ouvrés.**
- Process is the artifact. → **Le processus est l'artefact.**

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

## Open questions for the owner (from the drafting pass)

Register / global:
- **"E-mail" vs "Courriel"** — used "E-mail" throughout. Confirm.
- **OG card footer** — translated `INTERACTION & PRODUCT DESIGN` → `DESIGN D'INTERACTION & DE PRODUIT`. If it's a fixed brand lockup, you may prefer to keep it English (one value: `og.footer`).
- **schema.org `jobTitle` / `websiteName`** — given French values on `/fr`. Confirm you want French in structured data vs the English canonical.
- **Visitor-facing register** — uefa-female-coaches paraphrased landing-page lines use informal **tu**. Confirm tu vs vous for that audience.

Index titles (`data.projects.*.title`, shown on the home Index):
- Translated descriptors: `Beau-Rivage Éco-Refonte`, `Campagne UEFA Female Coaches`. The `BeReal Like Web App` / `Cultural Trails Web App` descriptors were **kept English** (brand rule). Decide if you'd rather have e.g. "Application web …".

Terminology kept in English (confirm or localize): `Calm Technology`, `Action Window` (→ "Fenêtre d'Action"), `How Might We`, `MoSCoW`, `Brand book`, `Deck`, `stateless`/`middleware`/`props`/`firmware`, `microtechnique` (EPFL's official FR program name).

Content fix to confirm:
- **databloom resources** — the English had two posters: `Affiche du projet` (already French) and `Project poster`. The latter was translated to `Affiche du projet`, so two resource rows now share that title. Give the second a distinguishing label (e.g. `Affiche SwissViz`).

Per-file translator notes (idiom/word-choice confirmations) were returned with each draft; the items above are the ones needing a decision. Everything else is a normal native-speaker polish pass.
