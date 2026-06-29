---
title: "ELEN"
summary: "Une caméra spéculative qui photographie l'invisible. ELEN détecte les signaux Wi-Fi et Bluetooth qui saturent une pièce et restitue chacun d'eux comme une entité spectrale qui dérive sur un flux vidéo en direct, requalifiant l'infrastructure sans fil comme une forme contemporaine de hantise."
status: "live"
heroAlt: "ELEN, une caméra portable au corps imprimé en 3D, orange et translucide, avec deux poignées blanches, éclairée sur un fond de studio gris. Son écran bleu profond et son câblage interne se devinent à travers le plexiglas."
hero: "/images/work/elen/hero.jpg"

brief:
  role: "Ingénierie logicielle & traitement du signal"
  year: "2026"
  host: "SUPSI · ID212 Spatial Experiences"
  scope: "Équipe de trois"
  shipped: "Prototype fonctionnel, exposé"

problem:
  - >-
    Nous traversons toute la journée d'épais nuages de signaux sans fil. Le Wi-Fi, le Bluetooth, le
    bavardage constant des appareils connectés. L'infrastructure de la vie connectée nous entoure de
    partout, et nous n'en percevons rien.
  - >-
    Le cours demandait une « caméra magique » : un dispositif spéculatif qui étend la perception
    humaine au-delà de ses limites naturelles. Notre question a suivi directement. Et si une caméra
    pouvait photographier les présences sans fil qui emplissent une pièce ?
  - >-
    Le cadrage venait de Shadow Creatures, l'axe de recherche de Marco De Mutiis, curateur numérique
    au Fotomuseum Winterthur, qui étudie la façon dont les technologies en réseau et algorithmiques
    voient. Il trace une ligne de la photographie spirite du dix-neuvième siècle à l'imagerie
    computationnelle. Les fantômes ne sont plus surnaturels ; ils sont infrastructurels. ELEN est une
    caméra pour ces fantômes.

role:
  led:
    - "L'architecture logicielle complète, du monitoring sans fil jusqu'à la superposition visuelle en direct"
    - "La traduction du signal en entité, qui transforme des données radio brutes en comportement de chaque apparition"
    - "L'intégration matérielle : la caméra, la détection de mouvement, le suivi de batterie et les commandes"
    - "La documentation technique du système"
  contributed:
    - "Co-pilotage de l'idéation et du concept avec l'équipe"
    - "La documentation photo et vidéo"
  notTouched:
    - "Le boîtier physique et son esthétique rétro-futuriste (Nicholas Vos)"
    - "L'identité visuelle et l'allure de la simulation de fluide (Nerea Asensio)"
  team: "Équipe de trois (Jérémy Martin, Nerea Asensio, Nicholas Vos) pour ID212 Prototyping Spatial Experiences à la SUPSI. Encadré par Leonardo Angelucci, designer et codeur basé à Zürich, et Marco De Mutiis, curateur numérique au Fotomuseum Winterthur."

approach:
  - label: "Cadrage"
    title: "Les fantômes sont infrastructurels"
    prose:
      - >-
        Le design spéculatif justifie son étrangeté en étant précis sur la chose qu'il rend étrange.
        Shadow Creatures nous a donné la filiation : les technologies d'imagerie ont toujours servi à
        percevoir ce que l'œil ne peut pas, de la photographie spirite aux caméras thermiques et
        computationnelles. Nous avons pris l'idée au pied de la lettre et l'avons pointée vers la
        couche sans fil.
      - >-
        Cela a décidé du registre du projet. ELEN n'est pas une visualisation de données avec un
        habillage inquiétant. C'est une caméra dont le sujet se trouve être la présence
        électromagnétique des gens et des appareils dans un espace, traitée avec le sérieux que mérite
        la métaphore du fantôme.

  - label: "Mesure"
    title: "De la métaphore au signal"
    prose:
      - >-
        Un fantôme que l'on invente est une décoration. Un fantôme que l'on mesure est une image. Le
        projet n'est devenu réel qu'une fois les apparitions pilotées par les émissions radio réelles
        de la pièce, si bien que le véritable capteur de la caméra n'est pas son objectif mais une
        antenne sans fil en mode moniteur passif.
      - >-
        Elle écoute sans se connecter à quoi que ce soit, en captant la force du signal de chaque
        transmission et un identifiant d'appareil. Ces identifiants sont sensibles, ils sont donc
        hachés et salés dès leur arrivée et jamais stockés. ELEN révèle la présence sans surveiller
        l'identité, ce qui fait toute la différence entre un instrument poétique et un dispositif de
        traçage.
    artifacts:
      - src: "/images/work/elen/artifact-measurement.jpg"
        alt: "Le schéma du système d'ELEN : un monitoring passif du Wi-Fi et du Bluetooth capte la force du signal et les identifiants d'appareils, qui sont anonymisés, normalisés et mappés sur le rendu visuel en direct."
        caption: "Détection — monitoring passif, identifiants hachés à l'arrivée."
        decision: "Anonymiser chaque identifiant à la source était une éthique de design, pas un ajout après coup. La caméra montre que quelque chose est présent, jamais qui."
        width: "wide"

  - label: "Traduction"
    title: "Du signal à l'apparition"
    prose:
      - >-
        Le cœur de mon travail était la couche de traduction. Chaque signal détecté est normalisé puis
        injecté dans une simulation de fluide en temps réel tournant dans le navigateur, où il insuffle
        des particules dans un champ turbulent partagé. La force du signal règle l'échelle d'une
        entité, le nombre d'appareils règle la densité du champ, et l'activité réseau dicte la vitesse
        à laquelle tout cela se meut.
      - >-
        Tout le pipeline tourne en direct : le monitoring sans fil alimente un réducteur, un backend
        diffuse la caméra et l'état du signal, et une couche visuelle compose les apparitions sur la
        vidéo à soixante images par seconde. Tenir cette cadence pendant que les signaux apparaissaient
        et se dissolvaient en temps réel, c'est l'ingénierie qui a rendu l'illusion convaincante.
    artifacts:
      - src: "/images/work/elen/artifact-translation.jpg"
        alt: "Une capture d'ELEN sur une terrasse surplombant Lugano : des apparitions colorées translucides de tailles différentes dérivent sur la scène, chacune étiquetée d'un identifiant hexadécimal anonymisé."
        caption: "Traduction — force vers échelle, nombre vers densité, activité vers mouvement."
        decision: "Mapper directement les caractéristiques radio sur le comportement du fluide a donné aux entités l'impression d'être dérivées du signal plutôt que conçues pour ressembler à des fantômes."
        width: "wide"

  - label: "L'objet"
    title: "Une caméra que l'on balaie avec son corps"
    prose:
      - >-
        ELEN est portable et délibérément physique. On l'alimente par l'arrière, on capture un instant
        ou on ouvre la galerie depuis deux boutons en façade, et on explore en pivotant à travers
        l'espace. La détection de mouvement permet aux apparitions de garder leur place dans la pièce à
        mesure que l'on bouge, si bien que le balayage donne l'impression de regarder plutôt que de
        parcourir un écran.
      - >-
        Nicholas a conçu le boîtier rétro-futuriste, un châssis imprimé en 3D avec du plexiglas découpé
        au laser et des accents orange qui se lit comme une pièce d'équipement de terrain spéculatif.
        Nerea a façonné l'identité visuelle et l'allure du fluide. Mon rôle était de faire tenir
        ensemble la détection, la traduction et le matériel en temps réel sans perdre une image.
    artifacts:
      - src: "/images/work/elen/artifact-object.jpg"
        alt: "Un visiteur tient ELEN à deux mains dans un espace public intérieur, cadrant la pièce à travers son écran, le corps orange luisant devant la lumière du jour à l'arrière-plan."
        caption: "En main — balayer l'espace en pivotant à travers lui."
        decision: "La détection de mouvement permet aux apparitions de garder leur place dans la pièce à mesure que l'on bouge, si bien que le balayage donne l'impression de regarder plutôt que de parcourir un écran."
        width: "wide"

