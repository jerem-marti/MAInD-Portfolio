# FR-DÉCALQUAGE — journal

Régénération du FR **depuis le seul anglais** (`i18n/locales/en.json`, `content/en/work/*.md`,
`server/llms/builders.ts`). Le FR existant n'est pas lu pendant la rédaction ; il n'est consulté
qu'à la demande du propriétaire, après figeage des propositions, pour comparaison.
Complément du glossaire/voix propriétaire dans `FR-REVIEW.md`.

## Vocab arrêté (transversal)

- **Titre de poste** « Interaction and product designer » : **gardé en anglais** (chrome, schema,
  et en tête de prose dans `lede` / `about.heroBody`).
- **Hero / thèse** : « La méthode » / « comme matière. » (verrouillé). `Process` → « méthode ».
- **« production de design »** acceptée. Le **nom** « génération » est écarté ; « production »
  ne l'est pas. Les **verbes** « générer / généré » restent acceptables. Pour rendre le nom
  « generation » : « production » (nom) ou « produire / produit » (verbe) selon la phrase
  — cohérence corps/emphase (ex. storyP1 : corps « produire », emphase « ce qu'on a produit »).
- **« coming to design from X »** → « avec un parcours en X » (pas « venu au design par X »).
- **Termes métier gardés en anglais** dans la prose : « UX design », « front-end ».
  « prototypage » **sans qualificatif** (ni « hardware » ni « matériel »).
  ⚠ « **service design** » a été **RETIRÉ comme compétence** (home `aboutBody` + jumeaux llms `intro`
  / `home.about`, EN + FR ; PR #6, 2026-06-30). À ne pas réintroduire.
- **« Work »** → **« Projets »** : nav `Work` → « Projets » ; `Selected work` → « Projets
  sélectionnés » ; `all other work` (Index) → « projets ».
- **POV** → « Point de vue ».
- Registre **vous** ; nombres format suisse `1'000` ; **pas de tirets dans le corps**
  (les « — » de chrome/méta/labels restent permis).

## Interdits (rejetés par le propriétaire)

- **Nom « génération »** (le concept). Le verbe « générer / généré » reste correct.

## Pages

### home — ÉCRIT (2026-06-29)

Build : `npm run generate` OK (1889 routes), `check:i18n` OK (18 pages, parité, lang/canonical).
Modifs vs ancien FR (toutes les autres clés `home.*` / chrome inchangées) :

| clé | avant → après |
| --- | --- |
| `home.lede` | « l'humaine » (cassé) → « l'intention humaine » ; « SUPSI Mendrisio » → « SUPSI de Mendrisio » ; virgule avant « conçues ». Titre EN gardé. |
| `home.approachPov` | « POV — 2026 » → « Point de vue — 2026 ». |
| `home.approachBody` | retrait du nom « génération » → « …la **production** de design bon marché… » ; « Ces derniers temps » → « Depuis peu » ; « les prompts/les résultats » → « des… » ; « face aux » → « au regard des ». |
| `home.selectedWorkLabel` | « Travaux sélectionnés » → « Projets sélectionnés ». |
| `home.indexLabel` | « …autres travaux » → « …autres projets ». |
| `home.indexCaption` | « D'autres travaux issus de mes études de master et de bachelor » → « D'autres projets issus de mon master et de mon bachelor ». |
| `home.aboutBody` | « prototypage hardware…recherche UX…design de service » → « prototypage…l'UX design…le service design ». |
| `nav.work` | « Travaux » → « Projets ». |

Twin LLM `llms.home.*` — ÉCRIT (propagation des mêmes décisions, registre impersonnel conservé) :
`blockquote` (l'intention humaine + SUPSI de Mendrisio), `approach` (production / des / au regard des),
`hSelectedWork` (Projets sélectionnés), `indexNote` (projets ; « du master et du bachelor »),
`about` (prototypage / l'UX design / le service design). `title` inchangé.

**home — REVUE SECTIONS 00/01/04 (2026-06-29, méthode sous-agent anglais-seul).** Régénération
fraîche de la prose datant de la 1ʳᵉ méthodo. 2 retouches retenues (+ propagation `llms.home.*`) :
- `lede` (+ `llms.home.blockquote`) : « actuellement à l'œuvre sur les » → « **travaillant
  actuellement sur les** » (aligne sur le `heroBody` de about).
- `approachBody` (+ `llms.home.approach`) : « a rendu la production de design bon marché. Juger de
  sa qualité, non. » → « **a fait chuter le coût de la production de design. Pas celui d'en juger la
  qualité.** » ; « au regard des » → « **à l'aune des** ».
Gardés : `aboutBody` (le sous-agent annulait les choix arrêtés prototypage/UX design/service design),
`approachEmphasis`, le hero verrouillé « La méthode comme matière. ».

**À FAIRE ensuite :**
- **Cohérence « Projets »** à propager hors home, sur leurs pages : `error.waySeeWork`
  (« Voir les travaux ») et `work.inProgressBody` (« carte Travaux sélectionnés »).

### about — ÉCRIT (2026-06-29)

Build : `npm run generate` OK (1889 routes), `check:i18n` OK.
Constat : le FR existant réalisait déjà l'intention anglaise sur presque toute la page.
**Politique adoptée :** là où l'ancien FR rend l'intention sans interdit ni bug, on le **garde**
(pas de churn latéral). Seules 4 retouches écrites :

| clé | avant → après |
| --- | --- |
| `about.metaDescription` | « SUPSI Mendrisio, **venu au design par** l'électronique… » → « SUPSI **de** Mendrisio, **avec un parcours en** électronique… » (rendu de « coming to design from X ») |
| `about.heroBody` | « l'humaine » (cassé) → « l'intention humaine » ; virgule après le titre EN. |
| `about.storyP1` (+ `storyP1Emphasis`) | nom « génération » (×2) → verbe « produire / Produire » ; emphase « ce qu'on a **généré** » → « ce qu'on a **produit** ». « n'est pas gratuit » gardé (écho coût/gratuit). |
| `about.thinkingBody` | « n'introduire qu'ensuite **la génération par l'IA** » → « **n'introduire l'IA qu'ensuite** ». |

Gardés tels quels (l'ancien réalise déjà l'intention) : `storyP2`–`storyP6` (+ emphases),
`thesisBody`, `festivalBody`, tous les labels et `facts.*`. `storyP3` / `storyP5` : ma version
fraîche ressortait **identique**.

Note process : à la demande du propriétaire, les sorties de porte affichent désormais la
**version actuelle** à côté de la proposition (comparaison à l'écran ; n'influence pas la
rédaction, déjà figée).

Twin LLM `llms.about.*` — ÉCRIT (propagation) : `blockquote` (l'intention humaine + virgule),
`story1` (produire / produit), `thinking` (n'introduire l'IA qu'ensuite). `story6` inchangé.
Build + check OK.

**about — PASSE DE RELECTURE PROPRIÉTAIRE (2026-06-29).** La 1ʳᵉ passe avait été trop rapide
(ancienne méthodo). Réécriture de presque tous les paragraphes (`heroBody`, `storyP1`–`storyP6`,
`thesisBody`, `festivalBody`, `thinkingBody`) + propagation aux 10 chaînes `llms.about.*`. Décisions :
- `storyP6Emphasis` : « comme **matière** » conservé (cohérent avec le hero home « La méthode comme
  matière. ») ; « pas comme **argument marketing** ». Vocab arrêté : **« matière »** (pas « matériau »).
- `thinkingBody` : interdit « génération » re-signalé et corrigé → « **ne faire intervenir l'IA
  qu'ensuite** » (le propriétaire avait ré-introduit le nom par inadvertance).
- `storyP2` : « professionnels » (générique masculin), « design **d'**expériences agentiques ».
- `thesisBody` : « se **flétrit** » (about) — note : databloom (étude) emploie « se fane ». Divergence
  inter-pages assumée pour l'instant.
- `storyP3` : « **Bachelor** » (pas BSc), « vue d'ensemble », « savoir-faire ». `storyP4`/`storyP5`
  reformulés. `festivalEmphasis` → « petites décisions qui s'accumulent ».
- `{emphasis}` préservés comme jetons (surbrillance « expériences agentiques (AX) », « DataBloom »,
  « IA comme matière… »).

### error — ÉCRIT (2026-06-29)

Build + `check:i18n` OK. Page déjà juste ; 3 retouches :

| clé | avant → après |
| --- | --- |
| `error.statusGenericSuffix` | « — Quelque chose a cassé » → « — Quelque chose a **planté** » (« cassé » = calque de « broke »). |
| `error.headingGenericMuted` | « Essayez de **recharger**, ou choisissez… » → « Essayez de **rafraîchir ou d'actualiser**. Sinon, choisissez l'un des chemins ci-dessous. » |
| `error.waySeeWork` | « Voir les **travaux** » → « Voir les **projets** » (cohérence « Projets »). |

Pas de jumeau LLM (les artefacts llms ne couvrent pas la page d'erreur).
Reste de la cohérence « Projets » : `work.inProgressBody` (« carte Travaux sélectionnés ») —
à traiter avec les études.

### work — chrome partagé `work.*` — ÉCRIT (2026-06-29)

Build + check OK. Chrome déjà entièrement correct ; **1 seule retouche** :
`work.inProgressBody` « carte **Travaux** sélectionnés » → « carte **Projets** sélectionnés ».
→ Cohérence « Projets » désormais **entièrement propagée** (home, error, work chrome).
Optionnel non retenu : `roleColumns.notTouched` « Non touché » (calque acceptable ; alternatives
« Non abordé » / « Hors périmètre » si un jour souhaité).

### prose catalogue (`fr.json data.*`) — ÉCRIT (2026-06-29)

Build + check OK. Déjà correcte presque partout (verbatim EN bien gardés, alts fidèles).
**2 titres descriptifs** Frenchifiés (les titres-noms propres restent EN) :

| clé | avant → après |
| --- | --- |
| `data.projects.bereal.title` | « BeReal Like Web App » → « **Application web façon BeReal** » |
| `data.projects.cultural-trails.title` | « Cultural Trails Web App » → « **Sentiers culturels Web App** » |

`data.projects` : les 12 `alt` gardés.
(Les titres se propagent automatiquement à l'Index et aux artefacts llms au build.)

**Correctif (2026-06-29) — cartes featured régénérées depuis l'anglais.** À la première passe
j'avais gardé `data.featured.*` en les jugeant « déjà bons » ; le propriétaire a signalé des
calques qui sonnent faux. Leçon : **régénérer, pas préserver** (mémoire `fr-decalquage-regenerate-not-preserve`).
Après lecture des études EN complètes, 6 textes refaits :

| clé | refonte |
| --- | --- |
| `data.featured.databloom.problem` | « …mauvais endroit où le placer » → « …mauvais endroit pour le rendre visible » ; « domestiques » → « du foyer ». |
| `data.featured.databloom.outcome` | « publiée par le laboratoire de recherche du MEI » → « publiée par le Media Engineering Institute (MEI) de la HEIG-VD ». |
| `data.featured.wematch.problem` | calque « ne le prédit pas » → « regrouper des inconnus selon le voyage et les dates ne dit rien de leur compatibilité ». |
| `data.featured.wematch.outcome` | « donné à voir par le comportement plutôt qu'étiqueté comme de l'IA. Livré sous la forme de… » → « qui se révèle dans l'usage plutôt que de s'annoncer comme « IA ». Trois livrables : … ». meta « Récit de service » gardé. |
| `data.featured.thea.problem` | « c'est un déclencheur qu'on ne peut pas voir… ajouter à l'anxiété » → « c'est composer avec un déclencheur invisible… aggraver l'anxiété ». |
| `data.featured.thea.outcome` | refonte complète ; « voix conditionnée à un accusé de réception » → « une voix qui reste muette tant qu'on ne l'appelle pas » ; règle l'accord « Réalisé » via tournure nominale. |

« tracker » / « wearable » gardés EN. Ces textes alimentent aussi les cartes home et les artefacts llms au build.

### études — rédactions `.md` (mode « fil », une étude = une porte)

15 fichiers (`content/fr/work/<slug>.md`, source `content/en/work/<slug>.md`). Featured d'abord
(databloom → wematch → thea), puis les 12 autres.

**databloom — ÉCRIT (2026-06-29), régénération complète.** Ma 1ʳᵉ passe avait **sous-appliqué la
méthode** (j'ai blanchi le FR existant, truffé de calques : « total sans histoire » = faux sens,
« rien à quoi réagir », « faire défiler un fil »…). Le propriétaire a corrigé. Refonte intégrale
via **sous-agent anglais-seul** (jamais le FR), puis passe de corrections ligne à ligne du
propriétaire. Build + check OK.
- Gardés à l'ORIGINAL sur demande : section **Idéation** et toute la **Galerie** (légendes + alt).
- Faits rectifiés (étaient aussi faux en anglais) : le câble est **tiré pour redresser, relâché
  pour courber** (l'EN disait « pulled to bend ») ; la lumière est diffusée par le **cœur imprimé
  en 3D**, pas par les pétales en feutrine (l'EN disait « through felt petals »).
- **EN corrigé aussi** (`content/en/work/databloom.md`, validé par le propriétaire) : câble « pulled
  to straighten / released to bend », lumière « through the 3D-printed center » (+ pétales feutrine),
  tige segmentée « greater sturdiness plus cable routing », et « pale wooden center » → « pale
  3D-printed center » (heroAlt, flowerhead, gallery-3). FR aligné « bois » → « imprimé en 3D ».
- **Leçon clé** : la source EN peut contenir des fautes de sens ; quand une correction FR révèle une
  erreur factuelle, corriger AUSSI l'anglais (porte). Voir [[fr-decalquage-regenerate-not-preserve]].

**wematch — ÉCRIT (2026-06-29).** Refonte via sous-agent anglais-seul + passe du propriétaire.
Build + check OK. Aucune faute de sens dans l'EN (rien à corriger côté anglais). Décisions :
« match » (nom) → « **correspondance** » en prose ; « **matching** » (service/modèle) gardé EN ;
led n°4 « Récit » → « **Storytelling** » ; « appariement (**matchmaking**) » ; sections Le récit et
Outcome réécrites par le propriétaire ; « Bien reçu par le **jury** ». Verbatim gardés : slogan-image,
noms d'équipe, `resources[].title` (« Final presentation », « Live agent », « Scrollytelling one-pager »).

**thea — ÉCRIT (2026-06-29).** Refonte via sous-agent anglais-seul + passe détaillée du
propriétaire. Build + check OK. **Nombreuses corrections de sens portées AUSSI sur l'anglais**
(`content/en/work/thea.md`, 18 edits) :
- Fait : « expert interviews with allergists » → **un** entretien avec une professionnelle du
  **aha! Swiss Allergy Centre** (l'EN était faux).
- Voix : elle n'est jamais « unprompted » → « the voice that comes in at that point » ; « silence is
  its default output, not a fallback » → « default behavior is silence, and that is a choice ».
- Garde-fous précisés : « records a person/protected characteristic as an allergen » → « names a
  person, or a trait like origin or gender, as the cause of a reaction ».
- `outcome` couche réflexive : « merged into firmware on the dual brain » → « integrated on the Linux
  processor… ready to host the model locally rather than through an external API ».
- 8 légendes de galerie reformulées (EN + FR), dont le décalage gallery-8/9.
- Verbatim gardés : noms propres/équipe, concepts (Action Window, Calm Technology, Wizard-of-Oz,
  Cooperative Usability Testing, VUI), textes d'écran, `resources[].title`.
Jauge : harmonisée sur « **jauge oblongue** » / « **oblong gauge** » partout (4 alt FR + 4 alt EN ;
les « anneaux orange » / « orange rings » des ondulations non touchés).

### études Index — WORKFLOW REJETÉ (2026-06-30)

Tentative de décalquage en masse des 12 études Index par workflow multi-agents (rédacteur
anglais-seul → audit idiomaticité → réviseur). **Sortie jugée mauvaise par le propriétaire et
discardée** : les 12 fichiers `content/fr/work/*.md` Index sont **revenus à leur FR d'origine
(commit)**. Le bulk-workflow n'est PAS la bonne approche pour ces études.

Leçon : reprendre ces 12 études **autrement** — étude par étude, à la main, sous contrôle serré du
propriétaire (comme databloom/wematch/thea), jamais en régénération automatique de masse.

**À FAIRE (12 études Index, encore en FR d'origine, non décalquées) :** an-aura-of-words, elen,
meeting-pond, wama, brushbuddy, family-space, human-loci, beau-rivage, uefa-female-coaches,
a-ta-dispo, bereal, cultural-trails.

(Le digest `FR-DECALQUAGE-studies-pending.md` décrivait la sortie rejetée → supprimé. Script du
workflow conservé pour mémoire : `workflows/scripts/decalquage-fr-studies-wf_f4d3bed0-fc8.js`.)
