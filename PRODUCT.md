# PRODUCT.md — Brief de refonte design

> Brief issu de la phase 0 de `PROMPT-REFONTE-DESIGN.md` (16/10/2026). Le brief produit complet reste dans `docs/BRIEF.md`.

## Projet

Site vitrine B2B de **Novadis**, intégrateur de solutions globales de sûreté (Levallois-Perret, groupe Sucheme). Stack : Next.js 16 (App Router), React 19, TypeScript, Tailwind v4 avec des variables CSS, Framer Motion et React Three Fiber.

- **Cible :** décideurs sécurité (DSI, RSSI, directeurs sécurité) de grands comptes et d'ETI, dans le tertiaire, l'industrie, la banque, le transport, la santé et le luxe.
- **Objectif du site :** générer des prises de contact qualifiées. Le prospect doit comprendre en 30 secondes que Novadis est sérieux.
- **Ton :** expert, sobre, rassurant, direct, humain (voir `docs/BRIEF.md`).

## Objectif de la refonte

**Faire évoluer l'existant, sans rupture.** On garde la direction « Corporate Trust », la charte (logo, bleus Novadis, Roboto) et le contenu. On corrige la hiérarchie, les espacements, la typographie et la cohérence entre les pages, et on retire ce qui fait « template ».

## Registre visuel

**Mixte :** clair par défaut, avec des sections nuit plus affirmées (ambiance salle de supervision) pour porter les scènes 3D, les films et les temps forts.

## Références

- **STid** (stid-security.com) : secteur sûreté, registre premium (captures déjà à la racine du projet).
- **Axis / Genetec** : constructeurs sécurité, registre produit et tech.
- **Stripe / Linear** : soin de la typographie, du rythme et des animations.

## Périmètre

- **Toutes les pages**, sauf `/legal` et `/privacy` (placeholders volontaires).
- Composants partagés : en-tête, pied de page, boutons, cartes, formulaires.

## À conserver impérativement

- La charte Novadis (logo, couleurs, Roboto) et le contenu texte. Tout changement de texte passe par une validation dans `docs/CONTENT.md`.
- Les scènes 3D et les films existants, ainsi que les vidéos de `public/novadis/videos/`.
- Le formulaire de contact tel quel (non fonctionnel, affiché pour la démo).
- La logique : les données restent dans `data/`, les composants restent serveur par défaut.

## 3D et animations

**Ajouter de la 3D** en phase 6 ; le sujet sera décidé après la direction artistique.

## Contraintes

Aucune contrainte particulière (pas d'échéance fixe, pas d'exigence spécifique). Accessibilité AA et responsive (375 / 768 / 1440 px) restent obligatoires.

## Outils

Impeccable sera installé avant la phase 1. Les skills Taste, Playwright (CLI et MCP), img2threejs, le MCP Blender et le MCP GitHub sont disponibles.
