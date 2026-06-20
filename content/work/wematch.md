---
title: "WeMatch"
summary: "An AX travel-compatibility companion for the group-travel platform WeRoad. It helps travelers find the right group, not just the right trip: reading how someone travels, building a behavioral profile, scoring each group against it, and explaining every match in plain language."
status: "live"
hero: "/images/work/wematch/hero.jpg"
heroAlt: "A title slide on a soft white-to-pink gradient: 'WeMatch finds your group before you find your trip' set large in coral and ink, with the round Matchy agent character to the right."

brief:
  role: "Research · AX design · story"
  year: "2026"
  host: "SUPSI × Spark Reply"
  scope: "Team of five"
  shipped: "Presentation, testable agent, scrollytelling story"

problem:
  - >-
    WeRoad designs everything about a group trip except the one thing that decides how it goes.
    The itinerary, the hotels, the tour leaders, the pacing: all planned. The group, the eleven
    strangers you will spend ten days with, is left to whoever happened to book the same dates.
  - >-
    The reviews say it out loud. Across 1,660 recent WeRoad reviews on Trustpilot, 58% mention
    the group or the people they travelled with, more than the destination, the food, the hotels,
    or the tour leaders. And when a trip fails, the group is the most-cited cause: 18% of negative
    reviews trace back to it.
  - >-
    Same brand, same itinerary, opposite trip. One traveler comes home from Morocco with people
    they will hardly forget. Another endures toxic group dynamics in China from the second day.
    The destination sets the expectation; the group shapes the experience. Right now the group is
    the only variable nobody designs for.

role:
  led:
    - "Trustpilot data analysis, the 1,660-review study behind the 58% and 18% findings"
    - "Agentic experience design, the six-phase agent and the behavioral-DNA matching model"
    - "Design, build, and storytelling of the scrollytelling experience (Nuxt + GSAP)"
    - "Storytelling of the final presentation, with a teammate"
  contributed:
    - "Ideation and UX research (literature review and interviews), shared across the team"
  notTouched:
    - "WeRoad is not a client. WeMatch is a speculative, unsolicited concept; the brand is used adjacently."
  team: "Team of five for Designing Intelligent Experiences (SUPSI × Spark Reply): Oleksandra Drapushko, Jérémy Martin, Ceren Seçkin, Zeno Tamagni, Elia Miglio."

