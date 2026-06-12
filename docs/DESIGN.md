# DESIGN.md — Décisions design & système visuel

## Principes directeurs

- **Sobre et expert** — pas d'effets tape-à-l'œil, chaque animation a un sens
- **Dark-first** — le mode dark est le défaut, le plus impactant visuellement
- **B2B premium** — niveau de finition comparable aux SaaS tech haut de gamme
- **Lisibilité avant tout** — la hiérarchie de l'information prime sur la décoration

---

## Thème

### Système de thèmes
- Attribut HTML : `data-theme="dark"` | `data-theme="light"`
- Géré via `localStorage` + script inline dans `layout.tsx` (évite le flash)
- **Ne pas utiliser les classes `dark:` de Tailwind** — tout passe par les CSS variables

### Variables CSS principales

```css
/* Fond */
--background          /* Fond principal de page */
--background-elevated /* Fond légèrement relevé (cards, sections) */
--surface             /* Surface de composants (inputs, panels) */

/* Texte */
--foreground          /* Texte principal */
--foreground-strong   /* Titres, emphase */
--muted               /* Texte secondaire */
--muted-strong        /* Texte tertiaire */

/* Primaire (bleu) */
--primary             /* Couleur d'action principale */
--primary-strong      /* Variante plus intense */
--primary-deep        /* Variante profonde */

/* Effets */
--accent              /* Accent visuel (glow, highlights) */
--glow                /* Halo lumineux (hero graph, CTA) */
--hairline            /* Bordures fines avec opacité */
```

---

## Typographie

| Rôle | Famille | Poids |
|---|---|---|
| Display / Titres | **Manrope** | 500, 600, 700, 800 |
| Corps / Interface | **Inter** | 400, 500 |
| Code / Mono | **JetBrains Mono** | 400, 500 |

### Classes typographiques custom

```css
.eyebrow        /* Label de section : petite, avec décoration en ligne */
.section-title  /* Grand titre de section, line-height serré */
.gradient-text  /* Texte avec dégradé de couleur */
.link-underline /* Lien avec soulignement animé au hover */
```

---

## Espacement & Mise en page

### Largeurs de shell
```css
--shell         /* 1240px — largeur standard */
--shell-wide    /* 1380px — sections pleine largeur */
--shell-narrow  /* 960px — contenu resserré (texte, formulaires) */
```

### Grille de fond
- Pattern SVG fixe en fond de page (subtle, non intrusif)
- Dégradé radial en superposition pour la profondeur

---

## Composants visuels

### Panels / Cards
```css
.panel        /* Border hairline + shadow légère + bg avec opacité */
.panel-strong /* Variante plus marquée pour les éléments importants */
```

### Animations

| Composant | Animation | Durée |
|---|---|---|
| `<Reveal>` | Fade + translateY au scroll | 0.75s |
| `<HeroGraph>` | Nœuds SVG + lignes animées | Loop infini |
| `<SolutionsScroll>` | Carousel horizontal drag | Fluide |
| `<PartnerCloud>` | Ticker infini | Loop CSS |
| Hover images | Scale 1.05 | 700ms ease |

> Toutes les animations respectent `prefers-reduced-motion` via `useReducedMotion()` Framer Motion.

---

## Iconographie

- **Bibliothèque :** lucide-react
- **Style :** Stroke, pas fill — cohérent avec le design sobre
- **Taille standard :** 20px (interface), 24px (sections)
- **Couleur :** Hériter du contexte (`currentColor`)

---

## Images & Médias

- **Formats :** `.avif` en priorité (meilleures perfs), `.jpg` pour compatibilité
- **Wrapper :** Toujours utiliser `<MediaFrame>` pour les visuels de contenu
- **Dossier :** `/public/novadis/`
- **Logos :** `logo-dark.png` + `logo-light.png` (choix automatique selon thème)

---

## Boutons

Variantes disponibles via CVA dans `components/ui/button.tsx` :

| Variante | Usage |
|---|---|
| `default` | Action neutre |
| `primary` | CTA principal (bleu) |
| `outline` | Action secondaire |
| `subtle` | Action tertiaire, contexte clair |
| `ghost` | Navigation, action discrète |

Tailles : `sm`, `default`, `lg`, `icon`

---

## À ne pas faire

- Ne pas mélanger les familles de polices hors du système défini
- Ne pas utiliser de couleurs en dur (hex/rgb) — toujours passer par les CSS variables
- Ne pas ajouter d'animations lourdes ou d'effets parallax complexes
- Ne pas utiliser plus de 2 variantes de bouton sur un même écran
- Ne pas surcharger les pages avec trop de sections — chaque section doit avoir un objectif clair
