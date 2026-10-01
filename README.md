# Skinny Cans (`skinny-can`)

A modern, high-performance web application and brand platform for **Skinny Cans** — clean, conscious, and crafted organic alcoholic beverages. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Radix UI, `next-intl`, and Framer Motion.

---

## 🌟 Features & Architecture

- **⚡ Next.js 14 App Router (RSC & Static Site Generation)**: All 30 routes pre-rendered statically at build time across all locales for optimal edge delivery.
- **🌍 Multi-Language Internationalization (`next-intl`)**: Subpath routing for English (`/en`), Norwegian (`/no`), and Northern Sámi (`/se`) with query parameter retention across language switches and complete dictionary key parity.
- **🛡️ Legal Age Verification Gate**: Accessible, cookie-backed modal dialog (`Restriction`) ensuring regulatory compliance without hydration layout shifts or flash of unverified content.
- **📝 Validated Inquiry & Support System**: React Hook Form with dynamic localized Zod validation, file attachment handling (up to 5MB: `.jpg`, `.png`, `.webp`, `.pdf`), and proxy integration with Freshdesk.
- **⏱️ In-Memory Rate Limiting**: Built-in sliding token-bucket rate limiter (5 requests per 60s window per IP) protecting upstream Freshdesk endpoints from abuse with localized HTTP 429 toast responses.
- **🔍 Technical SEO & Canonical Alternates**: Dynamic XML sitemaps, robots.txt directives, OpenGraph/Twitter social cards, `hreflang` alternates, and schema.org `Organization` and `Product` JSON-LD schemas.
- **🧪 Layered Testing Suite**: Component tests (React Testing Library / Vitest), localized schema validation unit tests, API integration tests, and headless Puppeteer browser journey verification across desktop, tablet, and mobile viewports.

---

## 📦 Tech Stack & Versions

