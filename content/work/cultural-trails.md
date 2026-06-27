---
title: "Cultural Trails"
summary: "A full web application that turns the canton of Vaud's cultural heritage into gamified, accessible walking trails: themed paths, points of interest with audio guides and quizzes, and an editor mode that lets local actors publish their own trails. I was the back-end lead."
status: "live"
hero: "/images/work/cultural-trails/hero.jpg"
heroAlt: "The Sentiers culturels title card: the project name set large in heavy black type on a warm cream ground, above a flowing green, peach and blue ribbon that reads as a winding trail. The project's brand identity."

brief:
  role: "Back-end lead"
  year: "2024"
  host: "HEIG-VD · Articulation Project"
  scope: "Team of five"
  shipped: "Live web app, presentation, report"

problem:
  - >-
    The canton of Vaud's cultural heritage is rich but scattered, and hard to experience on foot in a
    guided, engaging way. The brief was to build a complete web application that turns it into gamified,
    accessible walking trails, and crucially, to let local actors publish and edit their own.
  - >-
    Underneath the product brief sat a real engineering problem: a content-heavy, map-based application
    with two very different kinds of user (people exploring trails and people authoring them), carrying
    multimedia, quizzes, and a layer of gamification, designed and built full-stack inside a student
    timeframe. I owned the back-end half of that.

role:
  led:
    - "The back-end: the data model, the controllers and application logic, authentication and role-based access"
    - "The route-planning integration, plus database seeding, migrations, and deployment"
  contributed:
    - "Front-end components that talk to the database: the trail and POI creation forms, filters, and profile pages"
    - "The early UX phase with the team"
  notTouched:
    - "The front-end lead's work, the UX design lead, and the visual/communication side"
  team: "Team of five (Group Loomi) for the Articulation Project at HEIG-VD: Jérémy Martin (back-end lead), Antony Neyret (front-end lead), François Cuennet (UX design), Leïla Fidalgo (project manager), and Ariadne Melissargos (communications). Supervised by Laurent Berthelot (project management and technical), Jonathan Favre-Lamarine (UX/UI and design), and Noemi Romano (cartography)."

