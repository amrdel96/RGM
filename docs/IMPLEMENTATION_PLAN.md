# Implementation plan and acceptance gates

| Phase | Deliverable | Acceptance gate |
|---|---|---|
| 1 Discovery | captured source, URL/asset inventory, unresolved facts | observed evidence separated from assumptions; full crawl still required |
| 2 Architecture | models, roles, workflow, migration policy | invariants and boundaries explicit |
| 3 Design | tokens, EN/AR components, three public wireframes, admin UX | real brand preserved; responsive/RTL reviewed |
| 4 Core | Next shell, Supabase Auth, database migrations, repository guards | build/typecheck; auth integration and role denial pass |
| 5 Inventory | CRUD, code allocation, media, public DTO, search/filters | real persistence; concurrent codes; no private/sold leaks |
| 6 Import | CSV/XLSX template, preview, validation, idempotent commit | invalid rows reported; no accidental publication |
| 7 Leads | all six lead types, sales workspace, assignment/history | lead+outbox atomic; retries don't duplicate |
| 8 Automation | localized email, internal notification, mock/real adapters | failures preserve leads; price permissions; webhook tests |
| 9 Content | transform/review 19 captured objects and approved assets | EN/AR parity, factual review, asset audit |
| 10 SEO | redirect registry, sitemap, metadata/schema | old URL dispositions reviewed; redirect test suite |
| 11 Analytics | consent, events, UTM attribution | no optional tracking before appropriate consent; no PII |
| 12 QA | unit/integration/E2E, manual device and accessibility checks | complete critical journey; all release checks pass |
| 13 Deployment | staging, DNS/mail guide, backups/monitoring/rollback | configured accounts, restore rehearsal and cutover review |

Next concrete slice: connect disposable PostgreSQL and Supabase Auth, implement protected machine creation and public repository projection, then prove the machine -> lead -> outbox -> sold lifecycle. Do not broaden page generation before this vertical slice works.

Configuration remains editable and explicitly unresolved: primary WhatsApp, inquiry destination, country contacts, exact addresses/location wording, source machinery data/media, SMTP and WhatsApp credentials, analytics IDs. No fabricated fallback values. Missing credentials do not justify pretending integrations are live.
