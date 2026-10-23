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
- [x] Installer Payload **3.92.0 en version exacte** (tous les paquets `@payloadcms/*` doivent rester alignés) : `payload`, `@payloadcms/next`, `@payloadcms/db-sqlite`, `@payloadcms/richtext-lexical`, `@payloadcms/ui`, `@payloadcms/translations`, `graphql`. Aucun paquet de plus n'est prévu pour l'étape 7 : l'édition dans la page est développée pour le projet.
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

- [x] Les comptes ont un `nom` et un `rôle` (`redacteur`, `publieur` ou `admin`, enregistré dans le jeton de session). Seul un admin peut changer un rôle, créer ou supprimer un compte. Chacun peut lire et modifier son propre compte, et la rubrique « Utilisateurs » est masquée pour les autres rôles.
- [x] Les règles sont dans `access/index.ts` :
  - **Rédacteur** : il modifie et enregistre en brouillon. La règle `canEdit` refuse tout passage à l'état « publié ». L'admin interroge cette même règle pour afficher « Publier », donc le bouton disparaît, et la restauration d'une version publiée est refusée elle aussi.
  - **Publieur** (le responsable commercial) : il relit la preview, publie, et revient à une version précédente.
  - **Admin** : il a tous les droits. Lui seul ajoute ou retire une fiche de l'offre, qui reste fixe pour la démo.
  - **Visiteur** : il ne lit que la version publiée, collections comme globals, même s'il demande `?draft=true`.
  - **Médiathèque** : tout compte connecté ajoute ou remplace une image, et seuls publieurs et admins en suppriment.
- [x] Comptes de démo : `npm run cms:accounts` crée ou remet à jour un compte par rôle (`scripts/cms-accounts.ts`, avec la fonction réutilisable `scripts/lib/demo-accounts.ts`). Les identifiants de test sont rangés dans `.env.local` (`CMS_ADMIN_*`, `CMS_PUBLISHER_*`, `CMS_EDITOR_*`).
- [x] Sous `next dev`, `CMS_PREFILL_ROLE` (`admin`, `publieur` ou `redacteur`) choisit le compte prérempli sur `/admin/login`. Il faut redémarrer le serveur après l'avoir changé.

**Terminé quand :** un rédacteur n'a pas accès au bouton « Publier », et un publieur si.

✅ Vérifié le 23/10/2026 :
- **Par l'API, 22 vérifications réussies.** Le rédacteur enregistre un brouillon mais ne peut ni publier, ni restaurer une version publiée, ni créer de fiche ou de compte, ni changer son rôle. Le visiteur ne voit jamais le brouillon. Le publieur publie, puis revient à la version précédente, et le site public suit à chaque fois.
- **Dans l'admin**, le rédacteur n'a ni « Publier » ni « Utilisateurs », alors que le publieur a « Publier les modifications ».
- **Build** : `next build` passe, sans « lidar » ni identifiant de démo dans `.next/static`.

## Étape 5 — Migration du contenu existant

`npm run cms:seed` fonctionne en deux temps :
1. `scripts/seed/export-content.ts`, lancé par `tsx`, lit `data/` et écrit `cms/seed-content.json`, déjà rangé selon le modèle Payload. Il force un `NODE_ENV` autre que `development` : `data/site.ts` n'y ajoute donc pas les fiches locales, et seules les 7 solutions publiques sont migrées. La CLI Payload ne passe pas par `tsx`, parce que son chargeur swc ne lit pas les ancres JSON des films.
2. `scripts/cms-seed.ts`, lancé par `payload run`, remet le CMS à zéro (fiches, médiathèque et fichiers, historique des pages), envoie les images de `public/novadis/images` dans la médiathèque, publie tout, puis recrée les comptes de démo.

- [x] Toutes les fiches et toutes les pages sont publiées : 7 solutions, 6 secteurs, 3 références, 6 enjeux, 9 pages et blocs, 17 images.
- [x] Le script est relançable et sert aussi à réinitialiser la démo.
- [x] Les icônes sont enregistrées par leur nom lucide. `Fingerprint` est devenu `FingerprintPattern`, le nom officiel en lucide v1.

**Terminé quand :** après `npm run cms:seed`, l'admin contient tout le contenu actuel du site.

✅ Vérifié le 23/10/2026 :
- **Contenu** : relus en visiteur, donc en version publiée seulement, les **664 textes** de l'export se retrouvent tous à l'identique dans le CMS. Les relations (secteur et référence vers les solutions) et les images, avec leur texte alternatif, sont correctes. L'admin affiche les fiches au statut « Publié », avec une seule version.
- **Remise à zéro** : après un brouillon de rédacteur sur l'accueil et sur une solution, une nouvelle migration rétablit les textes d'origine, ramène l'historique à une version et laisse la médiathèque à 17 images, sans doublon.

## Étape 6 — Branchement des pages sur Payload

