# CONTENT.md — Contenu du site à valider

> Ce fichier regroupe les textes clés du site. Corriger ici, puis reporter dans le code.  
> Ne pas modifier le code directement pour les changements de contenu — passer par ce fichier d'abord.

---

## Métadonnées globales

```
Titre par défaut : Novadis — Créateur de solutions globales de sûreté
Description      : [à préciser selon la version finale]
Mots-clés        : sûreté, sécurité, contrôle d'accès, vidéosurveillance, détection intrusion, intégration, convergence
Langue           : fr
URL de base      : https://novadis.eu
```

---

## Homepage

### Structure de la page (ordre des sections)
```
1.  Hero
2.  Métriques clés (StatRow)
3.  Références clients
4.  Partenaires (ticker)
5.  Architecture — schéma interactif
6.  Vos enjeux (6 cartes)
7.  Solutions
8.  Secteurs — carrousel horizontal
9.  Méthode — 3 piliers + 4 étapes
10. Les sujets du moment (réglementation)
11. À propos + différenciateurs
12. CTA de fin de page
```
> ✅ Fusions validées le 07/10/2026 :
> - "Trois temps qui structurent…" + "De l'étude à la maintenance…" → section Méthode.
>   Le titre "De l'étude à la maintenance, une discipline d'exploitation" et sa
>   phrase d'intro ne sont plus affichés nulle part. Les livrables restent sur /services.
> - "Ouverte, évolutive, utile à la décision" → les 4 différenciateurs passent
>   dans À propos ; ce titre n'est plus affiché.

### Schéma d'architecture interactif
```
Couches (bas → haut) : Terrain · Réseau IP Sûreté · Postes opérateurs
Terrain              : Contrôle d'accès · Intrusion · Vidéosurveillance · Intégrations
Réseau IP Sûreté     : IT & Infrastructure (serveurs)
Postes opérateurs    : Supervision globale · Analyse d'image
Légende              : Architecture de principe · Réseau IP Sûreté Novadis
```
> ⚠️ Libellés des couches repris du texte alternatif de l'ancienne image — à valider.
> La fiche sous le schéma reprend titre, produit et résumé de chaque solution.

