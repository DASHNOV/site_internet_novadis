# Recette manuelle — version éditable du site

À dérouler dans l'ordre, environ 25 minutes. Cochez chaque case quand le résultat attendu est bien celui décrit. Les identifiants des comptes de test sont dans `.env.local` : le compte **commercial** (`CMS_EDITOR_*`) pour le parcours des commerciaux, le compte **admin** (`CMS_ADMIN_*`) pour l'admin.

Conseil : gardez **deux navigateurs** ouverts, un normal pour modifier, et une **fenêtre privée** pour jouer le visiteur, qui n'est jamais connecté.

---

## 0. Préparation

- [ ] `npm run cms:seed` : la démo repart de zéro. Le script se termine sans erreur.
- [ ] Dans `.env.local`, mettez `CMS_PREFILL_ROLE=redacteur` (le compte commercial), puis lancez `npm run dev`.
- [ ] Ouvrez http://localhost:3000 dans la fenêtre privée : le site s'affiche normalement.

## 1. Connexion des commerciaux

- [ ] Ouvrez http://localhost:3000/connexion. Une carte « **Modifier le site** » s'affiche, avec le logo Novadis. Les champs sont préremplis avec le compte commercial.
- [ ] Saisissez un mauvais mot de passe : le message « Email ou mot de passe incorrect. » s'affiche.
- [ ] Remettez le bon mot de passe et connectez-vous : l'accueil s'ouvre directement en mode modification.
- [ ] La barre du bas affiche « **Modification du site** · Commercial », « Tout est en ligne », « Annuler » et « Publier » (tous deux grisés), puis « Quitter ». Il n'y a **ni lien « Admin » ni bascule « Modifier / Naviguer »**.
- [ ] Dans la fenêtre privée, ouvrez http://localhost:3000/edition?page=/services sans être connecté : vous arrivez sur `/connexion`. Après connexion, c'est la page Services qui s'ouvre.

## 2. Modifier un texte

Depuis `/services` en mode modification :

- [ ] Survolez le grand titre : il s'encadre en bleu, avec un bouton **« Modifier »** au-dessus.
- [ ] Cliquez sur le titre : un champ s'ouvre avec le **titre complet** (« Un modèle de delivery rigoureux… »), le libellé « Haut de page › Titre » et un compteur.
- [ ] Tapez quelques mots : la page change pendant la frappe, avec les premiers mots en noir et la suite en gris.
- [ ] Appuyez sur **Échap** : le titre d'origine revient, et rien n'est enregistré.
- [ ] Recommencez, tapez « Test recette Novadis », puis appuyez sur **Entrée**. Le message « Enregistré. Cliquez sur « Publier » pour le mettre en ligne. » s'affiche, puis la barre indique « **1 modification non publiée** ». « Annuler » et « Publier » deviennent actifs.
- [ ] **Fenêtre privée**, `/services` : le titre d'origine est toujours affiché, et la page se charge sans erreur.

## 3. Les liens

- [ ] Survolez un lien du menu (par exemple « Contact ») : le bouton « Modifier » apparaît au-dessus.
- [ ] Cliquez directement sur le lien : la page Contact s'ouvre, sans éditeur.
- [ ] Revenez en arrière, survolez de nouveau le lien et cliquez sur « Modifier » : l'éditeur s'ouvre sur le texte du lien. Appuyez sur Échap.

## 4. Les limites

- [ ] Ouvrez le titre et collez un texte de plus de 140 caractères, puis appuyez sur Entrée. L'enregistrement est refusé avec « Texte trop long : 140 caractères au maximum (… actuellement). »
- [ ] Videz complètement un texte et appuyez sur Entrée : l'enregistrement est refusé avec « Le texte ne peut pas être vide. »

## 5. Les listes

Depuis `/solutions/supervision` :

- [ ] Cliquez sur une ligne des capacités, modifiez-la et appuyez sur Entrée. Seule cette ligne change.

## 6. Remplacer une image

Toujours sur `/solutions/supervision` :