- [x] `lib/content/build.ts` (`buildSiteContent`) reconstruit, à partir des contenus Payload, **les mêmes objets que `data/`** : `solutions`, `navItems`, `badgeDoor`, `homePage`, etc. Les réglages techniques (coordonnées, films, modèles 3D) restent pris dans `data/site.ts`, et les composants n'ont pas changé de forme.
- [x] **Pages et composants serveur** : `getSiteContent()` (`lib/content/server.ts`). En dehors du mode édition, les règles d'accès d'un visiteur s'appliquent, donc seule la version publiée est lue. `generateStaticParams` et le sitemap lisent la version publiée (`getPublishedContent()`).
- [x] **Composants client** : le layout du site, et la 404 globale, transmettent les contenus à `<SiteContentProvider>`, lu avec `useSiteContent()`. Les icônes sont enregistrées par nom et retrouvées par `lib/icons.ts`.
- [x] **Images** : celles de l'offre (solutions, secteurs, références, sujets réglementaires) viennent de la médiathèque (`/api/media/file/…`). Les visuels fixes des pages (photos des hauts de page, logos, schémas) restent dans `public/`.
- [x] **Mode brouillon** : `/edition?page=/…` vérifie la session Payload, active `draftMode()` et redirige vers la page demandée. Sans session, il renvoie vers la connexion, et une adresse externe est neutralisée. `/edition/quitter` désactive le mode. Les brouillons ne sont lus que si le cookie de brouillon ET une session valide sont présents.
- [x] **Publication** : des hooks `afterChange` et `afterDelete` appellent `revalidatePath("/", "layout")`. Un simple brouillon n'invalide rien.
- [x] **Fiches locales** : sous `next dev`, les solutions que `data/site.ts` ajoute en local (absentes du CMS) restent affichées.
- [x] **`data/` est conservé** comme contenu de référence pour `npm run cms:seed`, mais les pages ne le lisent plus pour les textes.

**Terminé quand :** les pages s'affichent à l'identique des captures de l'étape 0, avec le contenu venant de Payload.

✅ Vérifié le 23/10/2026 :
- **Rendu** : 11 pages ont un texte strictement identique à la capture d'avant. Sur l'accueil, la page Solutions et la fiche Supervision, aucune ligne n'est ajoutée ou retirée, et seuls les repères d'animation varient. Pas d'erreur JavaScript, et les 17 images de la médiathèque se chargent.
- **Circuit brouillon/publication, en dev puis sur un build de production (`next start`)** : le brouillon d'un rédacteur n'apparaît que dans `/edition`, le visiteur garde la version publiée, et un cookie de brouillon sans session ne montre rien. Après publication, la page statique (`x-nextjs-cache: HIT`) est régénérée et le visiteur voit le nouveau texte.
- **Build** : `next build` passe, sans « lidar » dans `.next/static`. En dev, la page locale répond toujours.

À savoir : le build lit la base SQLite pour générer les pages statiques. En production, il faudra donc que la base soit accessible au moment du build.

## Étape 7 — Édition directe dans la page

Décidé le 23/10/2026 : les commerciaux modifient les textes **directement sur le site**, sans passer par les formulaires de l'admin. L'admin reste là pour publier, consulter l'historique et revenir en arrière. Payload ne propose pas cette édition, elle est donc développée pour le projet.

- [ ] **Mode édition** : quand un compte connecté ouvre le site en mode brouillon (`/edition`), les pages affichent les brouillons et une barre d'édition (compte connecté, statut, « Publier » pour les publieurs, lien vers l'admin et l'historique).
- [ ] **Textes repérables** : chaque texte venant de Payload porte son adresse dans le CMS (collection ou global, document, chemin du champ), par exemple `data-cms="global:home:hero.title.lead"`. Les composants restent ceux d'aujourd'hui, un petit composant d'enveloppe ajoute ce repère.
- [ ] **Édition sur place** : un clic sur un texte le rend modifiable (`contentEditable`, texte brut uniquement). La limite de longueur s'affiche en direct. On valide avec Entrée ou en quittant le champ, et Échap annule.
- [ ] **Enregistrement** : chaque modification est enregistrée en brouillon par l'API Payload (`PATCH ?draft=true`) avec les droits du compte. Un rédacteur ne peut donc toujours pas publier.
- [ ] **Images** : un clic sur une image propose de la remplacer. Le fichier est envoyé dans la médiathèque, et le texte alternatif est demandé.
- [ ] **Listes** : les lignes des listes (capacités, bénéfices…) se modifient sur place. Ajouter ou retirer une ligne passe, pour l'instant, par l'admin.
- [ ] **Animations** : `<Reveal>`, Framer Motion et les scènes 3D ne doivent pas gêner l'édition (révélations désactivées en mode édition, textes des scènes modifiables dans un panneau).
- [ ] **Hors mode édition**, le site public reste strictement identique, sans aucun script d'édition chargé.

**Terminé quand :** connecté en rédacteur, on clique sur le titre de l'accueil, on le retape, et le brouillon est enregistré. Le visiteur voit toujours l'ancien titre, et le publieur publie depuis la barre d'édition.

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
1. Connexion en **rédacteur**. On ouvre le site en mode édition, on clique sur le titre de l'accueil et on le retape directement dans la page.
2. On remplace une image d'une solution d'un clic sur l'image.
3. On enregistre en brouillon, puis on montre que le site public n'a pas changé.
4. Connexion en **publieur** : relecture, publication depuis la barre d'édition, puis le site public est mis à jour.
5. On montre l'historique et le retour à la version précédente.
6. Remise à zéro avec `npm run cms:seed`.

---

## Après la démo — décisions pour la production

À trancher avec le directeur ou la DSI avant toute mise en ligne :
- base PostgreSQL et stockage des images chez un hébergeur français, ou sur un serveur Novadis ;
- plan Vercel Pro : le plan gratuit interdit l'usage commercial ;
- comptes nominatifs des commerciaux et politique de mot de passe.
