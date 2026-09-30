# Admin architecture and permissions

| Capability | ADMIN | SALES | MARKETING |
|---|---|---|---|
| View machine selling terms | yes | yes | public values only |
| Create/import/publish/sell/archive machines | yes | no initially | no |
| Supplier, cost, commission | yes | no | no |
| Customer leads, notes, assignment, statuses | yes | yes | no |
| Send approved customer response | yes | yes | no |
| Structured pages/services/articles/media/SEO | yes | read public | yes |
| Contacts, integration routing, secrets references | yes | no | no |
| Users, roles, security, delivery retries | yes | no | no |
| Aggregate analytics without PII | yes | sales metrics | yes |

These are least-privilege initial defaults. Every read and mutation checks the verified user and current database role server-side. Explicitly project fields even for staff; SALES never receives machine_internal. Disable signup; Admin invites staff through Supabase Auth. Password reset and session expiry use provider mechanisms. Revoke sessions and access after deactivation.

Workspace groups: Overview; Inventory (machines, add, imports, taxonomy, media); Sales (all leads plus type views); Content (pages, services, articles); Communications (email/WhatsApp logs); Administration (users, contacts, settings, redirects). Counts are database-derived; show empty states rather than demo metrics.
Machine editor tabs: General, Technical, Commercial, Location, Configuration, EN/AR Content, Media, SEO, Internal. Save Draft is separate from Publish. Public preview excludes internals. Conflicting version edits return an actionable conflict, not silent overwrite.
Lead workspace: customer and request, safe machine snapshot, current availability, selling price for authorized staff, timeline, assignment, status, notes, email/WhatsApp actions. Delivery failures do not imply lost lead. Actions that send messages need a deliberate staff action and audit event.
