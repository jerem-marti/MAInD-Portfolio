---
title: "ELEN"
summary: "A speculative camera that photographs the invisible. ELEN detects the Wi-Fi and Bluetooth signals saturating a room and renders each one as a spectral entity drifting across a live video feed, reframing wireless infrastructure as a contemporary kind of haunting."
status: "live"
heroAlt: "ELEN device: a handheld camera with a 3D-printed body, laser-cut plexiglass panels, and orange accents. Its screen shows a live video feed overlaid with drifting spectral fluid entities."

brief:
  role: "Software & signal engineering"
  year: "2026"
  host: "SUPSI · ID212 Spatial Experiences"
  scope: "Team of three"
  shipped: "Working prototype, exhibited"

problem:
  - >-
    We move through dense clouds of wireless signal all day. Wi-Fi, Bluetooth, the constant
    chatter of connected devices. The infrastructure of connected life is everywhere around us,
    and we perceive none of it.
  - >-
    The course asked for a "magical camera": a speculative device that extends human perception
    beyond its natural limits. Our question followed directly. What if a camera could photograph
    the wireless presences filling a room?
  - >-
    The framing came from Shadow Creatures, the research thread of Marco De Mutiis, digital curator
    at Fotomuseum Winterthur, who studies how networked and algorithmic technologies see. It traces
    a line from nineteenth-century spirit photography to computational imaging. Ghosts are no longer
    supernatural; they are infrastructural. ELEN is a camera for those ghosts.

role:
  led:
    - "The complete software architecture, from wireless monitoring through to the live visual overlay"
    - "The signal-to-entity translation, turning raw radio data into the behaviour of each apparition"
    - "Hardware integration, the camera, motion sensing, battery monitoring, and controls"
    - "Technical documentation of the system"
  contributed:
    - "Co-led ideation and concept with the team"
    - "Photo and video documentation"
  notTouched:
    - "The physical enclosure and its retro-futuristic aesthetic (Nicholas Vos)"
    - "The visual identity and the fluid-simulation look (Nerea Asensio)"
  team: "Team of three (Jérémy Martin, Nerea Asensio, Nicholas Vos) for ID212 Prototyping Spatial Experiences at SUPSI. Taught by Leonardo Angelucci, a Zürich-based designer and coder, and Marco De Mutiis, digital curator at Fotomuseum Winterthur."

