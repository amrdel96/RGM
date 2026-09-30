# Wireframes — structure proposal

These are wireframes, not completed product screens. Placeholder rectangles mean approved assets are needed, not fabricated stock.

## Homepage — desktop
```
LOGO | Machines | Services | Find | Sell | Company | EN/AR
-------------------------------------------------------
Used printing machinery.       [Approved machinery photo]
Sourced globally.              [omit until supplied]
[Search manufacturer/model/code________________ Search]
[Browse Machines] [Tell Us What You Need]
-------------------------------------------------------
Latest available machinery                     View all
[Machine card]        [Machine card]        [Machine card]
If no verified stock: helpful empty state + sourcing CTA
-------------------------------------------------------
Browse category / manufacturer (real published records)
Company introduction | source-backed service summaries
Sell your machine | existing article previews
Country contact locations | contact | legal footer
```
Mobile: compact logo/language/menu; hero, full-width search, cards in one column, company/services lower down. No fake counts or trust badges.

## Machinery listing
```
Breadcrumb      Machines
[Search_______________________] [Sort: Newest] [Grid/List]
Filters (280px) | Result count + active filter chips
Category       | [card] [card] [card]
Manufacturer   | [card] [card] [card]
Year range     | [Pagination]
Relevant specs | [Can't find it? Request a machine]
[Clear all]    |
```
Mobile filters open an accessible drawer, preserve URL query state, include Apply/Clear; results count announced after updates. Invalid filters return validation guidance. No matches offers clear filters and sourcing; failures offer retry.

## Machine detail
```
Breadcrumb: Machines > category
[Large real image / gallery] | Title, year, code, location
[Thumbnail strip]           | Price on Request
                            | [Request Price] [WhatsApp]
--------------------------------------------------------
Key specifications table | Configuration | Description
Video/document sections only if approved media exists
Inquiry: name/company/country/email/phone/message/consent
Machine context prefilled server-side, not customer typed
Related AVAILABLE machines | relevant service CTA
```
Mobile gallery first, summary, specifications, inquiry. Sticky Request Price/WhatsApp bar respects safe area and form/consent controls. Sold URL displays no historical machine data.

## Staff dashboard
```
Sidebar          | Overview / data-derived counts
Inventory        | New leads / failed communication jobs
Leads            | Recent activity
Content          | Draft machines / configuration tasks
Communications   |
Settings         |
```
Lead detail splits customer/request from activity and status. On mobile sections stack with persistent context. Permission-hidden areas also remain server-denied.
