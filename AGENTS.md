# RGM project rules
Build Roza Graphic Machinery's bilingual inventory and lead platform. Read ARCHITECTURE.md and docs/PRODUCT_REQUIREMENTS.md first. Consult docs/STATUS.md before continuing.

- Preserve the existing logo/colors; never invent stock, prices, services, offices or company facts.
- English LTR and Arabic RTL are required; preserve equivalent pages on language switching.
- PostgreSQL is the source of truth. Permanent machine codes never change or get reused.
- Sold records stay internal and disappear from every public surface.
- Default price is Price on Request. Public and email price permissions are independent.
- Internal supplier/cost/commission data is Admin-only and must never enter public responses or customer messages.
- Save lead and outbox atomically before sending any external messages.
- Contacts live in Site Settings; missing values are CONFIGURATION REQUIRED.
- Preserve useful existing articles and migration mappings. No checkout/cart.
- Enforce all roles server-side. Staging sends only to explicit test recipients.

Commands: pnpm dev; pnpm typecheck; pnpm test; pnpm lint; pnpm format:check; pnpm build.
Never claim a planned feature is implemented. Update docs/STATUS.md with evidence.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
