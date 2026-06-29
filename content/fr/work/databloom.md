---
title: "DataBloom"
summary: "Une interface tangible qui rend perceptible à la maison l'impact énergétique des usages numériques. La tige de la fleur se courbe à mesure que la consommation de données hebdomadaire du foyer augmente, et une lumière au centre signale le débit de données en direct."
status: "live"
hero: "/images/work/databloom/hero.jpg"
heroAlt: "La fleur DataBloom terminée dans un petit pot en terre cuite — des pétales en feutre bleu cobalt, un centre en bois clair, une tige verte segmentée — sur un fond de studio blanc, entourée des pièces imprimées en 3D et de l'électronique qui la composent."

brief:
  role: "Travail de Bachelor, en solo"
  year: "2024 — 2025"
  host: "Media Engineering Institute (MEI), HEIG-VD"
  scope: "4 semaines de recherche + 11 semaines de construction"
  shipped: "Prototype fonctionnel + travail de Bachelor"

problem:
  - >-
    Environ 8% de l'électricité suisse alimente l'infrastructure numérique, et le secteur du
    numérique représente 3 à 4% des émissions mondiales de gaz à effet de serre, une part qui
    pourrait doubler ou tripler d'ici 2030. La moitié provient des centres de données et des
    réseaux, l'autre moitié des appareils que nous avons en main. Pourtant, pour la personne qui
    utilise le réseau, rien de tout cela n'a de corps.
  - >-
    Regarder un film en streaming, faire défiler un fil, sauvegarder dans le cloud : tout cela
    semble sans poids. L'infrastructure qui porte ces gestes reste invisible, alors le coût reste
    invisible lui aussi, et il n'y a rien à quoi réagir. Quand une facture d'électricité arrive,
    c'est un total sans histoire, et les données détaillées, là où un portail existe, restent hors
    de vue.
  - >-
    La réponse intuitive (construire une application de plus) ne fait qu'aggraver le même problème.
    Elle cache le retour d'information derrière un tap, dans un téléphone déjà rempli de
    notifications, et ne touche que les personnes qui se souciaient assez du sujet pour l'installer.
    Alors le cahier des charges s'est resserré. Donner à la consommation énergétique numérique d'un
    foyer une présence physique dans la pièce où se déroule la vie, sans demander à personne de
    s'inscrire, d'ouvrir une application ou de penser à vérifier.

role:
  led:
    - "Planification et méthodologie du projet, une structure en cascade hybridée avec des itérations de Research through Design"
    - "Recherche de fond et positionnement à travers les interfaces tangibles, la physicalisation de données et la Calm Technology"
    - "Concept et design industriel de la fleur"
    - "Conception mécanique de la tige articulée"
    - "Intégration électronique et firmware embarqué"
    - "Deux rounds de tests utilisateurs : un test comparatif en basse fidélité, puis une évaluation du prototype fonctionnel"
  contributed:
    - "Décisions méthodologiques prises avec le mandant et les superviseurs, comme le choix du premier concept par test comparatif plutôt que par décision"
    - "Cadrage du projet par rapport à CarbonViz Home, le travail de mesure existant du MEI"
  notTouched:
    - "CarbonViz Home, le système du MEI qui mesure la consommation énergétique numérique réelle d'un foyer via un routeur modifié. DataBloom fonctionne sur des données simulées modélisées d'après lui, pas sur un flux en direct."
  team: "Travail de Bachelor en solo. Supervisé par Olivier Ertz et Jonathan Favre-Lamarine (HEIG-VD), mandaté par Stéphane Lecorney (Media Engineering Institute)."

