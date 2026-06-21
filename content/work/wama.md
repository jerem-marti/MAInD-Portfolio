---
title: "Wama"
summary: "A quiet machine-learning companion that lives beside the sink. Wama senses your presence and the running tap with a trained vision model, reads a simple hand gesture, and answers through an animated character, treating ML as a witness rather than an optimiser."
status: "live"
heroAlt: "Wama running on a phone in a laser-cut wooden holder at a built sink rig: a tap pours into a clear basin while the screen shows a small blue cloud character."
hero: "/images/work/wama/hero.jpg"

brief:
  role: "Integration & development"
  year: "2026"
  host: "SUPSI · ID131"
  scope: "Team of three"
  shipped: "Working PWA prototype"

problem:
  - >-
    Dishwashing sits at a strange threshold. It is physical enough to keep you in the room, but
    automatic enough to leave your mind somewhere else entirely. That gap, between bodily presence
    and mental absence, is the territory Wama was built for.
  - >-
    The question was deliberately not how to make the task more efficient. It was whether that
    drift could be acknowledged, even held, by something in the environment. Wama is closer to a
    ritual object that happens to use a camera than to a productivity tool.
  - >-
    The course, Intelligence as a Material, framed the real provocation: an ML system can act as a
    witness rather than an optimiser. It can notice without demanding resolution. That reframing,
    and the ethical line it runs straight into (presence-sensing at home can drift into
    surveillance), is the design problem at the heart of the project.

role:
  led:
    - "Integrating the team's parts into one working app: the interface and character from one teammate, the local ML detection from another"
    - "Restructuring and cleaning the largely AI-generated code into a professional, maintainable build"
    - "Building the physical sink prop used for testing and the final demo"
  contributed:
    - "Concept and ideation with the team"
  notTouched:
    - "The character design and animation (Jennifer Lee)"
    - "The MediaPipe and Teachable Machine detection code (Annabelle Conron)"
  team: "Team of three (Jennifer Lee, Annabelle Conron, Jérémy Martin) for ID131 Intelligence as a Material at SUPSI, taught by Matteo Loglio."

approach:
  - label: "Concept"
    title: "A witness, not an optimiser"
    prose:
      - >-
        Most ML in the home is sold as optimisation: do the task faster, track the metric, close the
        loop. Wama refuses that register. Drawing on ambiguous loss theory, the idea that attention
        can exist without clear resolution, the character was given a disposition that notices but
        never instructs. It holds a register rather than issuing a correction.
      - >-
        That single decision shaped everything. There is no water meter, no counter, no
        gamification. Environmental concern is expressed through the character's worried affect when
        the tap runs unattended, which keeps the whole experience in the register of feeling rather
        than accounting.

  - label: "Sensing"
    title: "Reading the sink, on the device"
    prose:
      - >-
        Wama reads the scene from a small vision model trained on four situations: nobody there, a
        person arrives, the water runs with someone present, and the water runs with nobody there. A
        hand-tracking model adds one gesture, thumbs up or down held for half a second, because hands
        at a sink are wet and busy. That is the whole input.
      - >-
        What matters as much as the sensing is where it happens. Everything runs locally, in the
        browser on the phone, with no server and nothing uploaded. That single architectural choice
        is the project's ethical position made concrete. A device can watch your kitchen sink only
        because what it sees never leaves the room. Presence-sensing at home is one short step from
        surveillance, and keeping the model on the device is how Wama refuses to take that step.
    artifacts:
      - src: "/images/work/wama/artifact-sensing.jpg"
        alt: "A two-by-two matrix mapping presence against running water into the model's four classes, each tied to a character response: sleeps, greets, accompanies, and a highlighted worried state when the tap runs with no one there."
        caption: "The four-class vision model: presence × water."
        decision: "Framing the scene as presence times water, not litres, is what lets the character carry concern instead of a meter."
        width: "wide"

  - label: "Response"
    title: "A character, not a dashboard"
    prose:
      - >-
        Wama's presence is carried entirely by an animated character and short sounds, never text or
        notifications during the task. It greets you when you arrive, settles in while the water
        runs, and after a while asks once whether you want music. When the tap runs with nobody
        there, it simply looks worried.
      - >-
        That worry is the environmental message. There is no water meter, no counter, no
        gamification: the concern is expressed as affect, which keeps the whole thing in the register
        of feeling rather than accounting. The character work that makes this land was a teammate's;
        my job was to make it run.
    artifacts:
      - src: "/images/work/wama/screen-askmusic.jpg"
        alt: "The Wama app asking 'Want Some Music?' with a thumbs up for yes and thumbs down for no, the cloud character holding up a small jukebox."
        caption: "Asks once if you want music."
        decision: "A thumb up or down held briefly, never a tap, is the one input that works with wet, busy hands."
        width: "half"
      - src: "/images/work/wama/screen-musicplaying.jpg"
        alt: "The Wama app playing music: the cloud character with eyes closed, swaying, small music notes rising beside it."
        caption: "Plays along when you say yes."
        decision: "Music is the only thing Wama ever offers, and only once, so it stays a companion rather than a nag."
        width: "half"
      - src: "/images/work/wama/screen-worried.jpg"
        alt: "The Wama app worried: the cloud character looks anxious over a rising blue water level, with the line 'I still hear the water but I don't see you'."
        caption: "Worries when the tap runs alone."
        decision: "The worried face is the entire environmental signal. No counter, no litres, just concern."
        width: "wide"

  - label: "Integration"
    title: "Bringing three parts into one product"
    prose:
      - >-
        My real contribution was turning three separate pieces into one coherent thing: a teammate's
        interface and character animation, another's local-ML detection with MediaPipe and Teachable
        Machine, and the interaction logic that ties states to responses. A lot of it started as
        AI-generated code: fast to produce, messy to trust.
      - >-
        So the work was a developer's work. Restructuring that code into something clean and
        maintainable, making the parts talk to each other reliably, and using AI as a tool inside a
        professional structure rather than letting it set the structure. I also built the physical
        sink prop the whole thing was tested and demoed on, because an interaction about a sink has
        to be tried at one.

