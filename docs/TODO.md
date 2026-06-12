# TODO.md — Tâches priorisées

## Légende

| Icône | Priorité |
|---|---|
| 🔴 | Bloquant — à faire avant la démo |
| 🟠 | Important — à faire avant le lancement |
| 🟡 | Utile — post-lancement ou post-démo |
| ✅ | Terminé |

---

## Phase 1 — Démo directeur

### 🔴 Bloquant avant démo

- [x] Afficher les 6 secteurs dans `/industries` — ajout Secteur bancaire + Santé dans `data/site.ts`
- [ ] Vérifier l'affichage mobile sur toutes les pages principales
- [ ] Vérifier que les images chargent correctement (aucun broken link)
- [ ] Tester dark mode ET light mode sur chaque page

### 🟠 Idéalement avant démo

- [ ] Remplacer la citation Einstein (page `/about`) par une accroche propre à Novadis
- [ ] Ajouter les coordonnées réelles dans la page `/contact` (email, téléphone)
- [ ] Vérifier la cohérence des métriques (12 000+, 40 000+, 2,3M m²)

---

## Phase 2 — Après la démo / avant lancement

### Légal & Conformité
- [ ] Rédiger les mentions légales (`/legal`)
- [ ] Rédiger la politique de confidentialité (`/privacy`)
- [ ] Ajouter une bannière de consentement cookies (RGPD)
- [ ] Vérifier conformité CNIL (formulaire de contact, cookies analytics)

### Fonctionnel
- [ ] Implémenter la soumission du formulaire de contact (ex: Resend, Brevo, ou API Route Next.js)
- [ ] Ajouter validation côté client du formulaire (champs requis, format email)
- [ ] Ajouter protection anti-spam formulaire (honeypot ou reCAPTCHA)
- [ ] Créer les pages d'erreur personnalisées (`not-found.tsx`, `error.tsx`)

### SEO & Performances
- [ ] Externaliser `NEXT_PUBLIC_SITE_URL` (sitemap.ts + robots.ts)
- [ ] Ajouter Schema.org `Organization` + `LocalBusiness` dans layout.tsx
- [ ] Ajouter Schema.org `Service` sur les pages solutions
- [ ] Passer les vidéos sur un hébergement définitif (hors WordPress)
- [ ] Auditer les Core Web Vitals (LCP, CLS, FID)
- [ ] Vérifier et compléter les balises alt sur toutes les images

### Contenu
- [ ] Ajouter les liens réseaux sociaux (LinkedIn au minimum) dans le footer
- [ ] Créer une page `/certifications` valorisant ANSSI, NFA2P, CNIL, Arseg, Synergie
- [ ] Distinguer partenaires technologiques vs associations dans `<PartnerCloud>`

---

## Phase 3 — Post-lancement

### Contenu & Conversion
- [ ] Créer 2-3 études de cas clients anonymisées (`/references`)
- [ ] Ajouter une section équipe dans `/about`
- [ ] Créer les 6 pages secteurs détaillées (données déjà dans `sectors.ts`)
- [ ] CTA différenciés selon la maturité prospect (démo, fiche solution, contact)

### Analytics & Suivi
- [ ] Intégrer un outil d'analytics (Plausible recommandé pour conformité RGPD, ou GA4)
- [ ] Configurer le suivi des conversions (soumission formulaire)
- [ ] Configurer les alertes de disponibilité (uptime monitoring)

### Blog & SEO longue traîne
- [ ] Définir les 10 premiers sujets d'articles (guides techniques, comparatifs)
- [ ] Créer la structure `/blog` + `/blog/[slug]`
- [ ] Publier 3 articles fondateurs

### Technique
- [ ] Mettre en place CI/CD (déploiement automatique sur push main)
- [ ] Configurer les environnements staging et production
- [ ] Mettre en place des redirections 301 depuis l'ancien site WordPress

---

## Décisions en attente (besoin de validation)

- [ ] **Citation Einstein** — à remplacer ou à conserver ?
- [ ] **Secteurs `/industries`** — afficher les 6 ou rester à 4 ?
- [ ] **Analytics** — quel outil ? (Plausible vs GA4)
- [ ] **Formulaire** — email de destination, outil d'envoi
- [ ] **Hébergement** — où sera déployé le site ? (Vercel, VPS, autre)
