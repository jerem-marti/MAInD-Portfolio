---
title: "Cultural Trails"
summary: "A full web application that turns the canton of Vaud's cultural heritage into gamified, accessible walking trails: themed paths, points of interest with audio guides and quizzes, and an editor mode that lets local actors publish their own trails. I was the back-end lead."
status: "live"
heroAlt: "Cultural Trails (Sentiers Culturels): a map-based web app showing a themed walking trail across the canton of Vaud, with points of interest, audio guides, and quizzes."

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

  - label: "Maps & routing"
    title: "Self-hosting the routing engine"
    prose:
      - >-
        The interactive maps run on MapLibre, and the trails themselves are real routes, which means
        route planning and optimisation between points of interest. We used OpenRouteService for that,
        and rather than fight the public API's rate limits we self-hosted it, which gave us control over
        the constraints and let the authoring flow plan routes freely while a trail was being built.

outcome:
  - >-
    A live, deployed full-stack web app at sentiers-culturels-vaud.ch, built on Laravel, Inertia, and
    Vue with a MySQL database.
  - >-
    A rich relational data model and a role-based content system that lets local actors publish their
    own trails, not just a fixed catalogue the team controls.
  - >-
    Interactive mapping and route planning powered by a self-hosted routing engine, so the experience
    stayed responsive and the authoring tools stayed unconstrained.

reflection: >-
  This is the project that taught me the back-end is mostly data modelling. The weeks I spent getting
  the relationships right (trails to points of interest, the engagement layer, the role system) are
  what let the rest of the build go quickly, and the messy parts later were almost always places where
  the model had been too loose. Choosing Inertia over a separate API, and self-hosting the routing
  engine, were the two pragmatic calls I would make again: both traded a little setup for a lot less
  friction down the line.

gallery:
  - alt: "The interactive map view built on MapLibre, showing a themed trail and its points of interest across the canton."
    caption: "Explore — the MapLibre trail map."
  - alt: "A point-of-interest page with its audio guide, photos, and facts, and a quiz for the stop."
    caption: "A point of interest — audio, photos, a quiz."
  - alt: "The editor's guided form for creating a new trail, linking points of interest and planning the route."
    caption: "Editor — authoring a trail."
  - alt: "A simplified diagram of the data model: trails and points of interest joined many-to-many, with media, quizzes, themes, and the engagement layer."
    caption: "The data model — trails, POIs, and the engagement layer."
  - alt: "The user dashboard with completed trails, favorites, and earned achievements."
    caption: "Dashboard — favorites, history, achievements."
  - alt: "The role-based access structure separating public explorers from editor accounts."
    caption: "Roles — explorers and editors, one app."

prev:
  slug: "uefa-female-coaches"
  title: "Why Not You? — the UEFA female coaches campaign"
  alt: "The Why Not You? campaign: bold display typography over a female coach, with the line Lead Your Passion, Shape the Game."

next:
  slug: "bereal"
  title: "BeReal-like web app — a REST API and image pipeline"
  alt: "Mobile capture screen for a BeReal-like prototype: time-bounded photo capture with the back camera."
---
