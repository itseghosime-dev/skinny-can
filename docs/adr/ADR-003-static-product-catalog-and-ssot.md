# ADR 003: Colocated Static Product Catalog Single Source of Truth (SSOT)

## Status

Accepted

## Context

The product detail pages previously evaluated raw URL parameters (`params.slug`) against string concatenation with translation keys. Navigating to an invalid product slug threw unhandled JavaScript runtime exceptions rather than returning a 404 HTTP status. Furthermore, product specs were duplicated across multiple components without type safety.

## Decision

1. Establish a single source of truth in `src/features/products/data/products.ts` defining all products, valid slugs, image assets, nutritional metrics, and translation keys.
2. Implement `generateStaticParams()` to pre-render all product detail pages across all locales.
3. Validate dynamic slugs with `getProductBySlug(slug)` and trigger Next.js `notFound()` immediately for unrecognized slugs.
4. Output JSON-LD `Product` schema with nutritional properties.

## Consequences

- **Positive**: 100% static generation, instant sub-millisecond edge response times, strict 404 handling, and high-quality search engine indexing.
- **Trade-off**: Adding new products requires a code change rather than a CMS entry (appropriate for a boutique brand with curated core offerings).
