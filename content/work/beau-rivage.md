---
title: "Beau-Rivage Eco-Redesign"
summary: "A ground-up eco-redesign of the Beau-Rivage Palace website that cut its weight and carbon by roughly 95% while keeping the feel of a five-star hotel. An audit of the existing site, a fresh design, and a Nuxt 3 build tuned for sustainability."
status: "live"
heroAlt: "The redesigned Beau-Rivage Palace site: a restrained, elegant luxury-hotel homepage, far lighter than the original, with optimised imagery."

brief:
  role: "Eco-design & build"
  year: "2025"
  host: "HEIG-VD · Eco-conception"
  scope: "Team of four"
  shipped: "Redesign + Nuxt 3 build"

problem:
  - >-
    Luxury hotel websites are some of the heaviest on the web: autoplay video, enormous images, and
    every format imaginable, all in the name of prestige. That weight is not free. It is bandwidth,
    energy, and carbon on every single visit.
  - >-
    The brief was to redesign the Beau-Rivage Palace website under eco-conception (responsible digital
    design) principles, and the real challenge was the tension inside it: cut the site's environmental
    cost dramatically without losing the sense of luxury that is the whole point of the brand.

role:
  led:
    - "The technical build: the move to Nuxt 3, server-side rendering, and the image-optimisation pipeline"
    - "The before-and-after measurement of weight, carbon, and performance"
  contributed:
    - "The audit of the existing site and the redesign, with the team"
  notTouched:
    - "Parts of the visual design and the mockups, shared within the team of four"
  team: "Team of four (Group CJJN) for the Eco-conception module at HEIG-VD: Nicolas Aerny, Joël Gaillard, Jérémy Martin, and Clément Künzi. Taught by Stéphane Lecorney."

approach:
  - label: "Audit"
    title: "Weighing the existing site"
    prose:
      - >-
        Before redesigning anything we measured what was there, because eco-conception only means
        something against a baseline. The existing site leaned on autoplay video and unoptimised images
        across a deep structure of rooms, suites, restaurants, bars, and spas. A single page weighed
        more than thirteen megabytes and scored an F on EcoIndex, with an estimated 368 kg of CO2 a year
        at ten thousand visits a month.
      - >-
        We also mapped the real user journeys (a prospect informing themselves, a guest comparing rooms)
        so the redesign could keep what people actually came for while shedding the weight they never
        asked for.

  - label: "Redesign"
    title: "Luxury without the weight"
    prose:
      - >-
        The design question was the interesting one: how do you keep an image of prestige while removing
        the heavy ingredients that usually signal it? We rebuilt the key pages (the homepage, the rooms
        and suites, a suite like the Riviera) around restraint, treating generous space and careful
        typography as the luxury signal instead of autoplay spectacle.

  - label: "Build"
    title: "Nuxt 3, SSR, and image discipline"
    prose:
      - >-
        We started from Vue, the framework we knew, and moved to Nuxt 3 specifically for the
        sustainability tools it brings. Server-side rendering means the page arrives ready to display
        with minimal work on the visitor's device, and Nuxt Image handles the single biggest source of
        weight automatically: converting images to modern formats like WebP and AVIF, lazy-loading them,
        and resizing them to the actual screen rather than shipping one huge file to everyone.
      - >-
        That combination is most of the win. An SSR architecture on Node.js keeps client-side work and
        therefore device energy low, and disciplined image handling turns the heaviest pages into the
        lightest. The point throughout was that sustainability here is not a vibe, it is specific
        technical choices with measurable effects.

  - label: "Hosting"
    title: "Looking for green, honestly"
    prose:
      - >-
        We also looked at where the site would live, checking hosts against the Green Web Foundation's
        dataset. The honest finding was a grey area: our platform runs on AWS infrastructure in Europe,
        which claims renewable energy but is not cleanly listed as green. Rather than overclaim, we noted
        it as a real limit, because an eco-conception project that fudges its own hosting is not being
        honest about its footprint.

  - label: "Results"
    title: "From F to A"
    prose:
      - >-
        The before-and-after is the part I am proudest of, because it is measured, not asserted. Page
        weight dropped from 13.11 MB to 504 KB. Estimated annual carbon fell from 368 kg to 15.35 kg of
        CO2. The EcoIndex grade went from F to A, and the overall quality score rose from 36 to 73, with
        performance climbing from 66 to 98.
      - >-
        That is roughly a 95% reduction in weight and carbon, a site about twenty times lighter, with
        usability and performance going up rather than down. The luxury survived the diet.

outcome:
  - >-
    A redesigned Beau-Rivage Palace site that is roughly 95% lighter in weight and carbon than the
    original, EcoIndex F to A, while keeping the feel of a five-star brand.
  - >-
    A Nuxt 3 build using server-side rendering and automatic image optimisation as the main levers, with
    a measured before-and-after rather than a claim.
  - >-
    An honest account of the limits, including the grey area around green hosting, because an
    eco-conception project has to measure its own footprint truthfully.

reflection: >-
  This project made digital sustainability concrete for me. It is easy to talk about responsible design
  in the abstract; it is much more useful to cut a real site's carbon by 95% and be able to show the
  numbers. The lesson that stuck is that the heaviest, most wasteful parts of a site are usually the
  most automatable to fix, images above all, and that you can be lighter and faster and still feel
  expensive. It sits close to the question behind my thesis: making the invisible energy cost of the
  digital visible, and then doing something about it.

gallery:
  - alt: "The redesigned Beau-Rivage Palace homepage, restrained and elegant, far lighter than the original."
    caption: "Redesign — prestige through restraint."
  - alt: "A redesigned suite page (the Riviera), with optimised imagery instead of autoplay video."
    caption: "A suite page — luxury without the weight."
  - alt: "The audit of the existing site: a deep page structure and a thirteen-megabyte page weighed and mapped."
    caption: "Audit — measuring the baseline."
  - alt: "The before-and-after comparison: EcoIndex F versus A, 13.11 MB versus 504 KB, 368 versus 15 kg of CO2 a year."
    caption: "Results — F to A, measured."
  - alt: "The Nuxt Image optimisation in action: an image converted to WebP and resized to the screen."
    caption: "Build — automatic image optimisation."
  - alt: "The Green Web Foundation check on the hosting platform, noted honestly as a grey area."
    caption: "Hosting — green, with an honest asterisk."

prev:
  slug: "elen"
  title: "ELEN — a speculative camera for invisible wireless presences"
  image: "/images/work/elen/adjacent.jpg"
  alt: "ELEN, a handheld camera with a translucent orange body and twin white handles, lit on a grey studio backdrop, its deep-blue screen showing through the plexiglass."

next:
  slug: "a-ta-dispo"
  title: "À ta Dispo — matching event volunteers with organizers"
  alt: "À ta Dispo: a matchmaking concept connecting festival volunteers with event organizers."
---
