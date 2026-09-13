# Passation — Le Val-d’Oise à la loupe

> Mise à jour du 13 septembre 2026 : les corrections prioritaires décrites dans ce document ont été réalisées. Le bloc des contacts publics a été réorganisé, les nouveaux indicateurs ont reçu leur mise en forme responsive et la lecture du fichier de transports a été réparée. Les contrôles retrouvent 6 lignes et 9 arrêts à Magny-en-Vexin.

## 1. Objectif du projet

Créer un atlas communal interactif destiné au grand public, porté par la DDT du Val-d’Oise. Le site doit raconter chaque commune avec des données publiques synthétiques, fiables et immédiatement compréhensibles.

L’expérience centrale repose sur une carte du département :

- au survol d’une commune sur ordinateur, la visée, le nom de la commune et les trois blocs de datavisualisation se déplacent et se mettent à jour ;
- au clic, un volet droit ouvre le portrait complet de la commune ;
- sur mobile, la sélection se fait au toucher et le volet doit toujours pouvoir être fermé ;
- les traits reliant la commune aux trois blocs ne doivent jamais se croiser.

Le projet reste un outil public de connaissance territoriale. Il ne doit pas devenir un portail immobilier : loyers et prix de vente complètent la démographie, l’emploi, le logement, les équipements, les services publics, les transports et le cadre de vie.

## 2. Identité graphique à respecter

- Titre exact : **Le Val-d’Oise à la loupe**.
- Charte cohérente avec les autres pages de l’Atlas de la DDT95.
- Typographie forte, titres visibles et en gras.
- Menu latéral gauche sur ordinateur.
- Vrais interrupteurs graphiques pour activer les thèmes.
- Cartes colorées, lisibles et institutionnelles, avec une touche ludique adaptée au grand public.
- Pas de lien ou de bouton « Retour à l’Atlas ».
- Pas de surcharge permanente sur la carte : les données détaillées appartiennent au volet droit.

## 3. État publié

- Site : https://portraits-val-doise.wilkob13.chatgpt.site
- Projet Sites : `appgprj_6aa5a07303888191bd0cf12a8de08828`
- Version actuellement en production : **v22**
- Commit actuellement publié : `af2414ad3fa1f6b123655edf0b661fd9facfdc98`
- Accès actuel : propriétaire uniquement / personnalisé.

La production contient déjà :

- la carte des communes du Val-d’Oise ;
- le menu gauche et les interrupteurs thématiques ;
- la visée et les trois branches de datavisualisation ;
- la mise à jour au survol sur ordinateur ;
- l’ouverture du volet complet au clic ;
- un bouton de fermeture du volet visible sur mobile ;
- un contour communal nettoyé ;
- des connecteurs qui évitent les croisements ;
- des pourcentages contenus dans leurs cercles ;
- les thèmes habitants, logement, emploi et mobilités, économie et services ;
- les estimations de loyers ANIL 2025 et les prix DVF 2021–2025 ;
- les graphiques détaillés repliables dans le volet communal.

## 4. État du lot de corrections

Répertoire du projet :

```text
/workspace/sites/portraits-val-doise
```

Les enrichissements suivants ont été implémentés et validés avant publication :

- la correction du calcul spatial des arrêts de transport ;
- l’ajout des services publics par commune ;
- le téléphone et l’adresse de la mairie ;
- la présence d’une France Services ;
- la dynamique récente du logement ;
- les établissements scolaires, commerces et professionnels de santé.

Fichiers concernés :

- `app/page.tsx` — modifié localement ;
- `public/data/public_services_95.json` — nouveau fichier local ;
- `app/globals.css` — styles responsive des nouvelles cartes et des contacts ;
- `tsconfig.tsbuildinfo` — fichier généré localement, à ne pas versionner.

## 5. Modifications déjà commencées localement

### Transports

Le test d’appartenance d’un arrêt à une commune utilisait les coordonnées géographiques directement contre une géométrie projetée. Il a été corrigé ainsi :

