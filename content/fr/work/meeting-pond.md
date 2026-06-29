---
title: "Meeting Pond"
summary: "Une paire d'objets lumineux connectés qui permet à deux personnes éloignées de sentir la présence l'une de l'autre sans mots, sans notifications, sans écrans. Une tape laisse tomber une goutte dans un étang de lumière qui se propage en ondes et apparaît en temps réel sur l'autre appareil, transformant la présence en une perturbation qui voyage et s'estompe."
status: "live"
hero: "/images/work/meeting-pond/hero.jpg"
heroAlt: "Deux unités Meeting Pond posées côte à côte sur une surface réfléchissante dans une pièce sombre, l'une luisant en bleu et l'autre en rose, chacune montrant une onde circulaire sur sa grille de LED 32×32, leur lumière se déversant en dessous."

brief:
  role: "Conception du système & de l'interaction"
  year: "2026"
  host: "SUPSI · ID151"
  scope: "Équipe de deux"
  shipped: "Paire de prototypes connectés"

problem:
  - >-
    Nous sommes saturés de messages, d'alertes et d'écrans. Meeting Pond pose une question plus
    discrète : la connexion peut-elle se ressentir à travers quelque chose de plus ambiant et non
    verbal qu'une notification de plus ? La présence peut-elle voyager sans contenu ?
  - >-
    Le geste du projet est de transformer la présence en perturbation. Plutôt que d'envoyer du texte,
    un utilisateur laisse une trace temporaire de son énergie dans un environnement visuel partagé.
    L'eau est la métaphore parce qu'elle correspond structurellement à une relation à distance : une
    petite action en un lieu rayonne vers l'extérieur et en atteint un autre, portant de l'énergie
    plutôt que de la matière, puis revient au calme.

role:
  led:
    - "Le système temps réel reliant deux appareils : la détection du geste, la simulation de l'étang et la mise en réseau entre eux"
    - "L'intégration de l'interaction dans un objet autonome plutôt que dans un panneau de commande externe"
    - "L'électronique et l'intégration de l'affichage à matrice de LED"
  contributed:
    - "Le concept et le langage visuel de l'étang, avec l'équipe"
  notTouched:
    - "Le cadre sur mesure et la finition de l'objet, partagés au sein de l'équipe"
  team: "Équipe de deux (Jérémy Martin, Nerea Asensio) pour ID151 Programming Interactive Objects à la SUPSI, enseigné par Andreas Gysin."

approach:
  - label: "Concept"
    title: "La présence comme perturbation"
    prose:
      - >-
        Les premières explorations ont essayé des signaux, des marques et des traces, mais tout cela
        semblait trop littéral, trop proche de la messagerie conventionnelle. Le projet a convergé vers
        la métaphore d'un étang vivant, parce qu'elle permettait d'exprimer la présence comme mouvement
        et transformation plutôt que comme contenu.
      - >-
        Une goutte n'est pas neutre. Elle porte la couleur active de l'étang de l'expéditeur, et quand
        elle atteint l'autre appareil elle se mêle brièvement à la couleur locale, un mélange
        temporaire qui figure un moment partagé. L'interaction est conçue pour être relationnelle : le
        geste est à la fois une action et une empreinte visuelle de la personne qui l'a fait.

  - label: "Contrainte"
    title: "Concevoir pour une grille de 32×32"
    prose:
      - >-
        L'affichage est une matrice de LED en basse résolution, et cette limite est devenue
        l'opportunité de design. À trente-deux par trente-deux pixels, il n'y a pas de place pour le
        détail, alors le langage doit être l'abstraction, la lumière et le mouvement. Une onde se lit
        parfaitement en basse résolution parce qu'elle n'est que dynamique : une perturbation qui se
        propage et s'atténue.
      - >-
        Chaque unité est un objet autonome, la matrice et son électronique dissimulées dans un cadre
        sur mesure pour que l'appareil se lise comme une seule surface lumineuse, plus proche d'une
        peinture incandescente que d'un gadget. Les parties techniques disparaissent pour que l'étang
        puisse être toute l'expérience.
    artifacts:
      - alt: "Une seule matrice de LED 32×32 remplissant le cadre dans une pièce sombre, une lumière verte formant une douce perturbation sur la grille, chaque pixel distinct."
        caption: "La surface 32×32 — une perturbation lue en pure lumière."
        decision: "La limite de la grille a poussé le langage vers le mouvement : une onde est lisible précisément parce qu'elle n'a aucun détail à perdre."
        width: "wide"
        src: "/images/work/meeting-pond/artifact-constraint.jpg"

  - label: "Interaction"
    title: "Une interface que l'on ne peut pas voir"
    prose:
      - >-
        Une première version exposait des paramètres comme la taille et la vitesse des ondes via une
        interface de commande externe. Nous l'avons abandonnée au profit d'un modèle pleinement
        incarné où chaque commande vit dans l'objet lui-même, lue à travers la caméra comme mouvement
        de la main.
      - >-
        Trois gestes portent tout. Une tape libère une goutte. Déplacer une main horizontalement change
        la couleur de l'étang ; la déplacer verticalement règle l'intensité du champ. Pas de boutons,
        pas de menus. Ce basculement, d'un panneau de paramètres au geste corporel, est ce qui a
        transformé un montage technique en un objet cohérent où l'interaction, la forme et le sens
        tiennent ensemble.
    artifacts:
      - alt: "Un schéma du système : les gestes de la main de chaque personne sont lus par un smartphone faisant tourner MediaPipe et une simulation d'eau, qui diffuse des images RGB565 vers un serveur WebSocket pilotant les matrices de LED ESP32 et relayant chaque événement de goutte vers l'étang de l'autre personne."
        caption: "Le système temps réel derrière deux étangs connectés."
        decision: "Un seul serveur WebSocket relie les gestes de chaque téléphone aux deux matrices, si bien qu'une goutte dans un étang refait surface dans l'autre en temps réel."
        width: "full"
        src: "/images/work/meeting-pond/artifact-interaction.png"

