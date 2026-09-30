# Proposed sitemap and information architecture

English uses the paths below. Arabic uses /ar plus the same route keys; slugs may be localized through a stored locale mapping. Existing article English URLs stay unchanged.

| Area | Routes | Purpose |
|---|---|---|
| Discovery | /, /machines | Search and available stock |
| Detail | /machines/[slug-code] | Specifications, media, inquiry |
| Taxonomy | /brands, /brands/[slug], /categories/[slug] | Inventory-backed browsing |
| Company | /about, /contact | Real company facts and configured contacts |
| Services | /services, /services/[slug] | Migrated service details and lead form |
| Requests | /find-a-machine, /sell-your-machine, /request-inspection | Typed lead workflows |
| Content | /blog, existing article paths | Preserved useful articles |
| Legal | /privacy, /terms | Reviewed legal content |
| Staff | /admin/login, /admin/* | Protected operational application |

Primary header: Machines, Services, Find a Machine, Sell Your Machine, Company; language and contact actions. Brands, About, Insights and Contact remain accessible through navigation groups/footer without forcing nine top-level items onto mobile.
Public inventory and content are separate from the staff workspace. Customer requests share a contact component but preserve category-specific fields. No cart or checkout. Brand/category pages are published only when backed by real inventory or existing relevant content.

Entity navigation: category -> manufacturer-filtered stock -> machine -> inquiry; lead -> machine/history -> activity; import -> validated rows -> draft machines; content -> locale -> SEO -> publication state.
