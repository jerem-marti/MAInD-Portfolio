---
title: "DataBloom"
summary: "Une interface tangible qui rend perceptible, à la maison, l'impact énergétique des usages numériques. La tige de la fleur se fane à mesure que grimpe la consommation de données hebdomadaire du foyer, et une lumière au centre signale le débit en temps réel."
status: "live"
hero: "/images/work/databloom/hero.jpg"
heroAlt: "La fleur DataBloom terminée, dans un petit pot en terre cuite : pétales de feutre bleu cobalt, cœur clair imprimé en 3D, tige verte segmentée, sur fond de studio blanc, entourée des pièces imprimées en 3D et de l'électronique dont elle est faite."

brief:
  role: "Travail de Bachelor, en solo"
  year: "2024 — 2025"
  host: "Media Engineering Institute (MEI), HEIG-VD"
  scope: "4 semaines de recherche + 11 de fabrication"
  shipped: "Prototype fonctionnel + mémoire"

problem:
  - >-
    En Suisse, près de 8% de l'électricité part dans l'infrastructure numérique, et le secteur
    pèse 3 à 4% des émissions mondiales de gaz à effet de serre, une part qui pourrait doubler,
    voire tripler, d'ici 2030. La moitié vient des centres de données et des réseaux, l'autre
    moitié des appareils qu'on a en main. Et pourtant, pour qui utilise le réseau, rien de tout
    cela n'a de corps.
  - >-
    Regarder un film en streaming, faire défiler un fil d'actualité, sauvegarder dans le cloud :
    tout cela paraît immatériel. L'infrastructure qui porte ces gestes reste invisible, donc le
    coût l'est aussi, et rien n'appelle de réaction. Quand la facture d'électricité arrive, ce
    n'est qu'un total qui ne raconte rien ; et le détail, à supposer qu'un portail existe
    seulement, reste hors de vue.
  - >-
    La réponse réflexe (construire une application de plus) ne fait qu'aggraver le mal. Elle
    enfouit le signal derrière un tap, dans un téléphone déjà saturé de notifications, et ne
    touche que ceux qui s'en souciaient assez pour l'installer. D'où un cahier des charges
    resserré : donner à la consommation numérique du foyer une présence physique, dans la pièce
    où la vie se passe, sans demander à personne de s'inscrire, d'ouvrir une application ni de
    penser à vérifier.

role:
  led:
    - "Planification et méthodologie du projet, une structure en cascade combinée à des itérations de Research through Design"
    - "Recherche de fond et positionnement entre interfaces tangibles, physicalisation des données et Calm Technology"
    - "Concept et design industriel de la fleur"
    - "Conception mécanique de la tige articulée"
    - "Intégration électronique et firmware embarqué"
    - "Deux phases de tests utilisateurs : un test comparatif en basse fidélité, puis une évaluation du prototype fonctionnel"
  contributed:
    - "Décisions méthodologiques prises avec le mandant et les superviseurs, comme choisir le premier concept par test comparatif plutôt que d'autorité"
    - "Cadrage du projet par rapport à CarbonViz Home, le travail de mesure déjà existant du MEI"
  notTouched:
    - "CarbonViz Home, le système du MEI qui mesure la consommation énergétique numérique réelle d'un foyer via un routeur modifié. DataBloom fonctionne sur des données simulées calquées dessus, pas sur un flux en direct."
  team: "Travail de Bachelor en solo. Supervisé par Olivier Ertz et Jonathan Favre-Lamarine (HEIG-VD), mandaté par Stéphane Lecorney (Media Engineering Institute)."

