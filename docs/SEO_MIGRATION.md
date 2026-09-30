# SEO migration strategy

The per-URL working map is URL_INVENTORY.csv: 19 observed page/article records, old URL, proposed new path, redirect decision and migration status. It is not an approved launch inventory.

Retain all twelve existing English article paths and /blog/. Redirect /shop/ -> /machines, /service/ -> /services, /contact-us/ -> /contact and /about-used-offset-priniting-machine/ -> /about with HTTP 301 after destination content is ready. Use explicit 301 responses; Next.js permanentRedirect defaults must not be assumed to produce 301.

Do not redirect /under-construction/ to an unrelated page. Review any traffic/backlinks; replace navigation links with valid legal/FAQ destinations and use 410 only if removal is approved and no replacement exists. Do not preserve public preview nonce queries as canonical URLs.

For sold machine URLs, use a real relevant successor where one exists; otherwise return 410 with helpful navigation and no sold-machine data. A blanket category redirect risks a soft 404. Do not expose historical machine details via metadata, schema, images endpoint or cached JSON. Retain internal history.

Prelaunch: combine this API inventory with XML sitemaps, crawl pagination, WordPress export, Search Console landing pages and access logs. Record status, canonical, title, description, language, image links and inbound-link importance. Reconcile all URLs, including attachment, category, tag, author, query and product paths. Test every redirect for one hop, valid final status and equivalent content. Detect loops and conflicts; retain query tracking only where safe. Do not use automatic redirects to root.

Launch gate: migration owner reviews coverage and content parity; every important legacy URL resolves or has an explicit reviewed disposition. Compare postlaunch crawl and Search Console errors, monitor organic landing pages, keep redirect history and rollback configuration. No launch has occurred.
