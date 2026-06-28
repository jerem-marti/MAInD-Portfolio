---
title: "Wama"
summary: "Un compagnon discret en machine learning qui vit au bord de l'évier. Wama détecte votre présence et l'eau qui coule grâce à un modèle de vision entraîné, lit un simple geste de la main et répond à travers un personnage animé, en traitant le ML comme un témoin plutôt que comme un optimiseur."
status: "live"
heroAlt: "Wama tournant sur un téléphone dans un support en bois découpé au laser, sur un montage d'évier construit pour l'occasion : un robinet verse dans un bac transparent tandis que l'écran affiche un petit personnage en forme de nuage bleu."
hero: "/images/work/wama/hero.jpg"

brief:
  role: "Intégration et développement"
  year: "2026"
  host: "SUPSI · ID131"
  scope: "Équipe de trois"
  shipped: "Prototype PWA fonctionnel"

problem:
  - >-
    Faire la vaisselle se situe à un seuil étrange. C'est assez physique pour vous garder dans la
    pièce, mais assez automatique pour laisser votre esprit ailleurs entièrement. Cet écart, entre
    présence corporelle et absence mentale, est le territoire pour lequel Wama a été conçu.
  - >-
    La question n'était délibérément pas comment rendre la tâche plus efficace. C'était de savoir si
    cette dérive pouvait être reconnue, voire accompagnée, par quelque chose dans l'environnement.
    Wama est plus proche d'un objet rituel qui se trouve utiliser une caméra que d'un outil de
    productivité.
  - >-
    Le cours, Intelligence as a Material, posait la véritable provocation : un système de ML peut
    agir comme un témoin plutôt que comme un optimiseur. Il peut remarquer sans exiger de résolution.
    Ce recadrage, et la ligne éthique qu'il croise de plein fouet (la détection de présence à domicile
    peut glisser vers la surveillance), est le problème de design au cœur du projet.

role:
  led:
    - "Intégrer les parties de l'équipe en une seule application fonctionnelle : l'interface et le personnage d'une coéquipière, la détection ML locale d'une autre"
    - "Restructurer et nettoyer le code largement généré par IA pour en faire une base professionnelle et maintenable"
    - "Construire le montage d'évier physique utilisé pour les tests et la démonstration finale"
  contributed:
    - "Concept et idéation avec l'équipe"
  notTouched:
    - "Le design et l'animation du personnage (Jennifer Lee)"
    - "Le code de détection MediaPipe et Teachable Machine (Annabelle Conron)"
  team: "Équipe de trois (Jennifer Lee, Annabelle Conron, Jérémy Martin) pour ID131 Intelligence as a Material à la SUPSI, enseigné par Matteo Loglio."

approach:
  - label: "Concept"
    title: "Un témoin, pas un optimiseur"
    prose:
      - >-
        La plupart des usages du ML à la maison sont vendus comme de l'optimisation : faire la tâche
        plus vite, suivre la métrique, boucler la boucle. Wama refuse ce registre. En s'appuyant sur
        la théorie de la perte ambiguë, l'idée que l'attention peut exister sans résolution claire, le
        personnage a reçu une disposition qui remarque mais n'instruit jamais. Il tient un registre
        plutôt qu'il n'émet une correction.
      - >-
        Cette seule décision a tout façonné. Il n'y a pas de compteur d'eau, pas de décompte, pas de
        gamification. La préoccupation environnementale s'exprime à travers l'affect inquiet du
        personnage lorsque le robinet coule sans surveillance, ce qui maintient toute l'expérience dans
        le registre du ressenti plutôt que de la comptabilité.

  - label: "Détection"
    title: "Lire l'évier, sur l'appareil"
    prose:
      - >-
        Wama lit la scène à partir d'un petit modèle de vision entraîné sur quatre situations :
        personne, une personne arrive, l'eau coule avec quelqu'un de présent, et l'eau coule sans
        personne. Un modèle de suivi de la main ajoute un geste, pouce levé ou baissé maintenu une
        demi-seconde, parce que les mains à un évier sont mouillées et occupées. C'est toute l'entrée.
      - >-
        Ce qui compte autant que la détection, c'est l'endroit où elle se produit. Tout tourne
        localement, dans le navigateur du téléphone, sans serveur et sans rien téléverser. Ce seul
        choix d'architecture concrétise la position éthique du projet. Un appareil peut surveiller
        votre évier uniquement parce que ce qu'il voit ne quitte jamais la pièce. La détection de
        présence à domicile n'est qu'à un pas de la surveillance, et garder le modèle sur l'appareil
        est la manière dont Wama refuse de faire ce pas.
    artifacts:
      - src: "/images/work/wama/artifact-sensing.jpg"
        alt: "Une matrice deux par deux croisant la présence et l'eau qui coule en quatre classes du modèle, chacune liée à une réponse du personnage : il dort, il salue, il accompagne, et un état inquiet mis en évidence quand le robinet coule sans personne."
        caption: "Le modèle de vision à quatre classes : présence × eau."
        decision: "Cadrer la scène comme présence multipliée par l'eau, et non en litres, est ce qui permet au personnage de porter de la préoccupation plutôt qu'un compteur."
        width: "wide"

  - label: "Réponse"
    title: "Un personnage, pas un tableau de bord"
    prose:
      - >-
        La présence de Wama est portée entièrement par un personnage animé et de courts sons, jamais
        par du texte ni des notifications pendant la tâche. Il vous salue quand vous arrivez,
        s'installe pendant que l'eau coule, et après un moment demande une fois si vous voulez de la
        musique. Quand le robinet coule sans personne, il a simplement l'air inquiet.
      - >-
        Cette inquiétude est le message environnemental. Il n'y a pas de compteur d'eau, pas de
        décompte, pas de gamification : la préoccupation s'exprime comme un affect, ce qui maintient
        l'ensemble dans le registre du ressenti plutôt que de la comptabilité. Le travail sur le
        personnage qui fait que cela fonctionne était celui d'une coéquipière ; mon rôle était de le
        faire tourner.
    artifacts:
      - src: "/images/work/wama/screen-askmusic.jpg"
        alt: "L'application Wama demandant « Want Some Music? » avec un pouce levé pour oui et un pouce baissé pour non, le personnage nuage tenant un petit juke-box."
        caption: "Demande une fois si vous voulez de la musique."
        decision: "Un pouce levé ou baissé maintenu brièvement, jamais un tap, est la seule entrée qui fonctionne avec des mains mouillées et occupées."
        width: "half"
      - src: "/images/work/wama/screen-musicplaying.jpg"
        alt: "L'application Wama jouant de la musique : le personnage nuage les yeux fermés, se balançant, de petites notes de musique s'élevant à côté de lui."
        caption: "Vous accompagne quand vous dites oui."
        decision: "La musique est la seule chose que Wama propose, et une seule fois, pour qu'il reste un compagnon plutôt qu'un rabâcheur."
        width: "half"
      - src: "/images/work/wama/screen-worried.jpg"
        alt: "L'application Wama inquiète : le personnage nuage a l'air anxieux au-dessus d'un niveau d'eau bleu qui monte, avec la phrase « I still hear the water but I don't see you »."
        caption: "S'inquiète quand le robinet coule tout seul."
        decision: "Le visage inquiet est tout le signal environnemental. Pas de décompte, pas de litres, juste de la préoccupation."
        width: "wide"

  - label: "Intégration"
    title: "Réunir trois parties en un seul produit"
    prose:
      - >-
        Ma véritable contribution a été de transformer trois pièces séparées en une chose cohérente :
        l'interface et l'animation du personnage d'une coéquipière, la détection ML locale d'une autre
        avec MediaPipe et Teachable Machine, et la logique d'interaction qui relie les états aux
        réponses. Une grande partie est partie de code généré par IA : rapide à produire, fragile à
        accorder de la confiance.
      - >-
        Le travail a donc été un travail de développeur. Restructurer ce code en quelque chose de
        propre et maintenable, faire dialoguer les parties entre elles de manière fiable, et utiliser
        l'IA comme un outil à l'intérieur d'une structure professionnelle plutôt que de la laisser
        fixer la structure. J'ai aussi construit le montage d'évier physique sur lequel l'ensemble a
        été testé et présenté, car une interaction au sujet d'un évier doit être éprouvée à un évier.

