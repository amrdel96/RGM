# Lead workflow

Types: MACHINE_INQUIRY, MACHINE_WANTED, SELL_MACHINE, INSPECTION_REQUEST, SERVICE_INQUIRY, GENERAL_CONTACT.
Statuses: NEW, CONTACTED, QUALIFIED, OFFER_SENT, NEGOTIATION, WON, LOST, SPAM.

1. Server validates type-specific schema, string lengths, email/phone format, consent, honeypot, rate limit and same-origin policy. Never trust a posted machine title, price or URL.
2. Resolve machine by ID and recheck public status; an unavailable machine returns an actionable message with no hidden record leak.
3. Hash normalized request; begin database transaction. Insert lead using unique idempotency key; conflicting reuse with a different hash returns 409. Matching retries return the original receipt.
4. Store customer language, immutable safe machine snapshot, source page, allowed UTM fields and referrer after length limits. Store type-specific fields and consent separately.
5. Insert internal notification, customer email and eligible WhatsApp outbox jobs in the same transaction. Commit before external calls.
6. Return success only after commit: “Your inquiry has been received.” Do not promise delivery. Client retries preserve the idempotency key; a new intentional request gets a new key.
7. Worker claims pending jobs, renders approved localized templates, dispatches and records status. Failed messages remain retryable; lead remains in dashboard.

Seller submissions never create public machines automatically. Uploaded materials are private/quarantined until review. Wanted requests preserve year range/budget currency/technical requirements. Inspection requests preserve machine location, timeframe and offer documents. Services link to a real service ID. General contact follows the same persistence path.
