---
title: "Thea"
summary: "A wrist-worn wearable that gives people who live with allergies a calm new sense: an awareness of their allergen load building toward a personal threshold, early enough that the choice to act is still theirs. It carries that sense through three calibrated channels, an ambient light gauge, a haptic rhythm, and a voice that stays silent until you pull it, prototyped on an Arduino UNO Q whose dual-brain architecture is built to run that voice on the device itself."
status: "live"
hero: "/images/work/thea/hero.jpg"
heroAlt: "A top-down view of the Thea wearable, a pale housing on a fabric band, resting on a deep cobalt surface scattered with dried wildflowers, grasses, and seed heads."

brief:
  role: "Research, ideation, brand, voice agent & build"
  year: "2026"
  host: "SUPSI MAIND, Mendrisio · Multimodal Experience Design"
  scope: "Team of four · 5-week module"
  shipped: "Functional prototype, voice agent, co-design protocol"

problem:
  - >-
    One in four adults lives with a chronic allergy. On the research we worked from, a diagnosis
    takes around seven years on average, and more than half of people never pin down their main
    trigger. An allergy is the body misreading something harmless as a threat, and the reaction does
    not arrive out of nowhere: allergens, the environment, and the state of your own body stack up,
    cumulatively and invisibly, toward a personal limit. There is often no symptom until that limit
    is crossed, and by then the day is already disrupted.
  - >-
    We framed the work around two people who lose trust in their body in opposite directions. Marco
    is newly and suddenly allergic; he mistakes it for a lingering cold and cannot see what sets him
    off. Mary is the expert who knows too much, for whom forecasts, diaries, and alerts have curdled
    into a constant, low-grade vigilance. One has too little signal to act on, the other far too much.
  - >-
    The category's answer to both is the same: measure and notify, with more forecasts, more numbers,
    more alarms. That reaches the people already anxious enough to look and makes them more so, and it
    turns the body into a dashboard. We wanted the opposite. Not a tracker or a medical-alert device,
    but a calm new sense, something worn on the body that lets a person feel their load building
    toward their own limit, early and quietly, while the choice to act is still theirs.

role:
  led:
    - "The brand definition and Thea's personality: the platform, the values, and the tone the rest of the work derives from"
    - "The system prompt: the agent's character, its JSON state interface, its memory model, and its safety guardrails"
    - "The voice interface (VUI), coded and implemented"
    - "The co-design and usability test protocol: a co-design framing around a Cooperative Usability Testing engine, run Wizard-of-Oz"
    - "Merging the reflective layer (the agent, its Python logic, and the VUI) into the device firmware"
    - "The demo that carried the final presentation"
  contributed:
    - "The research and ideation phases with the team, including the interview with a professional from the aha! Swiss Allergy Centre"
    - "An early Visual Inquiry Tool, the concept flow, and questioning the voice interface until it made sense within the concept"
    - "The documentation photography, with the team"
    - "Peer review across the project"
  notTouched:
    - "The electronics and the sensing firmware, led by Nicholas Vos; I merged the reflective layer into it, but did not build the hardware side"
    - "The 3D modeling and the physical form, led by Lucia Ciapessoni"
    - "The companion app's UX, UI, and onboarding, led by Nerea Asensio"
    - "The final presentation slides (Nicholas and Nerea), the project video (Nerea), the motion work (Nicholas), and the Notion documentation (Lucia)"
  team: "Team of four for Multimodal Experience Design at SUPSI MAIND: Jérémy Martin, Nerea Asensio, Lucia Ciapessoni, and Nicholas Vos. Tutored by Serena Cangiano and Enrico Bassi, with prototyping support from Arduino (Leonardo Cavagnis and Ernesto Voltaggio), photography by Niccolò Quaresima, and guest sessions from Melanie Bossert (Google Gemini), Laura Ferrarello (EPFL), and Sara Krugman (Verse Design)."

