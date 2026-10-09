# DESIGN.md — Décisions design & système visuel

Style **Corporate Trust** appliqué à la charte Novadis : l'esthétique SaaS enterprise (ombres colorées, dégradés, profondeur isométrique, cartes surélevées) avec les bleus et gris Novadis à la place de l'indigo/violet d'origine.

## Principes directeurs

- **Fiable et vivant** — structure nette et typographie affirmée, énergie apportée par les dégradés bleus
- **Profondeur maîtrisée** — ombres teintées de bleu, perspectives isométriques légères, halos flous en arrière-plan
- **Clair d'abord** — le site est en mode clair ; une section « nuit » ponctue la page (méthode, CTA final, scènes 3D)
- **Lisibilité avant tout** — contrastes AA, hiérarchie claire, chaque animation a un sens

---

## Thème

- **Mode clair uniquement.** Pas de bascule dark/light pour l'instant.
- Sections sombres via la classe `.section-dark` (dégradé bleu nuit), qui réadapte automatiquement les couleurs de texte, `.eyebrow` et `.text-gradient`.
- **Ne pas utiliser les classes `dark:` de Tailwind** — tout passe par les variables CSS.

### Variables CSS (`app/globals.css`)

Valeurs RGB séparées par des espaces, utilisables en `rgb(var(--x))` ou `rgb(var(--x) / 0.5)`.

| Variable | Valeur | Rôle |
|---|---|---|
| `--background` | `#F8FAFC` | Fond de page froid |
| `--background-soft` | `#EEF5FB` | Sections alternées (`.section-soft`) |
| `--surface` | `#FFFFFF` | Cartes, champs, header |
| `--background-dark` | `#0B1220` | Nuit (scènes 3D) |
| `--night` | `#062B44` | Bleu nuit dérivé de `#0570A4` |
| `--foreground` | `#363535` | Texte courant (gris foncé charte) |
| `--foreground-strong` | `#1E1D1D` | Titres, emphase |
| `--muted-strong` | `#646464` | Texte secondaire (AA) |
| `--muted` | `#9B9B9B` | Gris Novadis — décoratif uniquement |
| `--hairline` / `--hairline-strong` | `#E2E8F0` / `#CBD5E1` | Bordures |
| `--primary` | `#1291CE` | Bleu profond Novadis — couleur d'action |
| `--primary-strong` | `#0570A4` | Texte bleu sur fond clair |
| `--primary-deep` | `#044E73` | Variante très foncée |
| `--accent` | `#36A4D9` | Bleu vif Novadis |
| `--glow` | `#81CFF5` | Bleu marque (point du logo), halos |
| `--success` | `#10B981` | Indicateurs positifs uniquement |

Exposées dans Tailwind via `@theme inline` : `bg-surface`, `text-primary-strong`, `border-hairline`, `bg-night`, `text-glow`, `text-success`…

### Dégradés

| Variable / utilitaire | Usage |
|---|---|
| `--gradient-brand` → `bg-brand-gradient` | Boutons primaires, badges numérotés, icônes pleines |
| `--gradient-text` → `text-gradient` | Fin des titres (signature) |
| `--gradient-night` → `bg-night-gradient` / `.section-dark` | Sections sombres, CTA final |

### Ombres (teintées de bleu)

| Utilitaire | Usage |
|---|---|
| `shadow-soft` | Élévation par défaut des cartes |
| `shadow-lift` | Survol des cartes, panneaux mis en avant |
| `shadow-cta` / `shadow-cta-hover` | Bouton primaire |
| `shadow-glow` | Badges numérotés, icônes pleines |
| `shadow-float` | Visuels inclinés, cartes flottantes |

---

## Typographie

| Rôle | Famille | Poids |
|---|---|---|
| Display / Titres (`--font-display`) | **Plus Jakarta Sans** | 500 → 800 |
| Corps / Interface (`--font-sans`) | **Roboto** (charte) | 300 → 700 |
| Code / Mono (`--font-mono`) | **JetBrains Mono** | 400, 500 — réservé aux scènes 3D et schémas techniques |

