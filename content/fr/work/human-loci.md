---
title: "Human Loci"
summary: "Un objet d'écoute synesthésique qui joue des lieux plutôt que de la musique. Trois disques de plâtre, chacun lié à un espace public, vous permettent d'en diffuser l'enregistrement de terrain dans la pièce et de vous immerger dans l'ambiance d'un autre lieu, choisi au toucher avant le moindre son."
status: "live"
hero: "/images/work/human-loci/hero.jpg"
heroAlt: "La boîte d'écoute Human Loci : un boîtier transparent en acrylique avec des haut-parleurs internes et un bras de lecture blanc, un disque de plâtre bleu texturé posé sur sa platine, sur un fond gris uni."

brief:
  role: "Intégration électronique et boîtier"
  year: "2025"
  host: "SUPSI · ID120"
  scope: "Équipe de trois"
  shipped: "Prototype fonctionnel"

problem:
  - >-
    Un son enregistré, c'est presque toujours quelque chose conçu pour être écouté : de la musique, un
    podcast, une voix. La texture sonore ordinaire d'un lieu public, un parc à midi, un port de
    plaisance, une gare, est tout aussi riche, et nous ne choisissons presque jamais de nous y attarder.
    C'est la strate qui reste d'ordinaire à l'arrière-plan, inaperçue.
  - >-
    Human Loci est une petite machine pour écouter exactement cela. Elle ne joue pas de musique ; elle
    joue des lieux. Chacun est reconstitué non comme une image mais comme une présence : ses rythmes, sa
    densité, le mouvement humain qui lui donne forme au fil du temps. L'objet tient davantage de
    l'archive de moments publics que du haut-parleur.
  - >-
    Le brief venait d'un cours de prototypage rapide centré sur la fabrication d'un objet physique,
    si bien que le vrai défi était de transformer ce concept en une chose que l'on tient en
    main. Un rituel sans écran où le choix du lieu se fait au toucher et à la couleur, et où la
    technologie s'efface pour laisser le lieu passer au premier plan.

role:
  led:
    - "L'électronique de bout en bout : le lecteur RFID des disques, la chaîne de lecture audio, l'alimentation et la recharge, et le firmware"
    - "L'intégration du boîtier des haut-parleurs et de l'électronique dans le corps transparent"
    - "Les contraintes d'assemblage du système et le plan technique d'ensemble"
  contributed:
    - "Copilotage de l'idéation et du concept d'ensemble avec l'équipe"
  notTouched:
    - "Le mécanisme du bras de lecture et la molette de volume (Nerea Asensio)"
    - "Les disques de plâtre et le motif de la ceinture à charnière vive (Nicholas Vos)"
  team: "Équipe de trois (Nerea Asensio, Jérémy Martin, Nicholas Vos) pour ID120 Digitally Designed Objects for Fast Prototyping à la SUPSI, enseigné par Marco Lurati."

