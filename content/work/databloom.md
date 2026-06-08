---
title: "DataBloom"
summary: "A tangible interface that makes the energy impact of digital usage perceptible at home. The flower's stem wilts as the household's weekly data consumption grows, and a light at the centre signals the live data rate."
status: "live"
heroAlt: "DataBloom prototype: a 30cm artificial flower with green stem and ultramarine petals in a terracotta pot, sitting on a kitchen counter. A light glows at the flower's centre."

brief:
  role: "Bachelor thesis, solo"
  year: "2024 — 2025"
  host: "Media Engineering Institute (MEI), HEIG-VD"
  scope: "4 research + 11 build weeks"
  shipped: "Functional prototype + thesis paper"

problem:
  - >-
    Around 8% of Switzerland's electricity goes to digital infrastructure, and the digital
    sector accounts for 3 to 4% of global greenhouse-gas emissions, a share that could double
    or triple by 2030. Half of it comes from data centres and networks, the other half from
    the devices in our hands. Yet to the person using the network, none of it has a body.
  - >-
    Streaming a film, scrolling a feed, backing up to the cloud: all of it feels weightless.
    The infrastructure that carries those gestures stays invisible, so the cost stays
    invisible too, and there is nothing to react to. When an energy bill arrives it is a total
    with no story, and the detailed data, where a portal exists at all, stays out of sight.
  - >-
    The intuitive response (build another app) doubles down on the same problem. It hides the
    feedback behind a tap, in a phone already full of notifications, and only reaches people
    who cared enough to install it. So the brief narrowed. Give a household's digital energy
    use a physical presence in the room where life happens, without asking anyone to sign up,
    open an app, or remember to check.

role:
  led:
    - "Project planning and methodology, a waterfall structure hybridised with Research through Design iterations"
    - "Background research and positioning across tangible interfaces, data physicalization, and Calm Technology"
    - "Concept and industrial design of the flower"
    - "Mechanical design of the articulated stem"
    - "Electronics integration and embedded firmware"
    - "Two rounds of user testing: a comparative low-fidelity test, then an evaluation of the functional prototype"
  contributed:
    - "Methodological calls taken with the mandate and supervisors, such as choosing the first concept by comparative test rather than by decision"
    - "Framing the project against CarbonViz Home, the MEI's existing measurement work"
  notTouched:
    - "CarbonViz Home, the MEI system that measures a household's real digital energy use through a modified router. DataBloom runs on simulated data modelled on it, not on a live feed."
  team: "Solo thesis. Supervised by Olivier Ertz and Jonathan Favre-Lamarine (HEIG-VD), mandated by Stéphane Lecorney (Media Engineering Institute)."

