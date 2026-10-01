# Skinny Cans (`skinny-can`)

A modern, high-performance web application and brand showcase for **Skinny Cans** — clean, conscious, and crafted organic alcoholic beverages. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Radix UI, next-intl, and Framer Motion.

---

## 🌟 Features & Architecture Highlights

- **⚡ Next.js 14 App Router (RSC & SSG)**: Fully statically generated pages across multiple locales for blazing-fast edge performance.
- **🌍 Production Internationalization (`next-intl`)**: Type-safe multi-language support (English, Norwegian, Northern Sámi) with prefix routing (`/en`, `/no`, `/se`) and dynamic sitemap alternates.
- **🛡️ Legal Age Verification Gate**: Cookie-backed, WCAG-compliant accessible modal dialog (`Restriction`) ensuring compliance without hydration layout flicker.
- **📝 Resilient Inquiry & Support System**: React Hook Form + Zod validation with file attachment support, server-side payload bounds, and Freshdesk API proxying.
- **🎨 Brand Design & Responsive Animations**: Custom typography (`Amiri` and `Varela Round`), Framer Motion gesture transitions, and Swiper carousels.
- **🔍 Technical SEO & Structured Data**: Dynamic XML sitemaps, robots.txt, OpenGraph and Twitter cards, canonical tags, and schema.org `Organization` & `Product` JSON-LD schemas.
- **🧪 Comprehensive Test Suite & CI**: Vitest unit testing, React Testing Library component tests, and automated GitHub Actions CI workflow.

---

## 🏗️ Project Structure

```bash
skinny-cans/
├── .github/
│   └── workflows/
│       └── ci.yml                 # Automated CI: Typecheck, Lint, Test, Build
├── docs/
│   └── adr/                       # Architecture Decision Records
├── messages/                      # i18n translation dictionaries
│   ├── en.json
│   ├── no.json
│   └── se.json
├── public/                        # Static assets (favicons, marker icons, video)
├── src/
│   ├── app/                       # Next.js App Router (Routes & Metadata)
│   │   ├── [locale]/
│   │   │   ├── bbs/page.tsx       # BBS Research & Science
│   │   │   ├── partner/page.tsx   # Partner & Global Distribution
│   │   │   ├── product/           # Catalog & Dynamic Slug Pages
│   │   │   │   ├── [slug]/page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── story/page.tsx     # Brand Story & Heritage
│   │   │   ├── waitlist/page.tsx  # Support & Partner Inquiry Form
│   │   │   ├── layout.tsx         # Localized layout & Schema.org markup
│   │   │   └── page.tsx           # Landing page
│   │   ├── api/freshdesk/route.ts # Validated Freshdesk ticket proxy
│   │   ├── robots.ts              # SEO Robots configuration
│   │   └── sitemap.ts             # Dynamic XML Sitemap
│   ├── components/                # Shared presentation & UI components
│   │   ├── ui/                    # Design primitives (Select, Input, Form, Dialog)
│   │   ├── Footer.tsx
│   │   ├── site-header.tsx
│   │   └── Restriction.tsx
│   ├── features/                  # Domain-specific feature modules
│   │   ├── inquiries/             # Inquiry forms & Zod schemas
│   │   └── products/              # Product catalog data & SSOT
│   ├── config/                    # Static configuration & Env validation
│   │   ├── env.ts                 # Validated environment variables (Zod)
│   │   └── site-i18n.ts           # Brand copy, navigation links, and social URLs
│   ├── i18n/                      # Internationalization routing & request handler
│   │   ├── request.ts
│   │   └── routing.ts
│   └── styles/
│       └── globals.css            # Tailwind directives and design system tokens
└── tests/
    ├── setup.ts
    └── unit/                      # Vitest unit test suites
```

---

## 🚀 Quick Start Guide

### Prerequisites

- Node.js 18.17+ or 20+
- npm 9+

### Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/itseghosime-dev/skinny-can.git
   cd skinny-can
   ```

2. **Install dependencies:**

   ```bash
   npm ci
   ```

3. **Configure environment variables:**

   ```bash
   cp .env.example .env.local
   ```

   _(Optionally add your Freshdesk credentials to `.env.local`; local development automatically enables mock mode if unset)._

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 🧪 Testing & Verification

Run the full automated test suite and type check:

```bash
# Run unit & schema tests
npm run test

# Run TypeScript type check
npm run typecheck

# Run ESLint check
npm run lint

# Run production build
npm run build
```

---

## 🔒 Environment Variables

| Variable                   | Required        | Description                                  | Default                   |
| :------------------------- | :-------------- | :------------------------------------------- | :------------------------ |
| `FRESHDESK_DOMAIN`         | Optional in dev | Freshdesk subdomain for ticket API           | `none` (triggers mock)    |
| `FRESHDESK_API_KEY`        | Optional in dev | Freshdesk API Token for Basic Auth           | `none` (triggers mock)    |
| `NEXT_PUBLIC_MAPS_API_KEY` | Optional        | Stadia Maps API Key for custom map styling   | `CartoCDN fallback`       |
| `NEXT_PUBLIC_SITE_URL`     | Optional        | Canonical website origin for SEO & OpenGraph | `https://skinny-cans.com` |

---

## 🚢 Deployment & Production Guidelines

This application is optimized for zero-config deployment on **Vercel**, **Cloudflare Pages**, or **AWS Amplify**.

### Deploy on Vercel

1. Import repository into Vercel.
2. Ensure Environment Variables from `.env.example` are populated in project settings.
3. Deploy. Production builds pre-render all 30 static pages across all locales.

---

## 📄 License

MIT © 2026 Skinny Cans. All rights reserved.
