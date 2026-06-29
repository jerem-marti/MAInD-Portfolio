---
title: "WeMatch"
summary: "Un compagnon AX de compatibilité de voyage pour WeRoad, la plateforme de voyages en groupe. Il aide les voyageurs à trouver le bon groupe, pas seulement le bon voyage : il lit la façon dont quelqu'un voyage, construit un profil comportemental, évalue chaque groupe au regard de ce profil et explique chaque correspondance en langage clair."
status: "live"
hero: "/images/work/wematch/hero.jpg"
heroAlt: "Une diapositive de titre sur un dégradé doux blanc vers rose : « WeMatch trouve ton groupe avant que tu trouves ton voyage » écrit en grand, en corail et encre, avec le personnage rond de l'agent Matchy à droite."

brief:
  role: "Recherche · Design AX · récit"
  year: "2026"
  host: "SUPSI × Spark Reply"
  scope: "Équipe de cinq"
  shipped: "Présentation, agent testable, récit en scrollytelling"

problem:
  - >-
    WeRoad conçoit tout d'un voyage en groupe, sauf la seule chose qui décide de la façon dont il
    se passe. L'itinéraire, les hôtels, les tour leaders, le rythme : tout est planifié. Le groupe,
    les onze inconnus avec qui tu vas passer dix jours, est laissé à qui s'est trouvé réserver les
    mêmes dates.
  - >-
    Les avis le disent à voix haute. Sur 1'660 avis WeRoad récents publiés sur Trustpilot, 58%
    mentionnent le groupe ou les personnes avec qui ils ont voyagé, plus que la destination, la
    nourriture, les hôtels ou les tour leaders. Et quand un voyage rate, le groupe en est la cause
    la plus citée : 18% des avis négatifs y renvoient.
  - >-
    Même marque, même itinéraire, voyage opposé. Une voyageuse rentre du Maroc avec des gens
    qu'elle n'oubliera pas de sitôt. Une autre subit des dynamiques de groupe toxiques en Chine dès
    le deuxième jour. La destination fixe l'attente ; le groupe façonne l'expérience. Pour l'instant,
    le groupe est la seule variable que personne ne conçoit.

role:
  led:
    - "Analyse des données Trustpilot, l'étude de 1'660 avis derrière les chiffres de 58% et 18%"
    - "Design de l'expérience agentique, l'agent en six phases et le modèle de correspondance par ADN comportemental"
    - "Design, développement et narration de l'expérience en scrollytelling (Nuxt + GSAP)"
    - "Narration de la présentation finale, avec une coéquipière"
  contributed:
    - "Idéation et recherche UX (revue de littérature et entretiens), partagées au sein de l'équipe"
  notTouched:
    - "WeRoad n'est pas un client. WeMatch est un concept spéculatif et non sollicité ; la marque est utilisée de manière adjacente."
  team: "Équipe de cinq pour Designing Intelligent Experiences (SUPSI × Spark Reply) : Oleksandra Drapushko, Jérémy Martin, Ceren Seçkin, Zeno Tamagni, Elia Miglio."