approach:
  - label: "Recherche"
    title: "Pourquoi physicaliser l'invisible"
    prose:
      - >-
        La littérature sur l'éco-feedback pointe systématiquement dans une seule direction : une
        donnée qui vit dans la pièce qu'occupent les gens change les comportements plus sûrement
        qu'une donnée cachée derrière un tap. Le modèle comportemental de Fogg le formule
        précisément. Un comportement apparaît quand la motivation, la capacité et un déclencheur se
        rencontrent au même moment. Un objet discret dans le foyer peut être ce déclencheur.
      - >-
        La visualisation de l'énergie tend à se répartir en trois familles. La statistique
        (graphiques et tableaux de bord), précise mais ignorée. La métaphore éco-visuelle (un arbre
        qui se flétrit dans une application), engageante mais toujours prisonnière d'un écran. Et la
        physique ambiante, des objets qui changent avec la consommation. La troisième famille est la
        plus restreinte et la plus prometteuse, parce qu'elle capte l'attention que la pièce accorde
        déjà à l'objet.
    artifacts:
      - src: "/images/work/databloom/approach-1-matrix.jpg"
        alt: "Matrice comparative de projets énergétiques tangibles positionnés sur deux axes : l'interaction (passive à active) et la représentation (symbolique à analytique)."
        caption: "Matrice comparative — les interfaces énergétiques par interaction et représentation."
        decision: "Cartographier l'espace de conception. Le quadrant calme et intuitif (passif et symbolique) était presque vide, et est devenu la zone cible."
        width: "wide"

  - label: "Idéation"
    title: "Deux métaphores à tester"
    prose:
      - >-
        Un atelier d'idéation a transformé le cahier des charges abstrait en directions concrètes.
        Deux concepts ont été retenus. Un petit personnage expressif dont le monde réagissait à la
        consommation, et une fleur dont la tige se courbait à mesure que l'usage numérique grimpait.
        Les deux correspondaient au cahier des charges Calm Technology, chacun dans un registre
        différent : l'un anthropomorphe, l'autre tiré de la nature.
      - >-
        Plutôt que de trancher sur le papier, le mandant et les superviseurs ont fait un choix
        délibéré : laisser un test utilisateur décider entre les deux. Cela a transformé la première
        itération en comparaison plutôt qu'en engagement, et a ancré la décision dans la façon dont
        les gens lisent réellement chaque objet.
    artifacts:
      - src: "/images/work/databloom/approach-2-concepts.jpg"
        alt: "Deux rendus de concepts précoces côte à côte : un petit personnage anthropomorphe avec un visage animé sur écran, et une marguerite artificielle dans un pot en terre cuite."
        caption: "Les deux concepts — personnage expressif et fleur qui se courbe."
        decision: "Les deux portaient un réel potentiel émotionnel. Trancher entre eux à l'intuition semblait risqué, alors le choix a été confié à un test utilisateur comparatif."
        width: "wide"

  - label: "Première itération"
    title: "Laisser les utilisateurs choisir"
    prose:
      - >-
        Les deux concepts ont été construits comme prototypes basse fidélité, imprimés en 3D. Juste
        assez de forme pour se lire clairement comme un personnage et comme une fleur, avec
        l'électronique complexe volontairement laissée de côté. L'enjeu était de tester la métaphore,
        pas l'ingénierie.
      - >-
        Le prototype de la fleur faisait double emploi. Il testait si les gens comprenaient le
        flétrissement comme un avertissement, et si le mouvement était seulement réalisable : un
        câble passé dans la tige, tiré pour la courber, comme simple preuve de concept du mouvement.
      - >-
        Un test utilisateur comparatif a mis les deux côte à côte. La fleur l'a clairement emporté.
        Sa métaphore était comprise sans un mot d'explication, là où le personnage devait d'abord
        être lu et interprété. La fleur est devenue l'objet à construire pour de vrai.
    artifacts:
      - src: "/images/work/databloom/approach-3-lowfi.jpg"
        alt: "Deux prototypes basse fidélité imprimés en 3D côte à côte : un personnage blanc avec une fente pour un visage sur écran, et une marguerite blanche dont la tige segmentée comporte un câble qui la traverse pour courber la fleur."
        caption: "Prototypes basse fidélité — tous deux imprimés en 3D pour le test comparatif."
        decision: "La métaphore de la fleur se lisait instantanément ; le personnage devait être décodé. Le test comparatif a rendu le choix fondé sur des preuves, et non sur un goût personnel."
        width: "wide"

  - label: "Prototype fonctionnel"
    title: "Un ESP32, un servo, une fleur"
    prose:
      - >-
        La fleur est devenue un prototype fonctionnel. La preuve de concept à câble a été remplacée
        par un servo, piloté par un ESP32 qui gère aussi la lumière centrale et un circuit de sommeil
        profond, avec un serveur local qui détient la logique de consommation et l'appareil qui
        exécute la posture et la lumière. La tige est segmentée, imprimée en 3D et assemblée avec des
        vis M2 pour pouvoir être démontée. Les pétales sont en feutre, choisi pour un rendu plus
        chaleureux et moins technique. Le pot est un simple pot en terre cuite, pour que l'ensemble
        de l'objet se lise comme quelque chose qui a déjà sa place sur une étagère.
      - >-
        Deux signaux portent l'information. La posture de la tige montre la consommation numérique
        cumulée du foyer pour la semaine par rapport à un seuil personnel, fixé à l'installation et
        destiné à se resserrer avec le temps, pour pousser doucement la consommation vers le bas. La
        lumière au centre signale le débit de données instantané sur une échelle du vert au rouge. La
        semaine se réinitialise chaque lundi. C'est là toute la surface d'interaction : pas d'écran,
        pas d'application, pas de son.
      - >-
        Faire passer le câblage à travers une tige qui doit se courber a été le combat discret le
        plus long de la construction. La première tige était une pièce imprimée d'un seul tenant et
        s'est cassée au troisième montage. La diviser en segments assemblés par vis a permis aux
        câbles de fléchir sans rompre, et a rendu chaque pièce remplaçable à la main.
    artifacts:
      - src: "/images/work/databloom/approach-4-stem.jpg"
        alt: "Deux gros plans de la tige imprimée en 3D : une première version d'un seul tenant maintenue par du ruban de masquage, et la version finale segmentée articulée par de petites vis M2."
        caption: "Itérations de la tige — d'un seul tenant (cassée) → segmentée avec vis (finale)."
        decision: "L'assemblage segmenté a coûté plus de pièces et un temps de construction plus long, et a apporté le passage des câbles ainsi que la réparation sur place. Pour un objet destiné à vivre dans un foyer, la durabilité l'a emporté."
        width: "half"
      - src: "/images/work/databloom/approach-5-flowerhead.jpg"
        alt: "Gros plan de la tête de la fleur : des pétales en feutre cobalt autour du centre en bois clair qui abrite la lumière."
        caption: "Tête de la fleur — lumière diffusée à travers les pétales en feutre."
        decision: "Diffuser la lumière à travers le feutre plutôt que de l'exposer a gardé l'objet calme. Une courbe de gradation a été ajoutée une fois qu'elle s'est révélée trop forte la nuit."
        width: "half"
      - src: "/images/work/databloom/approach-circuit.jpg"
        alt: "Schéma électrique KiCad de la fleur numérique : un ESP32 Feather, un buffer logique 74HCT08 sur veroboard, un convertisseur élévateur MT3608, un servo MG90S, une LED WS2812B et une batterie Lipo."
        caption: "Le circuit — ESP32, servo, convertisseur élévateur, LED adressable."
        decision: "Dessiner un schéma complet avant de souder a gardé la construction sur veroboard rigoureuse, et a rendu l'électronique reproductible plutôt qu'un enchevêtrement de fils unique."
        width: "wide"
      - src: "/images/work/databloom/approach-assembly.jpg"
        alt: "Rendu 3D d'assemblage éclaté de la fleur numérique : le corps complet avec l'ESP32 et le veroboard éclatés à la base, avec une liste numérotée des pièces."
        caption: "Assemblage mécanique — la fleur entière, en vue éclatée."
        decision: "Documenter la construction comme un guide éclaté étape par étape signifiait que n'importe quelle pièce pouvait être réimprimée et la fleur entière réassemblée à la main."
        width: "wide"

  - label: "Évaluation"
    title: "Ce que la fleur a changé"
    prose:
      - >-
        Le prototype fonctionnel est passé par un second test utilisateur. Quatre participants, aux
        situations de vie délibérément variées (une colocation, vivre seul, un couple, une famille)
        pour que les retours couvrent un éventail de foyers plutôt qu'un seul profil.
      - >-
        Le protocole compressait une semaine d'usage numérique en dix minutes. Chaque participant
        fixait un seuil personnel, parcourait une grille d'activités quotidiennes et regardait la
        fleur réagir en direct. La tige a été lue correctement par tout le monde, sans qu'aucune
        explication soit nécessaire.
      - >-
        La lumière, c'était l'inverse. Elle attirait l'œil à chaque fois, mais son code couleur
        demandait une explication, et dans la simulation accélérée elle finissait par faire écho à la
        tige au lieu de montrer le débit en direct. Son vrai rôle n'a pas vraiment pu être observé,
        et elle est devenue la première chose à tester correctement dans une étude plus longue.
      - >-
        Le constat le plus utile était émotionnel. Quand la tige se courbait visiblement après un
        choix de streaming intensif, les participants changeaient leur action suivante en plein
        milieu de la tâche. L'un s'est arrêté et a dit "ça m'a un peu freiné quand j'ai vu la
        réaction." Une autre a reformulé ses propres habitudes : "je pourrais télécharger la musique
        et l'écouter en local." Ce registre d'attention, ressenti plutôt que calculé, c'est tout
        l'intérêt de l'objet.
    artifacts:
      - src: "/images/work/databloom/approach-6-usertest.jpg"
        alt: "L'écran de réglage du seuil de la simulation lors du second test utilisateur, où chaque participant fixait une limite hebdomadaire personnelle de consommation numérique avant le déroulé."
        caption: "Second test utilisateur — réglage du seuil hebdomadaire, une semaine compressée en dix minutes."
        decision: "Observer de vraies réactions comptait plus que n'importe quel score. Avec quatre participants, le signal qualitatif était celui auquel se fier honnêtement."
        width: "wide"