outcome:
  - >-
    Un compagnon fonctionnel qui tourne entièrement sur un téléphone fixé à l'évier, se réveillant,
    saluant, accompagnant et s'inquiétant en temps réel à partir d'un seul flux de caméra.
  - >-
    Trois flux de travail séparés (détection, personnage et logique d'interaction) fusionnés et
    nettoyés en une seule application cohérente, avec un montage d'évier conçu sur mesure pour le
    tester et le présenter.
  - >-
    Local par conception. Tout le traitement reste dans le navigateur, de sorte que la détection de
    présence ne devient jamais une collecte de données, ce qui est la réponse la plus claire du projet
    à son propre cahier des charges éthique.

reflection: >-
  Wama a été ma première expérience pratique du machine learning, et le cours a vraiment été une
  découverte : l'occasion de voir comment ces nouveaux modes de détection et d'interaction pouvaient
  faire partie d'un projet de design tout court. Ce qui est resté, c'est moins le modèle que le cadre
  autour de lui. Un agent qui remarque sans optimiser, et la prise de conscience que garder le
  traitement sur l'appareil est ce qui permet à un compagnon d'évier de rester du bon côté de la
  surveillance plutôt que d'y glisser.

gallery:
  - src: "/images/work/wama/gallery-01-hello.jpg"
    alt: "Le montage d'évier complet de Wama vu de face, robinet fermé, le téléphone dans son support découpé au laser affichant un nuage bleu souriant."
    caption: "Détecté — Wama se réveille et salue."
  - src: "/images/work/wama/gallery-02-working.jpg"
    alt: "Le montage d'évier avec le robinet coulant dans le bac transparent, le personnage installé à l'écran tandis que l'eau s'écoule."
    caption: "Tâche en cours — il accompagne la tâche."
  - src: "/images/work/wama/gallery-03-arm.jpg"
    alt: "Une main qui s'avance pour ouvrir la poignée bleue du robinet au-dessus du bac, le téléphone affichant Wama en pleine tâche."
    caption: "Testé à un vrai évier — une main au robinet."
  - src: "/images/work/wama/gallery-04-holder.jpg"
    alt: "Gros plan du support en contreplaqué assemblé par entures, gravé Wama, le téléphone affichant le nuage bleu qui salue."
    caption: "Le compagnon de près — personnage et support découpé au laser."

resources:
  - type: github
    title: "Code source"
    url: "https://github.com/jerem-marti/MAInD-Intelligence_As_A_Material-2026-Wama"

card:
  title: "Wama — le machine learning comme témoin au bord de l'évier"
  image: "/images/work/wama/adjacent.jpg"
  alt: "Le montage d'évier construit pour Wama, de biais : un robinet versant dans un bac transparent, le téléphone dans son support découpé au laser affichant le personnage."
---
