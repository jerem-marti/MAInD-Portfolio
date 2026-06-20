---
title: "BrushBuddy"
summary: "A monster buddy cube that guides two-minute toothbrushing for children aged 4 to 8. Pull out the toothbrush and the cube's face reacts through light, motion, and sound, lighting twelve teeth in sequence and only advancing while the child is actually brushing."
status: "live"
heroAlt: "BrushBuddy: a 15cm cube with a friendly monster face, two googly eyes, and a mouth of twelve teeth that light up in sequence."

brief:
  role: "Electronics & firmware"
  year: "2026"
  host: "SUPSI · ID140"
  scope: "Team of two · 5-day sprint"
  shipped: "Working prototype"

problem:
  - >-
    Children aged 4 to 8 often resist toothbrushing, lose attention before two minutes, or stop
    when the routine feels repetitive. The usual fix, a timer, measures the task but does nothing
    to make a child want to finish it.
  - >-
    BrushBuddy reframes brushing as a short character interaction instead of a countdown. A monster
    buddy reacts to what the child does through light, eye movement, and sound, turning the two
    minutes into a small relationship rather than a wait.

role:
  led:
    - "Electronics and embedded firmware for the cube and the toothbrush module"
    - "The wireless motion-sensing link that validates real brushing"
    - "Integration of the lighting, sound, and reward mechanism"
  contributed:
    - "Ideation and scope framing on day one with the team"
  notTouched:
    - "The cube's CAD, fabrication, and the monster character (Nicholas Vos)"
  team: "Team of two (Jérémy Martin, Nicholas Vos) for ID140 Creating Tangible Interfaces at SUPSI, taught by Lorenzo Romagnoli and Marco Lurati."

approach:
  - label: "Concept"
    title: "Effort you can see"
    prose:
      - >-
        A timer tells a child how long is left; it does nothing to make them want to stay. BrushBuddy
        replaces the countdown with a character that reacts. The two-minute routine becomes a visible
        sequence of twelve teeth that light up one by one, so the child always sees what is done and
        what remains, and the order to brush in.
      - >-
        The key move is that the sequence only advances while brushing motion is actually detected.
        Stop, and the buddy pauses with you. That turns effort directly into progress. Motivation
        then stretches past a single session: completed routines accumulate, and after twelve the
        cube dispenses a sticker, giving a reason to come back tomorrow.

  - label: "Interaction"
    title: "A session, start to finish"
    prose:
      - >-
        A session begins the moment the toothbrush is lifted from its dock. The cube runs a short
        preparation beat, time to find the toothpaste, then a start cue opens the two minutes. The
        teeth light in sequence while the eyes move, and if brushing stops, the eyes stop and the
        lighting pauses until it resumes.
      - >-
        An end cue closes the routine and prompts docking the brush. When it is back, the cube shows
        how close the child is to the next sticker, and after twelve completed sessions it dispenses
        one and resets the counter. Every condition stays explicit and observable, so a four-year-old
        can read the whole loop without being told.

  - label: "System"
    title: "Two microcontrollers, one routine"
    prose:
      - >-
        My side of the build was the electronics across two devices. The cube holds the brain: the
        animated face, the twelve addressable teeth, the sound cues, and the servo that dispenses
        stickers. The second microcontroller lives in the toothbrush, where a motion sensor reads
        whether the child is really brushing and sends that to the cube over a wireless link. Splitting
        the system in two is what lets the routine tell brushing apart from a toothbrush sitting still.
      - >-
        The lit teeth were their own small problem, solved with plexiglass teeth sanded to diffuse the
        light evenly instead of glaring. Each subsystem was brought up on the bench before it went into
        the cube, because in a five-day build there is no time to debug everything at once.

  - label: "Sprint"
    title: "Five days, end to end"
    prose:
      - >-
        The project was a five-day fast-prototyping sprint under the theme "Reminder". Day one
        narrowed a broad brief to one stable, well-defined routine: toothbrushing for children aged
        four to eight. Day two chose and bench-tested the electronics while the cube's form took shape
        in CAD. Day three brought up the embedded program and the tooth lighting and began fabrication.
      - >-
        Day four assembled the cube and added the second microcontroller in the toothbrush, sending
        motion wirelessly. Day five was tuning and reliability, with the sticker dispenser, the
        fussiest mechanism, fighting back until the end. Working that fast forces a discipline I value:
        decide what must work first, and let everything else earn its place only if time allows.

outcome:
  - >-
    A working tangible prototype built in a five-day sprint: a reactive cube and an instrumented
    toothbrush that together guide and validate a two-minute routine.
  - >-
    Brushing that advances only with real motion, a visible twelve-tooth progress sequence, and a
    sticker reward that carries motivation across days rather than a single brush.

reflection: >-
  This is my favourite of the fast-prototyping projects, and the moment that sealed it was the final
  presentation. With work all around the room, and not all of it made for children, the one child
  present walked past everything else and planted himself at BrushBuddy. For a toothbrushing toy, no
  usability score beats that. The five-day format is brutal and clarifying in equal measure: it
  forces you to prove the few things that matter first and trust the rest to follow, and watching a
  kid ignore the adults and play was the proof those few things were the right ones.

gallery:
  - alt: "The finished BrushBuddy cube: a 15cm monster with googly eyes and a mouth of twelve teeth lit in sequence."
    caption: "The cube — a monster buddy, mid-routine."
  - alt: "The instrumented toothbrush with its embedded motion module, docked on top of the cube."
    caption: "The toothbrush — motion sensed at the source."
  - alt: "The twelve teeth lighting up one by one across the mouth, showing brushing progress and order."
    caption: "Twelve teeth — effort made visible."
  - alt: "The cube dispensing a sticker from its slot after twelve completed sessions."
    caption: "The reward — a sticker after twelve sessions."
  - alt: "The electronics of the two-device system: the cube's controller and the toothbrush module communicating wirelessly."
    caption: "Two microcontrollers — cube and brush, talking wirelessly."
  - alt: "The storyboard of the full interaction loop, from removing the brush to the sticker reward."
    caption: "The loop — storyboarded across a session."

prev:
  slug: "an-aura-of-words"
  title: "An Aura of Words — Lugano's parks, told by their reviews"
  image: "/images/work/an-aura-of-words/adjacent.jpg"
  alt: "Lugano's five parks shown on a map, each as a colour-blended organic aura sized by review volume."

next:
  slug: "uefa-female-coaches"
  title: "Why Not You? — the UEFA female coaches campaign"
  alt: "The Why Not You? campaign: bold display typography over a female coach, with the line Lead Your Passion, Shape the Game."
---
