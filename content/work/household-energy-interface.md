---
title: "Household energy interface"
summary: "A tangible interface that made domestic energy use legible without requiring an app."
status: "live"
heroAlt: "An oak block sitting on a kitchen counter with a column of softly backlit segments along one edge."
meta:
  role: "Bachelor thesis"
  year: "2024 – 2025"
  host: "HEIG-VD"
  scope: "6 months · solo"
  shipped: "Working prototype, in active use at the host institution"

problem:
  - >-
    Swiss households receive an energy bill every two months and a smart-meter portal nobody
    opens. The data exists; the moment of attention does not. Field interviews with eleven
    families surfaced the same shape of problem from very different houses: people had no
    idea where the energy went, and the tools meant to tell them assumed a kind of curiosity
    that the kitchen on a Tuesday evening doesn't have.
  - >-
    The intuitive instinct (ship another app) fails twice. It adds a notification surface in
    a home already saturated with them, and it puts feedback behind a tap, which means the
    feedback only reaches people who already cared. The households that most needed legible
    energy data were the ones least likely to install the app that delivered it.
  - >-
    The brief became narrower as a result: make the household's own energy consumption
    legible in the room where it happens, without asking anyone to install, sign up, or
    remember.

role:
  led:
    - "Field research (11 households, contextual interviews and home tours)"
    - "Concept and industrial design of the tangible device"
    - "Firmware on the ESP32 microcontroller and the calibration routine"
    - "Six-week in-home evaluation and write-up"
  contributed:
    - "Enclosure fabrication, with the HEIG-VD prototyping workshop"
    - "Statistical review of meter data, with the thesis supervisor"
  notTouched:
    - "Power-line communication firmware (used as-is from the meter vendor)"
  team: "Solo thesis, supervised by Prof. M. Bujard (HEIG-VD). Workshop support from R. Pellet."

