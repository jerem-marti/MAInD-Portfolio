---
title: "Human Loci"
summary: "A synesthetic listening object that plays places instead of music. Three plaster disks, each tied to a public space, let you drop its field recording into the room and sit with the atmosphere of somewhere else, chosen by touch before a sound begins."
status: "live"
heroAlt: "Human Loci: a compact transparent acrylic listening box with internal speakers and a tonearm, beside three pigmented plaster disks for a park, a marina, and a train station."

brief:
  role: "Electronics & enclosure integration"
  year: "2025"
  host: "SUPSI · ID120"
  scope: "Team of three"
  shipped: "Working prototype"

problem:
  - >-
    Recorded sound almost always means something made to be heard: music, a podcast, a voice. The
    ordinary acoustic texture of a public place, a park at midday, a marina, a train station, is
    just as rich, and we almost never choose to sit with it. It is the layer that usually stays in
    the background, unnoticed.
  - >-
    Human Loci is a small machine for listening to exactly that. It does not play music; it plays
    places. Each one is reconstructed not as an image but as a presence: its rhythms, its density,
    the human movement that gives it a shape over time. The object is closer to an archive of
    public moments than to a speaker.
  - >-
    The brief was a fast-prototyping course built around making a physical object, so the real
    challenge was turning that concept into a thing you can hold. A screen-free ritual where the
    choice of place is made by touch and colour, and the technology disappears so the place can
    come forward.

role:
  led:
    - "Electronics end to end: the RFID disk reader, the audio playback chain, power and charging, and the firmware"
    - "Integration of the speaker enclosure and the electronics into the transparent body"
    - "System assembly constraints and the general technical drawing"
  contributed:
    - "Co-led ideation and the overall concept with the team"
  notTouched:
    - "The tonearm mechanism and volume wheel (Nerea Asensio)"
    - "The plaster disks and the live-hinge belt pattern (Nicholas Vos)"
  team: "Team of three (Nerea Asensio, Jérémy Martin, Nicholas Vos) for ID120 Digitally Designed Objects for Fast Prototyping at SUPSI, taught by Marco Lurati."

approach:
  - label: "Concept"
    title: "Listening to places, not music"
    prose:
      - >-
        The starting point was the Musipple, an award-winning concept player that reinterprets the
        ritual of vinyl. We borrowed the ritual and changed what it means. Instead of selecting a
        song, you select an environment. Instead of showing a picture of a place, the object
        rebuilds its presence through a looping field recording and a surface you can feel.
      - >-
        That reframing decided everything downstream. Interaction is stripped to three broad,
        legible gestures: place a disk, move the arm to start, turn a wheel for volume. No menus,
        no labels, no screen. Without a disk the device stays silent even if the arm moves, so disk
        and gesture only mean something together. The experience stays in the foreground; the device
        recedes.

  - label: "Electronics"
    title: "Place a disk, hear a place"
    prose:
      - >-
        My core contribution was the electronics, built around one goal: placing a disk should
        automatically start the right soundscape. An RFID reader identifies each disk by a tag, a
        Raspberry Pi Pico 2 runs the state machine, and an audio module stores the recordings and
        drives the speakers. Disk detected: it plays. Disk removed: after a short threshold, it
        stops.
      - >-
        I validated the whole chain on the bench before committing to the build: reliable RFID
        polling, mapping each disk's tag to a track, audio control over a serial link, and the
        volume wheel mapped through the analog input. The firmware is modular, one piece reading
        tags, one routing them to tracks, one wrapping the audio commands, and a main loop holding
        the play-and-stop logic. A simple RFID module on a Pico turned the concept into a working
        system in a couple of hours, which is the part of electronics I still find quietly amazing.
    artifacts:
      - alt: "Electronics architecture diagram: RFID reader and Pico controller feeding an audio module with stereo speaker outputs and LiPo charging."
        caption: "Electronics — RFID to controller to audio, the full signal flow."
        decision: "Built on development modules rather than discrete components. A documented one-line library fix made the audio board work on the Pico toolchain."
        width: "wide"

  - label: "Enclosure"
    title: "Sound inside a transparent shell"
    prose:
      - >-
        The object is transparent on purpose; its construction is part of the experience. That left
        nowhere to hide a speaker or a cable, which made the audio enclosure the hardest integration
        problem. We designed a compact internal speaker module split into two sealed chambers, two
        small drivers each, prioritising airtightness, rigidity, and an assembly that comes apart
        without glue.
      - >-
        We worked up to it in stages: an acrylic single-speaker mock-up to check vibration and the
        printed clamp, a wood prototype of the two-chamber layout to validate alignment and the
        assembly sequence, then the final laser-cut acrylic. The boards mount inside on printed
        supports screwed into heat-set inserts in the acrylic, so the outer surfaces stay clean.
        The engineering only counts when none of it shows.
    artifacts:
      - alt: "A wood two-chamber speaker prototype assembled with finger joints, used to validate the layout before cutting acrylic."
        caption: "Speaker enclosure — wood prototype before the final acrylic."
        decision: "Acrylic looks ideal but cracks under stress at screw holes, so a wood prototype de-risked the geometry and the assembly order first."
        width: "half"
      - alt: "A heat-set threaded insert being installed into the acrylic base to create a clean internal mounting point for the electronics."
        caption: "Mounting — threaded inserts in acrylic, no external screws."
        decision: "Internal printed supports plus inserts kept the transparent shell honest and the assembly reversible."
        width: "half"

  - label: "Materials"
    title: "Disks you read by touch"
    prose:
      - >-
        The disks are the heart of the concept, so they could not be the usual digital-fabrication
        palette of light plastic or laser-cut wood. The team chose plaster for its weight and its
        stone-like presence, tinted and textured so each place has an identity you recognise by
        touch and colour before any sound starts. Touch becomes a real dimension of the work, not a
        finish.
      - >-
        Making them was its own small engineering problem, solved by the team with a laser-cut
        positive, a vacuum-formed negative mould, and pigmented plaster poured and released. The
        same appetite for unfamiliar materials shaped the body's belt, a continuous live-hinge strip
        that lets rigid acrylic bend around the whole object while staying acoustically open. Most of
        the project's time went into trials like these, and the object is better for it.

