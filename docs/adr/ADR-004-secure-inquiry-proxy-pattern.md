# ADR 004: Server-Side Zod Validation and API Error Sanitization

## Status

Accepted

## Context

The ticket submission API endpoint (`/api/freshdesk`) previously accepted arbitrary `multipart/form-data` payloads without server-side validation or attachment limits. Additionally, when Freshdesk returned errors, the raw response text was mirrored back to the client (`details: errData`), leaking backend integration internals.

## Decision

1. Validate incoming form fields server-side with Zod (`email`, `topic`, `description`) before initiating outbound requests.
2. Enforce explicit attachment limits (max 5MB, strict MIME whitelist: JPG, PNG, WEBP, PDF).
3. Sanitize error responses returned to the client using standardized JSON structures.
4. Support seamless local development with automatic mock mode when Freshdesk credentials are not configured.

## Consequences

- **Positive**: Zero credential leaks, protection against payload exhaustion attacks, and graceful degradation during local development.
- **Trade-off**: Requires maintaining synchronized Zod validation schemas for client and server.