approach:
  - label: "Framing"
    title: "Ghosts are infrastructural"
    prose:
      - >-
        Speculative design earns its strangeness by being precise about the thing it makes strange.
        Shadow Creatures gave us the lineage: imaging technologies have always been used to perceive
        what the eye cannot, from spirit photography to thermal and computational cameras. We took
        the idea literally and pointed it at the wireless layer.
      - >-
        That decided the project's register. ELEN is not a data visualization with a spooky skin.
        It is a camera whose subject happens to be the electromagnetic presence of the people and
        devices in a space, treated with the seriousness the ghost metaphor deserves.
    artifacts:
      - alt: "A conceptual board linking historical spirit photography to modern wireless-signal imaging, under the Shadow Creatures framing."
        caption: "Conceptual framing — from spirit photography to infrastructural haunting."
        decision: "Committing to the haunting as a real subject, not a visual style, kept every later technical choice in service of perception rather than decoration."
        width: "wide"

  - label: "Measurement"
    title: "From metaphor to signal"
    prose:
      - >-
        A ghost you invent is decoration. A ghost you measure is an image. The project only became
        real once the apparitions were driven by the actual radio emissions in the room, so the
        camera's true sensor is not its lens but a wireless antenna in passive monitor mode.
      - >-
        It listens without connecting to anything, capturing each transmission's signal strength
        and a device identifier. Those identifiers are sensitive, so they are hashed and salted the
        moment they arrive and never stored. ELEN reveals presence without surveilling identity,
        which is the difference between a poetic instrument and a tracking device.
    artifacts:
      - alt: "A diagram of the detection stage: passive wireless monitoring capturing signal strength and anonymized identifiers."
        caption: "Detection — passive monitoring, identifiers hashed on arrival."
        decision: "Anonymizing every identifier at the source was a design ethic, not an afterthought. The camera shows that something is present, never who."
        width: "wide"

  - label: "Translation"
    title: "From signal to apparition"
    prose:
      - >-
        The heart of my work was the translation layer. Each detected signal is normalised and fed
        into a real-time fluid simulation running in the browser, where it injects particles into a
        shared turbulent field. Signal strength sets an entity's scale, the number of devices sets
        the density of the field, and network activity drives how fast it all moves.
      - >-
        The whole pipeline runs live: wireless monitoring feeding a reducer, a backend streaming the
        camera and the signal state, and a visual layer compositing apparitions over the video at
        sixty frames a second. Holding that frame rate while signals appeared and dissolved in real
        time was the engineering that made the illusion convincing.
    artifacts:
      - alt: "The signal-to-entity mapping: signal strength to apparition size, device count to density, network activity to motion, rendered as a fluid field."
        caption: "Translation — strength to scale, count to density, activity to motion."
        decision: "Mapping radio characteristics directly to fluid behaviour made the entities feel derived from the signal rather than designed to look like ghosts."
        width: "wide"

  - label: "The object"
    title: "A camera you scan with your body"
    prose:
      - >-
        ELEN is handheld and deliberately physical. You power it from the back, capture a moment or
        open the gallery from two front buttons, and explore by turning through the space. Motion
        sensing lets the apparitions hold their place in the room as you move, so scanning feels
        like looking rather than browsing a screen.
      - >-
        Nicholas designed the retro-futuristic enclosure, a 3D-printed chassis with laser-cut
        plexiglass and orange accents that reads like a piece of speculative field equipment. Nerea
        shaped the visual identity and the look of the fluid. My part was making the sensing, the
        translation, and the hardware hold together in real time without dropping a frame.

outcome:
  - >-
    A working handheld prototype. Real-time wireless detection, translated into a living spectral
    overlay that responds to the devices actually present in a space.
  - >-
    ELEN was built for the Shadow Creatures exhibition brief at Fotomuseum Winterthur. Marco De
    Mutiis appreciated the project but did not select it: it read as product design more than art,
    too resolved as an object.
  - >-
    After the course it found its room anyway, selected for Milan Design Week in the digital
    design programme.

reflection: >-
  The most useful feedback was the rejection. "Too product design, not artsy enough" is fair, and
  worth sitting with: we engineered a clean, resolved object for a brief that rewarded ambiguity
  and rough edges. The same instinct that makes me a good systems builder made the piece read as
  finished where art wanted it open. That the project then fit Milan Design Week says it found the
  right room in the end. The lesson I kept is to know which room I am designing for before I start
  resolving things.

gallery:
  - alt: "ELEN held in two hands, screen showing the live feed with spectral entities drifting across a room."
    caption: "In use — scanning a room by hand."
  - alt: "The 3D-printed and plexiglass enclosure with orange accents, seen from the front."
    caption: "The object — speculative field equipment."
  - alt: "A close-up of the screen: fluid spectral entities of different sizes over a live video background."
    caption: "Apparitions — scaled by signal strength."
  - alt: "The system architecture diagram: wireless monitor, reducer, backend, and WebGL overlay."
    caption: "The pipeline — monitor to overlay, running live."
  - alt: "A captured ELEN snapshot saved to the gallery, freezing one moment of the invisible layer."
    caption: "A capture — one moment of the invisible layer."
  - alt: "ELEN with its custom interlocking cardboard packaging."
    caption: "Packaging — interlocking, fastener-free."

prev:
  slug: "bereal"
  title: "Re-coding BeReal — a dual-camera capture and image pipeline"
  alt: "A BeReal-like capture screen: front and back cameras firing simultaneously, the rear photo full-frame with the front-camera selfie inset."

next:
  slug: "beau-rivage"
  title: "Beau-Rivage Eco-Redesign — a 95% lighter luxury hotel site"
  alt: "The redesigned Beau-Rivage Palace site: restrained, elegant, far lighter than the original."
---
