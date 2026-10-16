# DESIGN.md — Système visuel Novadis

> **Statut : cible de la refonte** (branche `refonte-design`, phase 3 du 16/10/2026). Ce document décrit le système vers lequel on migre ; il sera recalé sur le code construit en phase 7. L'ancien système « Corporate Trust » est dans l'historique Git (`docs/DESIGN.md`).

Direction **« Preuve claire, démonstration nuit »** : les sections claires sont plates et sobres, et portent la preuve (références, chiffres, normes). Les sections nuit sont une console de supervision et portent la démonstration (films, scènes 3D, architecture). Le contraste entre les deux donne le rythme de la page.

Inspirations (principes, pas copie) : la rigueur plate de Carbon/IBM et d'Axis pour le clair, la console à panneaux filetés de Linear et la salle de supervision de Genetec pour la nuit. Références : `VoltAgent/awesome-design-md` (MIT).

## Réglages Taste (validés le 16/10/2026)

Variance **5** · animations **5** · densité **5** (clair aéré, console dense).

## Principes

1. **Prouver, pas décorer.** Chaque élément visuel montre le métier (un site, un flux, un statut, un équipement). Aucun halo, aucune inclinaison, aucune ombre d'ambiance.
2. **Deux mondes, une grammaire.** Mêmes filets, mêmes rayons, même typographie en clair et en nuit ; seule la polarité change.
3. **Une couleur d'action.** Le bleu Novadis marque l'action, le focus et les liens. Il n'est jamais un fond décoratif en section claire.
4. **Lisible d'abord.** AA partout, texte ≥ 12 px, hiérarchie par la taille et la graisse plutôt que par la couleur.

## Thème

- Clair par défaut, pas de mode sombre utilisateur.
- Une section nuit = `.section-dark`. Au plus deux par page en plus du CTA final, réservées à la démonstration.
- Pas de classes `dark:` de Tailwind : tout passe par les variables CSS de `app/globals.css`.

## Couleurs

Valeurs RGB séparées par des espaces, utilisées en `rgb(var(--x))`.

### Clair

| Variable | Valeur | Rôle |
|---|---|---|
| `--background` | `#F8FAFC` | Fond de page |
| `--background-soft` | `#EEF5FB` | Bande alternée, **à plat** (plus de fondu) |
| `--surface` | `#FFFFFF` | Tuiles, champs, en-tête |
| `--foreground-strong` | `#1E1D1D` | Titres, chiffres |
| `--foreground` | `#363535` | Texte courant |
| `--muted-strong` | `#646464` | Texte secondaire, second ton des titres (5,9:1 sur blanc) |
| `--muted` | `#9B9B9B` | Décoratif uniquement |
| `--hairline` / `--hairline-strong` | `#E2E8F0` / `#CBD5E1` | Filets, bordures de tuiles |
| `--primary-strong` | `#0570A4` | **Couleur d'action** : boutons, liens, labels (5,4:1 avec blanc) |
| `--primary-deep` | `#044E73` | Survol / pression de l'action |
| `--primary` | `#1291CE` | Bleu marque : filets actifs, focus, icônes (pas de texte) |

### Nuit (console)

| Variable | Valeur | Rôle |
|---|---|---|
| `--background-dark` | `#0B1220` | Fond nuit, à plat |
| `--night` | `#062B44` | Fond nuit alternatif (CTA final) |
| `--night-panel` *(nouveau)* | `#0F1A2B` | Panneaux de console |
| `--night-line` *(nouveau)* | `255 255 255 / 0.10` | Filets sur nuit |
| Texte | `#FFFFFF` / `#E2E8F0` / `#94A3B8` | Titres / courant / secondaire (≥ 7:1) |
| `--glow` | `#81CFF5` | Accent sur nuit : labels, liens, données (10:1) |

### Statuts (console uniquement)

`--success` `#10B981` = actif / nominal · `--danger` `#EF4444` = alarme · ambre `#F59E0B` *(nouveau, `--warning`)* = défaut / maintenance. Toujours accompagnés d'un libellé, jamais seuls.

### Retirés

`--gradient-text` et `.text-gradient`, `--gradient-brand` sur les boutons, `.gradient-text`, ombres teintées `shadow-soft / lift / cta / glow / float`, `.blob`, `.iso-*`, `animate-float`, `animate-breathe`. Le dégradé nuit reste toléré en fond de CTA final uniquement.

## Typographie

| Rôle | Famille | Réglages |
|---|---|---|
| Titres, chiffres (`--font-display`) | **Archivo** semi-condensé (`wdth` 87,5) — validé le 16/10/2026 (spécimen dans `design-audit/typo/`) | 600–700, `letter-spacing: -0.025em`, interligne 1,04–1,1 |
| Texte, interface (`--font-sans`) | **Roboto** (charte) | 400 / 500, 16–17 px, interligne 1,65 |
| Labels, données (`--font-mono`) | **JetBrains Mono** | 500, majuscules, `letter-spacing: 0.14em`, 12 px minimum |

- Échelle : h1 `clamp(2.5rem, 5vw, 4.25rem)` · h2 `clamp(2rem, 3.4vw, 3rem)` · h3 `1.25 → 1.5rem` · lede `1.125rem` · label `12px`.
- **Titres en deux tons** (remplace le dégradé) : premier groupe de sens en `foreground-strong`, suite en `muted-strong` (nuit : blanc puis `#94A3B8`). `<SplitTitle>`, `<SectionHeading>` et `<PageHero>` l'appliquent.
- Paragraphes limités à 65 caractères (`max-w-xl` / `max-w-2xl`).
- Corriger `@theme inline` : `--font-mono` doit pointer vers la variable JetBrains Mono chargée dans `layout.tsx`.

