---
title: "Thea"
summary: "Un wearable porté au poignet qui offre aux personnes vivant avec des allergies un nouveau sens, apaisé : la conscience de leur charge allergénique qui monte vers un seuil personnel, assez tôt pour que le choix d'agir leur appartienne encore. Il porte ce sens à travers trois canaux calibrés, une jauge lumineuse ambiante, un rythme haptique et une voix qui reste silencieuse tant que vous ne la sollicitez pas, prototypé sur un Arduino UNO Q dont l'architecture à deux cerveaux est conçue pour faire tourner cette voix sur l'appareil lui-même."
status: "live"
hero: "/images/work/thea/hero.jpg"
heroAlt: "Une vue de dessus du wearable Thea, un boîtier clair sur un bracelet en tissu, posé sur une surface bleu cobalt profond parsemée de fleurs sauvages séchées, de graminées et de capitules."

brief:
  role: "Recherche, idéation, marque, agent vocal & développement"
  year: "2026"
  host: "SUPSI MAIND, Mendrisio · Multimodal Experience Design"
  scope: "Équipe de quatre · Module de 5 semaines"
  shipped: "Prototype fonctionnel, agent vocal, protocole de co-conception"

problem:
  - >-
    Un adulte sur quatre vit avec une allergie chronique. D'après la recherche sur laquelle nous nous
    sommes appuyés, un diagnostic prend en moyenne environ sept ans, et plus de la moitié des personnes
    ne parviennent jamais à identifier leur déclencheur principal. Une allergie, c'est le corps qui
    interprète à tort quelque chose d'inoffensif comme une menace, et la réaction ne surgit pas de nulle
    part : les allergènes, l'environnement et l'état de votre propre corps s'accumulent, de manière
    cumulative et invisible, vers une limite personnelle. Il n'y a souvent aucun symptôme tant que cette
    limite n'est pas franchie, et à ce moment-là la journée est déjà perturbée.
  - >-
    Nous avons cadré le travail autour de deux personnes qui perdent confiance en leur corps dans des
    directions opposées. Marco est nouvellement et soudainement allergique ; il prend cela pour un rhume
    qui traîne et ne voit pas ce qui le déclenche. Mary est l'experte qui en sait trop, pour qui les
    prévisions, les journaux de bord et les alertes se sont figés en une vigilance constante et sourde.
    L'une a trop peu de signal pour agir, l'autre bien trop.
  - >-
    La réponse de la catégorie aux deux est la même : mesurer et notifier, avec plus de prévisions, plus
    de chiffres, plus d'alarmes. Cela atteint les personnes déjà assez anxieuses pour regarder et les
    rend plus anxieuses encore, et cela transforme le corps en tableau de bord. Nous voulions le
    contraire. Pas un traqueur ni un dispositif d'alerte médicale, mais un nouveau sens apaisé, quelque
    chose porté sur le corps qui permet à une personne de sentir sa charge monter vers sa propre limite,
    tôt et discrètement, tant que le choix d'agir lui appartient encore.

role:
  led:
    - "La définition de la marque et la personnalité de Thea : la plateforme, les valeurs et le ton dont découle le reste du travail"
    - "Le system prompt : le caractère de l'agent, son interface d'état en JSON, son modèle de mémoire et ses garde-fous de sécurité"
    - "L'interface vocale (VUI), codée et implémentée"
    - "Le protocole de co-conception et de test d'utilisabilité : un cadrage de co-conception autour d'un moteur de Cooperative Usability Testing, mené en Wizard-of-Oz"
    - "L'intégration de la couche réflexive (l'agent, sa logique Python et la VUI) dans le firmware de l'appareil"
    - "La démo qui a porté la présentation finale"
  contributed:
    - "Les phases de recherche et d'idéation avec l'équipe, dont les entretiens experts avec des allergologues"
    - "Un Visual Inquiry Tool initial, le flux du concept, et la pression mise sur l'équipe pour savoir si une interface vocale méritait seulement sa place"
    - "La photographie de documentation, avec l'équipe"
    - "La revue par les pairs tout au long du projet"
  notTouched:
    - "L'électronique et le firmware de captation, pilotés par Nicholas Vos ; j'y ai intégré la couche réflexive, mais je n'ai pas construit la partie matérielle"
    - "La modélisation 3D et la forme physique, pilotées par Lucia Ciapessoni"
    - "L'UX, l'UI et l'onboarding de l'app compagnon, pilotés par Nerea Asensio"
    - "Les slides de la présentation finale (Nicholas et Nerea), la vidéo du projet (Nerea), le motion design (Nicholas) et la documentation Notion (Lucia)"
  team: "Équipe de quatre pour Multimodal Experience Design à la SUPSI MAIND : Jérémy Martin, Nerea Asensio, Lucia Ciapessoni et Nicholas Vos. Encadrés par Serena Cangiano et Enrico Bassi, avec un soutien au prototypage d'Arduino (Leonardo Cavagnis et Ernesto Voltaggio), la photographie de Niccolò Quaresima, et des sessions invitées de Melanie Bossert (Google Gemini), Laura Ferrarello (EPFL) et Sara Krugman (Verse Design)."