approach:
  - label: "Architecture"
    title: "One app, not a front and a back"
    prose:
      - >-
        We started from a Laravel Breeze base, which gave us authentication, Tailwind, and Vue out of the
        box, and then made the decision that shaped everything: Blade, Livewire, or Inertia. We chose Inertia.
        It let us build a single-page application with fluid transitions while writing the back-end as a
        normal Laravel app, with no separate REST API to design, version, and keep in sync.
      - >-
        That choice is why a five-person team could move fast. Inertia bridges the back and the front, so
        a controller returns data straight to a Vue page, and the boundary I owned (the models, the
        queries, the access rules) stayed clean and server-side while the front-end stayed reactive.
    artifacts:
      - alt: >-
          A brand-styled stack diagram: a Vue, Tailwind and MapLibre front end above a Laravel and MySQL
          back end, with an arrow between them and an API link out to the OpenRouteService routing service.
        caption: "The stack: Vue, Tailwind and MapLibre on Laravel and MySQL."
        decision: 'One Laravel app drives the Vue front end through Inertia, so there is no separate REST API to design, version, and keep in sync.'
        width: "half"
        src: "/images/work/cultural-trails/artifact-stack.jpg"
      - alt: >-
          A brand-styled build-process diagram running left to right: relational schema, then migrations
          and models, then seeders, then controllers, with a parallel track for cartography, base
          components, and the trail and POI creation flows.
        caption: "How it was built: schema, then models, seeders, controllers."
        decision: 'Getting the schema and models right first is what let the controllers and the front-end components fall into place quickly.'
        width: "half"
        src: "/images/work/cultural-trails/artifact-buildprocess.jpg"

  - label: "Data model"
    title: "A content system for trails"
    prose:
      - >-
        The heart of the back-end is the schema. A trail (path) links to many points of interest and a
        point of interest can belong to many trails, so the join between them carries the order of the
        walk. Each point of interest holds its own audio guides, photos, and facts; each trail belongs to
        a theme. On top of the content sits a quiz model (quizzes, questions, answers) for the gamified
        stops.
      - >-
        Then there is the engagement layer, which is what makes it feel like a product rather than a
        catalogue: favorites and completion histories for both trails and points of interest,
        achievements with a user pivot, reviews, and a role system underneath it all. Getting those
        relationships right up front is the architecture; everything else is built on them.
    artifacts:
      - alt: >-
          A product slide introducing the app at sentiers-culturels-vaud.ch, listing three access levels:
          for all users, for users with an account, and for a local actor with an editor account.
        caption: "The product: one app, three levels of access."
        decision: 'The same content system serves anonymous visitors, account holders, and editors, with views unlocked by role.'
        width: "half"
        src: "/images/work/cultural-trails/artifact-product.jpg"
      - alt: >-
          A product slide, "Onglet Accueil", showing the home tab on mobile: exploring trails by theme,
          proximity and popularity, and a "which trail are you" quiz that recommends trails.
        caption: "The home tab: explore by theme, place, and a recommendation quiz."
        decision: 'Themes, popularity and the quiz all read from the same relational content, so discovery is just another query over the model.'
        width: "half"
        src: "/images/work/cultural-trails/artifact-home.jpg"
      - alt: >-
          A product slide, "Page d'un sentier", showing a trail page on mobile: photos, description,
          distance and duration, its ordered stops, accessibility, and a reviews panel rated 4.5.
        caption: "A trail page: description, ordered stops, accessibility, reviews."
        decision: 'Every field here maps to the schema: a trail and its ordered stops, its accessibility, and the reviews layered on top.'
        width: "half"
        src: "/images/work/cultural-trails/artifact-trail.jpg"
      - alt: >-
          A product slide, "Page d'un point d'intérêt", showing a POI page on mobile (Gare de Lausanne)
          with an audio guide, a quiz, and the list of trails that pass through it.
        caption: "A point of interest: audio guide, quiz, and the trails it belongs to."
        decision: 'Each point of interest carries its own media and quiz and can belong to many trails, which is the many-to-many join at the centre of the model.'
        width: "half"
        src: "/images/work/cultural-trails/artifact-poi.jpg"

  - label: "Roles"
    title: "Explorers and editors, one schema"
    prose:
      - >-
        The app serves two audiences from the same code. An explorer browses the map, walks a trail,
        marks points of interest as done, and earns achievements. An editor (a local cultural actor)
        creates and edits trails and points of interest through guided forms, with their own creation and
        deletion flows.
      - >-
        That split is enforced by role-based access. Routes for favorites, the dashboard, achievements,
        and authoring are guarded by role middleware, so the same application safely exposes a public
        experience and a contributor's toolset without leaking one into the other.
    artifacts:
      - alt: >-
          A UML sequence diagram, "Voir un itinéraire": a user on the Vue front end requests a trail, the
          web.php router calls MapController, PathController and PoiController, each queries MySQL, and the
          controller returns an Inertia view with its props.
        caption: "The explorer flow: viewing a trail and its points of interest."
        decision: 'An explorer''s read path runs through the same controllers and the same Inertia views the whole app is built on.'
        width: "half"
        src: "/images/work/cultural-trails/artifact-view-sequence.jpg"
      - alt: >-
          A UML sequence diagram, "Créer un sentier": an editor steps through creating a trail, the
          NewPathController calls the OpenRouteService API and queries POIs and themes in MySQL, then
          creates the trail and its links to the points of interest.
        caption: "The editor flow: creating a trail, its route, and its stops."
        decision: 'The editor''s write path is the same architecture guarded by role middleware, so one codebase safely serves both audiences.'
        width: "half"
        src: "/images/work/cultural-trails/artifact-create-sequence.jpg"

  - label: "Maps & routing"
    title: "Planning real walking routes"
    prose:
      - >-
        The interactive maps run on MapLibre, and the trails themselves are real routes, which means
        route planning between points of interest. We used OpenRouteService for that through its public
        API, calling it from the authoring flow to plan a route as a trail was being built. Self-hosting
        the engine was the obvious next step we flagged for a real deployment, to escape the public rate
        limits and keep that planning unconstrained.
    artifacts:
      - alt: >-
          A product slide, "Onglet Sentiers", showing the trails tab on mobile: a filterable map of
          trails and a trail preview with its route drawn between its stops.
        caption: "The trails tab: a map with filters by distance, duration, and theme."
        decision: 'Trails are real routes on a MapLibre map, browsable and filterable before you set out.'
        width: "half"
        src: "/images/work/cultural-trails/artifact-trails.jpg"
      - alt: >-
          A product slide, "Lancement de la navigation", showing in-walk navigation on mobile: the list
          of steps, the route on the map, the next stop with distance and time remaining, and a
          quit-navigation dialog.
        caption: "Guided navigation: the next stop, distance, and time remaining."
        decision: 'Following a trail walks the planned OpenRouteService route stop by stop, with the option to skip a stop or quit at any time.'
        width: "half"
        src: "/images/work/cultural-trails/artifact-navigation.jpg"

