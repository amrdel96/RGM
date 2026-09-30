# WhatsApp integration

Separate click-to-chat from outbound automation. Public button uses one Site Settings primary E.164 number and localized encoded message containing safe machine title/year/code/canonical URL. Hide unavailable contact actions; show configuration requirements only to staff.
WhatsAppProvider sends an approved named template with locale, approved variables and idempotency reference. Implement mock first, then Meta Cloud API/WATI behind the same interface. Do not automate WhatsApp Web.
Outbound job is eligible only when provider is enabled, recipient consent is recorded, phone is valid and the selected locale template is configured/approved. Missing configuration is SKIPPED or CONFIGURATION_REQUIRED in staff logs, never falsely SENT.
Store provider ID, attempt time, template version, lead/machine references and redacted errors. Webhooks verify provider signatures against raw request bytes, deduplicate events, prevent status regression and acknowledge quickly. Reject invalid signatures. Verify provider-specific API/version/template requirements when adapter is implemented.
Nonproduction uses mock or a strict test recipient allowlist. Production credentials and approved templates remain CONFIGURATION REQUIRED. No actual messages have been sent.
