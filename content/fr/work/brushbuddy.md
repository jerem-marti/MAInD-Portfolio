---
title: "BrushBuddy"
summary: "Un cube monstre compagnon qui guide deux minutes de brossage des dents pour les enfants de 4 à 8 ans. Sortez la brosse à dents et le visage du cube réagit par la lumière, le mouvement et le son, allumant douze dents en séquence et n'avançant que tant que l'enfant se brosse réellement les dents."
status: "live"
hero: "/images/work/brushbuddy/hero.jpg"
heroAlt: "Une main soulève la brosse à dents jaune de son socle au sommet du cube BrushBuddy, dont le visage de monstre inquiet — sourcils relevés, yeux mobiles, une bouche de douze dents grises — attend en dessous sur un large fond gris."

brief:
  role: "Électronique et firmware"
  year: "2026"
  host: "SUPSI · ID140"
  scope: "Équipe de deux · sprint de 5 jours"
  shipped: "Prototype fonctionnel"

problem:
  - >-
    Les enfants de 4 à 8 ans résistent souvent au brossage des dents, perdent l'attention avant deux
    minutes, ou s'arrêtent quand la routine devient répétitive. La solution habituelle, un minuteur,
    mesure la tâche mais ne fait rien pour donner à l'enfant l'envie de la terminer.
  - >-
    BrushBuddy recadre le brossage comme une courte interaction avec un personnage plutôt que comme
    un décompte. Un monstre compagnon réagit à ce que fait l'enfant par la lumière, le mouvement des
    yeux et le son, transformant les deux minutes en une petite relation plutôt qu'en une attente.

role:
  led:
    - "L'électronique et le firmware embarqué du cube et du module de la brosse à dents"
    - "La liaison sans fil de détection de mouvement qui valide un brossage réel"
    - "L'intégration de l'éclairage, du son et du mécanisme de récompense"
  contributed:
    - "Idéation et cadrage du périmètre le premier jour avec l'équipe"
  notTouched:
    - "La CAO du cube, la fabrication et le personnage de monstre (Nicholas Vos)"
  team: "Équipe de deux (Jérémy Martin, Nicholas Vos) pour ID140 Creating Tangible Interfaces à la SUPSI, enseigné par Lorenzo Romagnoli et Marco Lurati."

approach:
  - label: "Concept"
    title: "L'effort que l'on voit"
    prose:
      - >-
        Un minuteur indique à l'enfant combien de temps il reste ; il ne fait rien pour lui donner
        l'envie de rester. BrushBuddy remplace le décompte par un personnage qui réagit. La routine de
        deux minutes devient une séquence visible de douze dents qui s'allument une à une, de sorte que
        l'enfant voit toujours ce qui est fait et ce qui reste, ainsi que l'ordre dans lequel se
        brosser.
      - >-
        Le geste clé est que la séquence n'avance que tant qu'un mouvement de brossage est réellement
        détecté. Arrêtez-vous, et le compagnon s'arrête avec vous. Cela transforme directement
        l'effort en progression. La motivation s'étend ensuite au-delà d'une seule séance : les
        routines terminées s'accumulent, et après douze le cube distribue un autocollant, donnant une
        raison de revenir le lendemain.

  - label: "Interaction"
    title: "Une séance, du début à la fin"
    prose:
      - >-
        Une séance commence à l'instant où la brosse à dents est soulevée de son socle. Le cube
        déroule un court temps de préparation, le temps de trouver le dentifrice, puis un signal de
        départ ouvre les deux minutes. Les dents s'allument en séquence pendant que les yeux bougent,
        et si le brossage s'arrête, les yeux s'arrêtent et l'éclairage se met en pause jusqu'à la
        reprise.
      - >-
        Un signal de fin clôt la routine et invite à remettre la brosse en place. Une fois revenue, le
        cube montre à quel point l'enfant est proche du prochain autocollant, et après douze séances
        terminées il en distribue un et remet le compteur à zéro. Chaque état reste explicite et
        observable, de sorte qu'un enfant de quatre ans peut lire toute la boucle sans qu'on la lui
        explique.
    artifacts:
      - src: "/images/work/brushbuddy/artifact-interaction-storyboard.jpg"
        alt: "Un storyboard dessiné à la main en six étapes d'une séance : sortir la brosse, les dents qui pulsent pour inviter au dentifrice, un jingle de départ, les dents qui s'allument dans l'ordre pendant le brossage et se mettent en pause à l'arrêt, un signal de fin, et un compteur de séances qui débouche sur un autocollant."
        caption: "Storyboard d'interaction — une séance, du début à la fin."
        decision: "Cartographier la boucle à la main d'abord a figé chaque état et chaque signal avant la moindre ligne de firmware, de sorte que la construction en cinq jours avait une seule cible à atteindre."
        width: "wide"

  - label: "Système"
    title: "Deux microcontrôleurs, une routine"
    prose:
      - >-
        Ma partie de la construction était l'électronique répartie sur deux appareils. Le cube
        contient le cerveau : le visage animé, les douze dents adressables, les signaux sonores et le
        servomoteur qui distribue les autocollants. Le second microcontrôleur vit dans la brosse à
        dents, où un capteur de mouvement détecte si l'enfant se brosse vraiment les dents et l'envoie
        au cube par une liaison sans fil. Diviser le système en deux est ce qui permet à la routine de
        distinguer le brossage d'une brosse à dents posée immobile.
      - >-
        Les dents éclairées ont été leur propre petit problème, résolu avec des dents en plexiglas
        poncées pour diffuser la lumière de façon uniforme plutôt qu'éblouissante. Chaque sous-système
        a été mis au point sur l'établi avant d'entrer dans le cube, car dans une construction en cinq
        jours il n'y a pas le temps de déboguer tout en même temps.
    artifacts:
      - src: "/images/work/brushbuddy/artifact-system-internals.jpg"
        alt: "Le cube ouvert en deux moitiés : l'une contient le contrôleur ESP32, trois servomoteurs, le capteur du socle, un buzzer et le câblage ; l'autre est la coque en contreplaqué gravée au laser du nom BrushBuddy et du crédit du cours."
        caption: "À l'intérieur du cube — l'un des deux microcontrôleurs."
        decision: "Répartir le cerveau et la brosse sur deux cartes est ce qui permet à la routine de distinguer un vrai brossage d'une brosse à dents posée immobile."
        width: "wide"

  - label: "Sprint"
    title: "Cinq jours, de bout en bout"
    prose:
      - >-
        Le projet était un sprint de prototypage rapide de cinq jours sur le thème « Reminder ». Le
        premier jour a réduit un cahier des charges large à une seule routine stable et bien définie :
        le brossage des dents pour les enfants de quatre à huit ans. Le deuxième jour a choisi et testé
        l'électronique sur l'établi pendant que la forme du cube prenait corps en CAO. Le troisième
        jour a mis au point le programme embarqué et l'éclairage des dents et a entamé la fabrication.
      - >-
        Le quatrième jour a assemblé le cube et ajouté le second microcontrôleur dans la brosse à
        dents, envoyant le mouvement sans fil. Le cinquième jour a été le réglage et la fiabilité, le
        distributeur d'autocollants, le mécanisme le plus capricieux, résistant jusqu'au bout.
        Travailler aussi vite impose une discipline que j'apprécie : décider ce qui doit fonctionner
        en premier, et laisser tout le reste gagner sa place seulement si le temps le permet.

