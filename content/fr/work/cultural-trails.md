---
title: "Cultural Trails"
summary: "Une application web complète qui transforme le patrimoine culturel du canton de Vaud en sentiers de randonnée gamifiés et accessibles : des parcours thématiques, des points d'intérêt avec guides audio et quiz, et un mode éditeur qui permet aux acteurs locaux de publier leurs propres sentiers. J'étais responsable du back-end."
status: "live"
hero: "/images/work/cultural-trails/hero.jpg"
heroAlt: "Trois écrans de l'application Sentiers culturels posés sur le ruban de sentier vert, pêche et bleu du projet : la page d'un sentier pour Les chemins de fer par-dessus une photo de la gare de Lausanne, la carte d'exploration des sentiers le long de la rive de Lausanne et de Lavaux, et la navigation en cours de marche suivant un itinéraire sur une carte satellite."

brief:
  role: "Responsable back-end"
  year: "2024"
  host: "HEIG-VD · Projet d'articulation"
  scope: "Équipe de cinq"
  shipped: "Application web en ligne, présentation, rapport"

problem:
  - >-
    Le patrimoine culturel du canton de Vaud est riche mais dispersé, et difficile à découvrir à pied de
    façon guidée et engageante. Le brief était de construire une application web complète qui le transforme
    en sentiers de randonnée gamifiés et accessibles, et, point crucial, de permettre aux acteurs locaux de
    publier et d'éditer les leurs.
  - >-
    Sous le brief produit se trouvait un vrai problème d'ingénierie : une application riche en contenu et
    centrée sur la carte, avec deux types d'utilisateurs très différents (des gens qui explorent les sentiers
    et des gens qui les créent), portant du multimédia, des quiz et une couche de gamification, conçue et
    développée full-stack dans le temps imparti d'un projet étudiant. J'ai pris en charge la moitié
    back-end.

role:
  led:
    - "Le back-end : le modèle de données, les contrôleurs et la logique applicative, l'authentification et l'accès basé sur les rôles"
    - "L'intégration de la planification d'itinéraires, ainsi que le seeding de la base de données, les migrations et le déploiement"
  contributed:
    - "Des composants front-end qui dialoguent avec la base de données : les formulaires de création de sentiers et de POI, les filtres et les pages de profil"
    - "La phase UX initiale avec l'équipe"
  notTouched:
    - "Le travail du responsable front-end, celui du responsable design UX, et le volet visuel et communication"
  team: "Équipe de cinq (Groupe Loomi) pour le Projet d'articulation à la HEIG-VD : Jérémy Martin (responsable back-end), Antony Neyret (responsable front-end), François Cuennet (design UX), Leïla Fidalgo (cheffe de projet) et Ariadne Melissargos (communication). Encadrés par Laurent Berthelot (gestion de projet et technique), Jonathan Favre-Lamarine (UX/UI et design) et Noemi Romano (cartographie)."