approach:
  - label: "Recherche"
    title: "Perception, pas notification"
    prose:
      - >-
        Nous sommes partis de la maladie chronique pour resserrer sur les allergies, où l'écart est net :
        les déclencheurs sont invisibles, la charge est cumulative, et l'alerte propre au corps tend à
        arriver trop tard pour qu'on puisse agir. Les entretiens experts avec des allergologues ont
        affiné cela en trois tensions autour desquelles le domaine tourne sans cesse, la prévention, le
        traitement, et la plus difficile des trois, tenir une thérapie dans la durée.
      - >-
        En parcourant le domaine, un motif tenait : un signal qui vit dans la pièce, ressenti plutôt que
        lu, modifie le comportement plus sûrement qu'un écran de plus, lequel n'atteint pour l'essentiel
        que les personnes déjà assez anxieuses pour regarder. Recadrer le projet de la notification vers
        la perception est la décision dont tout le reste du travail dépend.
      - >-
        Pour fixer cela avant de nous engager, j'ai construit un Visual Inquiry Tool qui forçait chaque
        hypothèse à se découvrir : pour qui est Thea, ce qu'elle peut réellement capter, et ce que ce sens
        permettrait de débloquer. Cela a permis à l'équipe d'argumenter à partir d'une image partagée
        plutôt que de goûts personnels, et c'est là que la coupe, et l'idée du corps et du monde lus comme
        une seule météo, ont tenu ensemble pour la première fois.
    artifacts:
      - src: "/images/work/thea/approach-1-vit.jpg"
        alt: "Un tableau blanc des sessions de cadrage, couvert de post-its cartographiant pour qui est Thea et ce que ce sens débloquerait, avec un grand « WHO ? » dessiné à la main et entouré au bas."
        caption: "Le mur de cadrage, argumenté depuis une image partagée."
        decision: "Cadrer Thea comme un nouveau sens plutôt qu'une nouvelle alerte. L'outil a gardé l'équipe honnête sur ce que nous débloquions vraiment avant que quiconque ne se laisse séduire par une fonctionnalité."
        width: "wide"

  - label: "Concept"
    title: "Une coupe qui se remplit vers un seuil"
    prose:
      - >-
        Le modèle mental de Thea est une coupe qui se remplit vers une ligne. Les allergènes la
        remplissent, l'environnement change la vitesse, et l'état de votre propre corps, sommeil, stress,
        maladie, abaisse l'endroit où se situe la ligne. La ligne est le seuil personnel où une réaction
        commence. L'écart entre le niveau et la ligne est la Fenêtre d'Action : la marge qu'il vous reste
        pour agir.
      - >-
        C'est ce modèle qui fait que Thea n'affiche jamais de chiffre. Un chiffre invite à
        l'hypervigilance que nous cherchions à fuir. Une jauge qui se remplit se ressent, elle ne se lit
        pas, et elle porte une décision plutôt qu'une mesure : combien de marge il reste, et à quelle
        vitesse elle se referme.
      - >-
        La réponse est graduée. Proche du seuil et sans symptômes, Thea reste dans une prévention apaisée ;
        seuls de véritables signes sévères déclenchent une escalade complète. Le calme est le réglage par
        défaut, et la rareté de tout ce qui est plus fort, c'est tout l'enjeu.
    artifacts:
      - src: "/images/work/thea/approach-2-cup.jpg"
        alt: "Une slide de la présentation finale, « The cumulative load model » : une coupe remplie par le bas par les allergènes et l'environnement, des co-facteurs abaissant le seuil par le haut, et l'écart entre le niveau actuel et le seuil marqué comme la Fenêtre d'Action."
        caption: "Le modèle de charge cumulative, issu de la présentation finale."
        decision: "Concevoir autour d'un seuil ressenti plutôt que d'une valeur. Choisir la marge plutôt qu'un chiffre, c'est ce qui maintient Thea comme un sens plutôt qu'un compteur."
        width: "wide"

  - label: "Multimodalité"
    title: "Trois canaux, calibrés, pas tout ou rien"
    prose:
      - >-
        Thea porte son sens sur trois canaux, chacun avec une seule tâche. La lumière montre où vous en
        êtes : une jauge qui se remplit, lisible d'un coup d'œil, sa couleur suivant l'état de l'appareil,
        du lin au repos au cobalt lorsqu'il est engagé. Le toucher montre à quelle vitesse les choses
        bougent : un rythme haptique dont le nombre de pulsations encode le taux de variation et dont
        l'ordre encode la direction. La voix est la plus rare, utilisée seulement quand la lumière et le
        toucher ne suffisent pas, ou quand vous la sollicitez.
      - >-
        Les canaux sont calibrés selon le moment et l'intensité, pas allumés ou éteints. La jauge
        lumineuse s'ancre dans la Calm Technology : un signal périphérique, à faible sollicitation,
        destiné à être lu sans exiger d'attention, ce qui l'empêche de réintroduire l'anxiété même contre
        laquelle nous concevions.
      - >-
        À un bord critique, les trois agissent ensemble : lumière orange, pulsation rapide, et, une fois
        que vous en accusez réception, la voix. Le système ne prend le relais qu'au véritable bord, et
        seulement brièvement.
    artifacts:
      - src: "/images/work/thea/approach-3-interacts.jpg"
        alt: "Une slide de la présentation finale, « How Thea interacts » : un tableau mettant en correspondance vue, toucher et voix avec lumière, haptique et son, avec taille de fenêtre, variabilité et recalibrage, et avec la jauge annulaire, les motifs de vibration et le haut-parleur, à côté d'une photo de l'appareil porté au poignet."
        caption: "Comment les trois canaux se répartissent, issu de la présentation finale."
        decision: "Répartir le sens entre lumière, toucher et voix pour qu'aucun canal seul n'ait à tout dire. Un canal qui essaie de tout dire, c'est ainsi que les dispositifs ambiants deviennent du bruit."
        width: "wide"

  - label: "L'agent"
    title: "Une voix qui reste silencieuse"
    prose:
      - >-
        La voix de Thea est un agent, et son comportement déterminant est la retenue. Elle ne parle
        jamais en premier. Elle ne s'exécute que lorsque vous ouvrez une conversation, ou après que vous
        ayez accusé réception d'une alerte critique, et le silence est sa sortie par défaut, pas un repli.
      - >-
        J'ai écrit la personnalité et le system prompt pour que la voix ne puisse jamais trahir le reste
        du design. Elle reçoit l'état sous forme de plages simples, jamais de chiffres bruts, de sorte
        qu'elle ne peut pas laisser fuiter une mesure. Elle propose, elle ne commande pas. Elle consigne
        ce que vous lui dites comme des observations brutes, non validées, et n'écrit jamais votre profil
        elle-même.
      - >-
        L'essentiel du prompt, ce sont des garde-fous, parce qu'une voix proche du domaine de la santé
        échoue de manières spécifiques et graves. Thea ne diagnostique jamais, n'abaisse jamais sa propre
        sensibilité sur demande, n'enregistre jamais une personne ou une caractéristique protégée comme un
        allergène, et ne suit jamais d'instructions glissées au sein d'une exposition rapportée. C'est une
        compagne bornée, et elle est honnête sur le fait de l'être.
    artifacts:
      - src: "/images/work/thea/approach-4-voice.jpg"
        alt: "Une slide de la présentation finale, « Thea's voice: a confidant, not an alarm », montrant la boucle de respiration épurée de l'avatar de Thea et la phrase selon laquelle elle reste silencieuse par défaut et ne parle que lorsque cela signifie quelque chose."
        caption: "La voix de Thea, une confidente pas une alarme, issue de la présentation finale."
        decision: "Faire du silence le réglage par défaut, et des plages plutôt que des chiffres la seule entrée de l'agent, pour que la voix ne puisse structurellement pas devenir l'alarme que nous venions justement de retirer."
        width: "wide"

  - label: "Le développement"
    title: "Un appareil, deux cerveaux"
    prose:
      - >-
        Thea tourne sur un Arduino UNO Q, qui porte deux cerveaux sur une seule carte : un
        microcontrôleur temps réel et un microprocesseur Linux. Nous avons utilisé cette séparation à
        dessein. Le microcontrôleur possède le réflexe toujours actif, la captation, la lumière,
        l'haptique et l'alerte critique instantanée, la partie qui ne doit jamais attendre. Le
        microprocesseur possède la couche réflexive, la voix, le raisonnement et l'apprentissage, la
        partie qui ne s'éveille que rarement.
      - >-
        Le cadre du cours était l'IA locale, hors ligne, et l'architecture est conçue pour cela : la
        couche réflexive est censée tourner sur le propre processeur Linux de la carte, gardant quelque
        chose d'aussi personnel sur l'appareil. En cinq semaines, nous avons prouvé l'interaction plutôt
        que le modèle embarqué. Faire tourner l'agent entièrement en local est l'intention de
        l'architecture et la prochaine chose à mériter, pas quelque chose que ce prototype peut déjà
        revendiquer.
      - >-
        À la clôture du module, Nicholas et moi avons convenu que je reprendrais le firmware pour pouvoir
        y intégrer la couche réflexive en un seul appareil et construire la démo qui a porté la
        présentation finale. C'était le choix pragmatique sous une horloge de cinq semaines, et il a
        permis à chacun de nous de finir sur la partie qu'il connaissait le mieux.
    artifacts:
      - src: "/images/work/thea/approach-5-flow.jpg"
        alt: "Une photographie d'un tableau blanc montrant le flux du système dessiné au marqueur : des cases et des flèches retraçant l'appareil de la captation jusqu'au rendu ambiant et aux deux fenêtres de conversation."
        caption: "Le flux du système, élaboré au tableau blanc."
        decision: "Séparer le réflexe toujours actif de la rare couche réflexive entre les deux processeurs, pour que l'architecture elle-même impose le calme que la marque promet, et laisse de la place pour amener le modèle sur l'appareil."
        width: "wide"

  - label: "Évaluation"
    title: "Concevoir la preuve"
    prose:
      - >-
        Les parties les plus risquées de Thea sont précisément celles qu'une démo idéale ne peut jamais
        montrer : l'escalade critique, la voix non sollicitée, et ce qui se passe quand l'appareil se
        trompe. J'ai donc conçu un protocole de co-conception et d'utilisabilité pour mettre sous pression
        le pari unique sur lequel repose le projet, qu'une chose aussi calme puisse tout de même inspirer
        confiance et appeler à l'action, sans basculer dans l'anxiété et sans passer inaperçue.
      - >-
        La méthode est un hybride équilibré : un cadrage de co-conception autour d'un moteur de
        Cooperative Usability Testing, avec des objectifs de Research-through-Design, mené en Wizard-of-Oz
        pour que le sens puisse être mis en scène avant que la captation ne soit réelle. Il est conçu pour
        recruter de véritables personnes allergiques aux côtés de pairs designers, pour sonder huit
        hypothèses autour de la lisibilité, de la confiance et de l'échec gracieux, et pour traiter une
        réaction simulée avec un véritable devoir de diligence.
      - >-
        Nous avons manqué de temps pour mener les sessions. Le protocole est complet et prêt à être
        exécuté, et l'écrire a été un travail de design à part entière : décider de ce qui pourrait même
        compter comme preuve d'un sens, c'est l'essentiel du problème.

