---
title: "Re-coding BeReal"
summary: "A partial re-code of BeReal across two courses: a mobile-first Vue PWA and an Express REST API. I owned the image-handling pipeline end to end, from firing both cameras at once on the front to uploading, cropping, and storing the photo on the back."
status: "live"
heroAlt: "A BeReal-like capture screen: front and back cameras firing simultaneously, the rear photo full-frame with the front-camera selfie inset."

brief:
  role: "Image pipeline (front + back)"
  year: "2024"
  host: "HEIG-VD · DévMobil + ArchiOWeb"
  scope: "Team of four"
  shipped: "Vue PWA + Express REST API"

problem:
  - >-
    BeReal's entire product is a single honest photo: both cameras fire at a random daily prompt, no
    filters, no retakes. Re-coding it means the photo is not a feature, it is the product, and every
    technical decision has to serve that one unfiltered image.
  - >-
    The project ran across two HEIG-VD courses, a mobile PWA and a REST API, and I took the part that
    runs straight through both: the image pipeline, from the moment both cameras fire to the moment the
    stored, cropped photo reappears in a friend's feed.

role:
  led:
    - "The dual-camera capture screen and the full submission flow on the front-end"
    - "The image upload and storage pipeline on the back-end, plus the integration tests for it"
  contributed:
    - "Code review and code quality across the REST API"
  notTouched:
    - "The rest of the front-end views and the friend and notification systems, built by teammates"
  team: "Team of four for the DévMobil and ArchiOWeb courses at HEIG-VD: Jérémie Zurflüh, Jérémy Martin, and Antoine Uldry (front-end and back-end developers), and Steve Pasche (UX/UI design)."

approach:
  - label: "Capture"
    title: "Both cameras, no retakes"
    prose:
      - >-
        The front-end is a mobile-first PWA, and its defining moment is capture. When the prompt fires,
        both the front and rear cameras open at once: the rear shows what you are doing, the front shows
        your reaction, and the post carries your location. There are no filters and no retakes, because
        the constraint is the whole point of BeReal.
      - >-
        I built that capture screen and the submission flow behind it: opening both camera streams,
        composing the two frames into one post, and handing it to the API. The interesting work is in the
        constraints, getting two simultaneous camera streams to behave on a phone, and refusing the
        affordances (filters, retakes) that every instinct says to add.

  - label: "Pipeline"
    title: "Memory to CDN, never to disk"
    prose:
      - >-
        On the back-end the photo arrives as an upload and has to be stored somewhere fast and cheap. I
        built the pipeline around Multer's in-memory storage, so an uploaded image is held as a buffer
        rather than written to the server's disk, and streamed straight to Cloudinary with an upload
        stream.
      - >-
        Keeping the file in memory and streaming it out means no temporary files to clean up, no disk to
        fill, and a server that stays stateless. The endpoint accepts the two camera images together
        (front and back), so the dual photo is a first-class shape in the API, not two unrelated uploads.

  - label: "Transform"
    title: "Cropping by content and by face"
    prose:
      - >-
        Storage is also where the images get shaped, and I let the CDN do the heavy lifting. The main
        photo is auto-cropped with content-aware gravity to a consistent height, and profile pictures use
        face-aware cropping (Cloudinary's face gravity) into square thumbnails, so a portrait stays
        centred on the face instead of the corner of a room.
      - >-
        Offloading the transforms to Cloudinary kept the API thin and the results consistent: format
        conversion, sizing, and smart cropping all happen on delivery, driven by a few transformation
        options rather than image-processing code I would have had to maintain.

  - label: "Tests"
    title: "Proving the API actually works"
    prose:
      - >-
        Because the pipeline is the product, I covered it with integration tests rather than trusting it
        by hand. A Jest and Supertest suite hits the real endpoints (authentication, publications, and
        the rest) and asserts on the responses, so a change that breaks upload or feed visibility fails
        loudly instead of silently.
      - >-
        Writing those tests is also what made me a more careful reviewer on the team. Once the API had a
        safety net, code review could focus on design rather than on catching regressions by eye.

outcome:
  - >-
    A working two-part BeReal re-code: a mobile-first Vue PWA and an Express and Mongoose REST API, with
    the dual-photo flow working end to end, from capture to a friend's feed.
  - >-
    An efficient image pipeline, in-memory upload streamed to a CDN with content- and face-aware
    cropping, and a Jest and Supertest integration suite covering the API it runs on.
  - >-
    The honest-feed rule intact: you only see your friends' posts on a day you have posted yourself,
    which is the social mechanic that makes BeReal what it is.

reflection: >-
  What stuck most was the discipline of covering the part that matters most with integration tests, so
  the rest of the team can move without fear of breaking it. Beyond that, this was the first time I
  built a complete web application end to end, front to back, with Vue, Express, and Mongoose.
  Following the full development process, testing and all, is what made the theory land: it turned what
  we were learning about NoSQL and Express into a real, working app.

gallery:
  - alt: "The dual-camera capture screen: the rear photo full-frame with the front-camera selfie inset, no filter controls."
    caption: "Capture — both cameras, no retakes."
  - alt: "A diagram of the upload pipeline: Multer in-memory buffer streamed to Cloudinary, returning a stored, transformed image."
    caption: "Pipeline — memory to CDN, no temp files."
  - alt: "A face-aware cropped profile thumbnail beside the original portrait, centred on the face."
    caption: "Transform — face-aware cropping on the CDN."
  - alt: "The Jest and Supertest integration suite running against the API's auth and publication endpoints."
    caption: "Tests — Supertest against the real endpoints."
  - alt: "The infinite-scroll feed showing friends' dual photos, visible only because the user has posted today."
    caption: "Feed — honest by reciprocity."
  - alt: "The auto-generated Swagger documentation for the REST API's endpoints."
    caption: "API — documented with Swagger."

prev:
  slug: "cultural-trails"
  title: "Cultural Trails — a full-stack heritage walking app"
  alt: "Cultural Trails: a map-based web app showing a themed walking trail with points of interest, audio guides, and quizzes."

next:
  slug: "elen"
  title: "ELEN — a speculative camera for invisible wireless presences"
  alt: "ELEN device: a handheld camera with orange accents and plexiglass panels, screen showing live video overlaid with spectral fluid entities."
---