outcome:
  - >-
    Un prototype tangible fonctionnel construit en un sprint de cinq jours : un cube réactif et une
    brosse à dents instrumentée qui ensemble guident et valident une routine de deux minutes.
  - >-
    Un brossage qui n'avance qu'avec un mouvement réel, une séquence de progression visible de douze
    dents, et une récompense en autocollant qui porte la motivation sur plusieurs jours plutôt que sur
    un seul brossage.

reflection: >-
  C'est mon préféré des projets de prototypage rapide, et le moment qui l'a scellé a été la
  présentation finale. Avec des travaux partout dans la salle, et pas tous conçus pour des enfants,
  le seul enfant présent est passé devant tout le reste et s'est planté devant BrushBuddy. Pour un
  jouet de brossage des dents, aucun score d'utilisabilité ne vaut cela. Le format de cinq jours est
  brutal et clarifiant à parts égales : il vous force à prouver d'abord les quelques choses qui
  comptent et à faire confiance au reste pour suivre, et voir un enfant ignorer les adultes et jouer
  a été la preuve que ces quelques choses étaient les bonnes.

gallery:
  - src: "/images/work/brushbuddy/gallery-01.jpg"
    alt: "Le cube BrushBuddy de trois quarts, la brosse à dents debout dans son socle supérieur, le visage de monstre inquiet tourné vers l'objectif, sur un fond gris épuré."
    caption: "Le compagnon, au repos."
  - src: "/images/work/brushbuddy/gallery-02.jpg"
    alt: "Le côté en contreplaqué du cube, gravé au laser du nom BrushBuddy et du crédit du cours, la brosse posée sur le dessus."
    caption: "En place, et discrètement signé."
  - src: "/images/work/brushbuddy/gallery-03.jpg"
    alt: "La brosse à dents jaune imprimée en 3D, seule, avec des poils rouges à son extrémité, la seule partie du système qui bouge."
    caption: "La brosse qui fait la détection."
  - src: "/images/work/brushbuddy/gallery-04.jpg"
    alt: "Gros plan du visage de monstre : deux sourcils imprimés relevés et des yeux mobiles noir et blanc au-dessus du cadre jaune de la bouche."
    caption: "Le visage, de près."
  - src: "/images/work/brushbuddy/gallery-05.jpg"
    alt: "Le cube allumé, une rangée de petites lumières bleues le long des dents inférieures et un autocollant distribué dans la bouche."
    caption: "Un autocollant, mérité."

resources:
  - type: github
    title: "Firmware du cube (ESP32)"
    url: "https://github.com/jerem-marti/MAInD-Creating_Tangible_Interfaces-2026-BrushBuddy"
  - type: github
    title: "Firmware du capteur de la brosse à dents (ESP32)"
    url: "https://github.com/jerem-marti/MAInD-Creating_Tangible_Interfaces-2026-BrushBuddy-Toothbrush_Sensor"
  - type: pdf
    title: "Schéma de câblage"
    url: "/files/brushbuddy-wiring-diagram.pdf"
  - type: video
    title: "Film d'interaction"
    poster: "/images/work/brushbuddy/video-poster.jpg"
    src: "/videos/brushbuddy/interaction-film.mp4"

card:
  title: "BrushBuddy — un cube monstre qui guide deux minutes de brossage des dents"
  image: "/images/work/brushbuddy/adjacent.jpg"
  alt: "Une main soulève la brosse à dents du socle au sommet du cube BrushBuddy, qui arbore un visage de monstre jaune inquiet."
---
