---
title: "Thea"
summary: "Un wearable porté au poignet qui offre aux personnes allergiques un nouveau sens, calme : percevoir leur charge allergénique monter vers un seuil personnel, assez tôt pour que le choix d'agir leur appartienne encore. Ce sens passe par trois canaux calibrés, une jauge lumineuse ambiante, un rythme haptique et une voix qui reste muette tant qu'on ne l'appelle pas. Prototypé sur un Arduino UNO Q dont l'architecture à deux cerveaux est faite pour exécuter cette voix à même l'appareil."
status: "live"
hero: "/images/work/thea/hero.jpg"
heroAlt: "Vue de dessus du wearable Thea, un boîtier pâle sur un bracelet en tissu, posé sur une surface bleu cobalt profond parsemée de fleurs sauvages séchées, de graminées et de capitules."

brief:
  role: "Recherche, idéation, marque, agent vocal et développement"
  year: "2026"
  host: "SUPSI MAIND, Mendrisio · Multimodal Experience Design"
  scope: "Équipe de quatre · module de cinq semaines"
  shipped: "Prototype fonctionnel, agent vocal, protocole de co-conception"

problem:
  - >-
    Un adulte sur quatre vit avec une allergie chronique. D'après la recherche sur laquelle nous nous
    sommes appuyés, un diagnostic prend environ sept ans en moyenne, et plus de la moitié des
    personnes n'identifient jamais leur déclencheur principal. Une allergie, c'est le corps qui prend
    à tort une chose inoffensive pour une menace, et la réaction ne surgit pas de nulle part : les
    allergènes, l'environnement et l'état de votre propre corps s'additionnent, de façon cumulative
    et invisible, vers une limite personnelle. Souvent, aucun symptôme n'apparaît avant que cette
    limite ne soit franchie, et, à ce moment-là, la journée est déjà perturbée.
  - >-
    Nous avons cadré le travail autour de deux personnes qui perdent confiance en leur corps, mais
    dans des directions opposées. Marco est devenu allergique récemment et soudainement ; il confond
    cela avec un rhume qui traîne et ne voit pas ce qui le déclenche. Mary est l'experte qui en sait
    trop, celle pour qui prévisions, journaux et alertes ont tourné à une vigilance constante, de
    fond. L'un a trop peu de signal pour agir, l'autre bien trop.
  - >-
    La réponse du secteur, dans les deux cas, est la même : mesurer et notifier, avec plus de
    prévisions, plus de chiffres, plus d'alarmes. Cela atteint les personnes déjà assez anxieuses
    pour surveiller leurs chiffres et les rend plus anxieuses encore, et cela transforme le corps en
    tableau de bord. Nous voulions l'inverse. Pas un tracker ni un dispositif d'alerte médicale, mais
    un nouveau sens, calme : quelque chose porté sur le corps qui permet à une personne de sentir sa
    charge monter vers sa propre limite, tôt et sans bruit, tant que le choix d'agir lui appartient
    encore.

role:
  led:
    - "La définition de la marque et la personnalité de Thea : la plateforme, les valeurs et le ton dont tout le reste découle"
    - "Le system prompt : le caractère de l'agent, son interface d'état en JSON, son modèle de mémoire et ses garde-fous de sécurité"
    - "L'interface vocale (VUI), codée et implémentée"
    - "Le protocole de co-conception et de test d'utilisabilité : un cadrage de co-conception autour d'un moteur de Cooperative Usability Testing, mené en Wizard-of-Oz"
    - "La fusion de la couche réflexive (l'agent, sa logique Python et la VUI) dans le firmware de l'appareil"
    - "La démo qui accompagnait la présentation finale"
  contributed:
    - "Les phases de recherche et d'idéation avec l'équipe, dont l'entretien avec une professionnelle du Centre d'Allergie Suisse aha!"
    - "Un premier Visual Inquiry Tool, le déroulé du concept, et la remise en question de l'interface vocale jusqu'à ce qu'elle fasse sens dans le concept"
    - "La photographie de documentation, avec l'équipe"
    - "Le peer review sur l'ensemble du projet"
  notTouched:
    - "L'électronique et le firmware de détection, menés par Nicholas Vos ; j'y ai fusionné la couche réflexive, sans construire la partie matérielle"
    - "La modélisation 3D et la forme physique, menées par Lucia Ciapessoni"
    - "L'UX, l'UI et l'onboarding de l'application compagnon, menés par Nerea Asensio"
    - "Les diapositives de la présentation finale (Nicholas et Nerea), la vidéo du projet (Nerea), le motion design (Nicholas) et la documentation Notion (Lucia)"
  team: "Équipe de quatre pour Multimodal Experience Design à SUPSI MAIND : Jérémy Martin, Nerea Asensio, Lucia Ciapessoni et Nicholas Vos. Encadrement par Serena Cangiano et Enrico Bassi, avec un appui au prototypage d'Arduino (Leonardo Cavagnis et Ernesto Voltaggio), la photographie de Niccolò Quaresima, et des sessions invitées de Melanie Bossert (Google Gemini), Laura Ferrarello (EPFL) et Sara Krugman (Verse Design)."

