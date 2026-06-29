---
title: "WeMatch"
summary: "Un compagnon AX de compatibilité de voyage pour WeRoad, la plateforme de voyages en groupe. Il aide les voyageurs à trouver le bon groupe, pas seulement le bon voyage : il lit la façon dont une personne voyage, construit un profil comportemental, évalue chaque groupe au regard de ce profil et explique chaque correspondance en langage clair."
status: "live"
hero: "/images/work/wematch/hero.jpg"
heroAlt: "Une diapositive-titre sur un dégradé doux du blanc au rose : « WeMatch finds your group before you find your trip » en grand, en corail et encre, avec le personnage rond de l'agent Matchy à droite."

brief:
  role: "Recherche · design AX · récit"
  year: "2026"
  host: "SUPSI × Spark Reply"
  scope: "Équipe de cinq"
  shipped: "Présentation, agent testable, récit scrollytelling"

problem:
  - >-
    WeRoad conçoit tout d'un voyage en groupe, sauf la seule chose qui en décide l'issue.
    L'itinéraire, les hôtels, les accompagnateurs, le rythme : tout est planifié. Le groupe, ces
    onze inconnus avec qui vous passerez dix jours, est laissé à ceux qui ont, par hasard, réservé
    les mêmes dates.
  - >-
    Les avis le disent sans détour. Sur 1'660 avis récents de WeRoad publiés sur Trustpilot, 58%
    mentionnent le groupe ou leurs compagnons de voyage, plus que la destination, la cuisine, les
    hôtels ou les accompagnateurs. Et quand un voyage tourne mal, le groupe est la cause la plus
    citée : 18% des avis négatifs lui sont imputables.
  - >-
    Même marque, même itinéraire, voyage opposé. L'un rentre du Maroc avec des gens qu'il
    n'oubliera pas de sitôt. L'autre subit une dynamique de groupe toxique en Chine dès le deuxième
    jour. La destination fixe l'attente ; le groupe façonne l'expérience. Aujourd'hui, le groupe
    reste la seule variable que personne ne conçoit.

role:
  led:
    - "Analyse des données Trustpilot : l'étude des 1'660 avis qui sous-tend les chiffres de 58% et 18%"
    - "Design de l'expérience agentique (AX) : l'agent en six phases et le modèle de matching par ADN comportemental"
    - "Design, développement et récit de l'expérience scrollytelling (Nuxt + GSAP)"
    - "Storytelling de la présentation finale, avec un membre de l'équipe"
  contributed:
    - "Idéation et recherche UX (revue de littérature et entretiens), partagées au sein de l'équipe"
  notTouched:
    - "WeRoad n'est pas un client. WeMatch est un concept spéculatif et non sollicité ; la marque n'est mobilisée qu'à titre contextuel, sans aucun partenariat."
  team: "Équipe de cinq pour Designing Intelligent Experiences (SUPSI × Spark Reply) : Oleksandra Drapushko, Jérémy Martin, Ceren Seçkin, Zeno Tamagni, Elia Miglio."