outcome:
  - >-
    A working synesthetic object. Place a disk, move the arm, and a public place fills the room as a
    continuous atmosphere; lift the disk and it falls silent.
  - >-
    Three places realised (a park, a marina, a train station) from on-site field recordings made and
    edited for the project, each carried by a plaster disk you choose by touch rather than from a
    list.
  - >-
    A fully resolved physical prototype across electronics, audio, and fabrication, documented openly
    with the code and hardware files released under open licenses.

reflection: >-
  The lesson I keep from Human Loci is that a concept without purpose holds about as much value as
  cooking with ingredients that have no flavour. The deep ideation we refused to rush, and Marco's
  push to reinterpret rather than replicate, are what made the object mean something. The technical
  side rewarded the same patience: working with plaster, plexiglass, and vacuum forming for the
  first time only paid off because we let creativity lead first and turned pragmatic second.

gallery:
  - alt: "The transparent acrylic listening box with its tonearm, seen three-quarter, beside the three plaster disks."
    caption: "The object — transparent body, tonearm, three disks."
  - alt: "The three plaster disks for the park, the marina, and the train station, each a different pigment and texture."
    caption: "The disks — park, marina, train station."
  - alt: "A close-up of a plaster disk showing its raised texture and tinted surface, read by touch."
    caption: "Disk detail — material identity you can feel."
  - alt: "The internal speaker box split into two sealed chambers, mounted inside the transparent shell."
    caption: "Speaker enclosure — two sealed chambers."
  - alt: "The full-perimeter live-hinge belt letting rigid acrylic bend around the whole object while staying acoustically open."
    caption: "The belt — rigid acrylic, made to bend and breathe."
  - alt: "The electronics on the bench: an RFID reader and a Raspberry Pi Pico before integration."
    caption: "Electronics — RFID and Pico, bench bring-up."

prev:
  slug: "a-ta-dispo"
  title: "À ta Dispo — matching event volunteers with organizers"
  alt: "À ta Dispo: a matchmaking concept connecting festival volunteers with event organizers."

next:
  slug: "wama"
  title: "Wama — machine learning as a sink-side witness"
  alt: "Phone mounted next to a kitchen sink, showing a small animated character on the screen during dishwashing."
---