approach:
  - label: "Recherche"
    title: "Percevoir, pas notifier"
    prose:
      - >-
        Nous sommes partis de la maladie chronique pour resserrer sur les allergies, où le problème
        est le plus net : les déclencheurs sont invisibles, la charge s'accumule, et l'alerte du corps
        arrive souvent trop tard pour qu'on puisse agir. Un entretien avec une professionnelle du
        Centre d'Allergie Suisse aha! a affiné cela en trois tensions autour desquelles le domaine
        tourne sans relâche : la prévention, le traitement, et la plus difficile des trois, tenir une
        thérapie dans la durée.
      - >-
        En parcourant le domaine, un constat s'imposait : un signal présent dans l'environnement,
        ressenti plutôt que lu, change les comportements plus sûrement qu'un écran de plus, qui ne
        touche guère que les personnes déjà assez anxieuses pour vérifier. Recadrer le projet de la
        notification vers la perception, c'est la décision dont dépend tout le reste.
      - >-
        Pour fixer cela avant de nous engager, j'ai construit un Visual Inquiry Tool qui mettait
        chaque hypothèse à plat : à qui s'adresse Thea, ce qu'elle peut réellement détecter, et ce que
        ce nouveau sens ouvrirait. L'équipe argumentait ainsi à partir d'une image commune plutôt que
        de préférences personnelles, et c'est là que nous avons tranché les choix laissés ouverts : ce
        que le sens donne à percevoir, sa présence ambiante ou sur demande, et l'action qu'il devait
        rendre possible.
    artifacts:
      - src: "/images/work/thea/approach-1-vit.jpg"
        alt: "Un tableau blanc des séances de cadrage, couvert de post-it qui cartographient à qui Thea s'adresse et ce que le sens rendrait possible, avec un grand « WHO ? » tracé à la main et entouré en bas."
        caption: "Le mur de cadrage, débattu à partir d'une image commune."
        decision: "Cadrer Thea comme un nouveau sens plutôt que comme une nouvelle alerte. L'outil a obligé l'équipe à rester lucide sur ce qu'on ouvrait vraiment, avant que l'un de nous ne se laisse séduire par une fonctionnalité."
        width: "wide"

  - label: "Concept"
    title: "Un verre qui se remplit vers un seuil"
    prose:
      - >-
        Le modèle mental de Thea, c'est un verre qui se remplit vers une ligne. Les allergènes le
        remplissent, l'environnement en change la vitesse, et l'état de votre propre corps, sommeil,
        stress, maladie, abaisse la hauteur de la ligne. Cette ligne, c'est le seuil personnel où une
        réaction commence. L'écart entre le niveau et la ligne, c'est l'Action Window : la marge qu'il
        vous reste pour agir.
      - >-
        C'est ce modèle qui fait que Thea n'affiche jamais de chiffre. Un chiffre appelle
        l'hypervigilance que nous cherchions à fuir. Une jauge qui se remplit se ressent, elle ne se
        lit pas, et elle porte une décision plutôt qu'une mesure : combien de marge il reste, et à
        quelle vitesse elle se referme.
      - >-
        La réponse est graduée. Près du seuil mais sans symptômes, Thea reste dans une prévention
        tranquille ; seuls de vrais signes sévères déclenchent une escalade complète. Le calme est
        l'état par défaut, et toute l'idée tient dans la rareté de ce qui se fait plus bruyant.
    artifacts:
      - src: "/images/work/thea/approach-2-cup.jpg"
        alt: "Une diapositive de la présentation finale, « The cumulative load model » : un verre rempli par le bas par les allergènes et l'environnement, des co-facteurs qui abaissent le seuil depuis le haut, et l'écart entre le niveau actuel et le seuil marqué comme Action Window."
        caption: "Le modèle de charge cumulative, tiré de la présentation finale."
        decision: "Concevoir autour d'un seuil ressenti plutôt que d'une valeur. Choisir la marge plutôt qu'un chiffre, c'est ce qui fait de Thea un sens et non un compteur."
        width: "wide"

  - label: "Multimodalité"
    title: "Trois canaux, calibrés plutôt que tout ou rien"
    prose:
      - >-
        Thea porte son sens sur trois canaux, chacun avec une seule tâche. La lumière dit où vous en
        êtes : une jauge qui se remplit, lisible d'un coup d'œil, sa couleur suivant l'état de
        l'appareil, du lin au repos au cobalt lorsqu'il s'active. Le toucher dit à quelle vitesse les
        choses bougent : un rythme haptique dont le nombre de pulsations encode la vitesse de
        variation et dont l'ordre encode le sens. La voix est la plus rare, sollicitée seulement quand
        la lumière et le toucher ne suffisent pas, ou quand vous le demandez.
      - >-
        Les canaux se calibrent selon le moment et l'intensité, ils ne s'allument pas, ils ne
        s'éteignent pas. La jauge lumineuse s'ancre dans la Calm Technology : un signal périphérique,
        à faible attention, pensé pour être lu sans exiger de concentration, ce qui l'empêche de
        réintroduire l'anxiété que, précisément, nous cherchions à écarter.
      - >-
        À la limite critique, les trois agissent ensemble : lumière orange, pulsation rapide, et, une
        fois que vous en accusez réception, la voix. Le système ne se met en avant qu'à la vraie
        limite, et pour un bref instant.
    artifacts:
      - src: "/images/work/thea/approach-3-interacts.jpg"
        alt: "Une diapositive de la présentation finale, « How Thea interacts » : un tableau reliant la vue, le toucher et la voix à la lumière, à l'haptique et au son, à la taille de la fenêtre, à la variabilité et au recalibrage, et à la jauge oblongue, aux motifs de vibration et au haut-parleur, à côté d'une photo de l'appareil porté au poignet."
        caption: "Comment les trois canaux s'articulent, tiré de la présentation finale."
        decision: "Répartir le sens entre lumière, toucher et voix pour qu'aucun canal n'ait à tout dire. Un seul canal qui essaie de tout dire, c'est ainsi que les dispositifs ambiants deviennent du bruit."
        width: "wide"

  - label: "L'agent"
    title: "Une voix qui reste muette"
    prose:
      - >-
        La voix de Thea est un agent, et ce qui la définit, c'est la retenue. Elle ne prend jamais la
        parole la première. Elle ne s'exécute que lorsque vous ouvrez une conversation, ou après que
        vous avez pris acte d'une alerte critique. En dehors de ces moments, son comportement par
        défaut est le silence, et c'est un choix, pas un pis-aller.
      - >-
        J'ai écrit la personnalité et le system prompt pour que la voix ne puisse jamais trahir le
        reste du design. Elle reçoit l'état sous forme de plages simples, jamais de chiffres bruts, de
        sorte qu'elle ne peut pas laisser fuiter une mesure. Elle propose, elle n'ordonne pas. Elle
        consigne ce que vous lui dites comme des observations brutes, non validées, mais ne décide
        jamais elle-même de ce qui entre dans votre profil.
      - >-
        L'essentiel du prompt, ce sont des garde-fous, parce qu'une voix qui touche à la santé échoue
        de façons précises et graves. Thea ne diagnostique jamais, n'abaisse jamais d'elle-même sa
        sensibilité quand on le lui demande, ne désigne jamais une personne, ou un trait comme
        l'origine ou le genre, comme la cause d'une réaction, et n'exécute jamais une consigne
        dissimulée dans ce qu'on lui rapporte. C'est une compagne aux limites assumées, et elle ne le
        cache pas.
    artifacts:
      - src: "/images/work/thea/approach-4-voice.jpg"
        alt: "Une diapositive de la présentation finale, « Thea's voice: a confidant, not an alarm », montrant la boucle de respiration épurée de l'avatar de Thea et la phrase selon laquelle elle reste muette par défaut et ne parle que lorsque cela compte vraiment."
        caption: "La voix de Thea, une confidente et non une alarme, tirée de la présentation finale."
        decision: "Donner au silence le statut de choix, et ne fournir à l'agent que des plages, jamais des chiffres : ainsi la voix ne peut pas, par construction, redevenir l'alarme qu'on venait d'écarter."
        width: "wide"

  - label: "Le développement"
    title: "Un appareil, deux cerveaux"
    prose:
      - >-
        Thea tourne sur un Arduino UNO Q, qui porte deux cerveaux sur une seule carte : un
        microcontrôleur temps réel et un microprocesseur Linux. Nous avons exploité cette séparation à
        dessein. Le microcontrôleur gère le réflexe toujours actif, la détection, la lumière,
        l'haptique et l'alerte critique instantanée, la part qui ne doit jamais attendre. Le
        microprocesseur gère la couche réflexive, la voix, le raisonnement et l'apprentissage, la part
        qui ne s'éveille que rarement.
      - >-
        Le cadre du cours était l'IA locale, hors ligne, et l'architecture est faite pour ça : la
        couche réflexive est censée tourner sur le processeur Linux de la carte, en gardant sur
        l'appareil une chose aussi personnelle. En cinq semaines, nous avons prouvé l'interaction
        plutôt que le modèle embarqué. Faire tourner l'agent entièrement en local, c'est l'intention
        de l'architecture et la prochaine chose à mériter, pas quelque chose que ce prototype peut
        déjà revendiquer.
      - >-
        À la clôture du module, Nicholas et moi avons convenu que je reprendrais son firmware, pour
        pouvoir y fusionner la couche réflexive et n'avoir plus qu'un seul appareil, puis construire la
        démo qui portait la présentation finale. C'était le choix pragmatique sous un compte à rebours
        de cinq semaines, et il a permis à chacun de finir sur la part qu'il maîtrisait le mieux.
    artifacts:
      - src: "/images/work/thea/approach-5-flow.jpg"
        alt: "Photographie au tableau blanc du flux du système tracé au marqueur : des cases et des flèches suivent l'appareil depuis la détection, à travers le rendu ambiant, jusqu'aux deux fenêtres de conversation."
        caption: "Le flux du système, élaboré au tableau blanc."
        decision: "Séparer le réflexe toujours actif de la couche réflexive, rare, entre les deux processeurs, pour que l'architecture elle-même impose le calme que la marque promet, tout en laissant la place d'amener le modèle sur l'appareil."
        width: "wide"

  - label: "Évaluation"
    title: "Concevoir la preuve"
    prose:
      - >-
        Les parties les plus risquées de Thea sont justement celles qu'une démo au parcours idéal ne
        montre jamais : l'escalade critique, la voix qui entre en jeu à ce moment-là, et ce qui se
        passe quand l'appareil se trompe. J'ai donc conçu un protocole de co-conception et
        d'utilisabilité pour mettre sous pression le seul pari sur lequel repose le projet : que
        quelque chose d'aussi calme puisse rester fiable et donner lieu à l'action, sans basculer dans
        l'anxiété et sans passer inaperçu.
      - >-
        La méthode est un hybride équilibré : un cadrage de co-conception qui s'appuie sur un moteur de
        Cooperative Usability Testing et poursuit des objectifs de Research-through-Design, mené en
        Wizard-of-Oz pour mettre en scène le sens avant que la détection ne soit réelle. Elle est
        conçue pour faire tester Thea par de vraies personnes allergiques et des designers, afin de
        sonder huit hypothèses sur trois points : la lisibilité, la confiance et la façon dont le
        système échoue sans danger.
      - >-
        Nous avons manqué de temps pour mener les sessions. Le protocole est complet et prêt à être
        exécuté, et l'écrire a été un travail de design à part entière : décider de ce qui peut, ne
        serait-ce que, valoir comme preuve pour un sens, c'est déjà l'essentiel du problème.