approach:
  - label: "Recherche"
    title: "Trois angles, un même constat"
    prose:
      - >-
        Le constat vient de la triangulation, pas d'une intuition. Nous avons lu la littérature
        scientifique sur le voyage en solo, la dynamique de groupe et l'appariement (matchmaking).
        Mené huit entretiens approfondis, de 45 à 60 minutes chacun, auprès de voyageurs en solo et
        en groupe. Et analysé les avis WeRoad à grande échelle. Trois sources indépendantes, un même
        constat qui revient.
      - >-
        Elles convergent vers une seule phrase : la destination fixe l'attente, mais le groupe
        façonne l'expérience. Trois constats l'affinent. On évalue un voyage sur sa logistique, mais
        on le vit dans le rapport aux autres. Le profil d'un voyageur évolue avec le contexte et le
        temps ; un profilage figé ne peut pas le saisir. Et une bonne correspondance doit sonner
        juste, car la compatibilité ne convainc que lorsqu'on s'y reconnaît.

  - label: "Recadrage"
    title: "Des groupes déguisés en voyages"
    prose:
      - >-
        Le recadrage tient en un seul geste. Avant, nous disions que les voyageurs ont besoin
        d'aide pour trouver le bon voyage. Désormais, nous disons que le bon voyage a besoin du bon
        groupe. Le catalogue de destinations est en réalité un catalogue de groupes, habillés en
        itinéraires.
      - >-
        Surtout, rien n'est retiré. On cherche toujours par destination, par dates et par prix,
        exactement comme avant. Ce qui s'ajoute, c'est un score de compatibilité sur chaque voyage,
        et la possibilité de trier par compatibilité du groupe plutôt que par date ou par prix. La
        recherche habituelle reste en place ; un seul signal, nouveau et lisible, change ce qu'elle
        optimise.
    artifacts:
      - src: "/images/work/wematch/approach-reframe.jpg"
        alt: "Une diapositive de présentation intitulée « La variable la plus décisive d'un voyage WeRoad est la seule laissée au hasard » : une liste de ce que WeRoad maîtrise (itinéraire, hébergements, accompagnateurs, expériences, rythme) à côté d'un encart « Ce qui est laissé au hasard : le groupe », avec la mention que 18% des avis négatifs lui sont imputables."
        caption: "WeRoad maîtrise tout, sauf le groupe — la seule variable laissée au hasard."
        decision: "Nommer le groupe comme la seule variable non gérée a transformé un catalogue de destinations en catalogue de groupes, et donné au concept son point d'ancrage."
        width: "wide"

  - label: "L'agent"
    title: "Un compagnon, six phases"
    prose:
      - >-
        WeMatch est un agent (l'équipe l'a baptisé Matchy) qui accompagne tout le parcours, plutôt
        qu'une simple conversation ponctuelle. Il fonctionne en six phases, chacune dans un rôle
        distinct. Il découvre, en captant des signaux liés au rythme, à l'énergie sociale et à
        l'intention. Il profile, en bâtissant l'ADN comportemental du voyageur à partir de ces
        signaux. Il sélectionne, en notant chaque groupe par rapport à cet ADN.
      - >-
        Puis il explique, en rendant chaque correspondance compréhensible avant la réservation. Il
        prend des nouvelles pendant le voyage, en lisant la dynamique sociale en temps réel. Et il
        évolue, en affinant la compatibilité future à partir du vécu et des retours sur le voyage.
        L'arc court de la première session jusqu'à bien après le retour du voyageur.
    artifacts:
      - src: "/images/work/wematch/approach-2-agent.jpg"
        alt: "Schéma de l'agent en six phases : découverte, profilage, sélection, explication, suivi, évolution, chacune résumée en un mot."
        caption: "Le rôle de l'agent — six phases, du premier signal à l'apprentissage d'après-voyage."
        decision: "Concevoir l'agent comme un parcours, et non comme une fonctionnalité, a gardé la compatibilité sous la forme d'un profil vivant, et non d'un résultat de questionnaire figé."
        width: "wide"

  - label: "Le modèle"
    title: "ADN comportemental, du signal à la correspondance"
    prose:
      - >-
        Le profilage est le moteur. Les autres plateformes classent les voyages par destination ;
        WeMatch les classe par compatibilité. Deux entrées convergent vers un même profil : ce qu'un
        voyageur dit en conversation, et sa façon de naviguer sur le site. Ensemble, elles
        construisent un ADN comportemental sur huit dimensions, comme le rythme, l'énergie sociale,
        le style de planification et la gestion des conflits, mis à jour en continu dès la première
        session.
      - >-
        Chaque groupe disponible est ensuite noté à l'aune de cet ADN, ce qui produit un
        pourcentage de compatibilité et une explication en langage clair pour chaque voyage. La
        recherche se réordonne par compatibilité du groupe : « 87%, porté par la culture, rythme
        lent, trentenaires » passe avant « 41%, porté par le social, tempo festif, groupe plus
        jeune ». Et le profil reste visible et modifiable : le voyageur voit ce que l'agent a déduit
        et peut le corriger ; plus il s'implique, plus la correspondance est juste.
    artifacts:
      - src: "/images/work/wematch/approach-3-model.jpg"
        alt: "Le modèle d'ADN comportemental : deux entrées (conversation, navigation) alimentant un profil à huit dimensions, puis des cartes de voyage classées par score de compatibilité."
        caption: "Du signal à la correspondance — deux entrées, un profil à huit dimensions, des groupes classés par compatibilité."
        decision: "Noter le groupe plutôt que le voyage, avec une explication visible et un profil modifiable, a rendu l'intelligence lisible plutôt que magique."
        width: "wide"

  - label: "Le récit"
    title: "Communiquer une couche invisible"
    prose:
      - >-
        Une couche de compatibilité est difficile à montrer, parce que ce qu'elle a d'intéressant
        reste invisible. Côté communication, mon rôle était de la rendre tangible sans passer par une
        liste de fonctionnalités : une expérience en scrollytelling qui suit une voyageuse au moment
        où elle décide si elle réserve. Le lecteur découvre le service en situation, comme elle le
        vivrait, au lieu qu'on lui explique ce qu'il fait.
      - >-
        La même logique a guidé la présentation finale, dont j'ai construit la narration avec une
        coéquipière. Dans les deux cas, la règle était la même : montrer l'agent à l'œuvre, sans
        jamais le désigner comme de l'IA.

