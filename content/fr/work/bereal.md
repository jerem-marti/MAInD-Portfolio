---
title: "Recoder BeReal"
summary: "Un recodage partiel de BeReal mené sur deux cours : une PWA Vue pensée d'abord pour le mobile et une API REST Express. J'ai pris en charge le pipeline de traitement des images de bout en bout, du déclenchement simultané des deux caméras côté front jusqu'à l'envoi, au recadrage et au stockage de la photo côté back."
status: "live"
hero: "/images/work/bereal/hero.jpg"
heroAlt: "Trois écrans du recodage de BeReal sur une interface mobile sombre : la capture en direct à double caméra, la publication composée avec la photo arrière en plein cadre et le selfie de la caméra avant en incrustation, et le fil d'un ami."

brief:
  role: "Pipeline d'images (front + back)"
  year: "2024"
  host: "HEIG-VD · DévMobil + ArchiOWeb"
  scope: "Équipe de quatre"
  shipped: "PWA Vue + API REST Express"

problem:
  - >-
    Tout le produit BeReal tient en une seule photo honnête : les deux caméras se déclenchent à une
    notification quotidienne aléatoire, sans filtres, sans reprises. Recoder ça, c'est admettre que la
    photo n'est pas une fonctionnalité, c'est le produit, et chaque décision technique doit servir cette
    unique image non filtrée.
  - >-
    Le projet s'est déroulé sur deux cours de la HEIG-VD, une PWA mobile et une API REST, et j'ai pris la
    partie qui traverse les deux de bout en bout : le pipeline d'images, du moment où les deux caméras se
    déclenchent jusqu'au moment où la photo stockée et recadrée réapparaît dans le fil d'un ami.

role:
  led:
    - "L'écran de capture à double caméra et tout le flux de soumission côté front-end"
    - "Le pipeline d'envoi et de stockage des images côté back-end, ainsi que ses tests d'intégration"
  contributed:
    - "La revue de code et la qualité du code sur l'ensemble de l'API REST"
  notTouched:
    - "Le reste des vues front-end ainsi que les systèmes d'amis et de notifications, construits par mes coéquipiers"
  team: "Équipe de quatre pour les cours DévMobil et ArchiOWeb à la HEIG-VD : Jérémie Zurflüh, Jérémy Martin et Antoine Uldry (développeurs front-end et back-end), et Steve Pasche (design UX/UI)."

