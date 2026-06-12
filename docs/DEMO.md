# DEMO.md — Périmètre de la démo directeur

## Objectif de la démo

Présenter au directeur une version représentative du site Novadis pour validation de la direction visuelle, du contenu, et des fonctionnalités prévues — avant développement complet.

---

## Ce qui est PRÊT pour la démo

| Page | Statut | Notes |
|---|---|---|
| Homepage `/` | ✅ Prête | Hero, métriques, solutions, industries, méthodologie |
| Solutions `/solutions` | ✅ Prête | Grille des 6 solutions |
| Solution détail `/solutions/[slug]` | ✅ Prête | Les 6 pages de détail |
| À propos `/about` | ✅ Prête | Philosophie, approche, partenaires |
| Méthodologie `/methodology` | ✅ Prête | Les 4 étapes |
| Industries `/industries` | ⚠️ Partielle | 4 secteurs affichés sur 6 disponibles |
| Contact `/contact` | ⚠️ Factice | Formulaire affiché mais non fonctionnel |
| Mentions légales `/legal` | ❌ Placeholder | Page vide — ne pas afficher |
| Confidentialité `/privacy` | ❌ Placeholder | Page vide — ne pas afficher |

---

## Ce qui est SIMULÉ (ne pas présenter comme réel)

- **Formulaire de contact** : s'affiche normalement mais ne soumet rien
- **Liens réseaux sociaux** : absents (pas de compte LinkedIn configuré)
- **Bannière cookie** : absente pour la démo
- **Vidéos** : hébergées temporairement sur l'ancien serveur WordPress

---

## Scénario de présentation recommandé

### Ordre de navigation suggéré

1. **Homepage** — impact visuel immédiat, métriques clés, ton général
2. **Une solution en détail** — ex: `/solutions/access-control` (Amadeus, bien développée)
3. **Industries** — montrer la couverture sectorielle
4. **Méthodologie** — rassurer sur le process
5. **À propos** — crédibilité, partenaires
6. **Contact** — montrer le formulaire (sans soumettre)

### Ce sur quoi le directeur devrait se prononcer

- [ ] Direction visuelle globale (dark/light, couleurs, typographie)
- [ ] Pertinence et exactitude du contenu textuel
- [ ] Priorité des sections (ce qui doit être plus visible)
- [ ] Pages manquantes à ajouter avant le lancement
- [ ] Fonctionnalités prioritaires (formulaire, analytics, cookie, blog...)

---

## Environnement de présentation

- **Support :** Laptop ou projecteur
- **Résolution cible :** 1440px de large (desktop)
- **Thème à utiliser :** Dark (mode par défaut, le plus impactant visuellement)
- **Navigateur :** Chrome ou Safari

> Si présentation sur projecteur : vérifier le contraste en light mode également.

---

## Ce qu'il NE FAUT PAS modifier avant la démo

- Le contenu des pages principales (textes, métriques)
- Le design système (couleurs, typo, espacements)
- La structure de navigation

## Ce qui PEUT être amélioré avant la démo

- Afficher les 6 secteurs dans `/industries` (données déjà dans le code)
- Corriger les éventuels bugs d'affichage mobile
- Optimiser les images lentes à charger

---

## Après la démo — fichier `FEEDBACK.md`

Consigner les retours du directeur dans `FEEDBACK.md` immédiatement après la réunion.
