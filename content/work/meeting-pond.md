---
title: "Meeting Pond"
summary: "A pair of connected light objects that let two distant people feel each other's presence without words, notifications, or screens. A tap drops into a pond of light and ripples outward, appearing in real time on the other device, turning presence into a disturbance that travels and fades."
status: "live"
hero: "/images/work/meeting-pond/hero.jpg"
heroAlt: "Two Meeting Pond units standing side by side on a reflective surface in a dark room, one glowing blue and the other pink, each showing a circular ripple across its 32×32 LED grid, their light pooling below."

brief:
  role: "System & interaction build"
  year: "2026"
  host: "SUPSI · ID151"
  scope: "Team of two"
  shipped: "Pair of connected prototypes"

problem:
  - >-
    We are saturated with messages, alerts, and screens. Meeting Pond asks a quieter question:
    can connection be felt through something more ambient and non-verbal than another notification?
    Can presence travel without content?
  - >-
    The project's move is to turn presence into disturbance. Instead of sending text, a user leaves
    a temporary trace of their energy in a shared visual environment. Water is the metaphor because
    it structurally matches a long-distance relationship: a small action in one place radiates
    outward and reaches another, carrying energy rather than matter, then returns to stillness.

role:
  led:
    - "The real-time system connecting two devices: gesture sensing, the pond simulation, and the networking between them"
    - "Embedding the interaction into a self-contained object rather than an external control panel"
    - "Electronics and the LED-matrix display integration"
  contributed:
    - "Concept and the visual language of the pond, with the team"
  notTouched:
    - "The custom frame and object finishing, shared within the team"
  team: "Team of two (Jérémy Martin, Nerea Asensio) for ID151 Programming Interactive Objects at SUPSI, taught by Andreas Gysin."

approach:
  - label: "Concept"
    title: "Presence as disturbance"
    prose:
      - >-
        Early explorations tried signals, marks, and traces, but they all felt too literal, too
        close to conventional messaging. The project converged on the metaphor of a living pond,
        because it let presence be expressed as movement and transformation rather than as content.
      - >-
        A drop is not neutral. It carries the active colour of the sender's pond, and when it
        reaches the other device it mixes briefly with the local colour, a temporary blend that
        stands for a shared moment. The interaction is relational by design: the gesture is both an
        action and a visual imprint of the person who made it.

  - label: "Constraint"
    title: "Designing for a 32×32 grid"
    prose:
      - >-
        The display is a low-resolution LED matrix, and that limit became the design opportunity. At
        thirty-two by thirty-two pixels there is no room for detail, so the language has to be
        abstraction, light, and motion. A ripple reads perfectly at low resolution because it is
        pure dynamics: a disturbance that spreads and decays.
      - >-
        Each unit is a self-contained object, the matrix and its electronics hidden inside a custom
        frame so the device reads as a single luminous surface, closer to a glowing painting than a
        gadget. The technical parts disappear so the pond can be the whole experience.
    artifacts:
      - alt: "A single 32×32 LED matrix filling the frame in a dark room, green light forming a soft disturbance across the grid with every pixel distinct."
        caption: "The 32×32 surface — a disturbance read in pure light."
        decision: "The grid's limit pushed the language down to motion: a ripple is legible precisely because it has no detail to lose."
        width: "wide"
        src: "/images/work/meeting-pond/artifact-constraint.jpg"

  - label: "Interaction"
    title: "An interface you cannot see"
    prose:
      - >-
        An early version exposed parameters like ripple size and speed through an external control
        interface. We abandoned it in favour of a fully embodied model where every control lives in
        the object itself, read through the camera as hand movement.
      - >-
        Three gestures carry everything. A tap releases a drop. Moving a hand horizontally changes
        the pond's colour; moving it vertically changes the intensity of the field. No buttons, no
        menus. That shift, from a parameter panel to bodily gesture, is what turned a technical setup
        into a coherent object where interaction, form, and meaning hold together.
    artifacts:
      - alt: "A system diagram: each person's hand gestures are read by a smartphone running MediaPipe and a water simulation, which streams RGB565 frames to a WebSocket server that drives the ESP32 LED matrices and forwards each drop event to the other person's pond."
        caption: "The real-time system behind two connected ponds."
        decision: "One WebSocket server bridges each phone's gestures to both matrices, so a drop in one pond surfaces in the other in real time."
        width: "full"
        src: "/images/work/meeting-pond/artifact-interaction.png"

outcome:
  - >-
    A working pair of connected light objects. A tap on one ripples across both surfaces in real
    time, with the sender's colour briefly blending into the receiver's pond.
  - >-
    A self-contained, screen-free interaction: gesture in, light out, with the whole system
    (sensing, simulation, and networking) embedded in the object instead of a separate controller.
  - >-
    An interaction deliberately ephemeral. Ripples fade and the surface returns to stillness, so
    there is no archive, no pressure to reply, and no record of missed moments, only presence.

reflection: >-
  Meeting Pond taught me how much a hard constraint can give you. A thirty-two pixel grid sounds
  limiting until it forces every idea down to motion and light, which is exactly where the project
  found its voice. The harder discipline was resisting the urge to add features: the moment we
  removed the control panel and trusted a few gestures, the object finally meant what we wanted it
  to mean.

gallery:
  - alt: "A single Meeting Pond unit standing in a dark room, glowing a calm even blue across its 32×32 LED grid, its light pooling on the surface below."
    caption: "Idle — a calm pond, present without demanding attention."
    src: "/images/work/meeting-pond/gallery-idle.jpg"
  - alt: "The LED matrix showing violet light radiating outward just after a drop lands, the individual pixels of the 32×32 grid clearly visible."
    caption: "A drop — ripples spread across the surface."
    src: "/images/work/meeting-pond/gallery-drop.jpg"
  - alt: "The two connected units side by side, one glowing green and the other magenta, each showing its own rippling pond of light."
    caption: "Two ponds — a gesture here, a ripple there."
    src: "/images/work/meeting-pond/gallery-twoponds.jpg"
  - alt: "A single pond where green, blue and magenta light mix across the grid, a received drop briefly blending its colour into the local pond."
    caption: "Blend — the sender's colour, mixing into yours."
    src: "/images/work/meeting-pond/gallery-blend.jpg"
  - alt: "The build laid out on a light surface: the 32×32 LED matrix panel, a power bank, a USB cable, a smartphone, and the small ESP32 board with its antenna and battery harness."
    caption: "The parts — the matrix, the ESP32, power, and the phone that senses and simulates."
    src: "/images/work/meeting-pond/gallery-components.jpg"

resources:
  - type: github
    title: "Source code — server, web client, and ESP32 firmware"
    url: "https://github.com/jerem-marti/MAInD-ID151.01-2026-MissingDrop"
  - type: video
    title: "Walkthrough"
    poster: "/images/work/meeting-pond/video-poster.jpg"
    src: "/videos/meeting-pond/walkthrough.mp4"

card:
  title: "Meeting Pond — connected light objects for distant presence"
  alt: "Two connected Meeting Pond units standing side by side, one glowing blue and the other pink, each showing ripples across a 32×32 LED grid."
  image: "/images/work/meeting-pond/adjacent.jpg"
---
