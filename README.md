# Roza Graphic Machinery — platform

Initial discovery, architecture and implementation foundation, 21 September 2026.
This is not a production-ready platform. No production website, DNS, mailbox or customer data was changed.

Start with [project status](docs/STATUS.md), [audit](docs/DISCOVERY.md), [architecture](ARCHITECTURE.md), and [implementation plan](docs/IMPLEMENTATION_PLAN.md).
The supplied master prompt is preserved verbatim in docs/PRODUCT_REQUIREMENTS.md.
The design proposal is in docs/DESIGN_SYSTEM.md and docs/WIREFRAMES.md.

## Development
Use Node 22+ and pnpm. Run `pnpm install`, `pnpm dev`, `pnpm typecheck`, `pnpm test`, `pnpm lint`, `pnpm format:check`, and `pnpm build`.
Copy .env.example to .env.local locally. Never add credentials to source control.
No external messages are sent by this foundation. Production adapters and database connection remain implementation work.

## Evidence
The migration/source directory preserves public WordPress API responses, including existing content and dates. Treat source HTML as untrusted: sanitize and convert Divi shortcodes before rendering. No archive file is served from public/.
Only public source content was downloaded. A complete SEO audit also needs a fresh sitemap crawl, Search Console and server logs.