```ts
contains(feature, project([s.lon, s.lat]))
```

Cette correction doit être vérifiée notamment sur **Magny-en-Vexin**, où l’ancienne version annonçait à tort qu’aucune offre régulière n’était identifiée.

### Services publics

Le fichier `public/data/public_services_95.json` couvre les 183 communes et contient :

- `services_count` ;
- `mairie` : nom, téléphone, adresse, site web et lien Service-Public ;
- `france_services` : mêmes champs lorsqu’un guichet est présent.

Exemple pour Magny-en-Vexin :

- mairie : `01 34 67 03 28`, 20 rue de Crosne, 95420 ;
- France Services : `01 82 31 20 94`, 12 rue des Frères Montgolfier, 95420 ;
- nombre de services publics référencés : 7.

Source : annuaire local Service-Public / DILA, jeu de données daté du 11 septembre 2026.

### Habitat et dynamique

Une sous-partie « Dynamique récente » a été ajoutée avec :

- ventes de maisons analysées dans DVF entre 2021 et 2025 ;
- logements autorisés entre 2021 et 2025 ;
- logements commencés entre 2021 et 2025.

Attention : la donnée disponible porte sur le **nombre de logements autorisés**, pas sur le nombre exact de dossiers de permis. Le libellé doit rester précis.

### Équipements, commerces et services

Le volet communal calcule maintenant :

- établissements scolaires ;
- professionnels de santé ;
- commerces alimentaires ;
- supermarchés et hypermarchés ;
- services publics ;
- présence d’une France Services.

Le détail comprend notamment écoles, collèges, lycées, médecins, pharmacies, supermarchés, supérettes, épiceries, boulangeries, établissements actifs et créations d’entreprises.

## 6. Corrections prioritaires réalisées

### Priorité 1 — Bloc des services publics

Le numéro de la gendarmerie apparaît actuellement dans une ligne séparée intitulée « Unité de secteur ». C’est ambigu et illisible.

Le bloc a été remplacé par des cartes de contact explicites :

1. **Mairie** — nom, adresse et téléphone ;
2. **France Services** — nom, adresse et téléphone, ou « Pas de guichet dans la commune » ;
3. **Gendarmerie ou police** — nom exact du service, adresse et téléphone.

Chaque téléphone doit être placé directement en face du service concerné et être cliquable avec un lien `tel:`. Ne jamais afficher un numéro sans dire clairement à quel organisme il appartient.

### Priorité 2 — Style des nouveaux blocs

Les styles suivants ont été ajoutés dans `app/globals.css` :

- `.subsection-title` ;
- `.territory-dynamics` ;
- la liste de contacts publics, par exemple `.public-contact-list` et `.public-contact`.

Attendus : trois cartes lisibles sur ordinateur, empilement propre sur mobile, couleurs par thème, hiérarchie forte et alignement label/valeur.

### Priorité 3 — Transports

- Magny-en-Vexin a été vérifiée après la correction : 6 lignes et 9 arrêts sont retrouvés.
- La lecture sépare désormais correctement `MOBILITY95` du second objet `COMMUNES95` présent dans le même fichier JavaScript.
- Vérifier une commune très rurale sans desserte pour distinguer un vrai zéro d’une donnée absente.
- Ne pas présenter une absence de résultat technique comme une certitude sur l’absence de transport.

### Priorité 4 — Données pratiques

- Contrôler au minimum Magny-en-Vexin, Cergy, Guiry-en-Vexin et une petite commune rurale.
- Afficher `0` lorsqu’il s’agit d’un zéro connu et `—` lorsque la donnée est absente.
- Conserver une source courte et homogène au pied de chaque section.

## 7. Critères d’acceptation à ne pas régresser

