---
title: "An Aura of Words"
summary: "Un portrait en scrollytelling des cinq espaces verts de Lugano, construit entièrement à partir des mots des personnes qui les fréquentent. Le projet encode des milliers d'avis citoyens en six prismes sémantiques pour donner à chaque parc une « aura » aux couleurs mêlées, puis pose la seule question qui compte : est-ce ainsi que vous voyez ce parc ?"
status: "live"
heroAlt: "An Aura of Words : les cinq parcs de Lugano sur une carte, chacun représenté par une aura organique aux couleurs mêlées dont la taille reflète son volume d'avis citoyens."
hero: "/images/work/an-aura-of-words/hero.jpg"

brief:
  role: "Pipeline de données & front-end"
  year: "2026"
  host: "SUPSI · Making Use of Data"
  scope: "Équipe de cinq"
  shipped: "Visualisation en ligne + couche participative"

problem:
  - >-
    Un parc public est officiellement décrit par les canaux institutionnels : documents de
    planification, rapports d'entretien, inventaires d'équipements. Ces archives disent ce qui est
    physiquement présent, et presque rien sur la manière dont les gens vivent réellement le lieu, sur
    ce qu'ils y ressentent ou sur le sens qu'ils lui donnent.
  - >-
    Le projet part de la prémisse inverse. Le langage qu'un citoyen emploie dans un avis, rédigé
    volontairement juste après une visite, porte un portrait plus riche et plus honnête d'un parc que
    n'importe quelle archive officielle. Il est informel, affectif et spontané, et cette informalité
    est une qualité, pas un défaut.
  - >-
    Le hic, c'est que ce langage est immense, non structuré et dispersé dans des centaines d'avis. À
    lui seul, il ne se laisse pas lire d'un coup d'œil. Le défi était de le rendre lisible sans en
    effacer ce qui fait sa valeur : sa texture, sa subjectivité, ses contradictions.

role:
  led:
    - "Le pipeline de données : le scraping des avis et la classification par lexique qui les encode"
    - "L'implémentation front-end du scrollytelling et de la visualisation en direct"
  contributed:
    - "Le cadre sémantique, la validation des catégories et la direction éditoriale avec l'équipe"
  notTouched:
    - "Une partie de l'identité visuelle et du design d'interface, partagée au sein de l'équipe"
  team: "Équipe de cinq (Annabelle Conron, Nerea Asensio, Nicholas Vos, Jérémy Martin, Julie Alme) pour Making Use of Data à la SUPSI."