- Titres : `line-height: 1.1`, `letter-spacing: -0.02em`. ExtraBold (800) pour les h1, Bold (700) pour les sections.
- Échelle : h1 `text-4xl → lg:text-6xl`, h2 de section `text-3xl → lg:text-5xl`.
- Corps : `line-height` 1.65, paragraphes limités à `max-w-xl` / `max-w-2xl`.

### Classes typographiques

```css
.section-title  /* Titre display, interligne serré */
.eyebrow        /* Pastille d'en-tête de section : point lumineux + libellé majuscule */
.kicker         /* Petit libellé majuscule gris (colonnes, sous-blocs) */
.lede           /* Paragraphe d'introduction */
.text-gradient  /* Texte en dégradé bleu (utilitaire Tailwind) */
.link-underline /* Lien avec soulignement animé */
```

### Titres en deux tons

Signature du style : les premiers mots en gris foncé, la suite en dégradé.

- `<SectionHeading>` et `<PageHero>` l'appliquent automatiquement quand `title` est une chaîne (3 premiers mots en gris).
- Ailleurs : `<SplitTitle text="…" lead={3} />`, ou un `<span className="text-gradient">` placé à la main quand la coupure doit tomber sur un groupe de sens.

---

## Espacement & mise en page

| Classe | Rôle |
|---|---|
| `.shell` / `.shell-wide` | Conteneur 1280px, gouttières 16px (mobile) / 24px (≥ sm) |
| `.shell-narrow` | Conteneur 960px |
| `.section-y` | Rythme vertical 64 → 80 → 96px |
| `.section-soft` | Fond bleu très clair fondu en haut et en bas |
| `.section-dark` | Section nuit |

- Grilles : hero en `lg:grid-cols-2`, contenus alternés en zig-zag (`lg:flex-row` / `lg:flex-row-reverse`), métriques en 4 colonnes.
- Mobile-first, cibles tactiles ≥ 44px, jamais de scroll horizontal.

---

## Composants

### Primitives (`components/ui/`)

| Composant | Rôle |
|---|---|
| `Button` | Variantes CVA (voir ci-dessous), `rounded-full`, soulèvement au survol |
| `Card` | Carte blanche `rounded-xl` + `shadow-soft` ; `interactive` = soulèvement + `shadow-lift` ; `tone="glass"` pour fond sombre |
| `IconBadge` | Pastille d'icône `rounded-xl` — `tone` soft / solid / glass, `size` sm / md / lg |
| `NumberBadge` | Numéro « 01 » en pastille dégradée lumineuse |
| `CheckList` | Liste à icônes de validation, 1 ou 2 colonnes, ton primary / success |
| `Badge` | Pastille de texte — default / primary / outline / success |
| `Blobs` | Halos flous d'arrière-plan — `hero` / `section` / `night` (le parent doit être `relative isolate`) |
| `SplitTitle` | Titre en deux tons |

### Sections (`components/sections/`)

| Composant | Rôle |
|---|---|
| `PageHero` | Hero des pages internes : 2 colonnes, halos, titre en deux tons |
| `SectionHeading` | En-tête de section (eyebrow, titre, description, actions) |
| `MediaStage` | Cadre blanc incliné en perspective (`tilt` left / right / none), se redresse au survol, à plat sur mobile |
| `MediaFrame` | Image ou vidéo avec légende |
| `HeroConsole` | Visuel isométrique « console de supervision » du hero d'accueil (libellés dans `heroConsole`, `data/site.ts`) |
| `ReferenceCard` | Carte de référence client, avec tags de solutions optionnels |
| `StatRow` | Métriques clés en carte, chiffres en dégradé |
| `PartnerCloud` | Ticker des partenaires + normes et associations |
| `SectorsRail` | Carrousel horizontal des secteurs |
| `CtaBanner` | Carte bleu nuit de fin de page avec contacts |

