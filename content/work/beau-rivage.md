---
title: "Beau-Rivage Eco-Redesign"
summary: "A ground-up eco-redesign of the Beau-Rivage Palace website that cut its weight and carbon by roughly 95% while keeping the feel of a five-star hotel. An audit of the existing site, a fresh design, and a Nuxt 3 build tuned for sustainability."
status: "live"
heroAlt: "The redesigned Beau-Rivage Palace homepage at rest: a restrained top navigation and the centerd 'Beau-Rivage Palace, Lausanne Switzerland' logo over a field of fine gold lines, far lighter than the original site."
hero: "/images/work/beau-rivage/hero.jpg"

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
    - "The technical build: the move to Nuxt 3, server-side rendering, and the image-optimization pipeline"
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
        something against a baseline. The existing site leaned on autoplay video and unoptimized images
        across a deep structure of rooms, suites, restaurants, bars, and spas. A single page weighed
        more than thirteen megabytes and scored an F on EcoIndex, with an estimated 368 kg of CO2 a year
        at ten thousand visits a month.
      - >-
        We also mapped the real user journeys (a prospect informing themselves, a guest comparing rooms)
        so the redesign could keep what people actually came for while shedding the weight they never
        asked for.
    artifacts:
      - src: "/images/work/beau-rivage/artifact-audit-1.jpg"
        alt: "A project slide titled 'Revue des éléments du site non écoconçus' with three columns, Vidéos, Images and Animations, listing the original site's media as high quality, oversized, uncompressed and on autoplay."
        caption: "Audit — the original site's media, reviewed."
        decision: "Naming every heavy ingredient first showed that video and images were most of the weight, so that is where the redesign would be won or lost."
        width: "half"
      - src: "/images/work/beau-rivage/artifact-audit-2.jpg"
        alt: "A project slide titled 'Revue des éléments du site non écoconçus' noting illustrations with no informative value, very large quantities of high-quality media, and pages that repeat another page's content."
        caption: "Audit — how much of it carried no information."
        decision: "Most of the media was decorative, so we could cut weight without cutting anything a guest actually came for."
        width: "half"

  - label: "Redesign"
    title: "Luxury without the weight"
    prose:
      - >-
        The design question was the interesting one: how do you keep an image of prestige while removing
        the heavy ingredients that usually signal it? We rebuilt the key pages (the homepage, the rooms
        and suites, a suite like the Riviera) around restraint, treating generous space and careful
        typography as the luxury signal instead of autoplay spectacle.
    artifacts:
      - src: "/images/work/beau-rivage/artifact-redesign.jpg"
        alt: "A project slide titled 'Comment retranscrire le luxe de manière écoconçue?' pairing a four-point design approach (refined layout, revalued colors, lighter media via sober SVGs, less content) with mockups of the redesigned homepage, the La Plage page and the Suite Riviera."
        caption: "Redesign — keeping the luxury, dropping the weight."
        decision: "We treated restraint as the luxury signal, putting refined type and space and sober SVGs in place of autoplay spectacle."
        width: "wide"

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
    artifacts:
      - src: "/images/work/beau-rivage/artifact-build-1.jpg"
        alt: "A project slide titled 'Nuxt Image' showing a Beau-Rivage interior converted to AVIF and resized, dropping from 51.5 kB to 22.5 kB, a 56% saving, beside the NuxtImg code that does it."
        caption: "Build — Nuxt Image does the heavy lifting."
        decision: "Automatic conversion to WebP and AVIF, plus resizing to the viewport, turned the heaviest source of weight into the lightest."
        width: "half"
      - src: "/images/work/beau-rivage/artifact-build-2.jpg"
        alt: "A project slide titled 'Server-Side Rendering (SSR)' with a diagram of the request flow where the server sends ready-made HTML so the page displays with minimal work on the visitor's device."
        caption: "Build — server-side rendering on Nuxt 3."
        decision: "Rendering on the server means the page arrives ready to show, keeping client-side work and device energy low."
        width: "half"

  - label: "Hosting"
    title: "Looking for green, honestly"
    prose:
      - >-
        We also looked at where the site would live, checking hosts against the Green Web Foundation's
        dataset. The honest finding was a gray area: our platform runs on AWS infrastructure in Europe,
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
    artifacts:
      - src: "/images/work/beau-rivage/artifact-results.jpg"
        alt: "Four measurement tools comparing the original and redesigned site: Website Carbon (F to A, 368 to 15.35 kg CO2 a year), Beacon (13.11 MB to 504 KB), Ecograder (36 to 73) and Lighthouse (performance 66 to 98)."
        caption: "Results — measured across four tools, before and after."
        decision: "Every number in this study is one of these four readings, before and after, not an assertion."
        width: "full"

outcome:
  - >-
    A redesigned Beau-Rivage Palace site that is roughly 95% lighter in weight and carbon than the
    original, EcoIndex F to A, while keeping the feel of a five-star brand.
  - >-
    A Nuxt 3 build using server-side rendering and automatic image optimization as the main levers, with
    a measured before-and-after rather than a claim.
  - >-
    An honest account of the limits, including the gray area around green hosting, because an
    eco-conception project has to measure its own footprint truthfully.

reflection: >-
  This project made digital sustainability concrete for me. It is easy to talk about responsible design
  in the abstract; it is much more useful to cut a real site's carbon by 95% and be able to show the
  numbers. The lesson that stuck is that the heaviest, most wasteful parts of a site are usually the
  most automatable to fix, images above all, and that you can be lighter and faster and still feel
  expensive. It sits close to the question behind my thesis: making the invisible energy cost of the
  digital visible, and then doing something about it.

gallery:
  - alt: "Redesigned homepage editorial band: the Beau-Rivage Palace facade above its outdoor pool and Lake Geneva, under the heading Le Beau Rivage."
    caption: "Homepage — the hotel, set on the lake."
    src: "/images/work/beau-rivage/gallery-01.jpg"
  - alt: "Redesigned Chambres et Suites page: four room cards (Supérieure vue ville, vue lac et alpes, Deluxe, Deluxe Riviera) in optimized interior photography."
    caption: "Rooms — the listing, rebuilt light."
    src: "/images/work/beau-rivage/gallery-02.jpg"
  - alt: "The Suite Riviera page: a four-image grid of the suite's salon, bedroom and lake-view bathroom in optimized photography."
    caption: "Suite Riviera — luxury without the weight."
    src: "/images/work/beau-rivage/gallery-03.jpg"
  - alt: "Redesigned Restaurants et Bars page: cards for PIC au Beau-Rivage Palace, Café Beau-Rivage and La Terrasse in optimized photography."
    caption: "Restaurants and bars — the range, kept light."
    src: "/images/work/beau-rivage/gallery-04.jpg"

resources:
  - type: demo
    title: "Version éconçue du site (démo)"
    url: "https://heig-ecoconception-brp.netlify.app/"
  - type: github
    title: "Code source (Nuxt 3)"
    url: "https://github.com/jerem-marti/HEIG-VD_COMEM_IM51_EcoC_Groupe-CJJN"
  - type: pdf
    title: "Présentation du projet"
    url: "/files/beau-rivage-presentation.pdf"
  - type: pdf
    title: "Déclaration d'écoconception (RGESN)"
    url: "/files/beau-rivage-rgesn.pdf"

card:
  title: "Beau-Rivage Eco-Redesign — a 95% lighter luxury hotel site"
  alt: "The redesigned Beau-Rivage Palace site: restrained, elegant, far lighter than the original."
  image: "/images/work/beau-rivage/adjacent.jpg"
---