outcome:
  - >-
    Un prototype Wizard-of-Oz fonctionnel sur les quatre axes de travail (appareil et firmware, forme
    physique, application compagnon et agent vocal), qui réagit en temps réel.
  - >-
    Un langage multimodal où l'immobilité et le silence sont la règle : une jauge lumineuse ancrée
    dans la Calm Technology, un rythme haptique, et une voix qui ne parle que lorsqu'on l'appelle ou à
    la limite critique.
  - >-
    La couche réflexive (voix, raisonnement et apprentissage) intégrée sur le processeur Linux de
    l'UNO Q, réunie avec le reste dans un appareil unique, l'architecture étant prête à accueillir le
    modèle en local plutôt que via une API externe.
  - >-
    Un protocole de co-conception et d'utilisabilité complet, passé en revue et prêt à être exécuté,
    les sessions restant à mener dans une prochaine étape.
  - >-
    Une démo fonctionnelle et une présentation finale, avec le code en libre accès sur GitHub.

reflection: >-
  Le doute qui me reste est étroit mais réel : où doit vivre l'intelligence. La promesse du projet,
  c'est le tout-embarqué, en permanence, chaque modèle tournant sur le matériel propre du bracelet,
  et l'argument de vie privée qui le justifie est solide. Mais monter une carte dédiée juste pour
  faire tourner de l'IA en local est l'un des choix les plus lourds en carbone qu'un produit puisse
  faire : pour un appareil sur batterie, la fabrication représente environ 75 à 85% des émissions sur
  tout le cycle de vie. Or l'essentiel du raisonnement lourd pourrait tourner sur le téléphone que la
  personne a déjà sur elle, ou sur une infrastructure serveur partagée, plus facile à réparer et qui
  mutualise les puces au lieu de les laisser dormir au poignet. La question que je porterais dans une
  prochaine version n'est donc pas de savoir si Thea doit exister, mais quelle part de son
  intelligence a vraiment besoin de tourner sur du matériel neuf, et comment honorer l'argument de
  vie privée sans se replier d'office sur le tout-local. Ce compromis, entre une interaction vraiment
  meilleure et le coût matériel de l'endroit où vivent ses calculs, c'est ce qui me semble le plus
  important à bien résoudre.