outcome:
  - >-
    Un prototype fonctionnel qui marche : mécanique, électronique et firmware stables, réagissant en
    temps réel à des données de foyer simulées.
  - >-
    Une forte reconnaissance. Chaque participant a lu le flétrissement sans aide, et tous ont dit
    qu'ils placeraient la fleur dans leur propre foyer, le plus souvent à un endroit de passage comme
    une table d'entrée ou un plan de travail de cuisine.
  - >-
    Lors de la défense du travail de Bachelor, le MEI lui a vu un usage au-delà du projet : un objet
    pédagogique, dans les écoles ou avec les enfants, pour rendre tangible le coût énergétique de
    l'usage d'internet. J'ai remis un ensemble de recommandations pour aller plus loin, et le MEI a
    ensuite publié un article sur son blog de recherche.

reflection: >-
  Le calendrier était la vraie contrainte. La construction comprimée en onze semaines, je n'ai
  jamais pu mener la seconde itération vers laquelle pointaient les tests : une courbe de
  flétrissement plus douce, une lumière plus claire, et un moyen pour la fleur de se rétablir quand
  un foyer fait mieux. Une fleur qui ne fait jamais que s'affaisser finit par cesser de motiver. La
  laisser se redresser à nouveau, c'est le travail de la prochaine version.

