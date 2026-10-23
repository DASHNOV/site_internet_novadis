# Plan — Version du site éditable par l'équipe commerciale (démo locale)

**Objectif :** montrer à l'équipe commerciale qu'elle peut modifier les textes et les images du site elle-même, avec une version de travail en brouillon validée par un responsable avant publication.

**Solution retenue :** Payload CMS 3 (open source, gratuit) intégré au projet Next.js, base SQLite locale, images stockées en local. Rien ne part sur Vercel ni ailleurs pendant la démo.

**Hors périmètre :** `/legal`, `/privacy`, les vidéos, la page LiDAR (locale uniquement), les scènes 3D et leurs fichiers d'ancres JSON, le formulaire de contact.

---

## Étape 0 — Préparation

- [x] Travail en cours de `refonte-design` : c'est le verrou de la page LiDAR, réservée au local. Il suit la branche sans être commité.
- [x] Créer la branche `cms-payload` à partir de `refonte-design`.
- [x] Compatibilité vérifiée : Payload 3.92 demande Next **≥ 16.3.3** (le projet est en 16.2.10) ; React 19.2.7 convient. **Monter Next en 16.4.x au début de l'étape 2.**
- [x] Captures des 14 pages publiques (capture d'écran pleine page et texte visible) dans `cms/captures-avant/`, un dossier ignoré par Git.

**Terminé quand :** la branche existe et les captures « avant » sont prises.

## Étape 1 — Inventaire des textes

Les textes sont aujourd'hui répartis à deux endroits :

| Source | Contenu |
|---|---|
| `data/site.ts` (~960 lignes) | Solutions, industries, métriques, process, différenciateurs, enjeux, réglementaire, navigation, partenaires, piliers, architecture, textes des démonstrations, services, à propos, contact |
| `data/sectors.ts`, `data/references.ts` | Les 6 secteurs, les références mises en avant |
| Textes écrits en dur dans les pages | `app/page.tsx` (le plus gros), `app/about`, `app/secteurs`, `app/references`, `app/services`, `app/solutions/[slug]`, `app/solutions`, `app/contact` |
| Textes écrits en dur dans les composants | `cta-banner`, `site-footer`, `partner-cloud`, `solutions-scroll`, `supervision-room`, `badge-door`, `card` |

- [x] Sortir tous les textes écrits en dur vers `data/`, sans changer un seul mot. Les textes des pages et des blocs communs sont dans `data/pages.ts`, les coordonnées dans `contactDetails` (`data/site.ts`), et les titres en deux tons passent par `<AccentTitle>`.
- [x] Le tableau de correspondance, c'est la structure de `data/pages.ts` : un export par page ou par bloc, une clé par texte.
- [x] Ce qui ne sera **pas** éditable : icônes lucide (liste de choix), solutions locales LiDAR, réglages des scènes 3D, pages d'erreur et 404, libellés du formulaire de contact, métadonnées SEO (`metadata` des pages), et le composant `solutions-scroll`, qui n'est plus utilisé.

**Terminé quand :** plus aucun texte visible n'est écrit en dur dans `app/` ou `components/`, et le site s'affiche à l'identique.

✅ Vérifié le 23/10/2026 : le texte de 12 pages est strictement identique. Sur l'accueil et la page Solutions, seuls des repères d'animation varient d'une capture à l'autre. `next build` passe et `.next/static` ne contient pas « lidar ».

## Étape 2 — Installation de Payload

- [x] Monter Next en 16.4.2 (avec `eslint-config-next`) : le build passe à l'identique.
- [x] Installer Payload **3.92.0 en version exacte** (tous les paquets `@payloadcms/*` doivent rester alignés) : `payload`, `@payloadcms/next`, `@payloadcms/db-sqlite`, `@payloadcms/richtext-lexical`, `@payloadcms/ui`, `@payloadcms/translations`, `graphql`. `@payloadcms/live-preview-react` viendra à l'étape 7.
- [x] Réorganiser `app/` en deux groupes de routes :
  - `app/(site)/` : les pages, `layout.tsx`, `globals.css`, `error.tsx`, `not-found.tsx` et les polices dans `fonts.ts` ;
  - `app/(payload)/` : `/admin` et `/api`, avec leur propre layout, donc sans les styles du site.
  - `app/global-not-found.tsx` (flag expérimental `globalNotFound`) affiche la 404 du site pour les URL inconnues, puisqu'il y a maintenant deux layouts racines.
  - `icon.svg`, `robots.ts` et `sitemap.ts` restent à la racine de `app/`.
- [x] Créer `payload.config.ts` : SQLite dans `cms/payload.db`, images dans `cms/media/`, interface en français. Les collections sont dans `collections/` (pour l'instant `users` et `media`).
- [x] `PAYLOAD_SECRET` et `DATABASE_URI` sont dans `.env.local`, ignoré par Git, comme `cms/`.
- [x] Brancher `withPayload` dans `next.config.mjs`, ajouter l'alias `@payload-config` et passer `allowJs` à `true` dans `tsconfig.json` (pour l'import map).

**Terminé quand :** `npm run dev` affiche le site comme avant, et `/admin` affiche l'écran de création du premier compte.

✅ Vérifié le 23/10/2026 : `/admin` affiche « Bienvenue, créez votre premier utilisateur » en français. Le texte des pages du site n'a pas bougé, sans erreur JavaScript. Une URL inconnue renvoie la 404 du site, `/api/users` renvoie 403 sans connexion, et `next build` passe sans « lidar » dans `.next/static`.

✅ **CLI Payload réglée :** sous Node 24, `tsx` chargeait deux fois `undici`. Les scripts passent maintenant par `--use-swc` (`@swc-node/register` et `@swc/core` en dépendances de dev), et `package.json` déclare `"type": "module"`, comme le modèle officiel de Payload. Commandes disponibles : `npm run cms:importmap`, `npm run cms:types` et `npm run payload -- <commande>`.

## Étape 3 — Modèle de contenu

Le découpage suit les pages, pour que les commerciaux retrouvent facilement chaque texte. Les briques communes sont dans `fields/index.ts` (texte avec limite de longueur, titre en deux tons, liste de lignes, icône, image, lien interne, slug verrouillé), et la liste des icônes proposées dans `lib/icon-names.ts`.

**Collections** (éléments répétés), dans `collections/` :
- [x] `solutions` : titre, titre court, étiquette des références, produit, icône, résumé, introduction, contexte, capacités, réponse, bénéfices, résultats, visuel. Le slug est verrouillé, et une vidéo reste gérée par l'équipe technique.
- [x] `sectors` : les 6 secteurs. `industries` (page Secteurs) et `sectors.ts` (page Références) partagent les mêmes slugs, ils sont donc réunis dans une seule fiche à deux onglets. La liste `challenges` de `sectors.ts` n'est affichée nulle part, elle n'est pas reprise.
- [x] `references` : les cas phares, reliés aux solutions.
- [x] `challenges` : les enjeux de l'accueil.
- [x] `media` : la médiathèque, avec texte alternatif obligatoire.
- [x] `users` : les comptes. Le rôle arrive à l'étape 4.

**Globals** (un exemplaire par page ou par bloc), dans `globals/` :
- [x] `home`, `solutions-page` (avec les titres communs des fiches solution), `sectors-page`, `services-page`, `references-page`, `about-page`, `contact-page`.
- [x] `common` (« Éléments communs ») : en-tête, menu, coordonnées, pied de page, bandeau de contact, normes et mentions de confiance, chiffres clés, étapes de service, libellés.
- [x] `demos` (« Démonstrations ») : textes du film de l'accueil, de la salle de supervision, de la porte à badge, de l'intrusion, de la caméra éclatée, de la caméra 3D, du schéma d'architecture et du parcours d'alarme. Le nombre d'étapes et d'étiquettes est figé, puisqu'il suit les films et les modèles 3D.

**Pour tous :**
- [x] Brouillons avec enregistrement automatique (`autosave`, 800 ms) et historique de 50 versions par document.
- [x] Limites de longueur : 60 caractères pour un libellé, 140 pour un titre, 280 pour un texte court et 600 pour un paragraphe. Le texte actuel le plus long fait 438 caractères.
- [x] Libellés et aides en français, regroupés dans l'admin par « Pages », « Offre », « Éléments communs », « Médias » et « Administration ».
- [x] `payload-types.ts` est généré (`npm run cms:types`).

**Terminé quand :** chaque ligne du tableau de l'étape 1 a son champ dans l'admin.

✅ Vérifié le 23/10/2026 : `data/pages.ts` et les textes de `data/site.ts`, `sectors.ts` et `references.ts` ont tous leur champ. Le tableau de bord, les globals et les formulaires de collection s'ouvrent sans erreur.

À savoir : ouvrir « Créer » dans une collection crée aussitôt un brouillon vide, à cause de l'enregistrement automatique. C'est le comportement normal de Payload. Pour la connexion en local, `admin.autoLogin` (`prefillOnly`, seulement sous `next dev`) préremplit le formulaire avec le compte de test de `.env.local` (`CMS_ADMIN_EMAIL`, `CMS_ADMIN_PASSWORD`).

## Étape 4 — Rôles et circuit de validation

- [ ] Ajouter un champ `role` aux utilisateurs, avec trois valeurs : `redacteur`, `publieur`, `admin`.
- [ ] **Rédacteur** : il peut créer et modifier, mais seulement en brouillon. Le passage à l'état « publié » est bloqué par une règle d'accès ou un hook `beforeChange`.
- [ ] **Publieur** (le responsable commercial) : il peut relire, publier ou revenir à une version précédente.
- [ ] **Admin** (toi) : il a tous les droits, y compris sur les comptes.
- [ ] Créer les comptes de démo (un rédacteur, un publieur) via le script de l'étape 5, avec des identifiants de test rangés dans `.env.local`.

**Terminé quand :** un rédacteur n'a pas accès au bouton « Publier », et un publieur si.

## Étape 5 — Migration du contenu existant

- [ ] Écrire `scripts/seed-cms.ts`, qui utilise la Local API de Payload :
  - lire `data/site.ts`, `data/sectors.ts` et `data/references.ts` ;
  - importer les images utilisées depuis `public/novadis/images` vers la médiathèque ;
  - remplir les collections et les globals, puis publier cette première version ;
  - créer les comptes de démo.
- [ ] Rendre le script relançable, c'est-à-dire capable de remettre la base à zéro. Ça servira à réinitialiser la démo.
- [ ] Ajouter le script npm `"cms:seed": "payload run scripts/seed-cms.ts"`.

**Terminé quand :** après `npm run cms:seed`, l'admin contient tout le contenu actuel du site.

## Étape 6 — Branchement des pages sur Payload

- [ ] Créer `lib/cms.ts` : récupérer le contenu avec `getPayload()` et des fonctions par page (`getAccueil()`, `getSolution(slug)`…).
- [ ] Remplacer, page par page, les imports de `data/` par ces fonctions. Les composants ne changent pas : on leur passe les mêmes données.
- [ ] Faire correspondre les icônes par une table `clé → composant lucide`.
- [ ] Brancher `generateStaticParams` pour les solutions et les secteurs sur Payload.
- [ ] Mode brouillon : une route `/api/preview` active `draftMode()`. Quand il est actif, les requêtes lisent les brouillons (`draft: true`).
- [ ] Ajouter un hook `afterChange` qui appelle `revalidatePath`, pour que la publication soit visible tout de suite sur le site.
- [ ] Une fois toutes les pages branchées, supprimer les données éditables de `data/` : Payload devient la seule source.

**Terminé quand :** les pages s'affichent à l'identique des captures de l'étape 0, avec le contenu venant de Payload.

## Étape 7 — Live preview

- [ ] Configurer `admin.livePreview` : une URL par collection ou global, avec les formats bureau, tablette et mobile.
- [ ] Ajouter côté site le composant `RefreshRouteOnSave`, chargé seulement en mode brouillon. Il rafraîchit la page à chaque enregistrement automatique.
- [ ] Vérifier que les animations (`<Reveal>`, Framer Motion) et les scènes 3D supportent les rafraîchissements répétés.

**Terminé quand :** quand on tape dans un champ de l'admin, la page à droite se met à jour en une à deux secondes.

## Étape 8 — Confort pour les commerciaux

- [ ] Interface d'admin en français, avec le logo Novadis et le titre « Novadis — Contenus ».
- [ ] Organiser la navigation de l'admin par groupes : « Pages », « Offre », « Éléments communs », « Médias ».
- [ ] Ajouter un bouton « Voir sur le site » sur chaque document.
- [ ] Rédiger une fiche d'une page « Comment modifier un texte », à remettre à l'équipe.

## Étape 9 — Recette

- [ ] `npm run build` passe sans erreur.
- [ ] Chaque page est identique à sa capture de l'étape 0.
- [ ] Un brouillon n'apparaît pas sur le site public, mais apparaît en preview.
- [ ] Un rédacteur ne peut pas publier.
- [ ] Remplacer une image fonctionne et le texte alternatif est demandé.
- [ ] La restauration d'une version précédente fonctionne.
- [ ] Un titre trop long est refusé avec un message clair.
- [ ] La page LiDAR, `/legal`, `/privacy` et les vidéos n'ont pas bougé.

## Étape 10 — Démo à l'équipe commerciale

Scénario de 10 minutes :
1. Connexion en **rédacteur**. On modifie le titre de l'accueil et on voit le changement en direct dans le live preview.
2. On remplace une image d'une solution.
3. On enregistre en brouillon, puis on montre que le site public n'a pas changé.
4. Connexion en **publieur** : relecture, publication, puis le site public est mis à jour.
5. On montre l'historique et le retour à la version précédente.
6. Remise à zéro avec `npm run cms:seed`.

---

## Après la démo — décisions pour la production

À trancher avec le directeur ou la DSI avant toute mise en ligne :
- base PostgreSQL et stockage des images chez un hébergeur français, ou sur un serveur Novadis ;
- plan Vercel Pro : le plan gratuit interdit l'usage commercial ;
- comptes nominatifs des commerciaux et politique de mot de passe.