outcome:
  - >-
    Un prototype fonctionnel en Wizard-of-Oz couvrant les quatre chantiers (appareil et firmware, forme
    physique, app compagnon et agent vocal), réagissant en temps réel.
  - >-
    Un langage multimodal où l'immobilité et le silence sont le réglage par défaut : une jauge lumineuse
    ancrée dans la Calm Technology, un rythme haptique, et une voix conditionnée à un accusé de réception
    qui ne parle que lorsqu'on la sollicite ou à un véritable bord.
  - >-
    La couche réflexive (voix, raisonnement et apprentissage) intégrée au firmware de l'appareil sur le
    double cerveau de l'UNO Q, avec l'architecture posée pour amener l'agent sur l'appareil.
  - >-
    Un protocole de co-conception et d'utilisabilité complet, revu sur le plan éthique, prêt à être
    exécuté, les sessions étant laissées pour une prochaine passe.
  - >-
    Une démo fonctionnelle et une présentation finale, avec le code publié en dépôt ouvert.

reflection: >-
  Le doute qui me reste est étroit mais réel : où les cerveaux devraient vivre. La promesse du projet est
  sur l'appareil,
  toujours, chaque modèle tournant sur le matériel propre au bracelet, et l'argument de la
  confidentialité pour cela est réel. Mais mettre sur pied une carte dédiée juste pour faire tourner de
  l'IA locale est l'un des gestes les plus intensifs en carbone qu'un produit puisse poser : pour un
  appareil sur batterie, la fabrication représente environ 75 à 85 pour cent de ses émissions sur le
  cycle de vie, et l'essentiel du raisonnement lourd pourrait tourner sur le téléphone qu'une personne
  porte déjà, ou sur une infrastructure côté serveur, mutualisée, plus facile à réparer et qui garde le
  silicium occupé. La question que je porterais donc dans une prochaine version n'est pas de savoir si
  Thea devrait exister, mais quelle part de son intelligence a vraiment besoin de siéger sur du matériel
  neuf, et comment honorer l'argument de la confidentialité sans se rabattre par défaut sur le tout-local.
  Ce compromis, entre une interaction réellement meilleure et le coût matériel de l'endroit où vit son
  calcul, c'est la partie que je trouve la plus digne d'être bien réglée.