- [ ] Survolez la photo principale : le bouton « **Remplacer l'image** » apparaît.
- [ ] Choisissez un fichier sans remplir le texte alternatif : l'envoi est refusé.
- [ ] Recommencez avec un texte alternatif : « Image remplacée. Cliquez sur « Publier » pour la mettre en ligne. » s'affiche, et la nouvelle image est visible.
- [ ] La barre indique « **2 modifications non publiées** ».
- [ ] **Fenêtre privée** : l'ancienne image est toujours là.
- [ ] Sur l'accueil, survolez l'image d'une carte qui est un lien : « Remplacer l'image » apparaît, et un clic direct sur l'image suit le lien.

## 7. Annuler

- [ ] Cliquez sur « **Annuler** » et confirmez : le message « Modifications annulées. » s'affiche, puis « Tout est en ligne ».
- [ ] Le titre de `/services` et la photo de Supervision sont revenus à la version en ligne.

## 8. Publier

- [ ] Modifiez de nouveau le titre de `/services` (« Test recette Novadis »), puis appuyez sur Entrée.
- [ ] Cliquez sur « **Publier** » : le message « Publié : le site est à jour. » s'affiche, puis « Tout est en ligne ».
- [ ] **Fenêtre privée** : rechargez `/services`. Le nouveau titre est en ligne.
- [ ] Remettez le titre d'origine (« Un modèle de delivery rigoureux pour les environnements de sûreté complexes ») et publiez.
- [ ] Juste après une publication, modifiez un texte et publiez de nouveau sans attendre : le bouton « Publier » se réactive bien.

## 9. « Quitter » et session

- [ ] Cliquez sur « **Quitter** » : vous revenez au site public, sans barre.
- [ ] Rouvrez `/edition?page=/` : vous êtes encore connecté, et le mode modification revient directement.

## 10. L'admin (compte admin)

- [ ] Mettez `CMS_PREFILL_ROLE=admin`, redémarrez `npm run dev`, puis connectez-vous sur http://localhost:3000/admin. L'écran affiche le **logo Novadis** et « **Novadis — Contenus** », et l'onglet « Tableau de bord · Novadis — Contenus ».
- [ ] Le tableau de bord est rangé par groupes : « Offre », « Médias », « Pages », « Éléments communs », « Administration ».
- [ ] **Administration › Utilisateurs** : le champ « Rôle » propose « Commercial », « Responsable commercial » et « Administrateur ».
- [ ] Ouvrez **Offre › Solutions › Supervision globale** : le bouton **« Voir sur le site »** ouvre `/solutions/supervision` en mode modification, dans un nouvel onglet. La barre affiche alors aussi le lien « Admin ».
- [ ] « Voir sur le site » mène au bon endroit pour un secteur (page Secteurs, au bon secteur), une référence (`/references`), un enjeu (l'accueil), Pages › Services (`/services`) et Éléments communs (l'accueil). Une image de la médiathèque n'a **pas** de bouton.

## 11. Revenir à une version plus ancienne (admin)

- [ ] Dans l'admin, ouvrez Pages › Services, puis l'onglet **« Versions »**. Les publications successives sont listées.
- [ ] Ouvrez la version publiée avec « Test recette Novadis », puis restaurez-la. Le titre de test revient dans l'admin.
- [ ] **Fenêtre privée**, `/services` : le titre de test est revenu.
- [ ] Restaurez ensuite la version avec le titre d'origine, et vérifiez de nouveau la fenêtre privée.

> **À vérifier aussi sur un build de production**, car `npm run dev` ne met pas les pages en cache : `npm run build`, puis `npm start`, puis refaites les étapes 8 et 11 sur http://localhost:3000. Après une publication ou une restauration, la page publique doit changer sans relancer le serveur.

## 12. Ce qui ne doit pas avoir bougé

- [ ] `/legal` et `/privacy` s'affichent comme avant.
- [ ] Les vidéos (accueil, salle de supervision) se lancent.
- [ ] En dev, `/solutions/lidar-3d` s'affiche. Après `npm run build` et `npm start`, la même adresse renvoie une page 404.
- [ ] Hors mode modification, rien ne signale l'édition : pas de barre, pas de cadre au survol.

## 13. Remise à zéro

- [ ] `npm run cms:seed` : les textes et les images d'origine reviennent, et la médiathèque compte 17 images.
- [ ] Les sessions sont fermées par la remise à zéro : il faut se reconnecter.
- [ ] Remettez `CMS_PREFILL_ROLE` à la valeur que vous préférez pour la démo.