## Espacement et mise en page

- Base 4 px. Rythme de section `.section-y` : 72 → 96 → 128 px. Plus d'air au-dessus d'un titre qu'en dessous.
- Conteneurs inchangés : `.shell` / `.shell-wide` 1280 px, `.shell-narrow` 960 px, gouttières 16 / 24 px.
- Grilles de tuiles **jointives** séparées par des filets (pas de cartes flottantes espacées).
- Mobile-first, cibles tactiles ≥ 44 px, aucun défilement horizontal, aucune section épinglée sous 768 px.

## Rayons et profondeur

- Rayons : boutons **pilule** (conservés) · tuiles et médias `12px` · panneaux de console et champs `8px` · pastilles de statut `999px`.
- Profondeur par le **filet et le changement de fond**, jamais par l'ombre. Seule exception : une ombre neutre légère sous les menus et overlays.

## Composants

### Pas de label au-dessus des titres

Le titre porte seul la section : aucune pastille, aucun libellé, aucune numérotation décorative (`01 / 03`) au-dessus. Le mono (`.data-label`, `.console-head`) est réservé aux vraies données : identifiants d'équipements, cartouches de console, légendes techniques, étapes d'une séquence.

### Boutons (`components/ui/button.tsx`)

| Variante | Usage |
|---|---|
| `primary` | Action principale — pilule pleine `primary-strong`, texte blanc, survol `primary-deep`, sans ombre |
| `outline` | Secondaire sur clair — pilule filet `hairline-strong`, texte encre, survol filet `primary` |
| `inverse` | Principale sur nuit — pilule blanche, texte `#0B1220` |
| `outline-night` | Secondaire sur nuit — filet `night-line`, texte blanc |
| `link` | Tertiaire — texte `primary-strong` + flèche, soulignement au survol |

Deux variantes maximum par bloc. Un seul libellé d'action par intention (« Prendre contact » partout pour le contact).

### Tuile (clair)

Fond `surface`, filet `hairline`, rayon 12 px, sans ombre. Grilles jointives séparées par des filets quand les tuiles forment un ensemble. Survol interactif : filet `primary` + titre `primary-strong`, pas de soulèvement. Icône lucide 20 px en ligne avec le titre, **pas** de pastille d'icône empilée au-dessus du titre.

### Panneau de console (nuit)

Fond `night-panel`, filet `night-line`, rayon 8 px (`.console`, en-tête `.console-head`). En-tête : label mono (« PC SÉCURITÉ · PORTE 01 ») + pastille de statut. Données en mono, valeurs en display. Sert à l'architecture, aux méthodes, aux scènes et au CTA final.

### Métriques (`StatRow`)

Chiffres en display `foreground-strong` (plus de dégradé), légende sous le chiffre en Roboto 14 px `muted-strong`. Séparation par filets verticaux, pas de carte.

### Médias (`MediaFrame`)

À plat, rayon 12 px, filet `hairline`, légende mono sous l'image. `MediaStage` incliné retiré.

### Partenaires (`PartnerCloud`)

Grille statique de logos en niveaux de gris (couleur au survol) à la place du ticker infini ; normes regroupées dans un bloc de conformité dédié.

### Formulaires

Inchangés sur le fond (rayon 8 px, ≥ 44 px, focus `primary`), ombre interne retirée.

## Animation

| Élément | Règle |
|---|---|
| `<Reveal>` | Opacité + 8 px, 400 ms ease-out, une fois ; contenu visible sans JS |
| Survols | Couleur et filet, 150 ms ; aucun soulèvement, aucun zoom d'image |
| Flèches de lien | `translateX(3px)` au survol |
| Films et scènes 3D au scroll | Conservés (signature) ; repli image fixe sous `prefers-reduced-motion` |
| Statuts de console | Pulsation 2 s d'une pastille « ACTIF » au plus par vue ; coupée en mouvement réduit |

Une seule chorégraphie par section ; jamais d'animation décorative en boucle hors console.

## Iconographie

lucide-react, trait 1,75 px, 16–20 px, couleur `primary-strong` (nuit : `glow`) ; `aria-hidden` quand un texte accompagne l'icône.

## Images et médias

`.avif` / `.webp`, dossier `/public/novadis/`. Photos réelles de sites, d'opérateurs et d'équipements en priorité ; pas d'illustration générique. Logos : `mediaLibrary.logo` (clair), `mediaLibrary.logoDark` (nuit).

## Accessibilité

- Texte bleu sur clair : `primary-strong` uniquement. Sur nuit : `glow` ou blanc, jamais `primary`.
- Texte ≥ 12 px, `muted` jamais pour du texte.
- Focus visible : `outline` 2 px `primary`, offset 2 px (nuit : `glow`).
- Hiérarchie h1 → h2 → h3, `prefers-reduced-motion` respecté par chaque animation.

## À ne pas faire

- Texte en dégradé, halos, inclinaisons, ombres colorées.
- Pastille d'icône au-dessus de chaque titre de carte, numérotation décorative.
- Bleu en fond de section claire, plus d'une couleur d'accent par monde.
- Couleurs en dur dans les composants (hors matériaux Three.js), couleurs Tailwind de palette (`slate-*`, `white/…`) à la place des variables.
- Plus de deux sections nuit par page en plus du CTA final.