outcome:
  - >-
    Un concept d'expérience agentique ancré dans la recherche : trois angles de recherche
    indépendants qui convergent vers un même constat, un agent en six phases et le modèle de matching
    par ADN comportemental.
  - >-
    Trois livrables produits : la présentation complète du projet, un agent fonctionnel et testable,
    et le récit en scrollytelling qui tient lieu d'argumentaire.
  - >-
    Bien reçu par le jury, autant pour le récit que pour l'agent fonctionnel qui le soutient.

reflection: >-
  Le plus précieux n'était pas le concept. C'était d'apprendre la méthode auprès d'une équipe qui
  construit de vraies expériences agentiques. La pratique AX de Spark Reply a sa propre grammaire :
  concevoir autour de l'intention de l'utilisateur plutôt qu'autour des fonctionnalités, donner une
  personnalité à l'agent et la maintenir cohérente, et consacrer un vrai temps aux cas limites, là
  où l'autonomie d'un agent a le plus de chances de mal tourner. Ce cadrage a transformé ma manière
  de concevoir avec l'IA, et c'est l'angle que j'apporte désormais au reste de mon travail.

gallery:
  - src: "/images/work/wematch/gallery-1.jpg"
    alt: "Le produit conçu : une recherche WeRoad réordonnée par compatibilité du groupe, des voyages portant des badges de compatibilité verts sous un titre « Meilleurs matchs »."
    caption: "Le produit — la recherche, réordonnée par compatibilité du groupe."
  - src: "/images/work/wematch/gallery-2.jpg"
    alt: "Le radar d'ADN comportemental dans un aperçu de groupe : les dimensions de compatibilité d'un voyageur superposées à celles d'un groupe, avec une lecture de la correspondance en langage clair."
    caption: "Le modèle, rendu concret — le radar d'ADN comportemental."
  - src: "/images/work/wematch/gallery-3.jpg"
    alt: "L'agent Matchy en ligne sur le site WeRoad, en plein profilage par la conversation : il transforme le récit de voyage d'une personne en une question de relance accompagnée de trois réponses au choix."
    caption: "L'agent en ligne — le profilage par la conversation."
  - src: "/images/work/wematch/gallery-4.jpg"
    alt: "Une scène du one-pager scrollytelling où l'agent « lit » Sofia : il transforme son comportement de voyage en un profil d'ADN comportemental en direct, Sofia lisant sur son téléphone à côté."
    caption: "Le récit — le one-pager scrollytelling, Sofia en son centre."

resources:
  - type: pdf
    title: "Final presentation"
    url: "/files/wematch-presentation.pdf"
  - type: demo
    title: "Live agent"
    url: "https://maind-wematch.vercel.app/"
  - type: web
    title: "Scrollytelling one-pager"
    url: "https://jerem-marti.github.io/MAInD-Designing_Intelligent_Experiences-OnePager-2026/"

card:
  title: "WeMatch — un service de matching AX pour l'univers WeRoad"
  image: "/images/work/wematch/adjacent.jpg"
  alt: "Carte-titre WeMatch : « WeMatch finds your group before you find your trip » en corail et encre sur un dégradé doux du blanc au rose, avec le personnage rond de l'agent Matchy."
---