approach:
  - label: "Concept"
    title: "Écouter des lieux, pas de la musique"
    prose:
      - >-
        Le point de départ était le Musipple, un lecteur conceptuel primé qui réinterprète le rituel du
        vinyle. Nous en avons emprunté le rituel et changé le sens. Au lieu de choisir une chanson, vous
        choisissez un environnement. Au lieu de montrer l'image d'un lieu, l'objet en reconstruit la
        présence à travers un enregistrement de terrain en boucle et une surface que l'on peut toucher.
      - >-
        Ce recadrage a tout déterminé en aval. L'interaction est réduite à trois gestes larges et
        lisibles : poser un disque, déplacer le bras pour démarrer, tourner une molette pour le volume.
        Pas de menus, pas d'étiquettes, pas d'écran. Sans disque, l'appareil reste silencieux même si le
        bras bouge, si bien que le disque et le geste ne prennent sens qu'ensemble. L'expérience reste au
        premier plan ; l'appareil s'efface.
    artifacts:
      - alt: "Vue de dessus de l'objet ouvert avec trois parties annotées : une molette de volume circulaire, le bras de lecture qui démarre la diffusion, et le boîtier interne de haut-parleurs à deux chambres, un disque de plâtre bleu sur la platine."
        caption: "Anatomie — bras de lecture, molette de volume, boîtier de haut-parleurs."
        decision: "Trois gestes larges (poser un disque, déplacer le bras, tourner la molette) remplacent chaque menu, étiquette et écran."
        width: "wide"
        src: "/images/work/human-loci/artifact-concept-anatomy.jpg"

  - label: "Électronique"
    title: "Posez un disque, entendez un lieu"
    prose:
      - >-
        Ma contribution principale était l'électronique, construite autour d'un seul objectif : poser un
        disque devait déclencher automatiquement le bon paysage sonore. Un lecteur RFID identifie chaque
        disque par une étiquette, un Raspberry Pi Pico 2 fait tourner la machine à états, et un module
        audio stocke les enregistrements et pilote les haut-parleurs. Disque détecté : ça joue. Disque
        retiré : après un bref délai, ça s'arrête.
      - >-
        J'ai validé toute la chaîne sur le banc avant de m'engager dans la fabrication : lecture RFID
        fiable, association de l'étiquette de chaque disque à une piste, contrôle audio par liaison série,
        et la molette de volume reliée à l'entrée analogique. Le firmware est modulaire, un bloc qui lit
        les étiquettes, un qui les achemine vers les pistes, un qui encapsule les commandes audio, et une
        boucle principale qui tient la logique de lecture et d'arrêt. Un simple module RFID sur un Pico a
        transformé le concept en système fonctionnel en quelques heures, et c'est la part de
        l'électronique qui me fascine encore tranquillement.
    artifacts:
      - alt: "Schéma de l'architecture électronique : un lecteur RFID et un contrôleur Pico alimentant un module audio avec sorties stéréo vers les haut-parleurs et recharge LiPo."
        caption: "Électronique — du RFID au contrôleur puis à l'audio, tout le flux du signal."
        decision: "Construit sur des modules de développement plutôt que sur des composants discrets. Une correction documentée d'une seule ligne dans une bibliothèque a fait fonctionner la carte audio sur la chaîne d'outils du Pico."
        width: "wide"
        src: "/images/work/human-loci/artifact-electronics.jpg"

  - label: "Boîtier"
    title: "Du son dans une coque transparente"
    prose:
      - >-
        L'objet est transparent à dessein ; sa construction fait partie de l'expérience. Plus moyen, dès
        lors, de cacher un haut-parleur ou un câble, ce qui a fait du boîtier audio le problème
        d'intégration le plus difficile. Nous avons conçu un module de haut-parleurs interne compact,
        divisé en deux chambres scellées, deux petits transducteurs par chambre, en privilégiant l'étanchéité
        à l'air, la rigidité, et un assemblage qui se démonte sans colle.
      - >-
        Nous y sommes parvenus par étapes : une maquette en acrylique à un seul haut-parleur pour
        vérifier les vibrations et la fixation imprimée, un prototype en bois de la disposition à deux
        chambres pour valider l'alignement et l'ordre d'assemblage, puis l'acrylique final découpé au
        laser. Les cartes se montent à l'intérieur sur des supports imprimés, vissés dans des inserts à
        chaud noyés dans l'acrylique, si bien que les surfaces extérieures restent nettes. L'ingénierie ne
        compte que lorsqu'elle ne se voit pas.
    artifacts:
      - alt: "Un prototype en bois du boîtier de haut-parleurs à deux chambres assemblé par tenons, utilisé pour valider la disposition avant de découper l'acrylique."
        caption: "Boîtier de haut-parleurs — prototype en bois avant l'acrylique final."
        decision: "L'acrylique semble idéal mais se fissure sous contrainte aux trous de vis, alors un prototype en bois a d'abord permis de fiabiliser la géométrie et l'ordre d'assemblage."
        width: "half"
        src: "/images/work/human-loci/artifact-enclosure-wood.jpg"
      - alt: "Une vue de dessus en biais à travers la coque transparente : les cartes et la platine reposent sur des supports internes imprimés en 3D fixés par des inserts à chaud, gardant les surfaces extérieures nettes."
        caption: "Montage — supports internes imprimés, aucune vis extérieure."
        decision: "Des supports internes imprimés et des inserts ont gardé la coque transparente honnête et l'assemblage réversible."
        width: "half"
        src: "/images/work/human-loci/artifact-enclosure-mounting.jpg"

  - label: "Matériaux"
    title: "Des disques qui se lisent au toucher"
    prose:
      - >-
        Les disques sont le cœur du concept, ils ne pouvaient donc pas relever de la palette habituelle de
        la fabrication numérique, plastique léger ou bois découpé au laser. L'équipe a choisi le plâtre
        pour son poids et sa présence proche de la pierre, teinté et texturé pour que chaque lieu ait une
        identité que l'on reconnaît au toucher et à la couleur avant qu'aucun son ne commence. Le toucher
        devient une vraie dimension de l'œuvre, pas une finition.
      - >-
        Les fabriquer fut un petit problème d'ingénierie à part entière, que l'équipe a résolu avec un positif
        découpé au laser, un moule négatif thermoformé et du plâtre pigmenté coulé puis démoulé. Le même
        goût pour les matériaux peu familiers a façonné la ceinture de l'objet, une bande continue à
        charnière vive qui laisse l'acrylique rigide se plier autour de tout l'objet tout en restant
        acoustiquement ouverte. L'essentiel du temps du projet est passé dans des essais de ce genre,
        et l'objet n'en est que meilleur.
    artifacts:
      - alt: "Deux photos de processus : des motifs de disque en couches découpés au laser empilés en positif, et un moule négatif gris thermoformé utilisé pour couler les disques de plâtre."
        caption: "Fabrication des disques — couches découpées au laser et moule thermoformé."
        decision: "Le poids et le toucher du plâtre étaient l'enjeu, alors l'équipe a découpé un positif et thermoformé un moule pour le couler plutôt que de recourir à la palette habituelle de la découpe laser."
        width: "wide"
        src: "/images/work/human-loci/artifact-materials-discmaking.jpg"

