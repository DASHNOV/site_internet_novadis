# Plan de lancement du site Novadis

Établi le 20/11/2026 à partir de la réunion du 18/11/2026 (refonte du site), mis à jour après la mise en ligne de l'étape 3. Les changements de texte sont déjà attribués (Victor, William, Alexis, Nico) et ne figurent pas ici.

Déjà en ligne sur https://site-internet-novadis.vercel.app :
- mention du groupe Sucheme dans À propos ;
- logos des 17 partenaires et emplacement masqué du futur partenaire ;
- logo SPAC ;
- nouveau visuel de la page Solutions (pièce avec poste d'hypervision, porte à badge, caméra, baie serveur) ;
- formulaire de contact prêt, mais désactivé ;
- corrections mobiles et mode léger pour les réseaux lents.

La page LiDAR des bureaux actuels n'est pas publiée.

## Étape 1 : débloquer l'équipe (cette semaine)

- [ ] 1. Créer les comptes rédacteurs de Victor, William, Alexis et Nico sur le site de test.
- [ ] 2. Envoyer le mail récapitulatif avec les liens, les accès et un mini-manuel du back-office : se connecter, modifier, enregistrer en brouillon, publier.

## Étape 2 : obtenir les décisions, en un seul mail à la direction

- [ ] 3. La date de création à afficher, 1993 ou 2005-2006. Elle détermine les compteurs et l'historique.
- [ ] 4. L'effectif officiel (21, 22, 23 ou 24 selon les sources) et les grandes dates de l'historique.
- [ ] 5. L'ordre voulu des solutions.
- [ ] 6. La date et l'heure du dévoilement du partenaire de janvier.
- [ ] 7. L'accord de HID pour son logo et un fichier officiel Nx Witness. Sinon, on retire ces deux logos.
- [ ] 8. La photo de l'équipe au showroom : qui, quand.
- [ ] 9. L'hébergement définitif, la maintenance et l'intérêt d'une version anglaise.
- [ ] 10. La validation des nouveaux textes : visuel Solutions (« Un site, une seule supervision »…), formulaire de contact, section partenaires.
- [ ] 10 bis. Les interlocuteurs commerciaux de la page Contact : qui apparaît (Nicolas Jdanoff, Laurent Lopez, Alexandre Lopez, Jérémy Creusvaux, à confirmer), la répartition affichée (par secteur ou par région), l'accord écrit de chacun pour sa photo et son nom, le téléphone publié ou non, et la date de la séance photo au showroom (à faire avec la photo d'équipe du point 8).

## Étape 3 : petites corrections relevées pendant les développements

- [ ] 11. Mettre à jour les légendes du visuel Solutions dans le CMS : passer de 2 à 4 légendes, renommer les champs, ressaisir les textes, puis retirer la rustine qui ignore les anciens textes caméra.
- [ ] 12. Recompresser les images du CMS (1,8 Mo sur l'accueil).
- [ ] 13. Fermer le menu mobile avec Échap et bloquer le défilement derrière.
- [ ] 14. Supprimer l'image en double sur `/secteurs`.
- [ ] 15. Logo SPAC : le nom apparaît deux fois (texte et logo), retirer le texte si la direction le préfère.

## Étape 4 : développements qui dépendent de l'étape 2

- [ ] 16. Mettre en place les compteurs automatiques à partir de la date de création.
- [ ] 17. Ajouter l'historique, l'effectif et la photo d'équipe dans À propos.
- [ ] 18. Changer l'ordre des solutions.
- [ ] 19. Activer le compte à rebours avec la date fournie.
- [ ] 20. Remplacer certains visuels génériques par des captures réelles (hypervision, Amadeus au showroom), si la direction les valide.
- [ ] 20 bis. Présenter les interlocuteurs commerciaux sur la page Contact (environ une journée une fois le point 10 bis réglé) :
  - section « Vos interlocuteurs » entre les coordonnées générales et le formulaire, 3 ou 4 fiches au plus ;
  - fiche : photo, nom, fonction, secteurs ou régions suivis, LinkedIn, téléphone pro si accepté, bouton « Contacter » ;
  - aucun email en clair : le bouton ouvre le formulaire avec le commercial présélectionné, et le serveur envoie à son adresse (moins de spam et d'hameçonnage ciblé). Tant que le formulaire n'est pas activé, le bouton renvoie vers com@novadis.eu ;
  - fiches gérées dans le CMS (liste « Interlocuteurs » avec une case « visible » et un ordre d'affichage), pour ajouter ou retirer quelqu'un sans développeur ;
  - photos issues d'une même séance au showroom (même fond, même lumière, même cadrage).

## Étape 5 : préparer le lancement

- [ ] 21. Valider les textes rédigés par l'équipe dans le back-office.
- [ ] 22. Faire une recette complète : toutes les pages, mobile et ordinateur, formulaire, mentions légales.
- [ ] 23. Passer sur l'hébergement définitif. Le site tourne aujourd'hui sur un compte Vercel gratuit, réservé à un usage non commercial.
- [ ] 24. Activer le formulaire de contact :
  - installer `@payloadcms/email-nodemailer` et le brancher dans `payload.config.ts` ;
  - renseigner les accès SMTP de la boîte OVH expéditrice dans Vercel ;
  - publier SPF, DKIM et DMARC pour novadis.eu ;
  - passer `CONTACT_FORM_ENABLED=true` ;
  - prévoir un anti-robot ;
  - ajouter le traitement des données du formulaire à `/privacy`.
- [ ] 25. Rediriger les anciennes adresses du site WordPress vers les nouvelles pages, pour ne pas perdre le référencement.
- [ ] 26. Brancher novadis.eu sur le nouveau site avec Arthur, dans la configuration DNS chez OVH, sans toucher à la messagerie.
- [ ] 27. Fixer la date de lancement et vérifier le site en ligne sur novadis.eu.

Les points 23 et 25 n'ont pas été cités en réunion, mais ils conditionnent le lancement.

## Étape 6 : après le lancement

- [ ] 28. Communiquer sur LinkedIn.
- [ ] 29. Mettre en place la maintenance.
- [ ] 30. Après le déménagement, prévoir un nouveau contenu pour la page LiDAR, sans les locaux actuels.
- [ ] 31. Lancer la version anglaise si elle est retenue.