approach:
  - label: "Capture"
    title: "Les deux caméras, aucune reprise"
    prose:
      - >-
        Le front-end est une PWA pensée d'abord pour le mobile, et son moment décisif est la capture.
        Quand la notification se déclenche, la caméra avant et la caméra arrière s'ouvrent en même temps :
        l'arrière montre ce que vous faites, l'avant montre votre réaction, et la publication porte votre
        localisation. Il n'y a ni filtres ni reprises, parce que la contrainte est tout l'enjeu de BeReal.
      - >-
        J'ai construit cet écran de capture et le flux de soumission qui le sous-tend : ouvrir les deux
        flux caméra, composer les deux images en une seule publication, et la transmettre à l'API. Le
        travail intéressant est dans les contraintes, faire en sorte que deux flux caméra simultanés se
        comportent bien sur un téléphone, et refuser les fonctions (filtres, reprises) que chaque instinct
        pousse à ajouter.
    artifacts:
      - src: "/images/work/bereal/artifact-capture-live.jpg"
        alt: "L'écran de capture en pleine prise sur une interface mobile sombre : la caméra avant remplit le cadre d'un selfie en direct, avec un bouton de déclenchement rond et une commande de basculement de caméra en dessous, sous l'en-tête BeReal et un compte à rebours."
        caption: "Capture — les deux caméras en direct, sans filtres."
        decision: "Ouvrir les deux flux caméra en même temps et refuser les reprises est le produit, donc l'écran de capture n'expose qu'un déclencheur et une commande de basculement."
        width: "half"
      - src: "/images/work/bereal/artifact-capture-post.jpg"
        alt: "La publication composée prête à envoyer : la photo arrière en plein cadre avec le selfie de la caméra avant en incrustation dans le coin supérieur, et un bouton d'envoi (Envoyer) en dessous."
        caption: "Composition — cadre arrière, incrustation avant, une publication."
        decision: "Les deux images se composent en une seule publication avant l'envoi, afin que la double photo soit un objet unique que le reste de l'application peut traiter comme une unité."
        width: "half"

  - label: "Pipeline"
    title: "De la mémoire au CDN, jamais sur le disque"
    prose:
      - >-
        Côté back-end, la photo arrive sous forme de fichier envoyé et doit finir dans un stockage rapide
        et économique. J'ai construit le pipeline autour du stockage en mémoire de Multer, de sorte qu'une
        image envoyée est conservée sous forme de buffer plutôt qu'écrite sur le disque du serveur, et
        diffusée directement vers Cloudinary via un flux d'envoi.
      - >-
        Garder le fichier en mémoire et le diffuser en sortie, c'est aucun fichier temporaire à nettoyer,
        aucun disque à remplir, et un serveur qui reste stateless. Le endpoint accepte les deux images
        caméra ensemble (avant et arrière), si bien que la double photo est un objet de première classe
        dans l'API, et non deux envois sans rapport.
    artifacts:
      - src: "/images/work/bereal/artifact-pipeline.jpg"
        alt: "Un schéma de pipeline en quatre étapes : un envoi multipart de frontCamera et backCamera, conservé en mémoire par Multer sous forme de buffer (marqué sans fichier temporaire, sans disque), diffusé vers Cloudinary avec upload_stream, puis stocké comme URLs sur la publication dans MongoDB."
        caption: "Le pipeline d'envoi, de la mémoire au CDN."
        decision: "Conserver l'envoi en mémoire et le diffuser directement vers le CDN garde le serveur stateless, sans fichier temporaire à nettoyer."
        width: "wide"

  - label: "Transformation"
    title: "Recadrer par le contenu et par le visage"
    prose:
      - >-
        Le stockage est aussi l'endroit où les images prennent forme, et j'ai laissé le CDN faire le gros
        du travail. La photo principale est recadrée automatiquement à une hauteur constante, avec une gravité tenant
        compte du contenu, et les photos de profil utilisent un recadrage tenant compte
        du visage (la gravité par visage de Cloudinary) en vignettes carrées, pour qu'un portrait reste
        centré sur le visage au lieu du coin d'une pièce.
      - >-
        Déléguer les transformations à Cloudinary a gardé l'API légère et les résultats cohérents :
        conversion de format, dimensionnement et recadrage intelligent se font tous à la livraison, pilotés
        par quelques options de transformation plutôt que par du code de traitement d'image que j'aurais
        eu à maintenir.
    artifacts:
      - src: "/images/work/bereal/artifact-transform.jpg"
        alt: "Deux blocs d'options d'envoi Cloudinary côte à côte : l'image de publication utilise une gravité tenant compte du contenu auto dans un ratio 3:4, tandis que la photo de profil utilise une gravité tenant compte du visage auto:faces avec un recadrage rond 1:1, les deux lignes de gravité étant mises en évidence."
        caption: "Deux recadrages, définis par quelques options."
        decision: "La gravité par contenu pour les publications et la gravité par visage pour les avatars proviennent chacune d'un seul bloc d'options, si bien que le CDN fait le recadrage et l'API reste légère."
        width: "wide"

  - label: "Tests"
    title: "Prouver que l'API fonctionne vraiment"
    prose:
      - >-
        Parce que le pipeline est le produit, je l'ai couvert par des tests d'intégration plutôt que de
        le vérifier à la main. Une suite Jest et Supertest interroge les vrais endpoints
        (authentification, publications, et le reste) et fait des assertions sur les réponses, de sorte
        qu'un changement qui casse l'envoi ou la visibilité du fil échoue bruyamment plutôt que
        silencieusement.
      - >-
        Écrire ces tests est aussi ce qui a fait de moi un relecteur plus attentif dans l'équipe. Une fois
        que l'API a eu un filet de sécurité, la revue de code a pu se concentrer sur la conception plutôt
        que sur la chasse aux régressions à l'œil nu.
    artifacts:
      - src: "/images/work/bereal/artifact-tests.jpg"
        alt: "Le résumé du rapport de couverture Jest : 77.42 % des instructions, 68.69 % des branches, 75 % des fonctions et 78.79 % des lignes couvertes, avec un tableau par domaine pour les controllers, middlewares, models et routes."
        caption: "La couverture sur l'ensemble de l'API, générée par Jest."
        decision: "Couvrir le pipeline et les endpoints par des tests d'intégration signifie qu'un changement qui casse l'envoi ou la visibilité du fil échoue bruyamment, pas silencieusement."
        width: "wide"