outcome:
  - >-
    Un objet synesthésique fonctionnel. Posez un disque, déplacez le bras, et un lieu public remplit la
    pièce comme une atmosphère continue ; soulevez le disque et le silence revient.
  - >-
    Trois lieux recréés (un parc, un port de plaisance, une gare) à partir d'enregistrements de terrain
    captés et montés sur place pour le projet, chacun porté par un disque de plâtre que l'on choisit au
    toucher plutôt que dans une liste.
  - >-
    Un prototype physique entièrement abouti sur tous les plans, électronique, audio et fabrication,
    documenté en libre accès avec le code et les fichiers matériels publiés sous licences libres.

reflection: >-
  La leçon que je retiens de Human Loci, c'est qu'un concept sans intention ne vaut guère plus que
  cuisiner avec des ingrédients sans goût. L'idéation en profondeur que nous avons
  refusé de précipiter, et l'invitation de Marco à réinterpréter plutôt qu'à reproduire, voilà ce qui a
  donné tout son sens à l'objet. Le volet technique a récompensé la même patience : travailler le plâtre, le
  plexiglas et le thermoformage pour la première fois n'a porté ses fruits que parce que nous avons
  laissé la créativité guider d'abord et le pragmatisme suivre ensuite.

gallery:
  - alt: "La boîte d'écoute transparente en acrylique avec son bras de lecture, vue de trois quarts, à côté des trois disques de plâtre."
    caption: "L'objet — corps transparent, bras de lecture, trois disques."
    src: "/images/work/human-loci/gallery-01.jpg"
  - alt: "Les trois disques de plâtre pour le parc, le port de plaisance et la gare, chacun d'un pigment et d'une texture différents."
    caption: "Les disques — parc, port de plaisance, gare."
    src: "/images/work/human-loci/gallery-02.jpg"
  - alt: "Gros plan d'un disque de plâtre montrant sa texture en relief et sa surface teintée, lue au toucher."
    caption: "Détail d'un disque — une identité matérielle que l'on peut sentir."
    src: "/images/work/human-loci/gallery-03.jpg"
  - alt: "Le boîtier interne de haut-parleurs divisé en deux chambres scellées, monté à l'intérieur de la coque transparente."
    caption: "Boîtier de haut-parleurs — deux chambres scellées."
    src: "/images/work/human-loci/gallery-04.jpg"
  - alt: "La ceinture à charnière vive sur tout le pourtour laissant l'acrylique rigide se plier autour de tout l'objet tout en restant acoustiquement ouverte."
    caption: "La ceinture — acrylique rigide, faite pour plier et respirer."
    src: "/images/work/human-loci/gallery-05.jpg"
  - alt: "L'électronique sur le banc : un lecteur RFID et un Raspberry Pi Pico avant l'intégration."
    caption: "Électronique — RFID et Pico, mise en route sur le banc."
    src: "/images/work/human-loci/gallery-06.jpg"

resources:
  - type: github
    title: "Source code and setup guide"
    url: "https://github.com/jerem-marti/MAInD-Digital_Fabrication-2025-Human_Loci"
  - type: video
    title: "Working demo"
    poster: "/images/work/human-loci/video-poster-demo.jpg"
    src: "/videos/human-loci/demo.mp4"
  - type: video
    title: "Interaction film"
    poster: "/images/work/human-loci/video-poster.jpg"
    src: "/videos/human-loci/walkthrough.mp4"
  - type: video
    title: "Assembly animation"
    poster: "/images/work/human-loci/video-poster-assembly.jpg"
    src: "/videos/human-loci/assembly.mp4"
  - type: pdf
    title: "Electronic schematic"
    url: "/files/human-loci-electronic-schematic.pdf"
  - type: web
    title: "Prototyping process"
    url: "https://master-interaction-design.notion.site/HUMAN-LOCI-2cc89104ecf9806a921fd48164a01938"

card:
  title: "Human Loci — un objet d'écoute synesthésique"
  image: "/images/work/human-loci/adjacent.jpg"
  alt: "Human Loci : une boîte d'écoute transparente en acrylique avec trois disques de plâtre pour un parc, un port de plaisance et une gare."
---
