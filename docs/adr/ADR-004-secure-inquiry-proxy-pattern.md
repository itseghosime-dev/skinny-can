# ADR 004: Secure Inquiry Proxy, Rate Limiting, and Distributed Deployment Considerations

## Status

Accepted

## Context

The inquiry submission API endpoint (`/api/freshdesk`) handles B2B partnership and support submissions. In previous implementations, it accepted unconstrained `multipart/form-data` uploads without validation, lacked rate limiting, mirrored raw upstream errors back to the client, and returned mock success responses even when deployed without configured credentials.

## Decision

1. **Zero-Trust Server Validation**: Validate incoming fields with Zod (`email`, `topic`, `description`) prior to dispatching upstream requests.
2. **Strict Payload & MIME Bounds**: Enforce a 5MB maximum file size limit and restrict MIME types to `image/jpeg`, `image/png`, `image/webp`, and `application/pdf`.
3. **Fail-Closed Production Posture**: If `FRESHDESK_DOMAIN` or `FRESHDESK_API_KEY` are not configured in a production environment (`NODE_ENV === 'production'`), the endpoint returns `503 Service Unavailable` with a user-friendly error message. Mock fallbacks are strictly restricted to local development/test environments.
4. **Rate Limiting & Multi-Instance Assessment**:
   - Implemented an in-memory sliding-window rate limiter (5 requests / 60 seconds per IP, returning `429 Too Many Requests` with a `Retry-After: 60` header).
   - **Architectural Boundary Note**: In-memory rate limiting applies per Node.js process. In multi-container (Kubernetes/ECS) or serverless (Vercel/AWS Lambda) multi-instance deployments, ephemeral instances do not share memory. For distributed production clusters, rate limiting must be offloaded to an edge middleware or distributed cache (such as Upstash Redis / Cloudflare Rate Limiting).

## Consequences

- **Positive**: Prevents server memory exhaustion, prevents silent loss of customer inquiries in production, and provides protection against single-instance spam.
- **Trade-off**: Multi-instance horizontal scaling requires integrating a distributed key-value store (e.g., Redis) or CDN-edge rate limiting.