approach:
  - label: "Research"
    title: "Three lenses, one finding"
    prose:
      - >-
        The insight came from triangulation, not a hunch. We read the academic record on solo
        travel, group dynamics, and matchmaking. We ran eight in-depth interviews, 45 to 60 minutes
        each, with solo and group travelers. And we analysed WeRoad's reviews at scale. Three
        independent sources, one repeated finding.
      - >-
        They converged on a single sentence: the destination sets the expectation, but the group
        shapes the experience. Three findings sharpened it. Trips are evaluated logistically but
        experienced socially. A traveler's profile shifts with context and time, so static
        profiling cannot capture it. And a good match has to feel recognizable, because compatibility
        only convinces when people can see themselves in it.

  - label: "Reframe"
    title: "Groups disguised as trips"
    prose:
      - >-
        The reframe was a single move. We used to say travelers need help finding the right trip.
        We now say the right trip needs the right group. The catalogue of destinations is really a
        catalogue of groups, wearing itineraries.
      - >-
        Crucially, nothing is taken away. A traveler still searches by destination, dates, and
        price exactly as before. What is added is a compatibility score on every trip, and the
        ability to sort by group fit instead of by date or price. The familiar search stays; one
        new, readable signal changes what it optimises for.
    artifacts:
      - src: "/images/work/wematch/approach-reframe.jpg"
        alt: "A presentation slide titled 'The most decisive variable in a WeRoad trip is the only one left to chance': a checklist of what WeRoad controls (itinerary, accommodations, tour leaders, experiences, pacing) beside a panel reading 'What's left to chance: the group', noting 18% of negative reviews trace back to it."
        caption: "WeRoad controls everything but the group — the one variable left to chance."
        decision: "Naming the group as the single unmanaged variable turned a catalogue of destinations into a catalogue of groups, and gave the concept its anchor."
        width: "wide"

  - label: "The agent"
    title: "One companion, six phases"
    prose:
      - >-
        WeMatch is an agent (the team named it Matchy) that accompanies the whole journey rather
        than a one-off chat. It works in six phases, each a different role. It discovers, capturing
        signals around pace, social energy, and intent. It profiles, building the traveler's
        behavioral DNA from those signals. It curates, scoring every group against that DNA.
      - >-
        Then it explains, making each match understandable before booking. It checks in during the
        trip, reading the live social dynamics. And it evolves, refining future compatibility from
        lived experience and trip feedback. The arc runs from the first session to long after the
        traveler comes home.
    artifacts:
      - src: "/images/work/wematch/approach-2-agent.jpg"
        alt: "Six-phase agent diagram: discovering, profiling, curating, explaining, check-in, evolve, each with a one-word role."
        caption: "The agent's role — six phases, from first signal to post-trip learning."
        decision: "Designing the agent as a journey, not a feature, kept compatibility a living profile rather than a one-time questionnaire result."
        width: "wide"

  - label: "The model"
    title: "Behavioral DNA, from signal to match"
    prose:
      - >-
        Profiling is the engine. Every other platform ranks trips by destination; WeMatch ranks
        by compatibility. Two inputs feed one artifact: what a traveler says in conversation, and
        how they browse the site. Together those build a behavioral DNA across eight dimensions
        like pace, social energy, planning style, and conflict style, updated continuously from
        the first session.
      - >-
        Each available group is then scored against that DNA, producing a compatibility percentage
        and a plain-language reason for every trip. The search re-ranks by group fit: "87%,
        culture-driven, slow pace, mid-thirties mix" sits above "41%, social-driven, party tempo,
        younger group." And the profile is visible and editable, so the traveler can see what the
        agent inferred and correct it, which makes the match more accurate the more they engage.
    artifacts:
      - src: "/images/work/wematch/approach-3-model.jpg"
        alt: "The behavioral-DNA model: two inputs (conversation, navigation) feeding an eight-dimension profile, then trip cards ranked by compatibility score."
        caption: "From signal to match — two inputs, an eight-dimension profile, ranked group fit."
        decision: "Scoring the group rather than the trip, with a visible reason and an editable profile, made the intelligence legible instead of magical."
        width: "wide"

  - label: "The story"
    title: "Communicating an invisible layer"
    prose:
      - >-
        A compatibility layer is hard to show, because the interesting part is invisible. My job on
        the communication side was to make it land without a feature list, as a scrollytelling
        experience that follows one traveler deciding whether to book. The reader meets the service
        the way she would, in motion, rather than being told what it does.
      - >-
        The same logic shaped the final presentation, whose storytelling I built with a teammate.
        Across both, the rule was the same: show the agent working, never announce it as "AI." The
        argument is carried by the data, the reframe, and the traveler's own experience, not by the
        word.

outcome:
  - >-
    A research-grounded service concept: three independent research lenses converging on one
    finding, a six-phase agent, and the behavioral-DNA matching model.
  - >-
    Three deliverables shipped: the end-to-end design presentation, a live testable agent, and
    the scrollytelling story that carries the argument.
  - >-
    Well received in the course, across both the storytelling and the working agent behind it.

reflection: >-
  The most valuable part wasn't the concept. It was learning the method from a team that builds
  agentic experiences for real. Spark Reply's AX practice has its own grammar: design around user
  intent rather than features, give the agent a personality and keep it consistent, and spend
  genuine time on the edge cases, where an agent's autonomy is most likely to go wrong. That
  framing reshaped how I design with AI, and it is the lens I bring to the rest of my work now.

gallery:
  - src: "/images/work/wematch/gallery-1.jpg"
    alt: "The designed product: a WeRoad search re-ranked by group fit, trips carrying green compatibility badges under a 'Best Matches' heading."
    caption: "The product — search, re-ranked by group fit."
  - src: "/images/work/wematch/gallery-2.jpg"
    alt: "The behavioral-DNA radar in a group overview: a traveler's compatibility dimensions plotted against a group's, with a plain-language read of the match."
    caption: "The model, made real — the behavioral-DNA radar."
  - src: "/images/work/wematch/gallery-3.jpg"
    alt: "The live Matchy agent on the WeRoad site, profiling in conversation: it turns a traveler's trip story into a follow-up question with three answer options."
    caption: "The live agent — profiling through conversation."
  - src: "/images/work/wematch/gallery-4.jpg"
    alt: "A scene from the scrollytelling one-pager, 'It reads her': the agent turning Sofia's travel behaviour into a live behavioral-DNA profile, with Sofia reading on her phone beside it."
    caption: "The story — the scrollytelling one-pager, Sofia at its centre."

prev:
  slug: "databloom"
  title: "DataBloom — making the energy impact of digital usage visible"
  alt: "DataBloom prototype: a 30cm artificial flower with green stem and ultramarine petals in a terracotta pot, on a kitchen counter."

next:
  slug: "family-space"
  title: "UBS Family Space — a family's shared place to manage money"
  alt: "UBS Family Space concept: paired mobile screens, a parent overview with limits and goals, and a child's analytics and savings."
---