outcome:
  - >-
    A working companion that runs entirely on a phone mounted at the sink, waking, greeting,
    accompanying, and worrying in real time from a single camera feed.
  - >-
    Three separate workstreams (sensing, character, and interaction logic) merged and cleaned into
    one coherent app, with a purpose-built sink prop to test and demo it on.
  - >-
    Local-only by design. All processing stays in the browser, so presence-sensing never becomes
    data collection, which is the project's clearest answer to its own ethical brief.

reflection: >-
  Wama was my first hands-on experience with machine learning, and the course was really a discovery:
  a chance to see how these new sensing and interaction modes could become part of a design project
  at all. What stuck was less the model than the framing around it. An agent that notices without
  optimising, and the realisation that keeping the processing on the device is what lets a sink
  companion stay on the right side of surveillance rather than drift into it.

gallery:
  - src: "/images/work/wama/gallery-01-hello.jpg"
    alt: "The full Wama sink rig seen head-on, tap closed, the phone in its laser-cut holder showing a smiling blue cloud."
    caption: "Detected — Wama wakes and greets."
  - src: "/images/work/wama/gallery-02-working.jpg"
    alt: "The sink rig with the tap running into the clear basin, the character settled on screen while the water flows."
    caption: "Task active — accompanying the task."
  - src: "/images/work/wama/gallery-03-arm.jpg"
    alt: "A hand reaching in to open the blue tap handle over the basin, the phone showing Wama mid-task."
    caption: "Tested at a real sink — a hand at the tap."
  - src: "/images/work/wama/gallery-04-holder.jpg"
    alt: "Close-up of the finger-jointed plywood holder engraved Wama, the phone showing the blue cloud greeting."
    caption: "The companion up close — character and laser-cut holder."

resources:
  - type: github
    title: "Source code"
    url: "https://github.com/jerem-marti/MAInD-Intelligence_As_A_Material-2026-Wama"

prev:
  slug: "human-loci"
  title: "Human Loci — a synesthetic listening object"
  alt: "Human Loci: a transparent acrylic listening box with three plaster disks for a park, a marina, and a train station."
  image: "/images/work/human-loci/adjacent.jpg"

next:
  slug: "an-aura-of-words"
  title: "An Aura of Words — Lugano's parks, told by their reviews"
  image: "/images/work/an-aura-of-words/adjacent.jpg"
  alt: "Lugano's five parks shown on a map, each as a colour-blended organic aura sized by review volume."
---