outcome:
  - >-
    Une paire fonctionnelle d'objets lumineux connectés. Une tape sur l'un se propage en ondes sur les
    deux surfaces en temps réel, la couleur de l'expéditeur se mêlant brièvement à l'étang du
    destinataire.
  - >-
    Une interaction autonome et sans écran : geste en entrée, lumière en sortie, tout le système (la
    détection, la simulation et la mise en réseau) embarqué dans l'objet plutôt que dans un
    contrôleur séparé.
  - >-
    Une interaction délibérément éphémère. Les ondes s'estompent et la surface revient au calme, de
    sorte qu'il n'y a pas d'archive, pas de pression à répondre, et aucune trace des moments manqués,
    rien que de la présence.

reflection: >-
  Meeting Pond m'a appris tout ce qu'une contrainte forte peut offrir. Une grille de trente-deux
  pixels semble limitante jusqu'à ce qu'elle réduise chaque idée au mouvement et à la lumière, et c'est
  précisément là que le projet a trouvé sa voix. La discipline la plus dure a été de résister à l'envie
  d'ajouter des fonctionnalités : au moment où nous avons retiré le panneau de commande et fait
  confiance à quelques gestes, l'objet a enfin signifié ce que nous voulions qu'il signifie.

gallery:
  - alt: "Une seule unité Meeting Pond posée dans une pièce sombre, luisant d'un bleu calme et uniforme sur sa grille de LED 32×32, sa lumière se déversant sur la surface en dessous."
    caption: "Au repos — un étang calme, présent sans réclamer d'attention."
    src: "/images/work/meeting-pond/gallery-idle.jpg"
  - alt: "La matrice de LED montrant une lumière violette rayonnant vers l'extérieur juste après l'arrivée d'une goutte, les pixels individuels de la grille 32×32 nettement visibles."
    caption: "Une goutte — les ondes se propagent sur la surface."
    src: "/images/work/meeting-pond/gallery-drop.jpg"
  - alt: "Les deux unités connectées côte à côte, l'une luisant en vert et l'autre en magenta, chacune montrant son propre étang de lumière en ondes."
    caption: "Deux étangs — un geste ici, une onde là-bas."
    src: "/images/work/meeting-pond/gallery-twoponds.jpg"
  - alt: "Un seul étang où des lumières verte, bleue et magenta se mélangent sur la grille, une goutte reçue mêlant brièvement sa couleur à l'étang local."
    caption: "Mélange — la couleur de l'expéditeur, se mêlant à la vôtre."
    src: "/images/work/meeting-pond/gallery-blend.jpg"
  - alt: "Le montage disposé sur une surface claire : le panneau à matrice de LED 32×32, une batterie externe, un câble USB, un smartphone, et la petite carte ESP32 avec son antenne et son faisceau de batterie."
    caption: "Les pièces — la matrice, l'ESP32, l'alimentation, et le téléphone qui détecte et simule."
    src: "/images/work/meeting-pond/gallery-components.jpg"

resources:
  - type: github
    title: "Source code — server, web client, and ESP32 firmware"
    url: "https://github.com/jerem-marti/MAInD-ID151.01-2026-MissingDrop"
  - type: video
    title: "Walkthrough"
    poster: "/images/work/meeting-pond/video-poster.jpg"
    src: "/videos/meeting-pond/walkthrough.mp4"

card:
  title: "Meeting Pond — des objets lumineux connectés pour la présence à distance"
  alt: "Deux unités Meeting Pond connectées posées côte à côte, l'une luisant en bleu et l'autre en rose, chacune montrant des ondes sur une grille de LED 32×32."
  image: "/images/work/meeting-pond/adjacent.jpg"
---
