# Architecture decision record

Status: proposed architecture with a small local foundation. Chosen for the supplied brief, not a deployed system.

## Modular monolith
Next.js App Router + React + TypeScript on Vercel; PostgreSQL in Supabase; Supabase Auth for staff; Cloudinary for approved public media. Use server-only repositories and SQL migrations initially; add typed query tooling when repositories are implemented. Do not add microservices or a second inventory source.

Modules: catalog, inventory administration, taxonomy, content, leads, imports, media, communications, identity, settings, redirects and analytics. Modules communicate through application services within one repository.

Browser -> Next.js route/action -> server-side validation and authorization -> application service -> PostgreSQL transaction. Workers consume a transactional outbox using a protected scheduled endpoint. Email/WhatsApp providers never execute inside the lead transaction.

## Boundaries
Public: explicit allowlisted catalog DTOs, published content and approved public settings. Never serialize an ORM row or use SELECT * into public output.
Staff: verified Supabase user, current role read from server-side profile, per-operation permission guard. Do not rely on client metadata or hidden buttons.
Private: credentials remain in environment/secret manager; machine_internal is separate from machine and commercial selling terms. Customer PII and communications logs are staff-only.

## Database and consistency
Use UUID internal IDs; sequence-backed immutable public codes. Rollback gaps are acceptable. Never reset sequence during import or restore. Deny hard deletion of machinery; use archived status. Machine status is rechecked in every public repository and before email dispatch. Sold changes invalidate cached representations; initially use uncached machine reads to guarantee immediate removal.
Leads use idempotency keys with request hashes and database uniqueness. Lead + snapshot + outbox commit atomically. Delivery is at-least-once; external exactly-once is not promised. Timeout ambiguity requires provider reconciliation rather than blind resend.

## Localization
Canonical English pages remain unprefixed to protect current article URLs. Arabic mirrors use /ar. Internal route keys map translated slugs and preserve filters; identifiers, phone numbers and model codes use bidi isolation. Draft Arabic translations are not indexed as completed Arabic pages.

## Decisions still requiring configuration
Supabase project, production authentication setup, final contacts, approved location wording, Cloudinary account, SMTP credentials, approved WhatsApp templates, analytics IDs and private GitHub remote. These do not block local architecture work.

References: https://nextjs.org/docs/app/getting-started/installation ; https://supabase.com/docs/guides/auth/server-side/creating-a-client ; https://www.postgresql.org/docs/current/functions-sequence.html