outcome:
  - >-
    Un prototype portable fonctionnel. Une détection sans fil en temps réel, traduite en une
    superposition spectrale vivante qui répond aux appareils réellement présents dans un espace.
  - >-
    ELEN a été construit pour le brief de l'exposition Shadow Creatures au Fotomuseum Winterthur.
    Marco De Mutiis a apprécié le projet mais ne l'a pas retenu : il se lisait davantage comme du
    design produit que comme de l'art, trop abouti en tant qu'objet.
  - >-
    Après le cours, il a tout de même trouvé sa salle, sélectionné pour la Milan Design Week dans le
    programme de design numérique.

reflection: >-
  Le retour le plus utile a été le refus. « Trop design produit, pas assez artistique », c'est juste,
  et cela mérite réflexion : nous avons fabriqué un objet net et abouti pour un brief qui récompensait
  l'ambiguïté et les bords rugueux. L'instinct même qui fait de moi un bon constructeur de systèmes a
  fait lire la pièce comme finie là où l'art la voulait ouverte. Que le projet ait ensuite trouvé sa
  place à la Milan Design Week dit qu'il a fini par trouver la bonne salle. La leçon que je garde,
  c'est de savoir pour quelle salle je conçois avant de commencer à tout résoudre.

gallery:
  - src: "/images/work/elen/gallery-01.jpg"
    alt: "Une personne tient ELEN à deux mains en extérieur, cadrant l'espace à travers son écran, le corps orange translucide éclairé par la lumière du jour."
    caption: "À l'usage — balayer l'espace à la main."
  - src: "/images/work/elen/gallery-02.jpg"
    alt: "ELEN vu de trois quarts sur un fond gris : corps orange translucide, cadre blanc et deux poignées, antenne, et l'écran bleu profond."
    caption: "L'objet — équipement de terrain spéculatif."
  - src: "/images/work/elen/gallery-03.jpg"
    alt: "Une capture d'ELEN d'une promenade au bord du lac : de pâles masses spectrales de tailles différentes dérivent sur la scène, chacune étiquetée d'un identifiant anonymisé."
    caption: "Apparitions — dimensionnées par la force du signal."
  - src: "/images/work/elen/gallery-04.jpg"
    alt: "L'arrière d'ELEN vu à travers le plexiglas orange : le Raspberry Pi, le module caméra, le câblage et la batterie, avec la gravure de l'équipe."
    caption: "Le matériel — Raspberry Pi, caméra et antenne."
  - src: "/images/work/elen/gallery-05.jpg"
    alt: "Une capture d'ELEN à l'intérieur d'une église baroque : de faibles présences spectrales dérivent parmi l'autel doré, les anges et les fresques."
    caption: "Une capture — un instant de la couche invisible."
  - src: "/images/work/elen/gallery-06.jpg"
    alt: "ELEN dans son emballage ouvert : l'appareil niché dans la mousse au cœur de la boîte blanche emboîtable, avec son antenne et une brochure imprimée."
    caption: "Emballage — emboîtable, sans visserie."

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
  title: "ELEN — une caméra spéculative pour les présences sans fil invisibles"
  image: "/images/work/elen/adjacent.jpg"
  alt: "ELEN, une caméra portable au corps orange translucide avec deux poignées blanches, éclairée sur un fond de studio gris, son écran bleu profond visible à travers le plexiglas."
---