### Hero
```
Eyebrow          : Créateur de solutions globales de sûreté
Titre principal  : Protégez vos sites, vos équipes et vos données
Sous-titre       : Novadis conçoit, intègre et maintient des systèmes de sûreté [...]
CTA principal    : Prendre contact
CTA secondaire   : Découvrir les solutions
Fond             : photo Casino de Monaco (référence client) + légende "site
                   protégé par Novadis" — remplace la vidéo "Terre" (la vidéo
                   corporate testée est un plan interview, inadaptée en fond)
Badges           : Conforme ANSSI · Norme NFA2P · CNIL biométrie (sous les CTA)
```
> ⚠️ 13/10/2026 — Hero plein écran sombre : film de drone qui plonge sur un site d'entreprise
> à l'heure bleue (site fictif, généré par IA), puis quatre repères se verrouillent sur l'image
> (Supervision globale, Vidéosurveillance, Contrôle d'accès, Intrusion · statut "Actif") avec le
> tracé du périmètre. Le film rejoue à chaque chargement ; image fixe directement avec
> "réduire les animations". Sur téléphone, pas de repères. Textes du hero inchangés. La console
> de supervision et la photo du Casino de Monaco ne sont plus affichées dans le hero. À valider.
> ⚠️ 07/10/2026 — Fond du hero remplacé par une ville 3D de nuit "sous surveillance"
> (équipements qui s'allument par vagues depuis un centre de supervision, faisceaux,
> balayage radar, plongée au scroll). La photo du Casino de Monaco et sa légende
> restent en secours (chargement, sans WebGL, animations réduites). À valider.
> ⚠️ Nouveau H1 orienté promesse client (benchmark Genetec "Protéger le quotidien").
> L'ancien titre "Créateur de solutions globales de sûreté" passe en eyebrow.
> Le hashtag #DetailsMakeTheDifference a été retiré du hero. À valider.

### Références clients (nouvelle section homepage)
> ⚠️ Les 3 références phares (CHU Montpellier, Casino de Monaco, Bourse de
> Commerce) sont désormais affichées sur la homepage. Vérifier que Novadis a
> le droit de citer ces clients publiquement.

### Métriques clés (StatRow)
```
12 000+    caméras déployées et supervisées
40 000+    points d'accès gérés
2,3 M m²  de sites en exploitation
20+ ans    d'expertise sûreté & convergence
```
> ⚠️ Ces chiffres sont à valider avec le directeur — sont-ils à jour ?

### Trois piliers
```
1. Élaborer    — [description à confirmer]
2. Convergence — [description à confirmer]
3. Perspectives — [description à confirmer]
```

### Vos enjeux (6 cartes — entrée par problème métier)

> ⚠️ Nouveau contenu (inspiration benchmark STid) — à valider avec le directeur.

```
1. Sortir des consoles en silo            → Supervision globale
2. Répondre à NIS2 et aux exigences ANSSI → Contrôle d'accès Amadeus
3. Migrer sans interrompre l'exploitation → Services / méthodologie
4. Piloter des dizaines de sites          → Secteurs (multi-sites)
5. Déployer la biométrie dans le cadre CNIL → Intégrations tierces
6. Réduire la charge opérateur            → Analyse d'image
```

### Les sujets du moment (2 cartes réglementaires)

> ⚠️ Nouveau contenu — à valider. Vérifier notamment la formulation NIS2
> (périmètre exact pour les clients Novadis) et le cadre CNIL biométrie.

```
NIS2             : La directive NIS2 étend les obligations de cybersécurité aux
                   systèmes de sûreté physique. Novadis conçoit des architectures
                   conformes ANSSI, segmentées et auditables.
Biométrie & CNIL : Le cadre CNIL encadre strictement la biométrie sur le lieu de
                   travail. Novadis déploie réseau veineux et empreinte digitale
                   dans les règles : finalité justifiée, gabarits maîtrisés,
                   traçabilité complète.
```

---

## Solutions

> ⚠️ "Supervision globale" est la première solution listée dans novadis-arborescence.md mais n'a pas encore de page dans le site démo. À créer avant le lancement.

### 0. Supervision globale *(à créer)*
- **Slug :** `supervision` *(à définir)*
- **Résumé :** Couche de supervision unifiée croisant contrôle d'accès, vidéosurveillance et intrusion

### 1. Infrastructure IT & Informatique
- **Slug :** `it-infrastructure`
- **Résumé :** Serveurs, stockage, virtualisation calibrés pour les systèmes de sûreté
- **Partenaires clés :** Microsoft OEM, Dell, VMware, Hyper-V

### 2. Contrôle d'Accès (Amadeus)
- **Slug :** `access-control`
- **Résumé :** Plateforme propriétaire gérant 40 000+ accès en temps réel
- **Certifications :** ANSSI
- **Partenaire :** DDS (Amadeus)

### 3. Détection Intrusion (Galaxy)
- **Slug :** `intrusion-detection`
- **Résumé :** Détection périmétrique et intérieure, supervision 12 000+ caméras
- **Certifications :** NFA2P
- **Partenaire :** Honeywell (Galaxy)

### 4. Vidéosurveillance (Ocularis)
- **Slug :** `video-surveillance`
- **Résumé :** VMS universel multi-marques, compatible ONVIF
- **Partenaire :** Qognify (Ocularis VMS) — anciennement OnSSI, racheté par Qognify

### 5. Analyse Vidéo IA
- **Slug :** `video-analytics`
- **Résumé :** Analyse temps réel et post-événement : comportements, LPR, reconnaissance
- **Technos :** LPR, détection comportementale, reconnaissance d'objets

### 6. Intégrations Intelligentes
- **Slug :** `smart-integrations`
- **Résumé :** Biométrie, LPR, IoT, intercom, coffres clés, sans vendor lock-in
- **Partenaires :** Aperio, [autres à confirmer]

---

## Secteurs (6)

> Segmentation cible issue de novadis-arborescence.md (priorité). À valider avec Novadis — le site démo utilise une segmentation différente (Banking, Transports, Santé, Luxe) qui devra être alignée.

| # | Secteur cible | Exemples |
|---|---|---|
| 1 | Tertiaire | Sièges, campus, flex-office |
| 2 | Industrie | Sites industriels, usines, data centers |
| 3 | Logistique | Entrepôts, plateformes |
| 4 | Sites sensibles | Infrastructures critiques, défense, énergie |
| 5 | Réseaux multi-sites | Groupes, enseignes, franchises |
| 6 | ERP / Public | Hôpitaux, gares, centres commerciaux |

---

## Méthodologie (4 étapes)

```
1. Étude & Ingénierie  — Audit, cartographie des risques, architecture
2. Conception          — Cahiers des charges détaillés, plans d'implantation
3. Déploiement         — Installation, validation, coordination chantier
4. Maintenance         — Support 24/7, maintenance préventive, mises à jour
```

---

## Partenaires (13)

DDS · Qognify · Microsoft · Dell · VMware · Hyper-V · Aperio · Honeywell · Axis · Hikvision · Dahua · Arseg · Synergie

> Axis, Hikvision et Dahua (caméras) : partenaires confirmés le 14/10/2026, ajoutés au ticker
> avec le rôle « Caméras IP » (à valider). Logos d'origine dans `_sources/logos-partenaires/`
> (non versionné), détourés pour le site dans `public/novadis/logos/partners/`.

> ⚠️ Arseg et Synergie sont des associations professionnelles, pas des partenaires technologiques. Les distinguer visuellement ?

---

## Page À propos

- Citation Einstein à revoir : *"Si vous ne pouvez pas expliquer simplement..."*  
  → Pertinente pour Novadis ? À valider avec le directeur.

---

## Page Contact

```
Email    : [à confirmer]
Téléphone : [à confirmer]
Adresse  : 14-16 Rue Clément Bayard, 92300 Levallois-Perret
```

---

## Page Solutions — parcours 3D "de l'alarme au poste opérateur"

Section pilotée au scroll, placée sous le hero. Aucun nouveau texte : elle réutilise
```
Intro    : eyebrow "Architecture" + titre "L'architecture compte autant que les équipements"
Étape 1  : Terrain            → Vidéosurveillance (titre, produit, résumé)
Étape 2  : Réseau IP Sûreté   → IT & Infrastructure
Étape 3  : Postes opérateurs  → Supervision globale (écran en alarme rouge)
```
> Sans WebGL ou avec "réduire les animations", les 3 étapes s'affichent en cartes statiques.
> ⚠️ Le titre d'intro est aussi utilisé sur la homepage (section Architecture) — à varier ?

---

## Solution Contrôle d'accès — scène 3D de la porte à badge

```
Eyebrow   : Amadeus
Titre     : Un accès, en trois temps
Étape 1   : Badge présenté — Le lecteur identifie le badge et interroge le contrôleur de la porte.
Étape 2   : Droit vérifié — Intelligence distribuée : le contrôleur décide localement, en une fraction de seconde.
Étape 3   : Porte ouverte, événement tracé — Gestion temps réel : l'accès est journalisé et remonte aussitôt à la supervision.
Notif.    : Accès autorisé · Porte 01 · Hall d'accueil
```
> ⚠️ Nouveaux textes (reprennent les avantages Amadeus "Intelligence distribuée" et
> "Gestion temps réel") — à valider. Lecteur et badge génériques, sans marque.

---

## Solution Vidéosurveillance — vue éclatée AXIS Q6010-E

```
Eyebrow     : AXIS Q6010-E
Titre       : Une caméra, pièce par pièce
Texte       : Faites défiler pour ouvrir la caméra : quatre capteurs couvrent les alentours,
              le dôme PTZ vient zoomer sur l'événement.
Étiquettes  : Support mural · Capot de protection · Capteurs multidirectionnels (×4)
              · Bulle de protection · Dôme PTZ
Étapes      : 01 Ouvrir — Support, capot, bulle : une architecture modulaire, pensée pour la
              pose et la maintenance.
              02 Couvrir — Quatre capteurs couvrent les alentours, le dôme PTZ zoome sur l'événement.
              03 Fédérer — Axis, Hikvision, Dahua : tout le parc remonte dans le même poste opérateur.
Pastille    : Un seul VMS · tout le parc
Constellation : Axis (multicapteur double, mini-dôme PTZ), Hikvision (dôme, bullet),
                Dahua (bullet, dôme double capteur)
```
> ⚠️ Nouveaux textes à valider, notamment la description technique (rôle des capteurs
> et du PTZ) avec la fiche produit Axis, et « architecture modulaire » (étape 01).
> Rendu Blender : design/3d/novadis-explode-v2.blend (100 frames : ouverture, cônes de
> vision des capteurs, balayage PTZ — les faisceaux sont une illustration, pas des champs
> de vision mesurés). Caméras détourées dans public/novadis/images/cameras/cutout/.

---

## Solutions Vidéosurveillance & Analyse d'image — galeries caméras

```
Vidéosurveillance : eyebrow "Parc caméras" · titre "Toutes les caméras, un seul VMS"
                    Texte : Ocularis pilote les caméras des principaux fabricants via ONVIF : bullets,
                    dômes, PTZ et multicapteurs cohabitent dans le même poste opérateur.
                    8 caméras : Axis (bullet, mini-dôme PTZ, multicapteur double),
                    Hikvision (bullet, dôme), Dahua (bullet, dôme, dôme double capteur)
Analyse d'image   : eyebrow "Capteurs" · titre "Des caméras choisies pour l'analyse"
                    Texte : La qualité d'une détection commence au capteur : optique, éclairage et
                    champ de vision sont dimensionnés selon chaque scénario d'analyse.
                    4 caméras : Axis (bullet, multicapteur), Hikvision (dôme), Dahua (dôme double capteur)
```
> ⚠️ Nouveaux textes à valider. Types de caméras déduits des photos, sans référence de modèle.
> Axis, Hikvision et Dahua sont partenaires de Novadis (confirmé le 14/10/2026).
> ⚠️ Photos produits récupérées sur le web (`_sources/équipement/caméra/`) : à remplacer par
> les visuels officiels des kits partenaires avant la mise en ligne.

---

## Réalité augmentée (mobile)

```
Bouton   : "Voir dans votre espace" — hero /solutions, visible uniquement sur iPhone/iPad et Android
Modèle   : AXIS Q6010-E à l'échelle réelle (Ø 395 mm, fiche technique Axis), support mural compris
iOS      : Quick Look (fichier USDZ) — pose sur une surface horizontale
Android  : Google Scene Viewer (GLB) — pose au sol ou au mur
```
> ⚠️ Non testé sur un vrai téléphone. Android exige une URL publique en HTTPS :
> ne fonctionne pas depuis localhost, à vérifier une fois le site en ligne.

---

## Crédits médias (ressources libres de droit)

Usage commercial autorisé, attribution non obligatoire. Interdit : revendre les
fichiers tels quels, ou laisser entendre que les personnes visibles cautionnent Novadis.

| Fichier (`public/novadis/…`) | Utilisé sur | Source | Licence |
|---|---|---|---|
| `images/stock/salle-supervision.webp` | Solution Supervision globale | [Unsplash TtMKq3lJm-U](https://unsplash.com/photos/TtMKq3lJm-U) | [Licence Unsplash](https://unsplash.com/license) |
| `images/stock/camera-videosurveillance.webp` | Solution Analyse d'image | [Unsplash pDtgBIGa0cM](https://unsplash.com/photos/pDtgBIGa0cM) | [Licence Unsplash](https://unsplash.com/license) |
| `images/stock/biometrie-empreinte.webp` | Homepage — carte Biométrie & CNIL | [Unsplash SRFG7iwktDk](https://unsplash.com/photos/SRFG7iwktDk) | [Licence Unsplash](https://unsplash.com/license) |
| `images/secteurs/*.webp` (6 images) | Secteurs (accueil, /secteurs) | Générées par IA avec Higgsfield le 13/10/2026 — originaux PNG dans `_sources/higgsfield/secteurs/` (non versionné) | Conditions du plan Higgsfield — **usage commercial à confirmer** |
| `images/stock/datacenter.webp` | Homepage — carte NIS2 | [Unsplash aWslrFhs1w4](https://unsplash.com/photos/aWslrFhs1w4) — Taylor Vick | [Licence Unsplash](https://unsplash.com/license) |
| `images/stock/mat-cameras.webp` | Solution Vidéosurveillance — Ocularis | [Unsplash a40akJxBhT8](https://unsplash.com/photos/a40akJxBhT8) — Milan Malkomes | [Licence Unsplash](https://unsplash.com/license) |
| `images/stock/clavier-acces.webp` | Solution Intrusion — Galaxy | [Unsplash qB8tpVXQh6Y](https://unsplash.com/photos/qB8tpVXQh6Y) — vuk burgic | [Licence Unsplash](https://unsplash.com/license) |
| `images/stock/etude-plan.webp` | Hero /about | [Unsplash xYCBw1uIP_M](https://unsplash.com/photos/xYCBw1uIP_M) — ThisisEngineering | [Licence Unsplash](https://unsplash.com/license) |
| `images/stock/reunion-projet.webp` | Hero /contact | [Unsplash 05gac-Qn0k4](https://unsplash.com/photos/05gac-Qn0k4) — Cherrydeck | [Licence Unsplash](https://unsplash.com/license) |
| `images/clients/casino-monaco.webp` | Référence Casino de Monaco, hero de l'accueil | [Unsplash CSMbdyGa8mE](https://unsplash.com/photos/CSMbdyGa8mE) — Mony Misheal | [Licence Unsplash](https://unsplash.com/license) |
| `videos/salle-supervision.mp4` + `images/stock/salle-supervision-poster.webp` | /services, solution Intégrations | Générée par IA avec Higgsfield le 13/10/2026 (image puis animation), montée en boucle de 7 s avec fondu — originaux dans `_sources/higgsfield/` (non versionné) | Conditions du plan Higgsfield — **usage commercial à confirmer** |
| `models/server-rack.glb`, `models/control-room.glb` | Parcours 3D (/solutions) | Modélisés pour Novadis dans Blender (textures d'écran générées) | Propriété Novadis |
| `models/axis-p1465-le.glb`, `axis-p1465-le-ar.glb`, `axis-p1465-le.usdz` | Hero /solutions (modèle interactif + aperçu AR) | Caméra bullet modélisée pour Novadis dans Blender (`design/3d/axis-p1465-le.blend`) d'après la photo produit `images/cameras/axis-bullet-2.webp` | Propriété Novadis (marque AXIS reproduite sur le capot) |
| `videos/journey-gate.mp4` | Parcours 3D (/solutions) : flux de la caméra du portail sur l'écran d'alarme | Généré par IA avec Higgsfield le 14/10/2026 (image Nano Banana 2 puis animation Seedance 2.0), réencodé en 960×540 sans son — originaux dans `_sources/higgsfield/journey/` (non versionné) | Conditions du plan Higgsfield — **usage commercial à confirmer** |
| `models/alarm-journey-sets.glb` | Parcours 3D (/solutions) : maquettes Terrain (façade, portail, guérite), local technique, salle de supervision | Modélisées pour Novadis dans Blender (`design/3d/alarm-journey-sets.blend`) ; le mur d'images affiche des recadrages de `images/hero/site-end.webp` (Higgsfield) | Propriété Novadis — image Higgsfield : **usage commercial à confirmer** |
| `models/axis-q6010-e.glb` | Plus utilisé sur le site depuis le 14/10/2026 (remplacé par la P1465-LE) | ["AXIS-Q6010-E Surveillance Camera"](https://sketchfab.com/3d-models/axis-q6010-e-surveillance-camera-143e552bde554ea2aaa72664efab003e) par ArtOfSylr — dôme en verre fumé pour le web | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — **crédit obligatoire** |
| `textures/city/*.webp` (façades, toits, asphalte) | Hero 3D de la homepage | Poly Haven : [concrete_tile_facade](https://polyhaven.com/a/concrete_tile_facade), [brick_wall_09](https://polyhaven.com/a/brick_wall_09), [gravel_embedded_concrete](https://polyhaven.com/a/gravel_embedded_concrete), [aerial_asphalt_01](https://polyhaven.com/a/aerial_asphalt_01) — atlas de fenêtres généré pour Novadis | [CC0](https://polyhaven.com/license) |
| `videos/hero-site.mp4` + `images/hero/site-start.webp`, `site-end.webp` | Hero de l'accueil | Scène de cadrage modélisée dans Blender (`design/3d/novadis-hero.blend`), image et vidéo générées par IA avec Higgsfield le 13/10/2026, vidéo inversée et ralentie au montage — originaux dans `_sources/higgsfield/hero/` (non versionné) | Conditions du plan Higgsfield — **usage commercial à confirmer** |
| `hdri/potsdamer_platz_1k.hdr` | Éclairage du modèle 3D (/solutions) | [Poly Haven](https://polyhaven.com/a/potsdamer_platz) | [CC0](https://polyhaven.com/license) |

> ⚠️ 13/10/2026 — La vidéo de salle de supervision et les six images de secteurs sont générées
> par IA (elles remplacent la vidéo Pexels et les photos Unsplash) : ce sont des ambiances,
> jamais des références ni des installations Novadis. Le mur d'écrans affiche un planisphère
> avec des points sur plusieurs continents — à valider (Novadis n'a pas d'implantation mondiale).
> ⚠️ Licence CC BY : le crédit "AXIS-Q6010-E Surveillance Camera par ArtOfSylr (CC BY 4.0)"
> doit être visible sur le site (ex. mentions légales / crédits) avant la mise en ligne.
> ⚠️ Ce sont des visuels d'illustration, pas des installations Novadis. À remplacer
> par des photos de chantiers réels dès que possible.
> Les photos Unsplash restantes sont téléchargées et étalonnées (tons froids, voile bleu
> Novadis, sauf la photo du Casino de Monaco) par `scripts/fetch-stock-images.mjs` :
> pour remplacer une image, modifier l'identifiant dans son manifeste et relancer le script.
> ⚠️ La légende du hero /about, « Équipes à taille humaine · Levallois-Perret », accompagne
> désormais une photo d'illustration (pas l'équipe Novadis) : légende à revoir.
> ⚠️ Nouveaux textes alternatifs : Intrusion → "Clavier de commande rétroéclairé fixé au mur",
> Vidéosurveillance → "Mât équipé de plusieurs caméras de vidéosurveillance",
> /about → "Deux ingénieurs annotent un plan d'implantation",
> /contact → "Réunion de cadrage autour d'une table dans un bureau".
> ⚠️ Textes alternatifs mis à jour pour décrire les nouvelles images :
> Supervision → "Opérateur face à un mur d'écrans de supervision",
> Analyse d'image → "Caméra de vidéosurveillance fixée sur un mur".

> ⚠️ Hero /solutions : le dôme AXIS Q6010-E est remplacé le 14/10/2026 par une caméra bullet
> AXIS P1465-LE modélisée dans Blender (aussi utilisée pour l'aperçu AR). Indication « Faites
> pivoter la caméra » et nouvelles étiquettes flottantes « Éclairage IR intégré » et « Support
> mural » (`solutionsHeroModel`, `data/site.ts`) à valider.
> ⚠️ Parcours 3D /solutions (14/10/2026) : nouveau libellé affiché sur l'écran d'alarme,
> « Intrusion · Portail 01 » (`alarmJourney.detection`, `data/site.ts`), à valider.

> Logos partenaires ajoutés (`public/novadis/logos/partners/`) : `microsoft.webp` et `vmware.webp`
> rendus depuis les SVG de Wikimedia Commons (Microsoft_logo_(2012).svg, Vmware.svg) ; `aperio.webp`
> extrait de la fiche produit `_sources/02-Fiches_produits/FP_Novadis_Aperio-Pas_a_jour.pdf`.
> Marques de leurs propriétaires, affichées au titre du partenariat.

---

## À compléter / valider

- [ ] Textes hero homepage exacts
- [ ] Description de chaque solution (courte et longue)
- [ ] Métriques à jour (12 000+, 40 000+, 2,3M m²)
- [ ] Email et téléphone de contact officiels
- [ ] Citation de la page À propos
- [ ] Liste complète et correcte des partenaires
