# ADR 002: Localized Routing and Unified next-intl Architecture

## Status

Accepted

## Context

The previous internationalization setup had severe architectural bugs:

1. `src/app/[locale]/layout.tsx` attempted dynamic imports from `@/locales/${locale}.json` which did not exist, causing 500-level module resolution failures and silencing errors with empty message objects.
2. Components directly imported `Link` from `next/link`, dropping `/en`, `/no`, or `/se` route prefixes and triggering repetitive 307 middleware redirects.
3. Language switching used fragile pathname string-splitting (`pathname.split('/')`).

## Decision

1. Adopt modern `next-intl` request configuration via `src/i18n/request.ts` using `getRequestConfig` and `requestLocale`.
2. Export unified localized navigation primitives (`Link`, `useRouter`, `usePathname`, `redirect`) from `src/i18n/routing.ts` using `createSharedPathnamesNavigation`.
3. Provide complete translation files for all active locales (`messages/en.json`, `messages/no.json`, `messages/se.json`).

## Consequences

- **Positive**: Zero translation resolution errors, instantaneous client-side navigation without prefix loss, and static generation (SSG) of all localized paths at build time.
- **Trade-off**: Requires all developer components to import `Link` from `@/i18n/routing` rather than Next.js core.
