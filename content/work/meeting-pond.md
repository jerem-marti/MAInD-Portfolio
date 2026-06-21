---
title: "Meeting Pond"
summary: "A pair of connected light objects that let two distant people feel each other's presence without words, notifications, or screens. A tap drops into a pond of light and ripples outward, appearing in real time on the other device, turning presence into a disturbance that travels and fades."
status: "live"
heroAlt: "Meeting Pond: a wall-mounted light object built around a 32×32 LED matrix in a custom frame, displaying ripples spreading across a luminous surface."

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
  - alt: "A Meeting Pond unit mounted on a wall like a luminous painting, its LED surface showing a calm idle pond of light."
    caption: "Idle — a calm pond, present without demanding attention."
  - alt: "Ripples radiating across the 32×32 LED matrix just after a drop lands on the surface."
    caption: "A drop — ripples spread across the surface."
  - alt: "The two connected units side by side: a tap on one appears as ripples on the other in real time."
    caption: "Two ponds — a gesture here, a ripple there."
  - alt: "A hand moving above a unit: a tap releases a drop, horizontal motion changes colour, vertical motion changes intensity."
    caption: "Gesture — the whole interface is the hand."
  - alt: "The internal components inside the custom frame: the LED matrix, a Wi-Fi microcontroller, a camera, and the power system."
    caption: "Inside — matrix, microcontroller, camera, battery."
  - alt: "A received drop entering the local pond and briefly blending its colour with the sender's, a shared moment."
    caption: "Blend — the sender's colour, mixing into yours."

prev:
  slug: "goldilocks-worlds"
  title: "Goldilocks Worlds — making exoplanet habitability legible"
  alt: "Dark, space-like data-story scene: an exoplanet plot with a habitable-zone constraint band and an explanation sidebar."

next:
  slug: "brushbuddy"
  title: "BrushBuddy — a monster cube that guides two-minute toothbrushing"
  image: "/images/work/brushbuddy/adjacent.jpg"
  alt: "A hand lifts the toothbrush from the dock on top of the BrushBuddy cube, which has a worried yellow monster face."
---
