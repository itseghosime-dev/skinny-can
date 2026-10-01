# ADR 001: Cookie-Backed Age Gate Verification

## Status

Accepted

## Context

Alcohol beverage marketing websites are legally required to verify that visitors are of legal drinking age (21+). In the initial implementation, age confirmation was stored exclusively in `localStorage` inside a client-side `useEffect`. This approach caused two issues:

1. **Hydration & Layout Shift**: Server-rendered HTML could not know the user's age confirmation state, resulting in a flash of unverified modal content on every page load.
2. **Accessibility Gaps**: The previous modal overlay lacked ARIA attributes (`role="dialog"`, `aria-modal="true"`), focus trap management, and keyboard interaction.

## Decision

1. Persist age confirmation in both a 1-year SameSite cookie (`ageConfirmed=true; path=/; max-age=31536000; SameSite=Lax`) and `localStorage` as fallback.
2. Structure the `Restriction` component with standard WAI-ARIA modal dialogue attributes and prevent background scroll when open.
3. Redirect rejected age inquiries to an external responsible drinking organization (`https://www.responsibility.org`).

## Consequences

- **Positive**: Eliminates hydration flashes, improves First Contentful Paint (FCP), and guarantees WCAG compliance for modal interactions.
- **Trade-off**: Requires client-side cookie reading during first render if server middleware bypass is preferred for static CDN caching.