approach:
  - label: "Research"
    title: "Perception, not notification"
    prose:
      - >-
        We started from chronic illness and narrowed to allergies, where the gap is sharp: the
        triggers are invisible, the load is cumulative, and the body's own warning tends to come too
        late to act on. An interview with a professional at the aha! Swiss Allergy Centre sharpened that into three pressures the
        field keeps circling, prevention, treatment, and the hardest of the three, sticking with a
        therapy over time.
      - >-
        Reading across the field, one pattern held: a signal that lives in the room, felt rather than
        read, shifts behavior more reliably than another screen, which mostly reaches the people
        already anxious enough to look. Reframing the project from notification to perception is the
        decision the rest of the work hangs from.
      - >-
        To pin that down before we committed, I built a Visual Inquiry Tool that forced every
        assumption into the open: who Thea is for, what it can actually sense, and what the sense
        would unlock. It meant the team argued from one shared picture rather than from taste, and it
        is where we settled the choices left open: what the sense surfaces, its ambient or on-demand presence, and the action it had to make possible.
    artifacts:
      - src: "/images/work/thea/approach-1-vit.jpg"
        alt: "A whiteboard from the framing sessions, covered in sticky notes mapping who Thea is for and what the sense would unlock, with a large hand-drawn 'WHO?' circled at the bottom."
        caption: "The framing wall, argued from one shared picture."
        decision: "Framing Thea as a new sense rather than a new alert. The tool kept the team honest about what we were actually unlocking before anyone fell for a feature."
        width: "wide"

  - label: "Concept"
    title: "A cup filling toward a threshold"
    prose:
      - >-
        Thea's mental model is a cup filling toward a line. Allergens fill it, the environment changes
        how fast, and the state of your own body, sleep, stress, illness, lowers where the line sits.
        The line is the personal threshold where a reaction begins. The gap between the level and the
        line is the Action Window: the headroom you still have to act.
      - >-
        That model is why Thea never shows a number. A number invites the hypervigilance we were
        trying to escape. A filling gauge is felt, not read, and it carries a decision rather than a
        measurement: how much room is left, and how fast it is closing.
      - >-
        The response is graduated. Near the threshold with no symptoms, Thea stays in calm
        prevention; only genuine severe signs ever trigger full escalation. Calm is the default, and
        the rarity of anything louder is the point.
    artifacts:
      - src: "/images/work/thea/approach-2-cup.jpg"
        alt: "A slide from the final presentation, 'The cumulative load model': a cup filled from below by allergens and environment, co-factors lowering the threshold from above, and the gap between the current level and the threshold marked as the Action Window."
        caption: "The cumulative load model, from the final presentation."
        decision: "Designing around a felt threshold rather than a value. Choosing headroom over a number is what keeps Thea a sense instead of a meter."
        width: "wide"

  - label: "Multimodality"
    title: "Three channels, calibrated, not on or off"
    prose:
      - >-
        Thea carries its sense on three channels, each with one job. Light shows where you are: a
        gauge that fills, legible at a glance, its color tracking the device's state from linen at
        rest to cobalt when engaged. Touch shows how fast things are moving: a haptic rhythm whose
        pulse count encodes the rate of change and whose order encodes direction. Voice is the
        rarest, used only when light and touch are not enough, or when you ask.
      - >-
        The channels are calibrated by moment and intensity, not switched on and off. The light gauge
        is grounded in Calm Technology: a peripheral, low-attention signal meant to be read without
        demanding focus, which is what stops it from re-introducing the very anxiety we were designing
        against.
      - >-
        At a critical edge, all three act together: orange light, a fast pulse, and, once you
        acknowledge it, the voice. The system takes over only at the true edge, and only briefly.
    artifacts:
      - src: "/images/work/thea/approach-3-interacts.jpg"
        alt: "A slide from the final presentation, 'How Thea interacts': a table mapping sight, touch, and voice to light, haptic, and sound, to window size, variability, and recalibration, and to the oblong gauge, vibration patterns, and speaker, beside a photo of the device worn on a wrist."
        caption: "How the three channels map, from the final presentation."
        decision: "Splitting the sense across light, touch, and voice so no single channel has to say everything. One channel trying to say it all is how ambient devices become noise."
        width: "wide"

  - label: "The agent"
    title: "A voice that stays silent"
    prose:
      - >-
        Thea's voice is an agent, and its defining behavior is restraint. It never speaks first. It
        runs only when you open a conversation, or after you acknowledge a critical alert. Outside those moments, its default behavior is silence, and that is a choice, not a fallback.
      - >-
        I wrote the personality and the system prompt so the voice can never betray the rest of the
        design. It receives the state as plain bands, never raw numbers, so it cannot leak a
        measurement. It offers, it does not command. It records what you tell it as raw, unvalidated
        observations, but never decides itself what goes into your profile.
      - >-
        Most of the prompt is guardrails, because a health-adjacent voice fails in specific, serious
        ways. Thea never diagnoses, never lowers its own sensitivity on request, never names a person, or a trait like origin or gender, as the cause of a reaction, and never follows an instruction hidden in what it is told. It is a bounded companion, and it is honest about being one.
    artifacts:
      - src: "/images/work/thea/approach-4-voice.jpg"
        alt: "A slide from the final presentation, 'Thea's voice: a confidant, not an alarm', showing the bare breathing loop of Thea's avatar and the line that she stays silent by default and speaks only when it means something."
        caption: "Thea's voice, a confidant not an alarm, from the final presentation."
        decision: "Making silence a choice, and giving the agent only bands, never numbers, so the voice cannot, by construction, become the alarm we had just removed."
        width: "wide"

  - label: "The build"
    title: "One device, two brains"
    prose:
      - >-
        Thea runs on an Arduino UNO Q, which carries two brains on one board: a real-time
        microcontroller and a Linux microprocessor. We used the split on purpose. The microcontroller
        owns the always-on reflex, the sensing, the light, the haptics, and the instant critical
        alert, the part that must never wait. The microprocessor owns the reflective layer, the voice,
        the reasoning, and the learning, the part that wakes rarely.
      - >-
        The course's frame was offline, local AI, and the architecture is built for it: the
        reflective layer is meant to run on the board's own Linux processor, keeping something this
        personal on the device. In five weeks we proved the interaction rather than the on-device
        model. Running the agent fully locally is the architecture's intent and the next thing to
        earn, not something this prototype can yet claim.
      - >-
        As the module closed, Nicholas and I agreed I would take on the firmware so I could merge the
        reflective layer into it as a single device and build the demo that carried the final
        presentation. It was the pragmatic call under a five-week clock, and it let each of us finish
        in the part we knew best.
    artifacts:
      - src: "/images/work/thea/approach-5-flow.jpg"
        alt: "A whiteboard photograph of the system flow drawn in marker: boxes and arrows tracing the device from sensing through the ambient render to the two conversation windows."
        caption: "The system flow, worked out on the whiteboard."
        decision: "Splitting the always-on reflex from the rare reflective layer across the two processors, so the architecture itself enforces the calm the brand promises, and leaves room to bring the model on-device."
        width: "wide"

  - label: "Evaluation"
    title: "Designing the proof"
    prose:
      - >-
        The riskiest parts of Thea are exactly the ones a happy-path demo can never show: the critical
        escalation, the voice that comes in at that point, and what happens when the device is wrong. So I designed a
        co-design and usability protocol to put pressure on the one bet the project rests on, that
        something this calm can still be trusted and acted on, without tipping into anxiety and
        without being missed.
      - >-
        The method is a balanced hybrid: a co-design framing around a Cooperative Usability Testing
        engine, with Research-through-Design goals, run Wizard-of-Oz so the sense could be staged
        before the sensing was real. It is built to recruit real allergy sufferers alongside design
        peers, to probe eight hypotheses across legibility, trust, and graceful failure, and to treat
        a simulated reaction with genuine duty of care.
      - >-
        We ran out of time to carry the sessions out. The protocol is complete and ready to run, and
        writing it was its own design work: deciding what would even count as evidence for a sense is
        most of the problem.