approach:
  - label: "Prémisse"
    title: "Le small data plutôt que l'archive officielle"
    prose:
      - >-
        L'idée du cours qui m'a marqué, c'est le small data : à l'opposé du réflexe de se tourner vers
        de grands jeux de données, il défend des données situées, générées par les citoyens,
        qualitatives et ancrées dans l'expérience vécue, et précieuses justement parce qu'elles ne
        sont pas produites pour satisfaire un rapport. Un avis Google est exactement ce type de small
        data.
      - >-
        La posture même du projet est donc un débat, pas un verdict. Il ne demande pas si les parcs
        sont bons ou mauvais. Il demande quelle expérience compte dans notre façon de comprendre
        l'espace public, et si la voix collective des citoyens, une fois rendue lisible, peut dire
        quelque chose que les canaux officiels ne peuvent pas.

  - label: "Données"
    title: "Des avis, scrapés et gardés intacts"
    prose:
      - >-
        La matière première, ce sont les avis Google de cinq parcs de Lugano, recueillis avec un
        scraper Python sur mesure qui charge les avis de chaque parc et en extrait le texte, la note en
        étoiles, la date et le nom de l'auteur. Seuls les avis comportant un texte écrit ont été
        conservés, dans la langue où ils avaient été laissés, surtout l'italien, avec de l'allemand, de
        l'anglais et du français dans le lot.
      - >-
        Les cinq parcs sont volontairement inégaux, parce que c'est ainsi que l'attention se répartit
        vraiment : le Parco Ciani à lui seul totalise plus de 1'600 mots commentés, tandis que le petit
        Parco Lambertenghi en apporte 65. Nous avons gardé ce déséquilibre plutôt que de le normaliser,
        parce que le volume de ce que les gens choisissent de dire d'un lieu fait lui-même partie du
        portrait.

  - label: "Lexique"
    title: "Six prismes sur le langage"
    prose:
      - >-
        Chaque mot porteur de sens est rangé dans l'un des six prismes : l'état intérieur du visiteur,
        l'environnement sensoriel, les actions que les gens accomplissent, le contexte social,
        l'infrastructure physique, et la tension ou la plainte. Les mots fonctionnels sont ignorés ;
        seuls les mots qui portent un véritable poids descriptif sont conservés.
      - >-
        L'encodage est un lexique constitué à la main, apparié mot à mot dans les avis de chaque parc.
        Chaque occurrence enregistre aussi les autres mots porteurs de sens qui apparaissent à ses
        côtés dans le même avis, de sorte que les données saisissent non seulement quels mots sont
        employés, mais lesquels tendent à apparaître ensemble.
    artifacts:
      - src: "/images/work/an-aura-of-words/artifact-lexicon.jpg"
        alt: "Un seul avis Google où chaque mot porteur de sens est teinté selon son prisme : calme en vert, familles en jaune, bancs et aire de jeux en orange, négligé encadré en rouge, avec de fins traits reliant chaque terme à la légende des six prismes."
        caption: "Le lexique, appliqué — un avis, apparié mot à mot."
        decision: "Apparier les mots à un lexique construit à la main, plutôt que de noter le sentiment automatiquement, est ce qui a permis à l'encodage de conserver l'ambiguïté d'un avis au lieu de l'aplatir en une note."
        width: "wide"

  - label: "Encodage"
    title: "Le langage comme aura vivante"
    prose:
      - >-
        L'aura de chaque parc est une masse organique aux couleurs mêlées où l'aire de chaque couleur
        correspond au poids proportionnel de cette catégorie dans les avis, avec un léger mouvement de
        respiration pour qu'elle se lise comme un portrait vivant plutôt que comme un graphique figé. La
        couleur est l'encodage principal, si bien qu'un lecteur reconnaît une catégorie
        instantanément, sans étiquette.
      - >-
        Ce qui donne à chaque aura son caractère, c'est la façon dont les prismes se mêlent. Les gens
        décrivent rarement un parc sur un seul registre ; un même avis passe souvent du ressenti au
        détail sensoriel à la plainte d'un même souffle. L'aura est conçue pour montrer ce mélange, pas
        seulement quel prisme est le plus grand, mais lesquels tendent à coexister, ce qui rend le
        portrait d'un parc reconnaissablement différent de celui d'un autre.
    artifacts:
      - src: "/images/work/an-aura-of-words/artifact-encoding.jpg"
        alt: "L'aura aux couleurs mêlées d'un seul parc à côté de la légende des six catégories, l'aire de chaque couleur indiquant son poids proportionnel."
        caption: "L'aura — six prismes, mêlés selon leur poids proportionnel."
        decision: "Encoder le poids d'une catégorie en aire mêlée, et non en barres, a gardé les données poétiques et lisibles à la fois, ce qui est tout l'enjeu de la pièce."
        width: "wide"

  - label: "Parcours"
    title: "D'un seul avis à votre parc idéal"
    prose:
      - >-
        L'interface est un parcours guidé en scrollytelling. Elle s'ouvre sur une dérive de vrais
        extraits d'avis, expose le cadre des six catégories, puis déroule un laboratoire méthodologique
        où l'on regarde un seul avis se faire décomposer mot à mot, chaque terme porteur de sens
        s'allumant dans la couleur de sa catégorie tandis qu'un décompte construit l'aura sous vos
        yeux.
      - >-
        De là, l'interface s'ouvre. Une carte place les cinq auras sur Lugano, dimensionnées par le
        volume d'avis ; une vue de comparaison met leurs signatures chromatiques côte à côte ; et une
        carte de mots par parc montre chaque mot catégorisé sous forme de réseau coloré, pour voir
        comment les thèmes s'interconnectent. Elle se termine en remettant la méthode au lecteur : une
        invite demande quel serait votre parc idéal, et à mesure que vous tapez, vos mots sont classés
        en direct selon les six mêmes prismes. Vous cessez d'être un public pour devenir une voix de
        plus dans les données.

