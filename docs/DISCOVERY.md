# Existing-site discovery — 21 September 2026

## Method and coverage
Read the public homepage, navigation, About, Service, Contact, Blog and Stock List. Retrieved /wp-json/wp/v2/pages?per_page=100 and /wp-json/wp/v2/posts?per_page=100: seven page objects and twelve article objects. Preserved responses under migration/source. This is an observed public-content inventory, not proof that every indexed URL or private stock record has been discovered. Search Console and access logs are unavailable. Browser-reader sitemap/robots requests failed; direct public API retrieval succeeded. No site writes occurred.

## Findings
- /shop/ displays a coming-soon message. No verified machine inventory was recovered; do not invent listings or availability.
- Existing root title spells “Rosa”; the supplied brief and logo establish “Roza Graphic Machinery”. Normalize new title metadata to Roza without changing historical URLs unnecessarily.
- Main navigation includes About, Blog, Contact, Service and Stock List.
- Footer FAQ points to /under-construction/. Privacy points to a preview query on that page. Neither constitutes a usable legal or FAQ page. New legal content requires review; do not copy placeholder text.
- The public API retains Divi shortcodes. Raw import into React is not acceptable. Preserve originals, extract structured blocks, sanitize links/HTML and verify images.
- About contains warranty, response-time, market-leadership and financing statements. Preserve source evidence but require current business confirmation before presenting these as new commitments.
- Location labels on the old website do not override the brief. Use neutral country contact labels until physical-location status is confirmed.

## Source-backed services
Service page: cylinder repair; installation and maintenance; packing and shipment. About also supports dismantling, relocation logistics, after-sales and operation training. Technical inspection is requested by the brief but its exact deliverable needs RGM configuration; do not invent guarantees or service inclusions.

## Brand evidence
Original asset: https://rgmachinery.com/wp-content/uploads/2022/12/RGM-HD-logo.png . Saved unchanged in public/rgm-logo.png.
Dominant opaque pixels: navy #182765 and blue #004F9E. Existing homepage CSS also uses #3550A0 in hero/CTA and #040275 in navigation. Retain this family; source files/brand guide can refine application later. No invented machinery photography.

## Sources
- https://rgmachinery.com/
- https://rgmachinery.com/about-used-offset-priniting-machine/
- https://rgmachinery.com/service/
- https://rgmachinery.com/contact-us/
- https://rgmachinery.com/shop/
- https://rgmachinery.com/blog/
- https://rgmachinery.com/wp-json/wp/v2/pages?per_page=100
- https://rgmachinery.com/wp-json/wp/v2/posts?per_page=100

UX references reviewed: https://machinex.com/ (corporate introduction alongside inventory and sell journey); https://dpm.uk.com/gb/ (manufacturer, format and colors discovery). No reference code, copy or photography reused.