approach:
  - label: "Architecture"
    title: "Une seule app, pas un front et un back"
    prose:
      - >-
        Nous sommes partis d'une base Laravel Breeze, qui nous a donné l'authentification, Tailwind et Vue
        clés en main, puis avons pris la décision qui a tout façonné : Blade, Livewire ou Inertia. Nous
        avons choisi Inertia. Elle nous a permis de construire une application monopage avec des transitions
        fluides tout en écrivant le back-end comme une application Laravel normale, sans API REST séparée à
        concevoir, versionner et maintenir synchronisée.
      - >-
        C'est ce choix qui a permis à une équipe de cinq personnes d'avancer vite. Inertia fait le
        pont entre le back et le front, si bien qu'un contrôleur renvoie les données directement à une page
        Vue, et la frontière dont j'avais la charge (les modèles, les requêtes, les règles d'accès) est
        restée propre et côté serveur tandis que le front-end restait réactif.
    artifacts:
      - alt: >-
          Un schéma d'architecture aux couleurs de la marque : un front-end Vue, Tailwind et MapLibre
          au-dessus d'un back-end Laravel et MySQL, avec une flèche entre les deux et un lien API vers le
          service de routage OpenRouteService.
        caption: "La stack : Vue, Tailwind et MapLibre sur Laravel et MySQL."
        decision: 'Une seule application Laravel pilote le front-end Vue via Inertia, donc il n''y a pas d''API REST séparée à concevoir, versionner et maintenir synchronisée.'
        width: "half"
        src: "/images/work/cultural-trails/artifact-stack.jpg"
      - alt: >-
          Un schéma du processus de construction aux couleurs de la marque, de gauche à droite : schéma
          relationnel, puis migrations et modèles, puis seeders, puis contrôleurs, avec une piste parallèle
          pour la cartographie, les composants de base et les flux de création de sentiers et de POI.
        caption: "Comment c'était construit : schéma, puis modèles, seeders, contrôleurs."
        decision: 'Bien poser le schéma et les modèles en premier est ce qui a permis aux contrôleurs et aux composants front-end de se mettre en place rapidement.'
        width: "half"
        src: "/images/work/cultural-trails/artifact-buildprocess.jpg"

  - label: "Modèle de données"
    title: "Un système de contenu pour les sentiers"
    prose:
      - >-
        Le cœur du back-end est le schéma. Un sentier (parcours) est relié à de nombreux points d'intérêt
        et un point d'intérêt peut appartenir à de nombreux sentiers, donc la table de jonction entre eux
        porte l'ordre de la marche. Chaque point d'intérêt possède ses propres guides audio, photos et
        faits ; chaque sentier appartient à un thème. Au-dessus du contenu se trouve un modèle de quiz
        (quiz, questions, réponses) pour les arrêts gamifiés.
      - >-
        Vient ensuite la couche d'engagement, celle qui donne le sentiment d'un produit plutôt que d'un
        catalogue : favoris et historiques de complétion pour les sentiers comme pour les points d'intérêt,
        accomplissements avec une table pivot utilisateur, avis, et un système de rôles sous l'ensemble.
        Bien établir ces relations dès le départ, c'est ça l'architecture ; tout le reste se construit
        dessus.
    artifacts:
      - alt: >-
          Une diapositive produit présentant l'application sur sentiers-culturels-vaud.ch, listant trois
          niveaux d'accès : pour tous les utilisateurs, pour les utilisateurs avec un compte, et pour un
          acteur local avec un compte éditeur.
        caption: "Le produit : une seule app, trois niveaux d'accès."
        decision: 'Le même système de contenu sert les visiteurs anonymes, les titulaires de compte et les éditeurs, avec des vues débloquées par le rôle.'
        width: "half"
        src: "/images/work/cultural-trails/artifact-product.jpg"
      - alt: >-
          Une diapositive produit, "Onglet Accueil", montrant l'onglet d'accueil sur mobile : explorer les
          sentiers par thème, proximité et popularité, et un quiz "quel sentier es-tu" qui recommande des
          sentiers.
        caption: "L'onglet d'accueil : explorer par thème, lieu, et un quiz de recommandation."
        decision: 'Les thèmes, la popularité et le quiz lisent tous le même contenu relationnel, donc la découverte n''est qu''une requête de plus sur le modèle.'
        width: "half"
        src: "/images/work/cultural-trails/artifact-home.jpg"
      - alt: >-
          Une diapositive produit, "Page d'un sentier", montrant la page d'un sentier sur mobile : photos,
          description, distance et durée, ses arrêts ordonnés, l'accessibilité et un panneau d'avis noté
          4.5.
        caption: "La page d'un sentier : description, arrêts ordonnés, accessibilité, avis."
        decision: 'Chaque champ ici correspond au schéma : un sentier et ses arrêts ordonnés, son accessibilité, et les avis superposés par-dessus.'
        width: "half"
        src: "/images/work/cultural-trails/artifact-trail.jpg"
      - alt: >-
          Une diapositive produit, "Page d'un point d'intérêt", montrant la page d'un POI sur mobile (Gare
          de Lausanne) avec un guide audio, un quiz, et la liste des sentiers qui le traversent.
        caption: "Un point d'intérêt : guide audio, quiz, et les sentiers auxquels il appartient."
        decision: 'Chaque point d''intérêt porte ses propres médias et son quiz et peut appartenir à de nombreux sentiers, ce qui est la jonction many-to-many au centre du modèle.'
        width: "half"
        src: "/images/work/cultural-trails/artifact-poi.jpg"

  - label: "Rôles"
    title: "Explorateurs et éditeurs, un seul schéma"
    prose:
      - >-
        L'application sert deux publics depuis le même code. Un explorateur parcourt la carte, arpente un
        sentier, marque des points d'intérêt comme faits, et gagne des accomplissements. Un éditeur (un
        acteur culturel local) crée et édite des sentiers et des points d'intérêt à l'aide de formulaires
        guidés, avec ses propres flux de création et de suppression.
      - >-
        Cette séparation est imposée par l'accès basé sur les rôles. Les routes des favoris, du tableau de
        bord, des accomplissements et de l'édition sont protégées par un middleware de rôle, si bien que la
        même application expose en toute sécurité une expérience publique et la boîte à outils d'un
        contributeur sans que l'une déborde sur l'autre.
    artifacts:
      - alt: >-
          Un diagramme de séquence UML, "Voir un itinéraire" : un utilisateur sur le front-end Vue demande
          un sentier, le routeur web.php appelle MapController, PathController et PoiController, chacun
          interroge MySQL, et le contrôleur renvoie une vue Inertia avec ses props.
        caption: "Le flux explorateur : voir un sentier et ses points d'intérêt."
        decision: 'Le chemin de lecture d''un explorateur passe par les mêmes contrôleurs et les mêmes vues Inertia sur lesquels toute l''application est construite.'
        width: "half"
        src: "/images/work/cultural-trails/artifact-view-sequence.jpg"
      - alt: >-
          Un diagramme de séquence UML, "Créer un sentier" : un éditeur passe par les étapes de création
          d'un sentier, le NewPathController appelle l'API OpenRouteService et interroge les POI et les
          thèmes dans MySQL, puis crée le sentier et ses liens vers les points d'intérêt.
        caption: "Le flux éditeur : créer un sentier, son itinéraire et ses arrêts."
        decision: 'Le chemin d''écriture de l''éditeur est la même architecture protégée par un middleware de rôle, si bien qu''une seule base de code sert en toute sécurité les deux publics.'
        width: "half"
        src: "/images/work/cultural-trails/artifact-create-sequence.jpg"

  - label: "Cartes et routage"
    title: "Planifier de vrais itinéraires de marche"
    prose:
      - >-
        Les cartes interactives tournent sur MapLibre, et les sentiers eux-mêmes sont de vrais itinéraires,
        ce qui implique une planification d'itinéraire entre les points d'intérêt. Nous avons utilisé
        OpenRouteService pour cela via son API publique, en l'appelant depuis le flux d'édition pour
        planifier un itinéraire au fur et à mesure qu'un sentier était construit. Auto-héberger le moteur
        était la suite logique, que nous avons signalée pour un vrai déploiement, afin d'échapper aux
        limites de débit publiques et de lever toute contrainte sur cette planification.
    artifacts:
      - alt: >-
          Une diapositive produit, "Onglet Sentiers", montrant l'onglet des sentiers sur mobile : une carte
          filtrable des sentiers et un aperçu de sentier avec son itinéraire tracé entre ses arrêts.
        caption: "L'onglet des sentiers : une carte avec des filtres par distance, durée et thème."
        decision: 'Les sentiers sont de vrais itinéraires sur une carte MapLibre, parcourables et filtrables avant de partir.'
        width: "half"
        src: "/images/work/cultural-trails/artifact-trails.jpg"
      - alt: >-
          Une diapositive produit, "Lancement de la navigation", montrant la navigation en cours de marche
          sur mobile : la liste des étapes, l'itinéraire sur la carte, le prochain arrêt avec la distance et
          le temps restant, et une boîte de dialogue pour quitter la navigation.
        caption: "Navigation guidée : le prochain arrêt, la distance et le temps restant."
        decision: 'Suivre un sentier déroule l''itinéraire OpenRouteService planifié arrêt par arrêt, avec la possibilité de sauter un arrêt ou de quitter à tout moment.'
        width: "half"
        src: "/images/work/cultural-trails/artifact-navigation.jpg"

