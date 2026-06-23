---
title: "ELEN"
summary: "A speculative camera that photographs the invisible. ELEN detects the Wi-Fi and Bluetooth signals saturating a room and renders each one as a spectral entity drifting across a live video feed, reframing wireless infrastructure as a contemporary kind of haunting."
status: "live"
heroAlt: "ELEN, a handheld camera with a translucent orange 3D-printed body and twin white handles, lit on a grey studio backdrop. Its deep-blue screen and internal wiring show through the plexiglass."
hero: "/images/work/elen/hero.jpg"

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
      - src: "/images/work/elen/artifact-measurement.jpg"
        alt: "ELEN's system diagram: passive Wi-Fi and Bluetooth monitoring captures signal strength and device identifiers, which are anonymized, normalized, and mapped to the live visual render."
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
      - src: "/images/work/elen/artifact-translation.jpg"
        alt: "An ELEN capture on a terrace overlooking Lugano: translucent coloured apparitions of different sizes drift over the scene, each tagged with an anonymized hexadecimal identifier."
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
    artifacts:
      - src: "/images/work/elen/artifact-object.jpg"
        alt: "A visitor holds ELEN up in both hands in an indoor public space, framing the room through its screen, the orange body glowing against the daylight behind."
        caption: "In the hand — scanning the space by turning through it."
        decision: "Motion sensing lets the apparitions hold their place in the room as you move, so scanning feels like looking rather than browsing a screen."
        width: "wide"

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
  - src: "/images/work/elen/gallery-01.jpg"
    alt: "A person holds ELEN up in both hands outdoors, framing the space through its screen, the translucent orange body lit by daylight."
    caption: "In use — scanning the space by hand."
  - src: "/images/work/elen/gallery-02.jpg"
    alt: "ELEN at a three-quarter angle on a grey backdrop: translucent orange body, white frame and twin handles, antenna, and the deep-blue screen."
    caption: "The object — speculative field equipment."
  - src: "/images/work/elen/gallery-03.jpg"
    alt: "An ELEN capture of a lakeside promenade: pale spectral blobs of different sizes drift over the scene, each tagged with an anonymized identifier."
    caption: "Apparitions — scaled by signal strength."
  - src: "/images/work/elen/gallery-04.jpg"
    alt: "The back of ELEN seen through the orange plexiglass: the Raspberry Pi, camera module, wiring, and battery, with the team's engraving."
    caption: "The hardware — Raspberry Pi, camera, and antenna."
  - src: "/images/work/elen/gallery-05.jpg"
    alt: "An ELEN capture inside a baroque church: faint spectral presences drift among the gilded altar, angels, and frescoes."
    caption: "A capture — one moment of the invisible layer."
  - src: "/images/work/elen/gallery-06.jpg"
    alt: "ELEN in its open packaging: the device nestled in foam inside the interlocking white box, with its antenna and a printed brochure."
    caption: "Packaging — interlocking, fastener-free."

resources:
  - type: web
    title: "Digital Design Week, Milan Design Week"
    url: "https://www.ddweek.com/projects/6c1b9d00-31b4-41a4-8266-60bf49777fbf"
  - type: web
    title: "Niwwrd: Digital Design Week report"
    url: "https://www.niwwrd.com/post/digital-design-week-2026-what-stood-out-as-it-closes"
  - type: web
    title: "Niwwrd on Instagram: Digital Design Week picks"
    url: "https://www.instagram.com/p/DXeyH-NGswr/"
  - type: github
    title: "Source code and documentation"
    url: "https://github.com/jerem-marti/MAInD-Prototyping_Spatial_Experiences-2026"
  - type: video
    title: "Project walkthrough"
    poster: "/images/work/elen/video-poster.jpg"
    src: "/videos/elen/walkthrough.mp4"
  - type: video
    title: "Exhibition film, Saceba"
    poster: "/images/work/elen/exhibition-poster.jpg"
    src: "/videos/elen/exhibition-saceba.mp4"
  - type: pdf
    title: "Brochure"
    url: "/files/elen-brochure.pdf"

card:
  title: "ELEN — a speculative camera for invisible wireless presences"
  image: "/images/work/elen/adjacent.jpg"
  alt: "ELEN, a handheld camera with a translucent orange body and twin white handles, lit on a grey studio backdrop, its deep-blue screen showing through the plexiglass."
---
