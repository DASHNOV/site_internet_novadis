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

## Partenaires (10)

DDS · Qognify · Microsoft · Dell · VMware · Hyper-V · Aperio · Honeywell · Arseg · Synergie

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
```
> ⚠️ Nouveaux textes à valider, notamment la description technique (rôle des capteurs
> et du PTZ) avec la fiche produit Axis. Rendu Blender : design/3d/novadis-3d-scene.blend.

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
| `videos/salle-supervision.mp4` + `images/stock/salle-supervision-poster.webp` | /services, solution Intégrations | [Pexels 38779100](https://www.pexels.com/video/38779100/) — Kiwi and Camera | [Licence Pexels](https://www.pexels.com/license/) |
| `models/server-rack.glb`, `models/control-room.glb` | Parcours 3D (/solutions) | Modélisés pour Novadis dans Blender (textures d'écran générées) | Propriété Novadis |
| `models/axis-q6010-e.glb` | Hero /solutions + parcours 3D (étape Terrain) | ["AXIS-Q6010-E Surveillance Camera"](https://sketchfab.com/3d-models/axis-q6010-e-surveillance-camera-143e552bde554ea2aaa72664efab003e) par ArtOfSylr — dôme en verre fumé pour le web | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — **crédit obligatoire** |
| `textures/city/*.webp` (façades, toits, asphalte) | Hero 3D de la homepage | Poly Haven : [concrete_tile_facade](https://polyhaven.com/a/concrete_tile_facade), [brick_wall_09](https://polyhaven.com/a/brick_wall_09), [gravel_embedded_concrete](https://polyhaven.com/a/gravel_embedded_concrete), [aerial_asphalt_01](https://polyhaven.com/a/aerial_asphalt_01) — atlas de fenêtres généré pour Novadis | [CC0](https://polyhaven.com/license) |
| `hdri/potsdamer_platz_1k.hdr` | Éclairage du modèle 3D (/solutions) | [Poly Haven](https://polyhaven.com/a/potsdamer_platz) | [CC0](https://polyhaven.com/license) |

> ⚠️ La vidéo montre un vrai centre de gestion du trafic (pas un client Novadis) :
> à présenter comme une ambiance, jamais comme une référence.
> ⚠️ Licence CC BY : le crédit "AXIS-Q6010-E Surveillance Camera par ArtOfSylr (CC BY 4.0)"
> doit être visible sur le site (ex. mentions légales / crédits) avant la mise en ligne.
> ⚠️ Ce sont des visuels d'illustration, pas des installations Novadis. À remplacer
> par des photos de chantiers réels dès que possible.
> ⚠️ Textes alternatifs mis à jour pour décrire les nouvelles images :
> Supervision → "Opérateur face à un mur d'écrans de supervision",
> Analyse d'image → "Caméra de vidéosurveillance fixée sur un mur".

---

## À compléter / valider

- [ ] Textes hero homepage exacts
- [ ] Description de chaque solution (courte et longue)
- [ ] Métriques à jour (12 000+, 40 000+, 2,3M m²)
- [ ] Email et téléphone de contact officiels
- [ ] Citation de la page À propos
- [ ] Liste complète et correcte des partenaires