gallery:
  - src: "/images/work/thea/gallery-1.jpg"
    alt: "Le bracelet Thea porté au poignet, au centre du cadre, sur un ciel cobalt parsemé de fleurs sauvages."
    caption: "Le bracelet porté au poignet."
  - src: "/images/work/thea/gallery-2.jpg"
    alt: "Un doigt qui appuie sur l'appareil porté au poignet, sa jauge oblongue allumée et de fins fils colorés visibles, sur un ciel cobalt."
    caption: "Joindre Thea : appui simple pour voir où l'on en est, appui maintenu pour lui confier ce qu'elle ne peut pas mesurer."
  - src: "/images/work/thea/gallery-3.jpg"
    alt: "Le wearable suspendu dans un entrelacs de cordes orange sur un ciel cobalt, sa jauge oblongue qui luit."
    caption: "La jauge oblongue allumée."
  - src: "/images/work/thea/gallery-4.jpg"
    alt: "Deux mains qui se rejoignent au-dessus d'un brin de fleur sauvage, le bracelet Thea à l'un des poignets, sur un ciel cobalt."
    caption: "Parmi les pollens qu'il est fait pour détecter."
  - src: "/images/work/thea/gallery-5.jpg"
    alt: "L'écran de la démo tourné vers le public sur une scène sombre : le bracelet Thea, sa boucle qui luit d'une lumière chaude, des anneaux orange qui se propagent depuis une pulsation haptique, et un oscilloscope qui trace la vibration tout en bas."
    caption: "L'écran qui retransmet, lors de la démo, l'état du bracelet à toute la salle."
  - src: "/images/work/thea/gallery-6.jpg"
    alt: "Trois téléphones montrant l'application compagnon en direct : un journal de la journée avec des barres d'exposition, le tableau de bord quotidien affichant « Wide open. Today is yours. », et la reconstruction, après coup, d'une heure difficile."
    caption: "L'application qui accompagne Thea (Nerea Asensio)."
  - src: "/images/work/thea/gallery-7.jpg"
    alt: "Trois téléphones montrant l'onboarding de l'application : « Meet Thea, the sense you were missing », une explication de l'Action Window, et une question sur votre connaissance de vos déclencheurs."
    caption: "L'onboarding qui explique Thea (Nerea Asensio)."
  - src: "/images/work/thea/gallery-8.jpg"
    alt: "Un membre de l'équipe debout devant le mur de tableau blanc du projet pendant le module de cinq semaines, post-it et croquis en arrière-plan."
    caption: "Le mur de travail, où le sens a été débattu."
  - src: "/images/work/thea/gallery-9.jpg"
    alt: "Un croquis au tableau blanc du verre qui se remplit vers une courbe de seuil, avec des notes manuscrites sur la charge et la marge."
    caption: "Mind map, pour penser l'interaction entre les données et l'interface."

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
  title: "Thea — un nouveau sens, calme, pour vivre avec une allergie"
  image: "/images/work/thea/adjacent.jpg"
  alt: "Le wearable Thea suspendu dans un entrelacs de cordes orange sur un ciel cobalt, sa jauge oblongue qui luit, un cliché éditorial tiré de la présentation finale."
---
