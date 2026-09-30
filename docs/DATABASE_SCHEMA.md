# Relational schema plan

| Table | Key relationships and constraints |
|---|---|
| staff_profile | Supabase user UUID; ADMIN/SALES/MARKETING; active |
| manufacturer, manufacturer_alias | unique slug/normalized alias |
| category, category_text | parent category; localized unique slug; specification schema |
| machine | code UNIQUE immutable; taxonomy FK; status indexes; optimistic version |
| machine_text | machine+locale PK; locale+slug UNIQUE |
| machine_commercial | machine PK/FK; numeric amount, currency; visibility flags |
| machine_internal | machine PK/FK; Admin-only supplier/cost fields |
| media, machine_media | object IDs, MIME/size/dimensions; ordered association |
| lead | type/status, customer PII, language, machine FK RESTRICT, assignee; idempotency key UNIQUE |
| lead_snapshot | lead PK; immutable safe machine title/code and request context |
| lead_detail | lead PK; validated typed wanted/seller/inspection/service payload |
| lead_note, lead_event | actor, timestamp, append-only timeline |
| outbox | lead FK, kind, template version, dedupe key UNIQUE, attempts, next_attempt, lease |
| delivery_attempt | outbox FK; provider ID, redacted error, sent/delivered state |
| webhook_receipt | provider+event ID UNIQUE; signature verification metadata |
| content, content_translation | page/article/service kind, legacy URL, source date, locale, approved content |
| site_settings, country_contact | public allowlisted settings separate from secret references |
| redirect | exact source path UNIQUE, destination, HTTP code, review status |
| import_batch, import_row | checksum, uploader, validation report, resulting machine IDs |
| audit_event | actor, action, target, redacted diff, time |
| consent_event | subject reference, purpose, wording version, timestamp |

Indexes: machine(status,published_at,id), category/status, manufacturer/status, year; normalized search GIN where appropriate; lead(created_at), lead(status,assigned_to); outbox(status,next_attempt_at). Paginate with stable tie-breakers. Use timestamptz UTC; show localized times in UI.
Enable RLS on exposed Supabase schemas. Public browser has no direct access to inventory internals, leads, settings secrets or outbox. Deny by default; trusted server repositories use narrowly scoped access. Service-role keys never enter NEXT_PUBLIC variables. Backups protect data and code-registry high-water marks.
SQL migrations remain to be implemented and tested against PostgreSQL; this is a schema design, not an applied migration.

