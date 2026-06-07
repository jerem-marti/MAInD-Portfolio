---
title: "Goldilocks Worlds"
summary: "A desktop-first interactive data story that makes the assumptions behind the word 'habitable' visible. It walks a broad audience through how scientific definitions and human constraints shape which exoplanets we can credibly call potentially habitable, treating habitability as a question to explore rather than a label to accept."
status: "live"
heroAlt: "Goldilocks Worlds: a dark, space-like data-story scene with an analytical plot of exoplanets and a high-contrast habitable-zone constraint band, a persistent explanation sidebar alongside."

brief:
  role: "Front-end & data pipeline"
  year: "2025"
  host: "SUPSI · Making Sense of Data"
  scope: "Team of three · 4-day sprint"
  shipped: "Interactive web data story"

problem:
  - >-
    Thousands of exoplanets are known, and "habitable" is one of the most popular words attached to
    them. It is also one of the most misleading, usually presented as a yes/no or a single score. In
    reality habitability is not a measurable property; it depends on thresholds, definitions, and
    trade-offs.
  - >-
    The challenge was to popularise exoplanet habitability for non-experts while staying honest about
    what the label actually means. That meant resisting the easy version, a ranking of "best
    planets", in favour of something harder: showing how the claim is built, how constraints
    intersect, and how uncertainty stays part of the story.

role:
  led:
    - "The whole build: the data pipeline, the scene engine, and every coordinated view except the final comparison"
    - "Preprocessing the catalog and deriving the values each scene filters on"
  contributed:
    - "Concept, benchmark research, and narrative direction with the team"
  notTouched:
    - "The final small-multiples comparison view, and help with the step texts (Nicholas Vos)"
  team: "Team of three (Artem Sadoviy, Jérémy Martin, Nicholas Vos) for Making Sense of Data at SUPSI, taught by Antonella Autuori and Ginevra Terenghi."

approach:
  - label: "Framing"
    title: "Habitability as a question, not a label"
    prose:
      - >-
        Most public treatments of exoplanets fall into one of two camps: a catalog that hands you a
        shortlist, or a story that hands you a metaphor. We wanted the space in between, framed as a
        single how-might-we: turn potential habitability into a transparent, checkable reasoning
        process, so a non-expert can explore the logic behind the label instead of accepting a
        simplified ranking.
      - >-
        That decided the whole shape of the piece. Not a score to trust, but a path to follow, where
        each step adds one criterion and you can see exactly which worlds it keeps and which it
        removes.

  - label: "Data"
    title: "A public catalog, made checkable"
    prose:
      - >-
        The backbone is the NASA Exoplanet Archive, specifically its composite parameters table,
        which gives one consolidated row per confirmed planet, built for exploration across thousands
        of worlds. We exported it as a CSV for reproducibility and treated it honestly: a public
        exploration dataset whose values come from heterogeneous observations, not a definitive model
        of each planet.
      - >-
        On top of it I built a small preprocessing layer so the reasoning could stay explicit in the
        interface. It estimates a planet's insolation when it is not given, derives a human-centred
        surface-gravity proxy from mass and radius, and encodes each habitability criterion as a
        plain boolean flag. Those flags are what let the story show, step by step, exactly what
        changes from one criterion to the next.

  - label: "Research"
    title: "Between catalogs and storytelling"
    prose:
      - >-
        We benchmarked the field, from habitable-worlds catalogs to editorial popularizations to
        NASA's own interactive plots and 3D explorers. Each does one thing well and misses our goal:
        catalogs feel like a label without the reasoning, stories stay memorable but not checkable,
        and the exploratory tools assume you already know what to look for.
      - >-
        The clearest lesson was progressive disclosure: non-experts understand best when you start
        with context and then move into analysis, one idea at a time. That is why the story opens on a
        broad galactic view before it ever shows a constraint plot, and why "habitable" is treated as
        a navigable concept rather than a stamp.

  - label: "Design"
    title: "Meaning and data, at the same time"
    prose:
      - >-
        The interface is a desktop-first, two-column layout: a large visualization area beside a
        persistent sidebar, so the reader never has to switch between a reading mode and a viewing
        mode. Each scene introduces a single idea and makes it visible through a constraint zone laid
        over the data, while the sidebar carries the explanation, a short question-and-answer to guide
        interpretation, a small diagram, and the sources.
      - >-
        Trust was a design material here. Citations live in the interface as hoverable pills that
        explain what each source says and why it is used, so a curious reader can verify a claim
        without leaving the page. Detail stays on demand: clean views by default, precise values and
        references revealed on hover.
    artifacts:
      - alt: "The two-column layout: an analytical exoplanet plot with a highlighted constraint zone on the left, and the explanation sidebar with a source pill and diagram on the right."
        caption: "The layout — visualization left, persistent explanation right."
        decision: "Keeping interpretation always visible beside the data was the core call. It is what turns a chart into a reasoning path a non-expert can actually follow."
        width: "wide"

  - label: "Conclusion"
    title: "From galaxy to a shortlist"
    prose:
      - >-
        The story moves from the scale of the galaxy down to a handful of worlds, ending on a small-
        multiples grid built for side-by-side comparison rather than navigation. It is deliberately
        fixed, no zoom or pan, with each card looping a few key differences (the star, the orbit, a
        gravity pulse) so the finalists can be scanned at a glance.
      - >-
        Crucially, the shortlist is framed as plausible candidates, not conclusions. The piece never
        claims these worlds are habitable; it shows how a public label is assembled from measurable
        constraints, and leaves the uncertainty intact and on screen.

