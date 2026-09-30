# Machine and taxonomy model

Machine: UUID, immutable public code, status (DRAFT/AVAILABLE/RESERVED/SOLD/ARCHIVED), manufacturer, model, category, optional subcategory, year, country, approved location text, condition, created/updated timestamps, publication time and version.
Localized MachineText: machine ID + locale unique; slug unique per locale, title override, description, configuration and SEO fields. Generated title is editable; never force offset fields into other categories.
Technical specifications: validated JSON objects by category schema plus indexed common attributes (colors, width_mm, height_mm, perfecting, coating, impressions, operating_hours). Values retain units; zero differs from unknown. Serial is staff-only by default unless explicitly approved for display.
MachineCommercial: machine ID, decimal selling price, ISO currency, show_public_price default false, send_email_price default false. Never use floating-point amounts. Require currency when a price exists.
MachineInternal: supplier, contact, purchase price/currency, costs, commission, source URL, internal notes. Admin-only repository and table.
MachineMedia: storage key, kind, MIME, size, dimensions, order, primary flag, EN/AR alt text, approved/public status. Unique primary image per machine. Documents have separate public/private visibility.
MachineCodeRegistry: sequence number, formatted code, permanent machine ID. Sequence assigned transactionally by PostgreSQL, immutable even after archive. Never accept spreadsheet codes or recycle gaps. Restore must preserve maximum sequence high-water mark.

## Provisional taxonomy
Source-supported starting focus: sheetfed offset and prepress. Brief-proposed candidates: web offset, digital, flexographic, cutting, folding, die cutting, binding, folder gluing, packaging, laminating, other. Treat CTP as prepress subcategory to avoid duplicate navigation. This is a draft vocabulary, not a claim of current stock. Admin activates/renames categories against real inventory.
Manufacturers are managed records with search aliases; no fake stock counts or unverified manufacturer logos. Normalize SM102/SM 102, CD102/CD 102 and color/colour. Search code, manufacturer, model, approved text and contextual specifications with indexed normalized terms. Keep supplier data out of search indexes.

## Lifecycle
Draft -> Available/Reserved after validation -> Sold or Archived. Re-publication of an erroneous Sold status requires Admin action and audit reason, preserving code and lead history. All public reads use a shared availability predicate. Reserved visibility is centrally configurable, default off.