outcome:
  - >-
    Une application web full-stack en ligne et déployée sur sentiers-culturels-vaud.ch, construite sur
    Laravel, Inertia et Vue avec une base de données MySQL.
  - >-
    Un riche modèle de données relationnel et un système de contenu basé sur les rôles qui permet aux
    acteurs locaux de publier leurs propres sentiers, et pas seulement un catalogue fixe contrôlé par
    l'équipe.
  - >-
    Une cartographie interactive et une planification d'itinéraire entre les points d'intérêt, construites
    sur MapLibre et OpenRouteService, avec l'auto-hébergement du moteur de routage signalé comme l'étape
    suivante pour un déploiement en production.

reflection: >-
  C'est le projet qui m'a appris que le back-end, c'est surtout de la modélisation de données. Les
  semaines passées à bien établir les relations (sentiers vers points d'intérêt, la couche
  d'engagement, le système de rôles) sont ce qui a permis au reste de la construction d'avancer vite, et les
  parties brouillonnes, plus tard, se trouvaient presque toujours là où le modèle avait été trop lâche.
  Choisir Inertia plutôt qu'une API séparée était le choix pragmatique que je referais : il a échangé un
  peu de mise en place contre beaucoup moins de friction par la suite.

gallery:
  - alt: >-
      La carte d'exploration sur mobile : sentiers et points d'intérêt affichés sous forme d'épingles le
      long de la rive de Lausanne et de Lavaux, avec des filtres pour le thème, les critères et le rayon, et
      un bascule Sentiers / Lieux.
    caption: "Explorer : sentiers et lieux sur la carte."
    src: "/images/work/cultural-trails/gallery-map.jpg"
  - alt: >-
      La page d'un lieu sur mobile, "Gare de Lausanne", listant les sentiers qui le traversent, chacun avec
      une photo, une distance, une durée et un dénivelé.
    caption: "Un lieu, et les sentiers qui le traversent."
    src: "/images/work/cultural-trails/gallery-poi.jpg"
  - alt: >-
      L'écran de navigation d'un sentier sur mobile, "Étapes" : une chronologie verticale des arrêts depuis
      le point de départ, chacun marqué comme fait, avec un bouton de démarrage.
    caption: "Navigation : les arrêts d'un sentier, étape par étape."
    src: "/images/work/cultural-trails/gallery-steps.jpg"
  - alt: >-
      L'écran des avis sur mobile, "Avis" : une note de 4.5 avec une distribution des étoiles et des avis
      individuels de voyageurs portant des dates et du texte.
    caption: "Avis : une note, une distribution, et des retours de voyageurs."
    src: "/images/work/cultural-trails/gallery-reviews.jpg"
  - alt: >-
      L'écran des accomplissements sur mobile, "Accomplissements" : une grille de badges obtenus au-dessus
      de barres de progression réparties par thème, comme l'art et l'histoire.
    caption: "Accomplissements, gagnés en marchant et par thème."
    src: "/images/work/cultural-trails/gallery-achievements.jpg"
  - alt: >-
      L'écran de profil sur mobile, "Profil" : une statistique de complétion, des listes de sentiers
      terminés et téléchargés, et des avis rédigés, au-dessus de la navigation inférieure de l'application.
    caption: "Le profil : sentiers terminés, téléchargés, commentés."
    src: "/images/work/cultural-trails/gallery-profile.jpg"

resources:
  - type: github
    title: "Code source du projet (Laravel)"
    url: "https://github.com/antonynyt/projArt-loomi-SentiersCulturels"
  - type: pdf
    title: "Rapport de projet"
    url: "/files/cultural-trails-rapport.pdf"
  - type: pdf
    title: "Schéma relationnel de la base de données"
    url: "/files/cultural-trails-schema.pdf"

card:
  title: "Cultural Trails — une app de randonnée patrimoniale full-stack"
  alt: "Deux écrans de l'application Sentiers culturels sur le ruban de sentier vert, pêche et bleu du projet : la carte d'exploration des sentiers le long de la rive de Lausanne, et la navigation en cours de marche suivant un itinéraire sur une carte satellite."
  image: "/images/work/cultural-trails/adjacent.jpg"
---