- [ ] Le titre est exactement « Le Val-d’Oise à la loupe », grand et en gras.
- [ ] Aucun retour à l’Atlas n’est affiché.
- [ ] Le menu gauche et les interrupteurs restent présents sur ordinateur.
- [ ] Le survol d’une commune déplace la visée et toute la constellation de données.
- [ ] Les trois traits ne se croisent jamais.
- [ ] Le clic sur une commune ouvre le volet droit.
- [ ] Le bouton de fermeture du volet est toujours visible et utilisable sur mobile.
- [ ] Les pourcentages restent à l’intérieur des donuts.
- [ ] Le contour de la commune sélectionnée est propre sur toute sa périphérie.
- [ ] Les informations de la carte restent synthétiques ; le détail est dans le volet.
- [ ] Les numéros de téléphone sont associés sans ambiguïté à leur service.
- [ ] Démographie, logement, emploi, équipements et institutions restent équilibrés.
- [ ] Les prix immobiliers et loyers sont présentés comme des indicateurs parmi les autres.
- [ ] Les sources et millésimes sont visibles et cohérents.

## 8. Principales sources de données

- Profils territoriaux Insee : `https://ddt95.github.io/VO-Insee/data/processed/commune_profiles.json`
- Portail communal DDT95 : `https://ddt95.github.io/portail-communal95/`
- Statistiques DVF : `https://ddt95.github.io/portail-communal95/data/dvf_stats_95.json`
- Répertoire des élus : `https://ddt95.github.io/portail-communal95/data/elus_95.json`
- Sécurité : `https://ddt95.github.io/portail-communal95/data/securite_95.json`
- QPV : `https://ddt95.github.io/portail-communal95/data/qpv_95.geojson`
- Transports : `https://ddt95.github.io/transport95/mobility95.js`
- API Géo, Géorisques, Cerema ZAN, Hub’Eau et Agence ORE.
- Annuaire Service-Public / DILA : base de données locales.
- Carte des loyers ANIL 2025.

## 9. Fichiers structurants

- `app/page.tsx` — carte, sélection, branches, contenu du volet communal ;
- `app/globals.css` — charte, responsive, carte, panneaux et volet ;
- `app/portrait-connectors.tsx` — connecteurs entre la visée et les datavisualisations ;
- `public/data/territory_profiles.json` — profils communaux ;
- `public/data/rents_2025.json` — loyers 2025 ;
- `public/data/public_services_95.json` — services publics, nouveau et non encore publié ;
- `.openai/hosting.json` — configuration du projet Sites.

## 10. Validation avant publication

Dans le répertoire du projet :

```bash
node /root/.codex/plugins/cache/openai-curated-remote/sites/0.1.62/scripts/configure-execution-profile.mjs
npx tsc --noEmit
git diff --check
node /root/.codex/plugins/cache/openai-curated-remote/sites/0.1.62/scripts/build-site.mjs
```

Ne pas lancer le lint comme critère bloquant sans demande explicite : le projet comporte déjà des avertissements historiques `no-explicit-any`.

Avant toute nouvelle édition liée à Sites, relire `.openai/hosting.json` et récupérer l’état du projet Sites existant. Ne jamais recréer un second projet Sites.

## 11. Publication Sites

Après validation :

1. versionner uniquement les fichiers utiles ;
2. pousser le commit sur la source configurée du projet Sites ;
3. récupérer le SHA complet avec `git rev-parse --verify HEAD` ;
4. construire l’archive avec `package-site.mjs` ;
5. enregistrer une nouvelle version du projet `appgprj_6aa5a07303888191bd0cf12a8de08828` ;
6. déployer en conservant l’accès actuel ;
7. attendre le statut final `succeeded`.

## 12. Résultat attendu de la prochaine passe

Une version où Magny-en-Vexin affiche bien sa desserte, où les commerces, écoles et services publics sont lisibles, et où le bloc institutionnel associe sans ambiguïté chaque organisme à son adresse et à son téléphone. Le tout doit rester synthétique, visuel, crédible et cohérent avec la charte de l’Atlas.