approach:
  - label: "Recherche"
    title: "Pourquoi physicaliser l'invisible"
    prose:
      - >-
        La littérature sur l'éco-feedback pointe systématiquement dans la même direction : une
        donnée qui vit dans la pièce qu'on habite change les comportements plus sûrement qu'une
        donnée cachée derrière un écran. Le modèle comportemental de Fogg le formule précisément.
        Un comportement apparaît quand la motivation, la capacité et un déclencheur se rencontrent
        au même moment. Un objet discret, posé dans le foyer, peut être ce déclencheur.
      - >-
        La visualisation de l'énergie tend à se répartir en trois familles. La statistique
        (graphiques et tableaux de bord), précise mais ignorée. La métaphore éco-visuelle (un
        arbre qui se flétrit dans une application), engageante mais toujours prisonnière d'un
        écran. Et la physique et ambiante, des objets qui changent avec la consommation. La
        troisième famille est la plus restreinte et la plus prometteuse, parce qu'elle capte
        l'attention que la pièce accorde déjà à l'objet.
    artifacts:
      - src: "/images/work/databloom/approach-1-matrix.jpg"
        alt: "Matrice comparative de projets énergétiques tangibles, placés sur deux axes : interaction (de passive à active) et représentation (de symbolique à analytique)."
        caption: "Matrice comparative — interfaces énergétiques par interaction et représentation."
        decision: "Cartographier l'espace de conception : le quadrant calme et intuitif (passif et symbolique), presque vide, est devenu la zone cible."
        width: "wide"

  - label: "Idéation"
    title: "Deux métaphores à tester"
    prose:
      - >-
        Un atelier d'idéation a transformé le cahier des charges abstrait en directions concrètes.
        Deux concepts ont été retenus. Un petit personnage expressif dont le monde réagissait à la
        consommation, et une fleur dont la tige se fanait à mesure que l'usage numérique grimpait.
        Les deux correspondaient au cahier des charges Calm Technology, chacun dans un registre
        différent : l'un anthropomorphe, l'autre tiré de la nature.
      - >-
        Plutôt que de trancher sur le papier, le mandant et les superviseurs ont fait un choix
        délibéré : laisser un test utilisateur décider entre les deux. Cela a transformé la première
        itération en comparaison plutôt qu'en engagement, et a ancré la décision dans la façon dont
        les gens lisent réellement chaque objet.
    artifacts:
      - src: "/images/work/databloom/approach-2-concepts.jpg"
        alt: "Deux premiers rendus de concepts côte à côte : un petit personnage anthropomorphe avec un visage animé sur écran, et une marguerite artificielle dans un pot en terre cuite."
        caption: "Les deux concepts — personnage expressif et fleur qui se courbe."
        decision: "Les deux portaient un réel potentiel émotionnel. Trancher entre eux à l'intuition semblait risqué, le choix a donc été confié à un test utilisateur comparatif."
        width: "wide"

  - label: "Première itération"
    title: "Laisser choisir les utilisateurs"
    prose:
      - >-
        Les deux concepts ont été fabriqués en prototypes basse fidélité, imprimés en 3D. Juste
        assez de forme pour se lire clairement comme un personnage et comme une fleur, l'électronique
        complexe volontairement laissée de côté. Il s'agissait de tester la métaphore, pas
        l'ingénierie.
      - >-
        Le prototype de la fleur jouait sur deux tableaux. Il vérifiait si les gens comprenaient le
        flétrissement comme un avertissement, et si le mouvement était tout simplement possible : un
        câble passé dans la tige, tiré pour la redresser et relâché pour la courber, comme simple
        preuve de concept du mouvement.
      - >-
        Un test utilisateur comparatif a départagé les deux. La fleur l'a emporté nettement. Sa
        métaphore se comprenait sans un mot d'explication, là où le personnage devait d'abord être lu
        et interprété. La fleur est devenue l'objet à construire pour de vrai.
    artifacts:
      - src: "/images/work/databloom/approach-3-lowfi.jpg"
        alt: "Deux prototypes basse fidélité imprimés en 3D, côte à côte : un personnage blanc avec une fente pour visage-écran, et une marguerite blanche dont la tige segmentée est traversée par un câble qui l'actionne."
        caption: "Prototypes basse fidélité — tous deux imprimés en 3D pour le test comparatif."
        decision: "La métaphore de la fleur se lisait instantanément ; le personnage, lui, devait être décodé. Le test comparatif a fondé le choix sur des preuves, pas sur un goût personnel."
        width: "wide"

  - label: "Prototype fonctionnel"
    title: "Un ESP32, un servo, une fleur"
    prose:
      - >-
        La fleur est devenue un prototype fonctionnel. Le câble de la preuve de concept est désormais
        actionné par un servo, piloté par un ESP32 qui gère aussi la lumière au centre de la fleur et
        un circuit de veille profonde. Un serveur local tient la logique de consommation, pendant que
        l'objet exécute la posture et la lumière. La tige est segmentée, imprimée en 3D et assemblée
        par des vis M2, de sorte qu'on peut la démonter. Les pétales sont en feutre, choisis pour un
        rendu plus chaleureux et moins technique. Le pot est un simple pot en terre cuite, si bien que
        l'objet tout entier se lit comme quelque chose qui a déjà sa place sur une étagère.
      - >-
        Deux signaux portent l'information. La posture de la tige montre la consommation numérique
        cumulée du foyer sur la semaine, rapportée à un seuil personnel. Ce seuil, fixé à
        l'installation, est destiné à se resserrer avec le temps, pour pousser doucement la
        consommation vers le bas. La lumière au centre signale le débit instantané sur une échelle du
        vert au rouge. La semaine se remet à zéro chaque lundi. Voilà toute la surface d'interaction :
        pas d'écran, pas d'application, pas de son.
      - >-
        Faire passer le câblage dans une tige qui doit se courber a été le plus long combat de la
        fabrication. La première tige, imprimée d'une seule pièce, a cassé au troisième montage. La
        découper en segments assemblés par vis a laissé les câbles fléchir sans rompre, et rendu
        chaque pièce remplaçable à la main.
    artifacts:
      - src: "/images/work/databloom/approach-4-stem.jpg"
        alt: "Deux gros plans de la tige imprimée en 3D : une première articulation d'une seule pièce maintenue au ruban de masquage, et la version finale segmentée, articulée par de petites vis M2."
        caption: "Itérations de la tige — une seule pièce (cassée) → segmentée avec vis (finale)."
        decision: "L'assemblage segmenté a coûté plus de pièces et plus de temps, mais il a offert une plus grande solidité et permis le passage des câbles. Pour un objet destiné à vivre dans un foyer, la durabilité l'a emporté."
        width: "half"
      - src: "/images/work/databloom/approach-5-flowerhead.jpg"
        alt: "Gros plan de la tête de la fleur : pétales de feutre cobalt autour du cœur clair imprimé en 3D qui abrite la lumière."
        caption: "Tête de la fleur — lumière diffusée par le cœur imprimé en 3D."
        decision: "Diffuser la lumière par le cœur imprimé en 3D plutôt que de l'exposer à nu a gardé l'objet calme ; les pétales, eux, sont en feutrine, pour un effet plus chaleureux et naturel. Une courbe de gradation a été ajoutée une fois la lumière jugée trop vive la nuit."
        width: "half"
      - src: "/images/work/databloom/approach-circuit.jpg"
        alt: "Schéma électrique KiCad de la fleur numérique : un ESP32 Feather, un buffer logique 74HCT08 sur veroboard, un convertisseur élévateur MT3608, un servo MG90S, une LED WS2812B et une batterie Lipo."
        caption: "Le circuit — ESP32, servo, convertisseur élévateur, LED adressable."
        decision: "Comme l'ensemble du projet, l'électronique a été documentée pour être reproductible."
        width: "wide"
      - src: "/images/work/databloom/approach-assembly.jpg"
        alt: "Vue éclatée 3D de la fleur numérique : le corps complet avec l'ESP32 et le veroboard détachés à la base, accompagnée d'une nomenclature numérotée."
        caption: "Assemblage mécanique — la fleur entière, en vue éclatée."
        decision: "Documenter la fabrication sous forme de guide éclaté, étape par étape, permettait de réimprimer n'importe quelle pièce et de remonter la fleur entière à la main."
        width: "wide"

  - label: "Évaluation"
    title: "Ce que la fleur a changé"
    prose:
      - >-
        Le prototype fonctionnel est passé par un second test utilisateur. Quatre participants, aux
        situations de vie volontairement variées (une colocation, une personne seule, un couple, une
        famille), pour que les retours couvrent un éventail de foyers plutôt qu'un seul profil.
      - >-
        Le protocole comprimait une semaine d'usage numérique en dix minutes. Chaque participant
        fixait un seuil personnel, parcourait une grille d'activités quotidiennes et regardait la
        fleur réagir en direct. La tige a été lue correctement par tout le monde, sans aucune
        explication.
      - >-
        La lumière, c'était l'inverse. Elle attirait l'œil à chaque fois, mais son code couleur
        demandait à être expliqué, et dans la simulation accélérée elle finissait par faire écho à la
        tige au lieu de montrer le débit en direct. Son vrai rôle n'a pas vraiment pu être observé, et
        il est devenu la première chose à tester correctement dans une étude plus longue.
      - >-
        Le constat le plus utile était émotionnel. Quand la tige se courbait visiblement après un
        choix de streaming intensif, les participants changeaient d'action en plein exercice. L'un
        s'est arrêté et a dit : "ça m'a un peu freiné quand j'ai vu la réaction." Une autre a revu ses
        propres habitudes : "je pourrais télécharger la musique et l'écouter en local." Ce registre
        d'attention, ressenti plutôt que calculé, est toute la raison d'être de l'objet.
    artifacts:
      - src: "/images/work/databloom/approach-6-usertest.jpg"
        alt: "L'écran de réglage du seuil de la simulation, lors du second test utilisateur, où chaque participant fixait sa limite hebdomadaire personnelle de consommation numérique avant le lancement."
        caption: "Second test utilisateur — réglage du seuil hebdomadaire, une semaine comprimée en dix minutes."
        decision: "Observer de vraies réactions comptait plus qu'un score. Avec quatre participants, le signal qualitatif était le seul digne de confiance."
        width: "wide"

