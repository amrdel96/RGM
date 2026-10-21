# RGM source mapping

This maps every current public WordPress page found in `migration/source/pages.json` before redirecting the old site.

| Existing URL | New platform route | Treatment |
|---|---|---|
| `/` | `/` | Import approved homepage copy into the `home` content record; preserve the new homepage layout. |
| `/about-used-offset-priniting-machine/` | `/about` | Import full company story and capability statements into the `about` record. |
| `/contact-us/` | `/contact` | Move branch addresses, named contacts, phones and emails into Site settings; retain the lead form. |
| `/service/` | `/services` | Split the source into editable service records: cylinder repair, installation and maintenance, packing and shipment; retain existing dismantling, relocation and after-sales records. |
| `/shop/` | `/machines` | Replace the under-construction shop with live RGM inventory. |
| `/blog/` | `/blog` | Preserve imported WordPress articles and their original dates/URLs. |
| `/under-construction/` | none | Do not migrate as a public page. The source is a placeholder used for Privacy Policy and FAQ links. |

## Source gaps that must not be invented

- The old Privacy Policy and FAQ links point to an under-construction placeholder, so there is no approved legal or FAQ copy to migrate.
- The old Shop page itself has no inventory. The new inventory source is the RGM vendor catalogue on SouqPress.
- Some SouqPress product cards point at placeholder SVG images. The importer will use the first real product-gallery image where present, otherwise keep the machine without an image for staff completion.

## SouqPress inventory mapping

The vendor catalogue contains 29 product cards across three pages. The importer stores 20 current cards as `AVAILABLE` and nine explicitly sold cards as `SOLD`. Sold records remain internal and are excluded from all public catalogues by design.

Each record keeps its source URL in the internal machine record, imports the publicly listed product name, description and specifications, creates a permanent RGM code, and stores one source image through the configured storage provider.