approach:
  - label: "Recherche"
    title: "Trois angles, une même conclusion"
    prose:
      - >-
        L'intuition est venue de la triangulation, pas d'un pressentiment. Nous avons lu la
        littérature académique sur le voyage en solo, les dynamiques de groupe et le matchmaking.
        Nous avons mené huit entretiens approfondis, de 45 à 60 minutes chacun, avec des voyageurs
        solo et en groupe. Et nous avons analysé les avis de WeRoad à grande échelle. Trois sources
        indépendantes, une même conclusion qui revient.
      - >-
        Elles convergent vers une seule phrase : la destination fixe l'attente, mais le groupe
        façonne l'expérience. Trois constats l'ont affinée. Les voyages sont évalués sur la
        logistique mais vécus sur le social. Le profil d'un voyageur évolue selon le contexte et le
        temps, donc un profilage statique ne peut pas le saisir. Et une bonne correspondance doit
        sembler reconnaissable, parce que la compatibilité ne convainc que lorsque les gens peuvent
        s'y reconnaître.

  - label: "Recadrage"
    title: "Des groupes déguisés en voyages"
    prose:
      - >-
        Le recadrage tient en un seul geste. On disait que les voyageurs ont besoin d'aide pour
        trouver le bon voyage. On dit maintenant que le bon voyage a besoin du bon groupe. Le
        catalogue de destinations est en réalité un catalogue de groupes, habillés d'itinéraires.
      - >-
        Surtout, rien n'est retiré. Un voyageur cherche toujours par destination, dates et prix,
        exactement comme avant. Ce qui s'ajoute, c'est un score de compatibilité sur chaque voyage,
        et la possibilité de trier par affinité de groupe plutôt que par date ou par prix. La
        recherche familière reste ; un seul signal nouveau et lisible change ce qu'elle optimise.
    artifacts:
      - src: "/images/work/wematch/approach-reframe.jpg"
        alt: "Une diapositive de présentation intitulée « La variable la plus décisive d'un voyage WeRoad est la seule laissée au hasard » : une liste de ce que WeRoad contrôle (itinéraire, hébergements, tour leaders, expériences, rythme) à côté d'un panneau indiquant « Ce qui est laissé au hasard : le groupe », notant que 18% des avis négatifs y renvoient."
        caption: "WeRoad contrôle tout sauf le groupe — la seule variable laissée au hasard."
        decision: "Nommer le groupe comme la seule variable non gérée a transformé un catalogue de destinations en catalogue de groupes, et a donné au concept son point d'ancrage."
        width: "wide"

  - label: "L'agent"
    title: "Un compagnon, six phases"
    prose:
      - >-
        WeMatch est un agent (l'équipe l'a nommé Matchy) qui accompagne tout le parcours plutôt
        qu'une conversation ponctuelle. Il fonctionne en six phases, chacune un rôle différent. Il
        découvre, en captant les signaux liés au rythme, à l'énergie sociale et à l'intention. Il
        profile, en construisant l'ADN comportemental du voyageur à partir de ces signaux. Il cure,
        en évaluant chaque groupe au regard de cet ADN.
      - >-
        Ensuite il explique, en rendant chaque correspondance compréhensible avant la réservation.
        Il prend des nouvelles pendant le voyage, en lisant les dynamiques sociales en direct. Et il
        évolue, en affinant la compatibilité future à partir de l'expérience vécue et des retours sur
        le voyage. L'arc va de la première session jusque bien après le retour du voyageur.
    artifacts:
      - src: "/images/work/wematch/approach-2-agent.jpg"
        alt: "Diagramme de l'agent en six phases : découvrir, profiler, curer, expliquer, prise de nouvelles, évoluer, chacune avec un rôle en un mot."
        caption: "Le rôle de l'agent — six phases, du premier signal à l'apprentissage post-voyage."
        decision: "Concevoir l'agent comme un parcours, et non comme une fonctionnalité, a gardé la compatibilité comme un profil vivant plutôt que comme le résultat d'un questionnaire ponctuel."
        width: "wide"

  - label: "Le modèle"
    title: "ADN comportemental, du signal à la correspondance"
    prose:
      - >-
        Le profilage est le moteur. Toutes les autres plateformes classent les voyages par
        destination ; WeMatch classe par compatibilité. Deux entrées alimentent un seul artefact :
        ce qu'un voyageur dit en conversation, et la façon dont il navigue sur le site. Ensemble,
        elles construisent un ADN comportemental sur huit dimensions comme le rythme, l'énergie
        sociale, le style de planification et le style de gestion des conflits, mis à jour en continu
        dès la première session.
      - >-
        Chaque groupe disponible est ensuite évalué au regard de cet ADN, produisant un pourcentage
        de compatibilité et une raison en langage clair pour chaque voyage. La recherche se reclasse
        par affinité de groupe : « 87%, porté par la culture, rythme lent, mélange autour de la
        trentaine » passe au-dessus de « 41%, porté par le social, tempo festif, groupe plus jeune ».
        Et le profil est visible et modifiable, pour que le voyageur puisse voir ce que l'agent a
        déduit et le corriger, ce qui rend la correspondance d'autant plus précise qu'il s'implique.
    artifacts:
      - src: "/images/work/wematch/approach-3-model.jpg"
        alt: "Le modèle d'ADN comportemental : deux entrées (conversation, navigation) alimentant un profil à huit dimensions, puis des cartes de voyage classées par score de compatibilité."
        caption: "Du signal à la correspondance — deux entrées, un profil à huit dimensions, une affinité de groupe classée."
        decision: "Évaluer le groupe plutôt que le voyage, avec une raison visible et un profil modifiable, a rendu l'intelligence lisible au lieu de magique."
        width: "wide"

  - label: "Le récit"
    title: "Communiquer une couche invisible"
    prose:
      - >-
        Une couche de compatibilité est difficile à montrer, parce que la partie intéressante est
        invisible. Mon travail côté communication était de la faire passer sans liste de
        fonctionnalités, sous la forme d'une expérience en scrollytelling qui suit une voyageuse en
        train de décider si elle réserve. La lectrice rencontre le service comme elle le ferait, en
        mouvement, plutôt qu'on lui dise ce qu'il fait.
      - >-
        La même logique a façonné la présentation finale, dont j'ai construit la narration avec une
        coéquipière. Dans les deux cas, la règle était la même : montrer l'agent à l'œuvre, ne jamais
        l'annoncer comme « IA ». L'argument est porté par les données, le recadrage et l'expérience
        de la voyageuse elle-même, pas par le mot.

