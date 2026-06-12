# PAGES.md — Plan des pages du site

## Légende

| Icône | Statut |
|---|---|
| ✅ | Développée et prête |
| ⚠️ | Développée mais incomplète |
| 🔄 | En cours |
| ⬜ | À faire |
| ❌ | Placeholder vide |

---

## Pages actuelles

| Route | Statut | Objectif | CTA principal |
|---|---|---|---|
| `/` | ✅ | Capter l'attention, qualifier le visiteur | → Découvrir les solutions |
| `/solutions` | ✅ | Vue d'ensemble des 6 solutions | → Voir chaque solution |
| `/solutions/it-infrastructure` | ✅ | Détail infrastructure IT | → Nous contacter |
| `/solutions/access-control` | ✅ | Détail contrôle d'accès Amadeus | → Nous contacter |
| `/solutions/intrusion-detection` | ✅ | Détail détection intrusion Galaxy | → Nous contacter |
| `/solutions/video-surveillance` | ✅ | Détail vidéosurveillance Ocularis | → Nous contacter |
| `/solutions/video-analytics` | ✅ | Détail analyse vidéo IA | → Nous contacter |
| `/solutions/smart-integrations` | ✅ | Détail intégrations intelligentes | → Nous contacter |
| `/industries` | ⚠️ | Montrer la couverture sectorielle | → Voir les solutions |
| `/methodology` | ✅ | Rassurer sur le process de delivery | → Démarrer un projet |
| `/about` | ✅ | Crédibilité, valeurs, partenaires | → Nous contacter |
| `/contact` | ⚠️ | Convertir — prise de contact | [formulaire] |
| `/legal` | ❌ | Mentions légales obligatoires | — |
| `/privacy` | ❌ | Politique de confidentialité RGPD | — |

---

## Pages manquantes (priorité post-démo)

> Complété avec les pages issues de novadis-arborescence.md et novadis-contenu-pages.md.

| Route | Priorité | Objectif |
|---|---|---|
| `/supervision` | Haute | Solution "Supervision globale" absente du site démo |
| `/references` | Haute | Preuves sociales — études de cas anonymisées |
| `/services` | Haute | Remplace ou complète `/methodology` — Audit, Ingénierie, Déploiement, Formation, Maintenance |
| `/certifications` | Haute | Valoriser ANSSI, NFA2P, CNIL, partenariats officiels |
| `/ressources` | Moyenne | Actualités, articles experts, cas clients, guides (SEO) |
| `/ressources/[slug]` | Moyenne | Articles individuels |
| `/carrieres` | Moyenne | Recrutement |
| `/equipe` | Moyenne | Humaniser la marque, rassurer l'acheteur |
| `404` (not-found.tsx) | Basse | Page d'erreur branded |
| `500` (error.tsx) | Basse | Page d'erreur serveur |

---

## Navigation cible (source : novadis-arborescence.md)

> La navigation définie dans novadis-arborescence.md est plus large que celle du site démo. Ci-dessous la cible à atteindre.

```
Logo → /
Novadis → /about
Solutions → /solutions  (avec sous-nav : Supervision, Contrôle d'accès, VMS, Intrusion, Analyse vidéo, Solutions spécifiques)
Services → /services    (avec sous-nav : Audit, Ingénierie, Déploiement, Formation, Maintenance) ← actuellement /methodology
Secteurs → /secteurs    ← actuellement /industries, segmentation à aligner
Références → /references
Ressources → /ressources ← à créer (Actualités, Articles, Cas clients, Documentation)
Carrières → /carrieres  ← à créer
[CTA] Contact → /contact
```

## Structure de navigation actuelle (démo)

### Header
```
Logo → /
Solutions → /solutions
Industries → /industries
Méthodologie → /methodology
À propos → /about
[CTA] Nous contacter → /contact
```

### Footer
```
Colonne 1 : Logo + description courte
Colonne 2 : Solutions (liens vers les 6)
Colonne 3 : Entreprise (About, Methodology, Contact)
Colonne 4 : Contact (adresse, email, téléphone)
Bas : Mentions légales · Confidentialité · © Novadis
```

---

## Améliorations de navigation à envisager

- Ajouter **Références** dans le header (post-démo)
- Ajouter **LinkedIn** dans le footer
- Dropdown sur **Solutions** pour accès direct aux 6 slugs
- Breadcrumb sur les pages solutions et industries

---

## SEO — Couverture des pages

| Page | Title | Description | OG | Sitemap |
|---|---|---|---|---|
| `/` | ✅ | ✅ | ✅ | ✅ |
| `/solutions` | ✅ | ✅ | ⬜ | ✅ |
| `/solutions/[slug]` | ✅ | ✅ | ⬜ | ✅ |
| `/industries` | ✅ | ✅ | ⬜ | ✅ |
| `/methodology` | ✅ | ✅ | ⬜ | ✅ |
| `/about` | ✅ | ✅ | ⬜ | ✅ |
| `/contact` | ✅ | ✅ | ⬜ | ✅ |
| `/legal` | ❌ | ❌ | ❌ | ✅ |
| `/privacy` | ❌ | ❌ | ❌ | ✅ |

> Schema.org (Organization, LocalBusiness, Service) : ⬜ non implémenté