outcome:
  - >-
    Un recodage de BeReal en deux parties qui fonctionne : une PWA Vue pensée d'abord pour le mobile et
    une API REST Express et Mongoose, avec le flux à double photo opérationnel de bout en bout, de la
    capture jusqu'au fil d'un ami.
  - >-
    Un pipeline d'images efficace, un envoi en mémoire diffusé vers un CDN avec un recadrage tenant compte
    du contenu et du visage, et une suite d'intégration Jest et Supertest couvrant l'API sur laquelle il
    tourne.
  - >-
    La règle du fil honnête intacte : vous ne voyez les publications de vos amis qu'un jour où vous avez
    vous-même publié, le mécanisme social qui fait de BeReal ce qu'il est.

reflection: >-
  Ce qui m'a le plus marqué, c'est la discipline de couvrir la partie la plus critique par des tests
  d'intégration, pour que le reste de l'équipe puisse avancer sans craindre de la casser. Au-delà de ça,
  c'était la première fois que je construisais une application web complète de bout en bout, du front au
  back, avec Vue, Express et Mongoose. Suivre tout le processus de développement, tests compris, c'est ce
  qui a fait atterrir la théorie : ça a transformé ce que nous apprenions sur le NoSQL et Express en une
  vraie application qui fonctionne.

gallery:
  - src: "/images/work/bereal/gallery-feed.jpg"
    alt: "Le fil d'actualité sur une interface mobile sombre : la double photo d'un ami affichée pleine largeur, une prise arrière en paysage avec le selfie en incrustation, sous l'en-tête de l'application et au-dessus d'une barre de navigation inférieure."
    caption: "Fil — la publication d'un ami, défilement infini."
  - src: "/images/work/bereal/gallery-gate.jpg"
    alt: "Le fil flouté derrière une invite centrée indiquant Poste pour voir, qui demande à l'utilisateur de publier son propre BeReal avant de pouvoir voir les publications de ses amis."
    caption: "Honnête par réciprocité — publie pour voir."
  - src: "/images/work/bereal/gallery-comments.jpg"
    alt: "Une publication ouverte sur son écran de détail avec un fil de commentaires en dessous, montrant des réponses et un champ de saisie de commentaire."
    caption: "Commentaires et réponses sur une publication."
  - src: "/images/work/bereal/gallery-profile.jpg"
    alt: "Un profil utilisateur affichant un avatar rond, un pseudonyme, les compteurs de publications, commentaires et amis, et une grille de BeReals récents."
    caption: "Profil — statistiques et BeReals récents."
  - src: "/images/work/bereal/gallery-friends.jpg"
    alt: "L'écran des amis : un champ de recherche et une liste d'amis avec des avatars ronds, plus un onglet pour les demandes d'amis en attente."
    caption: "Amis et demandes."
  - src: "/images/work/bereal/gallery-swagger.jpg"
    alt: "L'interface Swagger UI de l'API REST, listant les groupes de endpoints pour Auth, Users et Publications avec des méthodes GET, POST, PUT, PATCH et DELETE codées par couleur."
    caption: "L'API REST, documentée avec Swagger."

resources:
  - type: github
    title: "Front-end — Vue mobile PWA"
    url: "https://github.com/HEIG-COMEM/HEIG-VD_DevMobil_REST"
  - type: github
    title: "Back-end — Express REST API"
    url: "https://github.com/HEIG-COMEM/HEIG-VD_ArchiOWeb_REST"

card:
  title: "Recoder BeReal — une capture à double caméra et un pipeline d'images"
  alt: "Recoder BeReal : la publication composée à double photo à côté du fil d'un ami, sur une interface mobile sombre."
  image: "/images/work/bereal/adjacent.jpg"
---