outcome:
  - >-
    Un concept de service ancré dans la recherche : trois angles de recherche indépendants
    convergeant vers une même conclusion, un agent en six phases et le modèle de correspondance par
    ADN comportemental.
  - >-
    Trois livrables remis : la présentation de design de bout en bout, un agent testable en direct,
    et le récit en scrollytelling qui porte l'argument.
  - >-
    Bien reçu dans le cours, autant pour la narration que pour l'agent fonctionnel qui la sous-tend.

reflection: >-
  La partie la plus précieuse n'était pas le concept. C'était d'apprendre la méthode auprès d'une
  équipe qui construit des expériences agentiques pour de vrai. La pratique AX de Spark Reply a sa
  propre grammaire : concevoir autour de l'intention de l'utilisateur plutôt que des
  fonctionnalités, donner à l'agent une personnalité et la garder cohérente, et consacrer un temps
  réel aux cas limites, là où l'autonomie d'un agent est la plus susceptible de mal tourner. Ce
  cadrage a transformé ma façon de concevoir avec l'IA, et c'est le prisme que j'apporte au reste de
  mon travail aujourd'hui.

gallery:
  - src: "/images/work/wematch/gallery-1.jpg"
    alt: "Le produit conçu : une recherche WeRoad reclassée par affinité de groupe, des voyages portant des badges de compatibilité verts sous un titre « Meilleures correspondances »."
    caption: "Le produit — la recherche, reclassée par affinité de groupe."
  - src: "/images/work/wematch/gallery-2.jpg"
    alt: "Le radar d'ADN comportemental dans l'aperçu d'un groupe : les dimensions de compatibilité d'un voyageur tracées face à celles d'un groupe, avec une lecture en langage clair de la correspondance."
    caption: "Le modèle, rendu concret — le radar d'ADN comportemental."
  - src: "/images/work/wematch/gallery-3.jpg"
    alt: "L'agent Matchy en direct sur le site WeRoad, en train de profiler en conversation : il transforme le récit de voyage d'un voyageur en une question de relance avec trois options de réponse."
    caption: "L'agent en direct — le profilage par la conversation."
  - src: "/images/work/wematch/gallery-4.jpg"
    alt: "Une scène du one-pager en scrollytelling, « Il la lit » : l'agent transformant le comportement de voyage de Sofia en un profil d'ADN comportemental en direct, avec Sofia qui lit sur son téléphone à côté."
    caption: "Le récit — le one-pager en scrollytelling, Sofia en son centre."

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
  title: "WeMatch — un service de correspondance AX pour l'univers WeRoad"
  image: "/images/work/wematch/adjacent.jpg"
  alt: "Carte de titre WeMatch : « WeMatch trouve ton groupe avant que tu trouves ton voyage » en corail et encre sur un dégradé doux blanc vers rose, avec le personnage rond de l'agent Matchy."
---