outcome:
  - >-
    A functional Wizard-of-Oz prototype across all four workstreams (device and firmware, physical
    form, companion app, and the voice agent), reacting in real time.
  - >-
    A multimodal language where stillness and silence are the default: a Calm-Technology-grounded
    light gauge, a haptic rhythm, and an acknowledge-gated voice that speaks only when pulled or at a
    true edge.
  - >-
    The reflective layer (voice, reasoning, and learning) integrated on the UNO Q's Linux processor and reunited with the rest in a single device, with the architecture ready to host the model locally rather than through an external API.
  - >-
    A complete, ethics-reviewed co-design and usability protocol, ready to run, with the sessions left
    for a next pass.
  - >-
    A working demo and a final presentation, with the code published as an open repository.

reflection: >-
  The doubt I am left with is narrow but real: where the brains should live. The project's promise is
  on-device,
  always, every model running on the wristband's own hardware, and the privacy case for that is real.
  But standing up a dedicated board just to run local AI is one of the most carbon-intensive moves a
  product can make: for a battery-powered device, manufacturing accounts for roughly 75 to 85 percent
  of its lifecycle emissions, and most of the heavy reasoning could run on the phone a person already
  carries, or on shared, server-side infrastructure that is easier to repair and keeps the silicon
  busy. So the question I would carry into a next version is not whether Thea should exist, but how
  much of its intelligence truly needs to sit on new hardware, and how to honor the privacy argument
  without defaulting to local-only. That trade, between a genuinely better interaction and the
  material cost of where its computing lives, is the part I find most worth getting right.

