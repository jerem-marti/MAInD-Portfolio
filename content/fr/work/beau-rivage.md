---
title: "Beau-Rivage Eco-Redesign"
summary: "Une refonte écoconçue de fond en comble du site du Beau-Rivage Palace qui a réduit son poids et son empreinte carbone d'environ 95 % tout en gardant l'allure d'un hôtel cinq étoiles. Un audit du site existant, un nouveau design, et un build Nuxt 3 réglé pour la durabilité."
status: "live"
heroAlt: "La page d'accueil refondue du Beau-Rivage Palace au repos : une navigation supérieure sobre et le logo centré 'Beau-Rivage Palace, Lausanne Switzerland' sur un champ de fines lignes dorées, bien plus léger que le site d'origine."
hero: "/images/work/beau-rivage/hero.jpg"

brief:
  role: "Écoconception et build"
  year: "2025"
  host: "HEIG-VD · Eco-conception"
  scope: "Équipe de quatre"
  shipped: "Refonte + build Nuxt 3"

problem:
  - >-
    Les sites des hôtels de luxe comptent parmi les plus lourds du web : vidéo en lecture automatique,
    images énormes, et tous les formats imaginables, le tout au nom du prestige. Ce poids n'est pas
    gratuit. C'est de la bande passante, de l'énergie et du carbone à chaque visite.
  - >-
    Le brief consistait à refondre le site du Beau-Rivage Palace selon les principes de l'éco-conception
    (le design numérique responsable), et le vrai défi tenait à la tension à l'intérieur : réduire
    drastiquement le coût environnemental du site sans perdre le sentiment de luxe qui fait tout l'enjeu
    de la marque.

role:
  led:
    - "Le build technique : le passage à Nuxt 3, le rendu côté serveur, et le pipeline d'optimisation des images"
    - "La mesure avant-après du poids, du carbone et des performances"
  contributed:
    - "L'audit du site existant et la refonte, avec l'équipe"
  notTouched:
    - "Des parties du design visuel et des maquettes, partagées au sein de l'équipe de quatre"
  team: "Équipe de quatre (Groupe CJJN) pour le module Eco-conception à la HEIG-VD : Nicolas Aerny, Joël Gaillard, Jérémy Martin et Clément Künzi. Enseigné par Stéphane Lecorney."