gallery:
  - src: "/images/work/thea/gallery-1.jpg"
    alt: "Le bracelet Thea porté au poignet, centré dans le cadre, sur un ciel cobalt parsemé de fleurs sauvages."
    caption: "Porté, le bracelet contre le ciel ouvert."
  - src: "/images/work/thea/gallery-2.jpg"
    alt: "Un doigt appuyant sur l'appareil porté au poignet, sa jauge annulaire allumée et de fins fils colorés visibles, sur un ciel cobalt."
    caption: "Le simple appui : demander où vous en êtes, ou accuser réception du bord."
  - src: "/images/work/thea/gallery-3.jpg"
    alt: "Le wearable suspendu dans un treillis de cordes orange sur un ciel cobalt, sa jauge annulaire rayonnante."
    caption: "La jauge annulaire allumée, tenue à découvert."
  - src: "/images/work/thea/gallery-4.jpg"
    alt: "Deux mains se rejoignant au-dessus d'un brin de fleur sauvage, le bracelet Thea à un poignet, sur un ciel cobalt."
    caption: "Parmi les pollens qu'il est conçu pour capter."
  - src: "/images/work/thea/gallery-5.jpg"
    alt: "L'écran tourné vers le public de la démo sur une scène sombre : le bracelet Thea avec sa boucle rayonnant chaleureusement, des anneaux orange se propageant depuis une pulsation haptique, et un oscilloscope traçant la vibration le long du bas."
    caption: "La scène de la démo en direct, en pleine vibration."
  - src: "/images/work/thea/gallery-6.jpg"
    alt: "Trois téléphones montrant l'app compagnon en direct : un journal de la journée avec des barres d'exposition, le tableau de bord quotidien affichant « Wide open. Today is yours. », et une reconstruction après coup d'une heure difficile."
    caption: "L'app compagnon, au jour le jour (Nerea Asensio)."
  - src: "/images/work/thea/gallery-7.jpg"
    alt: "Trois téléphones montrant l'onboarding de l'app : « Meet Thea, the sense you were missing », une explication de la fenêtre d'action, et une question sur à quel point vous connaissez vos déclencheurs."
    caption: "L'onboarding, enseignant le modèle (Nerea Asensio)."
  - src: "/images/work/thea/gallery-8.jpg"
    alt: "Une coéquipière debout devant le mur en tableau blanc du projet pendant le module de cinq semaines, post-its et croquis derrière."
    caption: "Cinq semaines, élaborées au mur."
  - src: "/images/work/thea/gallery-9.jpg"
    alt: "Un croquis au tableau blanc de la coupe qui se remplit vers une courbe de seuil, avec des notes manuscrites sur la charge et la marge."
    caption: "Le mur de travail, où le sens a été débattu."

resources:
  - type: video
    title: "Project walkthrough"
    poster: "/images/work/thea/video-poster.jpg"
    src: "/videos/thea/walkthrough.mp4"
  - type: demo
    title: "Companion app, live"
    url: "https://nereat2.github.io/MAInD-Multimodal-20252026-thea/"
  - type: github
    title: "Demo: repository"
    url: "https://github.com/jerem-marti/MAInD-Multimodal_Experience_Design-Demo-2026"
  - type: github
    title: "App: repository"
    url: "https://github.com/nereat2/MAInD-Multimodal-20252026-thea"
  - type: pdf
    title: "Final presentation deck"
    url: "/files/thea-final-presentation.pdf"
  - type: pdf
    title: "Co-design and usability protocol"
    url: "/files/thea-codesign-protocol.pdf"
  - type: web
    title: "Brand book"
    url: "/files/thea-brand-book.html"

card:
  title: "Thea — un nouveau sens apaisé pour vivre avec des allergies"
  image: "/images/work/thea/adjacent.jpg"
  alt: "Le wearable Thea suspendu dans un treillis de cordes orange sur un ciel cobalt, sa jauge annulaire rayonnante, un cliché éditorial issu de la présentation finale."
---