outcome:
  - >-
    Un prototype fonctionnel qui marche : mécanique, électronique et firmware stables, réagissant
    en temps réel à des données de foyer simulées.
  - >-
    Une reconnaissance forte. Chaque participant a lu le flétrissement sans aide, et tous ont dit
    qu'ils placeraient la fleur chez eux, le plus souvent dans un lieu de passage comme une table
    d'entrée ou un plan de travail de cuisine.
  - >-
    Lors de la défense du travail de Bachelor, le MEI y a vu un usage au-delà du projet : un objet
    pédagogique, à l'école ou avec des enfants, pour rendre tangible le coût énergétique d'internet.
    J'ai remis une série de recommandations pour aller plus loin, et le MEI a ensuite publié un
    article sur son blog de recherche.

reflection: >-
  Avec seulement 11 semaines pour réaliser le projet DataBloom, je n'ai jamais pu mener la seconde
  itération vers laquelle pointaient les tests : une courbe de flétrissement plus douce, une lumière
  plus lisible, et un moyen pour la fleur de se rétablir quand un foyer fait mieux. Une fleur qui ne
  fait que s'affaisser finit par ne plus motiver. La laisser se redresser, c'est le travail de la
  prochaine version.

gallery:
  - src: "/images/work/databloom/gallery-1.jpg"
    alt: "DataBloom sur une étagère murale en bois à côté d'un panier tressé, sa tige courbée à mi-hauteur, dans un intérieur de maison."
    caption: "À la maison — sur une étagère, tige partiellement courbée."
  - src: "/images/work/databloom/gallery-2.jpg"
    alt: "DataBloom sur un bureau à côté d'un ordinateur portable ouvert et d'une petite plante vivante, sa tige doucement courbée."
    caption: "Sur un bureau — à côté du temps d'écran qu'elle reflète."
  - src: "/images/work/databloom/gallery-3.jpg"
    alt: "Vue plongeante dans la fleur : des pétales en feutre cobalt autour d'un centre clair imprimé en 3D, la tige verte entrant dans le pot."
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
    alt: "Croquis d'idéation dessiné à la main du concept de la fleur : la corolle en feutre, la tige segmentée avec son câble de traction et son servo, et une petite interface à l'écran, le tout annoté en français."
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