outcome:
  - >-
    A working interactive data story: a sequence of scenes that adds one habitability criterion at a
    time, with coordinated views moving from a galactic overview to analytical plots to a final
    comparison grid.
  - >-
    Reasoning kept checkable throughout, with sources embedded as hoverable citations and trade-offs
    shown as visible constraint zones rather than collapsed into a single score.
  - >-
    A learning artefact aimed at curious public, students, and educators, demonstrating progressive
    disclosure and detail-on-demand on a real scientific dataset.

reflection: >-
  Goldilocks Worlds was my first fully vibe-coded project, and the backstory is why. The course was
  long, but we spent most of it chasing a topic that would not work, and changed direction so late
  that we had four days to build the whole thing. Coming from a developer background, I was amazed by
  the speed: AI coding made an impossible deadline possible. I also met its failure mode, the loop
  where you cannot get the model to make the change you mean and it keeps handing back the same broken
  result. I came away convinced of both the power and the risk, and I have used AI in my coding ever
  since, but always inside a workflow built to keep the output professional.

gallery:
  - alt: "The opening galaxy-overview scene, giving spatial context before any analysis begins."
    caption: "Context first — a galactic overview opens the story."
  - alt: "An analytical scatter plot of exoplanets with a high-contrast habitable-zone constraint band overlaid."
    caption: "Constraint zones — each criterion made visible on the data."
  - alt: "The persistent explanation sidebar: step title, a short question-and-answer, a diagram card, and source pills."
    caption: "The sidebar — interpretation always beside the data."
  - alt: "A hover tooltip on a planet revealing precise values, and a source pill expanding to explain a citation."
    caption: "Detail on demand — values and citations on hover."
  - alt: "The final small-multiples grid comparing the shortlisted worlds side by side, each card looping key differences."
    caption: "The shortlist — small multiples for side-by-side scanning."
  - alt: "The two-column desktop layout: a large visualization area beside the persistent explanation sidebar."
    caption: "The layout — viz left, explanation right."

prev:
  slug: "an-aura-of-words"
  title: "An Aura of Words — Lugano's parks, told by their reviews"
  alt: "Lugano's five parks shown on a map, each as a colour-blended organic aura sized by review volume."

next:
  slug: "meeting-pond"
  title: "Meeting Pond — connected light objects for distant presence"
  alt: "A 32×32 LED matrix mounted in a frame, displaying ripples spreading across a luminous surface."
---