approach:
  - label: "Research"
    title: "Why physicalize the invisible"
    prose:
      - >-
        The literature on eco-feedback points consistently in one direction: data that lives in
        the room people inhabit changes behaviour more reliably than data behind a tap. The Fogg
        behaviour model frames it precisely. A behaviour appears when motivation, ability, and a
        trigger meet at the same moment. A quiet object in the home can be that trigger.
      - >-
        Energy visualization tends to fall into three families. Statistical (charts and
        dashboards), which is precise but ignored. Eco-visual metaphor (a tree wilting inside an
        app), which is engaging but still trapped behind a screen. And ambient physical, objects
        that change with consumption. The third family is the smallest and the most promising,
        because it earns the attention the room already gives the object.
    artifacts:
      - alt: "Comparative matrix of tangible energy projects plotted on two axes: interaction (passive to active) and representation (symbolic to analytical)."
        caption: "Comparative matrix — energy interfaces by interaction and representation."
        decision: "Mapped the design space. The calm, intuitive quadrant (passive and symbolic) was nearly empty, and became the target zone."
        width: "wide"

  - label: "Ideation"
    title: "Two metaphors worth testing"
    prose:
      - >-
        An ideation workshop turned the abstract brief into concrete directions. Two concepts
        went forward. A small expressive character whose world reacted to consumption, and a
        flower whose stem wilted as digital use climbed. Both fit the Calm Technology brief, each
        in a different register: one anthropomorphic, one drawn from nature.
      - >-
        Rather than choose on paper, the mandate and supervisors made a deliberate call: let a
        user test decide between them. That turned the first iteration into a comparison instead
        of a commitment, and kept the decision grounded in how people actually read each object.
    artifacts:
      - alt: "Two early concept renders side by side: a small anthropomorphic character with an animated face, and an artificial daisy in a terracotta pot."
        caption: "The two concepts — expressive character and wilting flower."
        decision: "Both carried real emotional potential. Choosing between them by intuition felt risky, so the choice was handed to a comparative user test."
        width: "wide"

  - label: "First iteration"
    title: "Let the users choose"
    prose:
      - >-
        Both concepts were built as low-fidelity, 3D-printed prototypes. Just enough form to read
        clearly as a character and as a flower, with the complex electronics left out on purpose.
        The point was to test the metaphor, not the engineering.
      - >-
        The flower's prototype did double duty. It tested whether people understood the wilting
        as a warning, and whether the motion was even feasible: a cable run through the stem,
        pulled to bend it, as a simple proof of concept of the movement.
      - >-
        A comparative user test put the two side by side. The flower won clearly. Its metaphor was
        understood without a word of explanation, where the character needed to be read and
        interpreted first. The flower became the object to build for real.
    artifacts:
      - alt: "Two low-fidelity 3D-printed prototypes on a bench: the character with slots for printed e-Ink mockups, and the flower with a visible cable through its stem."
        caption: "Low-fidelity prototypes — both 3D-printed for the comparative test."
        decision: "The flower's metaphor read instantly; the character had to be decoded. Comparative testing made the choice evidence-based, not personal taste."
        width: "wide"

  - label: "Functional prototype"
    title: "An ESP32, a servo, a flower"
    prose:
      - >-
        The flower became a functional prototype. The cable proof of concept was upgraded to a
        servo, driven by an ESP32 that also runs the centre light and a deep-sleep circuit, with
        a local server holding the consumption logic and the device executing posture and light.
        The stem is segmented, 3D-printed, and joined with M2 screws so it can be taken apart.
        The petals are felt, chosen for a warmer and less technical feel. The pot is an ordinary
        terracotta one, so the whole object reads as something that already belongs on a shelf.
      - >-
        Two signals carry the information. The stem's posture shows the household's cumulative
        digital consumption for the week against a personal threshold, set at install and meant
        to tighten over time, nudging consumption gently downward. The light at the centre signals
        the instantaneous data rate on a green-to-red scale. The week resets every Monday. That is
        the entire interaction surface: no screen, no app, no sound.
      - >-
        Routing the wiring through a stem that has to bend was the build's longest quiet fight.
        The first stem was a single printed piece and broke on the third assembly. Splitting it
        into screw-joined segments let the cables flex without snapping, and made every part
        replaceable by hand.
    artifacts:
      - alt: "Two versions of the 3D-printed flower stem: a one-piece version with integrated joints, and the final segmented version joined with M2 screws."
        caption: "Stem iterations — one-piece (broke) → segmented with screws (final)."
        decision: "Segmented assembly cost more parts and longer build time, and bought cable routing plus field repair. For an object meant to live in a home, durability won."
        width: "half"
      - alt: "Close-up of the flower head: the light source seated inside the centre, with felt petals around it."
        caption: "Flower head — light diffused through felt petals."
        decision: "Diffusing the light through the felt rather than exposing it kept the object calm. A dimming curve was added once it proved too bright at night."
        width: "half"

  - label: "Evaluation"
    title: "What the flower changed"
    prose:
      - >-
        The functional prototype went into a second user test. Four participants, with
        deliberately varied living situations (a shared flat, living alone, a couple, a family)
        so the feedback covered a range of homes rather than a single profile.
      - >-
        The protocol compressed a week of digital use into ten minutes. Each participant set a
        personal threshold, worked through a daily activity grid, and watched the flower respond
        live. The stem was read correctly by everyone, with no explanation needed.
      - >-
        The light was the opposite. It drew the eye every time, but its colour code needed
        explaining, and in the sped-up simulation it ended up echoing the stem instead of showing
        the live rate. Its real role could not really be observed, and it became the first thing
        to test properly in a longer study.
      - >-
        The most useful finding was emotional. When the stem visibly bent after a heavy-streaming
        choice, participants changed their next action mid-task. One stopped and said "ça m'a un
        peu freiné quand j'ai vu la réaction." Another reframed her own habits: "je pourrais
        télécharger la musique et l'écouter en local." That register of attention, felt rather
        than calculated, is the whole point of the object.
    artifacts:
      - alt: "A participant at a table during the test, setting a weekly threshold on a laptop while the flower prototype sits beside it."
        caption: "Second user test — a week of use compressed into ten minutes."
        decision: "Watching real reactions mattered more than any score. With four participants, the qualitative signal was the honest one to trust."
        width: "wide"

outcome:
  - >-
    A working functional prototype: stable mechanics, electronics, and firmware, reacting in
    real time to simulated household data.
  - >-
    Strong recognition. Every participant read the wilting without help, and all of them said
    they would place the flower in their own home, mostly in a passing spot like an entry
    table or kitchen counter.
  - >-
    At the thesis defence, the MEI saw a use for it beyond the project: a teaching object, in
    schools or with children, to make the energy cost of internet use tangible. I handed over
    a set of recommendations for taking it further, and the MEI later published a write-up on
    its research blog.

reflection: >-
  The timeline was the real constraint. With the build compressed into eleven weeks, I never
  got to run the second iteration the tests pointed to: a gentler wilting curve, a clearer
  light, and a way for the flower to recover when a household does better. A flower that only
  ever droops eventually stops motivating. Letting it stand back up again is the next version's
  job.

gallery:
  - alt: "DataBloom on a kitchen counter beside a fruit bowl, in afternoon light, stem upright."
    caption: "In use — kitchen counter, stem upright."
  - alt: "Detail of the segmented 3D-printed stem with M2 screw joints visible at each articulation."
    caption: "Stem detail — segmented, screw-joined."
  - alt: "Close-up of the flower's centre, the light diffused through the felt petals."
    caption: "Centre light — diffused through felt."
  - alt: "Workshop bench mid-assembly: the controller board, servo, and the partly-assembled stem laid out."
    caption: "Workshop — components mid-assembly."
  - alt: "The web simulation interface used during testing: a daily activity grid and a threshold setting."
    caption: "Simulation interface — used during testing."
  - alt: "DataBloom on a counter at the end of a simulated heavy-use day, stem bent forward."
    caption: "End of a heavy-use day — stem bent forward."

prev:
  slug: "family-space"
  title: "UBS Family Space — a family's shared place to manage money"
  alt: "UBS Family Space concept: paired mobile screens, a parent overview with limits and goals, and a child's analytics and savings."

next:
  slug: "wematch"
  title: "WeMatch — an AX matching service for the WeRoad world"
  alt: "WeMatch one-pager: an editorial web layout with a Sofia character mark above a large opening quote, restrained typography, generous white space."
---
