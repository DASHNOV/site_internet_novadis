# CLAUDE.md — Instructions projet Novadis

## Contexte projet

Site vitrine B2B pour **Novadis**, intégrateur de solutions globales de sûreté basé à Levallois-Perret. Le site cible des décideurs (DSI, RSSI, directeurs sécurité) dans des secteurs exigeants : banking, transport, santé, industrie, luxe, tertiaire.

Phase actuelle : **site de démo** à présenter au directeur. Voir `DEMO.md` pour le périmètre exact.

---

## Stack technique

- **Framework :** Next.js 14 (App Router), React 18, TypeScript strict
- **Styles :** Tailwind CSS v4 via PostCSS, CSS custom properties pour le theming
- **Animations :** Framer Motion 12 (`<Reveal>`, `<HeroGraph>`, `<SolutionsScroll>`)
- **Icônes :** lucide-react
- **Composants UI :** CVA (class-variance-authority) + tailwind-merge

## Organisation des fichiers

```
app/              Pages (Next.js App Router)
components/       Composants réutilisables
data/
  site.ts         Source principale : solutions, industries, métriques, partenaires
  sectors.ts      6 secteurs détaillés (tertiaire, industrie, banking, transport, santé, luxe)
  solutions-extended.ts  Détail complet des 6 solutions
public/novadis/   Assets statiques (images, vidéos)
```

## Conventions à respecter

- **Composants serveur par défaut.** `"use client"` uniquement si nécessaire (hooks, events, animations Framer Motion).
- **Données dans `data/`.** Ne jamais hardcoder du contenu dans les composants — passer par `site.ts`, `sectors.ts` ou `solutions-extended.ts`.
- **Pas de commentaires inutiles.** Seulement si le WHY n'est pas évident.
- **Tailwind en priorité.** Pas de CSS inline sauf exception justifiée.
- **Toujours tester dark ET light** après une modification de styles.

## Composants clés

| Composant | Rôle |
|---|---|
| `<Reveal>` | Wrapper animation scroll (fade-in). Respecte `prefers-reduced-motion`. |
| `<PageHero>` | Hero template pour pages internes (eyebrow, titre, description, CTA) |
| `<SectionHeading>` | En-tête de section réutilisable |
| `<MediaFrame>` | Wrapper image/vidéo avec caption et overlay |
| `<CtaBanner>` | Bloc CTA bas de page |
| `<StatRow>` | Affichage des métriques clés |
| `<PartnerCloud>` | Ticker animé des partenaires |

## Thème dark/light

- Attribut sur `<html>` : `data-theme="dark"` ou `data-theme="light"`
- Persisté en `localStorage`
- Script inline dans `layout.tsx` pour éviter le flash au chargement
- Ne pas utiliser `dark:` Tailwind — utiliser les CSS variables du design system

## Chemins importants

- Logique des solutions : `data/solutions-extended.ts` → `app/solutions/[slug]/page.tsx`
- Métriques : `data/site.ts` → `components/stat-row.tsx`
- Navigation : `components/site-header.tsx` + `components/site-footer.tsx`
- Sitemap : `app/sitemap.ts` (URL base : `NEXT_PUBLIC_SITE_URL` ou `https://novadis.eu`)

## Ce qu'il ne faut pas toucher (démo)

- `/legal` et `/privacy` : placeholders volontaires pour l'instant
- Les videos : hébergées sur `novadis.eu/wp-content/uploads/` — lien temporaire à ne pas modifier
- Le formulaire de contact : non fonctionnel, affiché uniquement pour la démo

## Ce que je dois éviter

- Ajouter des features non demandées
- Modifier du contenu texte sans validation dans `CONTENT.md`
- Introduire de nouveaux packages sans bonne raison
- Créer des fichiers `.md` ou de documentation sauf si demandé