approach:
  - label: "Research"
    title: "Eleven homes, two questions"
    prose:
      - >-
        Every interview asked the same two things, in the same order. Where do you think
        your energy goes? And when, in a given week, do you actually think about it? The
        answers diverged on the first question and converged on the second: almost no one
        thinks about it, except briefly, when the bill arrives.
      - >-
        The synthesis isolated three behavioural surfaces where attention does exist in
        the home: the kitchen counter, the entry table, and the bathroom shelf. Anything
        that wanted to be seen had to live on one of those three surfaces, or it would
        not be seen.
    artifacts:
      - alt: "Marked-up transcripts pinned to a wall, with yellow tape grouping recurring phrases."
        caption: "Affinity diagram — 11 transcripts, 312 quotes."
        decision: 'Grouping by surface (kitchen / entry / bathroom) instead of by topic shifted the brief from "app" to "object on a counter."'
        width: "wide"
      - alt: "Pencil sketches of where in a home an ambient device could sit."
        caption: "Surface map — household zones where ambient attention exists."
        decision: "Kitchen counter selected as the canonical site. Bathroom shelf rejected (humidity, supervised electronics)."
        width: "half"
      - alt: "Sample of marked-up household energy bills."
        caption: "Energy bills, annotated by participants during interviews."
        decision: "Bills are the only existing energy artifact people read. They became the typographic reference for the device's display."
        width: "half"

  - label: "Synthesis"
    title: "From data to a single legible number"
    prose:
      - >-
        Smart meters expose dozens of channels. Most of them are noise to a household: the
        question is not "how many watts" but "is this normal for a Tuesday at 7pm." The
        device's information design problem reduced to picking one number, calibrated to
        the household, that answers that question without phrasing.
      - >-
        Calibration runs for two weeks after installation. The device learns the home's own
        rhythm and then displays deviation, not absolute consumption (which turned out to
        be the only framing participants could act on).
    artifacts:
      - alt: "Spread of typed notes and printed charts comparing display options, with yellow highlighter marking the chosen approach."
        caption: "Display study — eight ways to render a single household-relative number."
        decision: '"Deviation from your own normal" beat absolute kWh in every comprehension test. Kept the bar chart, dropped the digits.'
        width: "full"

  - label: "Concept"
    title: "An object that is a graph"
    prose:
      - >-
        The chosen form: an oak block, the footprint of a paperback, with a column of seven
        softly-backlit segments along one edge. The segments are the household's last seven
        days, vertically. The top segment is today. The brightness of each segment encodes
        deviation from the household's own baseline, not from a national average. There is
        no screen, no app, no notification.
      - >-
        The object's design constraint was that it had to look at home on a kitchen counter
        without explanation. The first three industrial design rounds failed this test:
        they read as gadgets. The fourth, after a workshop conversation about how cutting
        boards earn their place, dropped to oak and unfinished brass.
    artifacts:
      - alt: "Series of sketched and milled enclosure prototypes lined up on a bench, oldest to newest."
        caption: "Industrial design rounds, R1 → R4, left to right."
        decision: 'R1–R3 read as gadgets in living-room photos. R4 (oak, unfinished brass) passed the "does this look at home" test with 9/11 households.'
        width: "wide"

  - label: "Prototyping"
    title: "Three weeks of firmware, one week of paper"
    prose:
      - >-
        The first working unit ran on a breadboard and a desk lamp emulating the kitchen
        light. It exposed two problems that the design rounds had not: the segments were
        illegible under direct lamp light, and the calibration window was too short to be
        stable on a household with shift workers.
      - >-
        Both fixes were unglamorous: the segments moved behind a brushed acrylic diffuser,
        and the calibration window grew from one week to two. Neither was visible in the
        final object, which is the correct outcome.
    artifacts:
      - alt: "Breadboard prototype on a workbench with handwritten yellow sticky notes labelling each component."
        caption: "Breadboard unit, week 3 — first end-to-end signal path."
        decision: "Revealed direct-light legibility failure within an hour of being moved to a real kitchen. Diffuser added on the next iteration."
        width: "full"

  - label: "Validation"
    title: "Six weeks in eleven kitchens"
    prose:
      - >-
        Eleven units were deployed for six weeks across the original research households.
        The evaluation was deliberately small and deliberately long: the relevant question
        was not whether people noticed the device in the first week, but whether they were
        still noticing it in the sixth. Weekly diary entries and end-of-study interviews
        captured both.
      - >-
        Nine of the eleven households reported at least one specific behaviour change
        attributable to the device. Two reported none, which is also a finding. Both lived
        alone and reported that the device told them what they already knew about their
        own use.
    artifacts:
      - alt: "Photograph of one of the deployed devices on a kitchen counter next to a fruit bowl."
        caption: "Unit H-07, week 4 — in situ on the kitchen counter."
        decision: "Counter placement persisted in 10/11 households across six weeks. Validated the surface hypothesis from the research phase."
        width: "half"
      - alt: "Diary page with handwritten notes and yellow highlighter marking key moments."
        caption: "Participant diary, household H-04."
        decision: "Yellow-highlighted entries by the participant became the reference signal for what the device actually changed."
        width: "half"

outcome:
  - >-
    Eleven working units. Nine households continued to use the device after the study
    ended, on their own counters, unprompted. The host institution retained four units
    for an ongoing pilot.
  - >-
    The thesis was awarded distinction. The calibration routine is now a small
    open-source library used by one other student project at HEIG-VD.

reflection: >-
  If I ran the study again I would extend it past three months. The interesting question is
  not whether the device works in week six but whether it still does in month six, when
  novelty has fully worn off. I also did not test the device with households outside the
  canton, and I suspect the surface hypothesis would not survive a different domestic
  architecture.

gallery:
  - alt: "Unit H-02 sitting on a kitchen counter with afternoon light from a side window."
    caption: "Unit H-02, in use."
  - alt: "Detail of the unfinished brass insets along one edge of the R4 enclosure."
    caption: "Brass detail, R4 enclosure."
  - alt: "The device's calibration display showing the two-week learning window completion."
    caption: "Calibration window, after two weeks."
  - alt: "Workshop bench showing the transition between R3 and R4 prototypes side by side."
    caption: "Workshop, R3 → R4 transition."
  - alt: "Stack of annotated household energy bills used as the typographic reference."
    caption: "Bills, the typographic reference."
  - alt: "Unit H-09 still in place on the same counter after six weeks of in-home use."
    caption: "Unit H-09, week 6."

prev:
  slug: "primary-sources-reader"
  title: "Reading interface for primary sources"
  alt: "A two-column reading layout with marginalia connected to inline citations by hairline lines."

next:
  slug: "ai-evaluation-framework"
  title: "Evaluation framework for AI features"
  alt: "A printed evaluation rubric annotated by hand with yellow tape marking the disagreement rows."
---