approach:
  - label: "Audit"
    title: "Peser le site existant"
    prose:
      - >-
        Avant de refondre quoi que ce soit, nous avons mesuré ce qui existait, car l'éco-conception ne
        prend sens que face à une référence. Le site existant s'appuyait sur de la vidéo en lecture
        automatique et des images non optimisées à travers une structure profonde de chambres, suites,
        restaurants, bars et spas. Une seule page pesait plus de treize mégaoctets et obtenait un F sur
        EcoIndex, avec une estimation de 368 kg de CO2 par an pour dix mille visites par mois.
      - >-
        Nous avons aussi cartographié les vrais parcours utilisateurs (un prospect qui s'informe, un
        client qui compare les chambres) pour que la refonte puisse garder ce que les gens venaient
        vraiment chercher tout en se délestant du poids qu'ils n'avaient jamais demandé.
    artifacts:
      - src: "/images/work/beau-rivage/artifact-audit-1.jpg"
        alt: "Une slide de projet titrée 'Revue des éléments du site non écoconçus' avec trois colonnes, Vidéos, Images et Animations, listant les médias du site d'origine comme étant de haute qualité, surdimensionnés, non compressés et en lecture automatique."
        caption: "Audit — les médias du site d'origine, passés en revue."
        decision: "Nommer chaque ingrédient lourd d'abord a montré que la vidéo et les images représentaient l'essentiel du poids, et c'est donc là que la refonte se jouerait."
        width: "half"
      - src: "/images/work/beau-rivage/artifact-audit-2.jpg"
        alt: "Une slide de projet titrée 'Revue des éléments du site non écoconçus' relevant des illustrations sans valeur informative, de très grandes quantités de médias de haute qualité, et des pages qui répètent le contenu d'une autre page."
        caption: "Audit — quelle part n'apportait aucune information."
        decision: "L'essentiel des médias était décoratif, nous pouvions donc retirer du poids sans retirer rien de ce qu'un client venait vraiment chercher."
        width: "half"

  - label: "Refonte"
    title: "Le luxe sans le poids"
    prose:
      - >-
        La question de design était la plus intéressante : comment garder une image de prestige tout en
        retirant les ingrédients lourds qui la signalent d'habitude ? Nous avons reconstruit les pages
        clés (la page d'accueil, les chambres et suites, une suite comme la Riviera) autour de la
        sobriété, en traitant l'espace généreux et la typographie soignée comme le signal de luxe plutôt
        que le spectacle en lecture automatique.
    artifacts:
      - src: "/images/work/beau-rivage/artifact-redesign.jpg"
        alt: "Une slide de projet titrée 'Comment retranscrire le luxe de manière écoconçue?' associant une approche de design en quatre points (mise en page épurée, couleurs revalorisées, médias allégés via des SVG sobres, moins de contenu) à des maquettes de la page d'accueil refondue, de la page La Plage et de la Suite Riviera."
        caption: "Refonte — garder le luxe, retirer le poids."
        decision: "Nous avons traité la sobriété comme le signal de luxe, en mettant une typographie et un espace soignés et des SVG sobres à la place du spectacle en lecture automatique."
        width: "wide"

  - label: "Build"
    title: "Nuxt 3, SSR et discipline des images"
    prose:
      - >-
        Nous sommes partis de Vue, le framework que nous connaissions, et nous sommes passés à Nuxt 3
        précisément pour les outils de durabilité qu'il apporte. Le rendu côté serveur fait que la page
        arrive prête à s'afficher avec un travail minimal sur l'appareil du visiteur, et Nuxt Image gère
        automatiquement la plus grosse source de poids : convertir les images vers des formats modernes
        comme WebP et AVIF, les charger en différé, et les redimensionner à l'écran réel plutôt que
        d'envoyer un seul énorme fichier à tout le monde.
      - >-
        Cette combinaison constitue l'essentiel du gain. Une architecture SSR sur Node.js maintient le
        travail côté client, et donc l'énergie de l'appareil, à un niveau bas, et une gestion disciplinée
        des images transforme les pages les plus lourdes en les plus légères. L'idée tout du long était
        que la durabilité ici n'est pas une ambiance, ce sont des choix techniques précis avec des effets
        mesurables.
    artifacts:
      - src: "/images/work/beau-rivage/artifact-build-1.jpg"
        alt: "Une slide de projet titrée 'Nuxt Image' montrant un intérieur du Beau-Rivage converti en AVIF et redimensionné, passant de 51.5 kB à 22.5 kB, soit 56 % d'économie, à côté du code NuxtImg qui le fait."
        caption: "Build — Nuxt Image fait le gros du travail."
        decision: "La conversion automatique en WebP et AVIF, plus le redimensionnement au viewport, ont transformé la source de poids la plus lourde en la plus légère."
        width: "half"
      - src: "/images/work/beau-rivage/artifact-build-2.jpg"
        alt: "Une slide de projet titrée 'Server-Side Rendering (SSR)' avec un schéma du flux de requête où le serveur envoie du HTML prêt à l'emploi pour que la page s'affiche avec un travail minimal sur l'appareil du visiteur."
        caption: "Build — le rendu côté serveur sur Nuxt 3."
        decision: "Rendre côté serveur signifie que la page arrive prête à s'afficher, gardant bas le travail côté client et l'énergie de l'appareil."
        width: "half"

  - label: "Hébergement"
    title: "Chercher du vert, honnêtement"
    prose:
      - >-
        Nous avons aussi regardé où le site vivrait, en confrontant les hébergeurs au jeu de données de la
        Green Web Foundation. Le constat honnête était une zone grise : notre plateforme tourne sur une
        infrastructure AWS en Europe, qui revendique de l'énergie renouvelable mais n'est pas clairement
        répertoriée comme verte. Plutôt que de surévaluer, nous l'avons noté comme une limite réelle, car
        un projet d'éco-conception qui maquille son propre hébergement n'est pas honnête sur son empreinte.

  - label: "Résultats"
    title: "De F à A"
    prose:
      - >-
        L'avant-après est la part dont je suis le plus fier, car elle est mesurée, pas affirmée. Le poids
        de la page est passé de 13.11 MB à 504 KB. Le carbone annuel estimé est tombé de 368 kg à 15.35 kg
        de CO2. La note EcoIndex est passée de F à A, et le score de qualité global est monté de 36 à 73,
        avec les performances grimpant de 66 à 98.
      - >-
        Cela représente environ 95 % de réduction du poids et du carbone, un site à peu près vingt fois
        plus léger, avec une utilisabilité et des performances qui montent plutôt que de baisser. Le luxe
        a survécu au régime.
    artifacts:
      - src: "/images/work/beau-rivage/artifact-results.jpg"
        alt: "Quatre outils de mesure comparant le site d'origine et le site refondu : Website Carbon (de F à A, de 368 à 15.35 kg de CO2 par an), Beacon (de 13.11 MB à 504 KB), Ecograder (de 36 à 73) et Lighthouse (performance de 66 à 98)."
        caption: "Résultats — mesurés sur quatre outils, avant et après."
        decision: "Chaque chiffre de cette étude est l'une de ces quatre lectures, avant et après, pas une affirmation."
        width: "full"

outcome:
  - >-
    Un site du Beau-Rivage Palace refondu, environ 95 % plus léger en poids et en carbone que l'original,
    EcoIndex de F à A, tout en gardant l'allure d'une marque cinq étoiles.
  - >-
    Un build Nuxt 3 utilisant le rendu côté serveur et l'optimisation automatique des images comme
    leviers principaux, avec un avant-après mesuré plutôt qu'une affirmation.
  - >-
    Un compte rendu honnête des limites, y compris la zone grise autour de l'hébergement vert, car un
    projet d'éco-conception doit mesurer sa propre empreinte avec vérité.

reflection: >-
  Ce projet a rendu la durabilité numérique concrète pour moi. Il est facile de parler de design
  responsable dans l'abstrait ; il est bien plus utile de réduire le carbone d'un vrai site de 95 % et de
  pouvoir montrer les chiffres. La leçon qui est restée, c'est que les parties les plus lourdes et les
  plus gaspilleuses d'un site sont en général les plus automatisables à corriger, les images avant tout,
  et que l'on peut être plus léger et plus rapide tout en restant haut de gamme. Cela touche de près à la
  question derrière mon mémoire : rendre visible le coût énergétique invisible du numérique, puis y faire
  quelque chose.

gallery:
  - alt: "Bandeau éditorial de la page d'accueil refondue : la façade du Beau-Rivage Palace au-dessus de sa piscine extérieure et du Léman, sous le titre Le Beau Rivage."
    caption: "Page d'accueil — l'hôtel, posé sur le lac."
    src: "/images/work/beau-rivage/gallery-01.jpg"
  - alt: "Page Chambres et Suites refondue : quatre cartes de chambres (Supérieure vue ville, vue lac et alpes, Deluxe, Deluxe Riviera) en photographie d'intérieur optimisée."
    caption: "Chambres — la liste, reconstruite légère."
    src: "/images/work/beau-rivage/gallery-02.jpg"
  - alt: "La page Suite Riviera : une grille de quatre images du salon, de la chambre et de la salle de bain avec vue sur le lac de la suite, en photographie optimisée."
    caption: "Suite Riviera — le luxe sans le poids."
    src: "/images/work/beau-rivage/gallery-03.jpg"
  - alt: "Page Restaurants et Bars refondue : des cartes pour PIC au Beau-Rivage Palace, Café Beau-Rivage et La Terrasse en photographie optimisée."
    caption: "Restaurants et bars — l'éventail, gardé léger."
    src: "/images/work/beau-rivage/gallery-04.jpg"

resources:
  - type: demo
    title: "Version éconçue du site (démo)"
    url: "https://heig-ecoconception-brp.netlify.app/"
  - type: github
    title: "Code source (Nuxt 3)"
    url: "https://github.com/jerem-marti/HEIG-VD_COMEM_IM51_EcoC_Groupe-CJJN"
  - type: pdf
    title: "Présentation du projet"
    url: "/files/beau-rivage-presentation.pdf"
  - type: pdf
    title: "Déclaration d'écoconception (RGESN)"
    url: "/files/beau-rivage-rgesn.pdf"

card:
  title: "Beau-Rivage Eco-Redesign — un site d'hôtel de luxe 95 % plus léger"
  alt: "Le site du Beau-Rivage Palace refondu : sobre, élégant, bien plus léger que l'original."
  image: "/images/work/beau-rivage/adjacent.jpg"
---