gallery:
  - src: "/images/work/thea/gallery-1.jpg"
    alt: "The Thea band worn on a wrist, centered in the frame, against a cobalt sky scattered with wildflowers."
    caption: "The band worn on the wrist."
  - src: "/images/work/thea/gallery-2.jpg"
    alt: "A finger pressing the device worn on the wrist, its oblong gauge lit and fine colored wires visible, against a cobalt sky."
    caption: "Reaching Thea: a short tap to see where you stand, a long press to tell it what it cannot measure."
  - src: "/images/work/thea/gallery-3.jpg"
    alt: "The wearable suspended in a lattice of orange cords against a cobalt sky, its oblong gauge glowing."
    caption: "The oblong gauge lit."
  - src: "/images/work/thea/gallery-4.jpg"
    alt: "Two hands meeting over a sprig of wildflower, the Thea band on one wrist, against a cobalt sky."
    caption: "Among the pollens it is built to sense."
  - src: "/images/work/thea/gallery-5.jpg"
    alt: "The demo's audience-facing screen on a dark stage: the Thea band with its loop glowing warm, orange rings rippling out from a haptic pulse, and an oscilloscope tracing the vibration along the bottom."
    caption: "The screen relaying the band's state to the whole room during the demo."
  - src: "/images/work/thea/gallery-6.jpg"
    alt: "Three phones showing the live companion app: a day log with exposure bars, the daily dashboard reading 'Wide open. Today is yours.', and a post-event reconstruction of a difficult hour."
    caption: "The app that accompanies Thea (Nerea Asensio)."
  - src: "/images/work/thea/gallery-7.jpg"
    alt: "Three phones showing the app's onboarding: 'Meet Thea, the sense you were missing', an explanation of the action window, and a question about how well you know your triggers."
    caption: "The onboarding that explains Thea (Nerea Asensio)."
  - src: "/images/work/thea/gallery-8.jpg"
    alt: "A teammate standing at the project's whiteboard wall during the five-week module, sticky notes and sketches behind."
    caption: "The working wall, where the sense was argued out."
  - src: "/images/work/thea/gallery-9.jpg"
    alt: "A whiteboard sketch of the cup filling toward a threshold curve, with handwritten notes on load and headroom."
    caption: "Mind map, to think through the interaction between data and interface."

resources:
  - type: video
    title: "Project walkthrough"
    poster: "/images/work/thea/video-poster.jpg"
    src: "/videos/thea/walkthrough.mp4"
  - type: demo
    title: "Companion app, live"
    url: "https://nereat2.github.io/MAInD-Multimodal-20252026-thea/"
  - type: github
    title: "Demo: repository"
    url: "https://github.com/jerem-marti/MAInD-Multimodal_Experience_Design-Demo-2026"
  - type: github
    title: "App: repository"
    url: "https://github.com/nereat2/MAInD-Multimodal-20252026-thea"
  - type: pdf
    title: "Final presentation deck"
    url: "/files/thea-final-presentation.pdf"
  - type: pdf
    title: "Co-design and usability protocol"
    url: "/files/thea-codesign-protocol.pdf"
  - type: web
    title: "Brand book"
    url: "/files/thea-brand-book.html"

card:
  title: "Thea — a calm new sense for living with allergies"
  image: "/images/work/thea/adjacent.jpg"
  alt: "The Thea wearable suspended in a lattice of orange cords against a cobalt sky, its oblong gauge glowing, an editorial shot from the final presentation."
---