outcome:
  - >-
    Une visualisation en scrollytelling en ligne : cinq auras de parcs comparables sur une carte, un
    laboratoire méthodologique qui construit une aura à partir d'un avis en temps réel, et des cartes
    de mots par parc qui montrent comment les thèmes s'interconnectent.
  - >-
    Un encodage fidèle du langage citoyen à grande échelle, qui préserve sa texture, sa subjectivité
    et ses contradictions intactes plutôt que de le réduire à une note ou à un classement.
  - >-
    Une couche participative qui classe le « parc idéal » du lecteur en direct selon les six prismes,
    transformant le public de consommateur des données en contributeur de celles-ci.

reflection: >-
  L'idée que je garde de ce projet, c'est le small data. Là où l'instinct pousse à se tourner vers le
  plus grand jeu de données disponible, le geste le plus intéressant était de prendre au sérieux un
  jeu petit, brouillon et humain : des avis volontaires, pleins de ressenti et de contradiction, et de
  les rendre lisibles sans poncer les parties qui les rendent honnêtes. Traiter les données comme
  quelque chose qui gagne du sens par l'interprétation et le dialogue, plutôt que comme un fait figé,
  est ce qui a fait passer le projet d'une visualisation à un débat, et l'invite à contribuer est ce
  qui boucle la boucle, en rendant la méthode aux gens dont les mots provenaient.

gallery:
  - src: "/images/work/an-aura-of-words/gallery-01-opening.jpg"
    alt: "L'ouverture de l'interface : le titre du projet sur une toile de fond dérivante de vrais extraits d'avis Google."
    caption: "Ouverture — ancrée dans le sentiment citoyen réel."
  - src: "/images/work/an-aura-of-words/gallery-02-framework.jpg"
    alt: "Le cadre des six catégories expliqué : état intérieur, environnement sensoriel, action, contexte social, infrastructure, tension."
    caption: "Le cadre — six prismes sémantiques."
  - src: "/images/work/an-aura-of-words/gallery-03-comparison.jpg"
    alt: "Les cinq auras de parcs montrées côte à côte à taille égale, volume retiré, pour ne comparer que leur équilibre de couleurs."
    caption: "Comparaison — cinq auras, dimensionnées à égalité pour que seule la couleur parle."
  - src: "/images/work/an-aura-of-words/gallery-04-map.jpg"
    alt: "Les cinq parcs de Lugano sur une carte, chacun une aura aux couleurs mêlées dimensionnée par son volume d'avis."
    caption: "La carte — cinq auras, dimensionnées par le volume d'avis."
  - src: "/images/work/an-aura-of-words/gallery-05-wordmap.jpg"
    alt: "Une carte de mots par parc : chaque mot catégorisé montré sous forme de réseau coloré de thèmes interconnectés."
    caption: "Carte de mots — comment les thèmes d'un parc s'interconnectent."
  - src: "/images/work/an-aura-of-words/gallery-06-contribution.jpg"
    alt: "L'invite à contribuer : un lecteur tape son parc idéal et les mots sont classés en direct selon les six prismes."
    caption: "Contribution — le lecteur devient une voix de plus."

resources:
  - type: demo
    title: "Live visualization"
    url: "https://jerem-marti.github.io/MAInD-Making_Use_of_Data-2026-Lugano_Parks/"
  - type: github
    title: "Source, scraper, and lexicon"
    url: "https://github.com/jerem-marti/MAInD-Making_Use_of_Data-2026-Lugano_Parks"
  - type: video
    title: "Project walkthrough"
    poster: "/images/work/an-aura-of-words/video-poster.jpg"
    src: "/videos/an-aura-of-words/walkthrough.mp4"
  - type: pdf
    title: "Park poster"
    url: "/files/an-aura-of-words-poster.pdf"

card:
  title: "An Aura of Words — les parcs de Lugano, racontés par leurs avis"
  image: "/images/work/an-aura-of-words/adjacent.jpg"
  alt: "Les cinq parcs de Lugano montrés sur une carte, chacun une aura organique aux couleurs mêlées dimensionnée par le volume d'avis."
---