- **Framework**: [Next.js](https://nextjs.org/) `14.2.30` (App Router)
- **Runtime & UI**: [React](https://react.dev/) `18.3.1`, [TypeScript](https://www.typescriptlang.org/) `5.8.3`
- **Internationalization**: [`next-intl`](https://next-intl-docs.vercel.app/) `3.5.2`
- **Styling & UI**: [Tailwind CSS](https://tailwindcss.com/) `3.3.0`, [Radix UI](https://www.radix-ui.com/) primitives, [Framer Motion](https://www.framer.com/motion/) `12.18.1`
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) `7.60.0`, [Zod](https://zod.dev/) `3.24.2`
- **Icons & Carousels**: `lucide-react`, `react-icons`, [Swiper](https://swiperjs.com/) `11.2.8`
- **Testing**: [Vitest](https://vitest.dev/) `1.6.1`, [React Testing Library](https://testing-library.com/) `14.3.1`, [Puppeteer](https://pptr.dev/) `25.12.0`

---

## 🏗️ Project Structure

```bash
skinny-can/
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions CI: Typecheck, Lint, Test, Build
├── docs/
│   └── adr/                       # Architecture Decision Records
├── messages/                      # Translation dictionaries (100% key parity)
│   ├── en.json                    # English (Primary source)
│   ├── no.json                    # Norwegian Bokmål (Draft copy)
│   └── se.json                    # Northern Sámi (Draft copy)
├── public/                        # Static assets (favicons, map markers, product renders)
│   └── screenshots/               # Multi-viewport verified browser audit artifacts
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── [locale]/
│   │   │   ├── bbs/page.tsx       # BBS Research & Clinical Studies
│   │   │   ├── partner/page.tsx   # Global Distribution & Partners
│   │   │   ├── product/           # Catalog & Dynamic Product Pages
│   │   │   │   ├── [slug]/page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── story/page.tsx     # Brand Heritage & Philosophy
│   │   │   ├── waitlist/page.tsx  # Partner & Customer Inquiry Form
│   │   │   ├── layout.tsx         # Root localized layout & Schema.org markup
│   │   │   └── page.tsx           # Homepage
│   │   ├── api/freshdesk/route.ts # Rate-limited Freshdesk ticket creation proxy
│   │   ├── robots.ts              # Robots.txt handler
│   │   └── sitemap.ts             # Dynamic XML Sitemap generator
│   ├── components/                # Presentation & UI components
│   │   ├── ui/                    # Base UI primitives (Select, Form, Input, Toast)
│   │   ├── site-header.tsx        # Navigation header & mobile drawer
│   │   ├── Footer.tsx             # Site footer with responsive language selector
│   │   └── Restriction.tsx        # Legal age-gate modal dialog
│   ├── features/                  # Domain-driven feature modules
│   │   ├── inquiries/             # Inquiry form components & Zod validation schemas
│   │   └── products/              # Single Source of Truth (SSOT) product catalog data
│   ├── config/                    # Configuration & environment validation
│   │   ├── env.ts                 # Validated environment variables (Zod)
│   │   └── site-i18n.ts           # Localized navigation items, links, and footer copy
│   ├── lib/                       # Utility functions & rate limiter
│   │   ├── rate-limiter.ts        # In-memory token bucket rate limiter
│   │   └── utils.ts               # Tailwind class merge helper
│   ├── i18n/                      # Internationalization routing configuration
│   │   ├── request.ts             # next-intl request config
│   │   └── routing.ts             # next-intl localized navigation helpers
│   └── styles/
│       └── globals.css            # Tailwind directives and CSS variables
└── tests/
    ├── setup.ts                   # Vitest DOM setup and matchers
    └── unit/                      # Unit & Component test suites
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

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Verification

The project includes unit, component, API integration, and headless browser journey test suites:

```bash
# 1. Run Unit & Component Tests (Vitest + React Testing Library)
npm run test

# 2. Run TypeScript Type Check
npm run typecheck

# 3. Run ESLint Validation
npm run lint

# 4. Generate Production Build (Compiles 30 SSG pages)
npm run build

# 5. Start Production Server
npm run start

# 6. Run Full Puppeteer Browser Audit (Multi-viewport screenshots, language verification, form journeys)
node scripts/verify-multilingual-browser.js
```

---

## 🔒 Environment Variables & Configuration

| Variable                   | Required | Description                                                               | Default / Fallback                            |
| :------------------------- | :------- | :------------------------------------------------------------------------ | :-------------------------------------------- |
| `FRESHDESK_DOMAIN`         | Optional | Freshdesk subdomain (e.g., `company` for `https://company.freshdesk.com`) | `""` (Enables graceful mock mode in dev/test) |
| `FRESHDESK_API_KEY`        | Optional | Freshdesk API Token for HTTP Basic Auth                                   | `""` (Enables graceful mock mode in dev/test) |
| `NEXT_PUBLIC_MAPS_API_KEY` | Optional | Stadia Maps API Key for custom dark vector tiles                          | CartoDB Dark CDN Fallback                     |
| `NEXT_PUBLIC_SITE_URL`     | Optional | Base origin for canonical URLs, sitemaps, and OpenGraph tags              | `http://localhost:3000`                       |

### Freshdesk & Rate Limit Architecture

- **Development & Testing**: When `FRESHDESK_DOMAIN` or `FRESHDESK_API_KEY` is omitted, the `/api/freshdesk` endpoint operates in mock mode, logging payloads and returning `{ success: true, mock: true }` without crashing.
- **Production**: When configured, incoming inquiries are validated via Zod on both client and server, bound to a 5MB payload limit, rate-limited per client IP, and forwarded to Freshdesk's REST API (`POST /api/v2/tickets`).
- **Distributed Considerations**: The current rate limiter uses an in-memory token bucket (`src/lib/rate-limiter.ts`). In horizontally scaled serverless environments with many distinct instances, pair with an external store (such as Upstash Redis) if global strict rate enforcement is required.

---

## 🌐 Supported Languages & Search Indexing Policy

| Locale Code | Language           | Route Prefix | Search Indexing Policy                      | Translation Review Status                       |
| :---------- | :----------------- | :----------- | :------------------------------------------ | :---------------------------------------------- |
| `en`        | English            | `/en`        | `index, follow` (Primary indexable content) | **Complete (Source)**                           |
| `no`        | Norwegian (Bokmål) | `/no`        | `noindex, follow` (Accessible to users)     | **Functional Draft (Pending Linguist Signoff)** |
| `se`        | Northern Sámi      | `/se`        | `noindex, follow` (Accessible to users)     | **Functional Draft (Pending Linguist Signoff)** |

_Policy Note: Non-English locales are fully navigable and feature-complete for users, but are configured with `noindex` until native professional language review is completed to prevent search engines from indexing draft copy._

---

## 🚢 Deployment

The application is fully pre-rendered and compatible with any standard Node.js runtime or modern hosting platform (**Vercel**, **AWS Amplify**, **Cloudflare Pages**):

1. Connect the GitHub repository to your hosting provider.
2. Configure Node.js version `20.x`.
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain.
4. Optional: Supply `FRESHDESK_DOMAIN` and `FRESHDESK_API_KEY` secrets.
5. Deploy. The build process executes `next build`, statically generating all 30 static pages.

---

## 📄 License

MIT © 2026 Skinny Cans. All rights reserved.
