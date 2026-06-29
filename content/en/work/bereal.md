---
title: "Re-coding BeReal"
summary: "A partial re-code of BeReal across two courses: a mobile-first Vue PWA and an Express REST API. I owned the image-handling pipeline end to end, from firing both cameras at once on the front to uploading, cropping, and storing the photo on the back."
status: "live"
hero: "/images/work/bereal/hero.jpg"
heroAlt: "Three screens from the BeReal re-code on a dark mobile interface: the live dual-camera capture, the composed post with the rear photo full-frame and the front-camera selfie inset, and a friend's feed."

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
    artifacts:
      - src: "/images/work/bereal/artifact-capture-live.jpg"
        alt: "The capture screen mid-shot on a dark mobile interface: the front camera fills the frame with a live selfie, with a round shutter button and a flip-camera control below, under the BeReal header and a countdown."
        caption: "Capture — both cameras live, no filters."
        decision: "Opening both camera streams at once and refusing retakes is the product, so the capture screen exposes only a shutter and a flip control."
        width: "half"
      - src: "/images/work/bereal/artifact-capture-post.jpg"
        alt: "The composed post ready to send: the rear photo full-frame with the front-camera selfie inset in the top corner, and a send button (Envoyer) below."
        caption: "Compose — rear frame, front inset, one post."
        decision: "The two frames compose into a single post before upload, so the dual photo is one object the rest of the app can treat as a unit."
        width: "half"

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
    artifacts:
      - src: "/images/work/bereal/artifact-pipeline.jpg"
        alt: "A four-step pipeline diagram: a multipart upload of frontCamera and backCamera, held in memory by Multer as a buffer (marked no temp file, no disk), streamed to Cloudinary with upload_stream, then stored as URLs on the publication in MongoDB."
        caption: "The upload pipeline, memory to CDN."
        decision: "Holding the upload in memory and streaming it straight to the CDN keeps the server stateless, with no temporary files to clean up."
        width: "wide"

  - label: "Transform"
    title: "Cropping by content and by face"
    prose:
      - >-
        Storage is also where the images get shaped, and I let the CDN do the heavy lifting. The main
        photo is auto-cropped with content-aware gravity to a consistent height, and profile pictures use
        face-aware cropping (Cloudinary's face gravity) into square thumbnails, so a portrait stays
        centered on the face instead of the corner of a room.
      - >-
        Offloading the transforms to Cloudinary kept the API thin and the results consistent: format
        conversion, sizing, and smart cropping all happen on delivery, driven by a few transformation
        options rather than image-processing code I would have had to maintain.
    artifacts:
      - src: "/images/work/bereal/artifact-transform.jpg"
        alt: "Two Cloudinary upload-option blocks side by side: the publication image uses content-aware gravity auto at a 3:4 ratio, while the profile picture uses face-aware gravity auto:faces with a round 1:1 crop, both gravity lines highlighted."
        caption: "Two crops, set by a few options."
        decision: "Content-aware gravity for posts and face-aware gravity for avatars come from one block of options each, so the CDN does the cropping and the API stays thin."
        width: "wide"

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
    artifacts:
      - src: "/images/work/bereal/artifact-tests.jpg"
        alt: "The Jest coverage report summary: 77.42% of statements, 68.69% of branches, 75% of functions and 78.79% of lines covered, with a per-area table for controllers, middlewares, models and routes."
        caption: "Coverage across the API, generated by Jest."
        decision: "Covering the pipeline and the endpoints with integration tests means a change that breaks upload or feed visibility fails loudly, not silently."
        width: "wide"

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
  - src: "/images/work/bereal/gallery-feed.jpg"
    alt: "The news feed on a dark mobile interface: a friend's dual photo shown full-width, a landscape rear shot with the selfie inset, under the app header and above a bottom navigation bar."
    caption: "Feed — a friend's post, infinite scroll."
  - src: "/images/work/bereal/gallery-gate.jpg"
    alt: "The feed blurred behind a centered prompt reading Poste pour voir, telling the user to post their own BeReal before they can see their friends' posts."
    caption: "Honest by reciprocity — post to see."
  - src: "/images/work/bereal/gallery-comments.jpg"
    alt: "A post opened on its detail screen with a comment thread below, showing replies and a comment input field."
    caption: "Comments and replies on a post."
  - src: "/images/work/bereal/gallery-profile.jpg"
    alt: "A user profile showing a round avatar, a pseudonym, counts for publications, comments and friends, and a grid of recent BeReals."
    caption: "Profile — stats and recent BeReals."
  - src: "/images/work/bereal/gallery-friends.jpg"
    alt: "The friends screen: a search field and a list of friends with round avatars, plus a tab for pending friend requests."
    caption: "Friends and requests."
  - src: "/images/work/bereal/gallery-swagger.jpg"
    alt: "The Swagger UI for the REST API, listing endpoint groups for Auth, Users and Publications with color-coded GET, POST, PUT, PATCH and DELETE methods."
    caption: "The REST API, documented with Swagger."

resources:
  - type: github
    title: "Front-end — Vue mobile PWA"
    url: "https://github.com/HEIG-COMEM/HEIG-VD_DevMobil_REST"
  - type: github
    title: "Back-end — Express REST API"
    url: "https://github.com/HEIG-COMEM/HEIG-VD_ArchiOWeb_REST"

card:
  title: "Re-coding BeReal — a dual-camera capture and image pipeline"
  alt: "Re-coding BeReal: the composed dual-photo post beside a friend's feed, on a dark mobile interface."
  image: "/images/work/bereal/adjacent.jpg"
---