outcome:
  - >-
    A live, deployed full-stack web app at sentiers-culturels-vaud.ch, built on Laravel, Inertia, and
    Vue with a MySQL database.
  - >-
    A rich relational data model and a role-based content system that lets local actors publish their
    own trails, not just a fixed catalogue the team controls.
  - >-
    Interactive mapping and route planning between points of interest, built on MapLibre and
    OpenRouteService, with self-hosting the routing engine flagged as the next step for a live deployment.

reflection: >-
  This is the project that taught me the back-end is mostly data modelling. The weeks I spent getting
  the relationships right (trails to points of interest, the engagement layer, the role system) are
  what let the rest of the build go quickly, and the messy parts later were almost always places where
  the model had been too loose. Choosing Inertia over a separate API was the pragmatic call I would make
  again: it traded a little setup for a lot less friction down the line.

gallery:
  - alt: >-
      The explore map on mobile: trails and points of interest shown as pins across the Lausanne and
      Lavaux shore, with filters for theme, criteria and radius, and a Sentiers / Lieux toggle.
    caption: "Explore: trails and places on the map."
    src: "/images/work/cultural-trails/gallery-map.jpg"
  - alt: >-
      A place page on mobile, "Gare de Lausanne", listing the trails that pass through it, each with a
      photo, distance, duration and elevation gain.
    caption: "A place, and the trails that pass through it."
    src: "/images/work/cultural-trails/gallery-poi.jpg"
  - alt: >-
      The trail-navigation screen on mobile, "Étapes": a vertical timeline of stops from the departure
      point, each marked done, with a start button.
    caption: "Navigation: a trail's stops, step by step."
    src: "/images/work/cultural-trails/gallery-steps.jpg"
  - alt: >-
      The reviews screen on mobile, "Avis": a 4.5 rating with a star distribution and individual traveller
      reviews carrying dates and text.
    caption: "Reviews: a rating, a distribution, and traveller notes."
    src: "/images/work/cultural-trails/gallery-reviews.jpg"
  - alt: >-
      The achievements screen on mobile, "Accomplissements": a grid of earned badges above progress bars
      broken down by theme such as art and history.
    caption: "Achievements, earned by walking and by theme."
    src: "/images/work/cultural-trails/gallery-achievements.jpg"
  - alt: >-
      The profile screen on mobile, "Profil": a completion statistic, lists of completed and downloaded
      trails, and written reviews, above the app's bottom navigation.
    caption: "The profile: trails completed, downloaded, reviewed."
    src: "/images/work/cultural-trails/gallery-profile.jpg"

resources:
  - type: github
    title: "Code source du projet (Laravel)"
    url: "https://github.com/antonynyt/projArt-loomi-SentiersCulturels"
  - type: pdf
    title: "Rapport de projet"
    url: "/files/cultural-trails-rapport.pdf"
  - type: pdf
    title: "Schéma relationnel de la base de données"
    url: "/files/cultural-trails-schema.pdf"

card:
  title: "Cultural Trails — a full-stack heritage walking app"
  alt: "The Sentiers culturels title card: the project name in heavy black type on a cream ground, above a green, peach and blue ribbon evoking a walking trail."
  image: "/images/work/cultural-trails/adjacent.jpg"
---