gallery:
  - src: "/images/work/databloom/gallery-1.jpg"
    alt: "DataBloom sur une étagère murale en bois à côté d'un panier tressé, sa tige courbée à mi-hauteur, dans un intérieur de maison."
    caption: "À la maison — sur une étagère, tige partiellement courbée."
  - src: "/images/work/databloom/gallery-2.jpg"
    alt: "DataBloom sur un bureau à côté d'un ordinateur portable ouvert et d'une petite plante vivante, sa tige doucement courbée."
    caption: "Sur un bureau — à côté du temps d'écran qu'elle reflète."
  - src: "/images/work/databloom/gallery-3.jpg"
    alt: "Vue plongeante dans la fleur : des pétales en feutre cobalt autour d'un centre en bois clair, la tige verte entrant dans le pot."
    caption: "Vue de dessus — pétales en feutre et centre."
  - src: "/images/work/databloom/gallery-4.jpg"
    alt: "Pièces imprimées issues de tout le projet disposées sur de la mousse à côté d'un carton d'expédition : la marguerite basse fidélité blanche aux côtés des maillons de tige verts finaux, du bras de servo et de l'électronique."
    caption: "Pièces au fil des itérations — la marguerite basse fidélité à côté des composants imprimés finaux."
  - src: "/images/work/databloom/gallery-5.jpg"
    alt: "L'interface web de simulation utilisée lors des tests : une grille hebdomadaire d'activités numériques quotidiennes avec un seuil de consommation."
    caption: "Interface de simulation — utilisée pendant les tests."
  - src: "/images/work/databloom/gallery-6.jpg"
    alt: "DataBloom avec sa tige complètement courbée vers l'avant à la fin d'une semaine simulée d'usage intensif."
    caption: "Fin d'une semaine d'usage intensif — tige courbée vers l'avant."
  - src: "/images/work/databloom/gallery-7.jpg"
    alt: "Croquis d'idéation dessiné à la main du concept de la fleur : la corolle en feutre, la tige segmentée avec son câble de traction et son servo, et une petite interface à l'écran, annotés en français."
    caption: "Idéation — la fleur, esquissée à la main."

resources:
  - type: pdf
    title: "Travail de Bachelor"
    url: "/files/databloom-thesis.pdf"
  - type: pdf
    title: "Affiche du projet"
    url: "/files/databloom-poster.pdf"
  - type: pdf
    title: "Project poster"
    url: "/files/databloom-swissviz-poster.pdf"
  - type: web
    title: "Article du blog de recherche du MEI"
    url: "https://blog.comem.ch/2025/10/03/databloom-une-interface-de-visualisation-de-limpact-energetique-du-numerique-dans-un-foyer/"

card:
  title: "DataBloom — rendre visible l'impact énergétique des usages numériques"
  image: "/images/work/databloom/adjacent.jpg"
  alt: "La fleur DataBloom : des pétales en feutre outremer sur une tige verte segmentée dans un petit pot en terre cuite, sur un fond de studio blanc."
---