### Boutons

Variantes de `components/ui/button.tsx` :

| Variante | Usage |
|---|---|
| `primary` | CTA principal — dégradé bleu, ombre colorée |
| `outline` | Action secondaire sur fond clair — blanc bordé |
| `inverse` | CTA principal sur fond sombre — blanc, texte bleu |
| `glass` | Action secondaire sur fond sombre — translucide |
| `subtle` | Action tertiaire — fond bleu très léger |
| `default` | Action neutre foncée |
| `ghost` | Navigation, action discrète |

Tailles : `sm`, `default` (44px), `lg`, `icon` (44px).

### Champs de formulaire

Fond blanc, `border-hairline`, `rounded-lg`, hauteur ≥ 44px ; focus `border-primary` + `ring-2 ring-primary/60`. Libellés en `text-sm font-semibold text-foreground-strong`.

---

## Profondeur & animations

| Élément | Effet | Durée |
|---|---|---|
| `<Reveal>` | Fade + translateY au scroll | 0.65s |
| Cartes `interactive` | `-translate-y-1` + `shadow-lift` | 200ms ease-out |
| Boutons | `-translate-y-0.5` + ombre renforcée | 200ms ease-out |
| Flèches `.cta-arrow` | `translateX(4px)` au survol du parent | 200ms |
| Images de cartes | `scale-105` au survol | 500ms |
| `.iso-stage` / `.iso-card` | Carte isométrique `rotateX(5deg) rotateY(-12deg)`, se redresse au survol | 500ms |
| `MediaStage` | `rotate-y-±6` alterné, se redresse au survol | 500ms |
| `animate-float` | Flottement des cartes du hero | 6s loop |
| `animate-breathe` | Respiration des halos | 4s loop |
| `<PartnerCloud>` | Ticker infini | 38s loop |

- Les inclinaisons 3D sont désactivées sous 1024px.
- `prefers-reduced-motion` : `<Reveal>`, ticker, flottement, respiration et transitions isométriques sont coupés.

---

## Iconographie

- **Bibliothèque :** lucide-react, trait 2px
- **Tailles :** `h-4 w-4` en ligne, `h-5 w-5` / `h-6 w-6` dans les `IconBadge`
- **Couleur :** `text-primary` / `text-primary-strong` sur pastille `bg-primary/10` ; `text-success` pour les validations
- Icônes décoratives en `aria-hidden` quand un texte les accompagne

---

## Images & médias

- **Formats :** `.avif` / `.webp` en priorité, `.jpg` pour compatibilité
- **Wrapper :** `<MediaFrame>` pour les visuels de contenu, dans un `<MediaStage>` pour les mettre en avant
- **Dossier :** `/public/novadis/`
- **Logos :** `logo-light-wide.svg` (fond clair, recadré — header et footer) via `mediaLibrary.logo` ; `logo-dark.svg` (fond sombre) via `mediaLibrary.logoDark`

---

## Accessibilité

- Texte coloré sur fond clair en `primary-strong` (`#0570A4`), jamais en `accent` ou `glow`.
- `--muted` (`#9B9B9B`) réservé aux éléments décoratifs : utiliser `muted-strong` pour du texte.
- Focus visible partout (`outline` / `ring` bleu, offset 2px).
- Hiérarchie de titres respectée (h1 → h2 → h3), listes sémantiques (`ul` / `ol` > `li`).

---

## À ne pas faire

- Ne pas mélanger les familles de polices hors du système défini
- Ne pas utiliser de couleurs en dur (hex/rgb) — passer par les variables et utilitaires
- Ne pas utiliser d'ombres grises neutres — toujours les ombres teintées du système
- Ne pas mettre de texte en `text-accent` / `text-glow` sur fond clair (contraste insuffisant)
- Ne pas utiliser plus de 2 variantes de bouton sur un même bloc
- Ne pas multiplier les sections sombres — une section nuit par page en plus du CTA final
