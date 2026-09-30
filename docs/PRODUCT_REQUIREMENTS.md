# RGM — ROZA GRAPHIC MACHINERY
## FINAL MASTER BUILD PROMPT
### Complete Bilingual Website, Machinery Inventory, Admin Dashboard, Lead Management, Email & WhatsApp Automation Platform

You are the senior product, UX/UI, software engineering, SEO, DevOps, security, and QA team responsible for rebuilding the complete digital platform of:

**Roza Graphic Machinery — RGM**

Current website:

https://rgmachinery.com/

This project is NOT a landing page and NOT a cosmetic redesign.

Build a complete production-ready website and machinery sales platform that combines:

- Corporate company website
- Used machinery inventory
- Advanced machine search
- Machine detail pages
- Admin dashboard
- Manual machine creation
- Bulk machine import
- Lead management
- Automatic customer emails
- Automatic WhatsApp follow-up
- Internal sales notifications
- Service inquiry workflows
- Find-a-Machine workflow
- Sell-Your-Machine workflow
- Bilingual English / Arabic interface
- Existing content migration
- SEO migration
- Analytics
- Secure role-based administration
- Production deployment architecture

The project must be designed so that RGM staff can operate the website after launch without needing a developer for ordinary work.

---

# 1. COMPANY

Company name:

**Roza Graphic Machinery**

Brand abbreviation:

**RGM**

Existing website:

https://rgmachinery.com/

Primary business:

Trading used printing, packaging, prepress and postpress machinery internationally, while providing technical and machinery-related services.

Primary markets:

1. Saudi Arabia
2. UAE
3. Egypt
4. Africa
5. Europe
6. Worldwide

The website must feel international rather than limited to one country.

---

# 2. BRAND RULES

Keep the existing RGM:

- Logo
- Brand colors
- Core visual identity

Do NOT redesign the logo.

Do NOT arbitrarily change existing brand colors.

Use modern professional fonts suitable for:

- English
- Arabic
- Industrial B2B content
- Technical specifications

Arabic typography must be properly designed rather than treated as a translated English layout.

RGM will provide:

- Logo files
- Brand assets
- Company images
- Warehouse / machinery images where available
- Registered location information
- Contact information
- Social media links

Do not invent missing assets.

---

# 3. DESIGN REFERENCES

Use these websites as general UX references:

https://machinex.com/

https://dpm.uk.com/gb/

Do NOT copy their design, code, content, photography, wording or visual identity.

Learn from:

Machinex:
- Strong corporate positioning
- Combination of company introduction and machinery sales
- Machinery-first presentation
- Latest arrivals
- Sell Your Machine journey
- Clean industrial look

DPM:
- Machinery catalog usability
- Stock filtering
- Machine technical information
- Category navigation
- Manufacturer filtering
- Clear enquiry flow

The new RGM platform should combine:

**Modern corporate presentation similar in quality to Machinex**

with

**Powerful machinery search and inventory usability similar to DPM**

while creating an original RGM design.

The result should feel cleaner, newer and more premium than a traditional used-machinery website.

---

# 4. PRIMARY WEBSITE OBJECTIVE

The website must accomplish two equally important objectives.

## Corporate objective

Explain:

- Who RGM is
- What RGM does
- Markets covered
- Services
- Technical expertise
- Company capabilities
- Contact channels

## Commercial objective

Enable customers to:

- Find machinery
- Search machinery
- Filter machinery
- Understand machinery specifications
- View photos
- View videos
- Request price
- Send inquiry
- Receive machine information automatically
- Contact RGM through WhatsApp
- Ask RGM to source a machine
- Offer machinery for sale
- Request technical services

The website must never feel like a corporate brochure where machinery inventory is hidden.

Machinery must be central to the experience.

---

# 5. CORE USER JOURNEY

A typical customer should be able to:

Visit RGM website

→ Search for a machine

→ Open machine detail page

→ Review specifications

→ Review photos/videos

→ Submit inquiry

→ Lead is saved in RGM database

→ Internal RGM notification is generated

→ Customer receives automatic email

→ Customer receives automatic WhatsApp message when WhatsApp integration is enabled

→ Sales team sees lead inside Admin Dashboard

→ Sales team follows the opportunity

The system must preserve the lead even when email or WhatsApp delivery fails.

Database persistence happens BEFORE external communication attempts.

---

# 6. LANGUAGES

The website must launch with:

**English**

and

**Arabic**

Requirements:

- Full English LTR interface
- Full Arabic RTL interface
- Proper Arabic navigation
- Proper Arabic forms
- Proper Arabic machine pages
- Proper Arabic service pages
- Localized metadata
- Localized URLs where technically appropriate
- Language switcher
- Switching language should preserve the equivalent current page

Do NOT use poor literal translation.

Technical printing terminology should remain understandable to printing-industry professionals.

Where technical English machine terms are commonly used in Arabic markets, preserve accepted terminology.

Admin interface may initially be English if needed, but public website must support both English and Arabic.

---

# 7. CONTENT MIGRATION RULE

Do NOT create a new Knowledge Center strategy.

RGM already has existing website content.

Preserve and migrate useful existing:

- About content
- Service content
- Blog/articles
- Company information
- SEO-relevant pages

Do not automatically delete existing indexed content.

Audit the current site.

Create a migration map:

Old URL

→ New URL

Where URL changes are necessary, create permanent 301 redirects.

Do not create a large new blog or content program unless RGM explicitly requests it later.

---

# 8. COMPANY LOCATIONS

RGM has registered presence / contact locations.

However:

Do NOT describe every listed location as a physical office unless explicitly confirmed.

Do not invent:

- Office photos
- Buildings
- Physical facilities
- Warehouse locations
- Staff locations

If a location is only a registered business/contact location, represent it accurately.

Contact/location information must be editable in Admin.

---

# 9. CONTACT INFORMATION ARCHITECTURE

RGM has approximately:

- 4–5 WhatsApp / phone numbers
- 4–5 email addresses
- Multiple country contact details
- Social media accounts

All contact information must be stored in centralized Site Settings.

Never hardcode contact information throughout individual components.

Admin must be able to modify:

- Primary phone
- Primary WhatsApp
- Saudi contacts
- UAE contacts
- Egypt contacts
- General email
- Inquiry email
- Service email
- Other departmental emails
- Social media links

Current dedicated inquiry email is NOT yet permanently finalized.

The architecture should support a configurable email address such as:

`inquiry@rgmachinery.com`

but administrators must be able to change it without code deployment.

---

# 10. WHATSAPP STRATEGY

There are two different WhatsApp requirements.

## A. Public Website WhatsApp Button

Use ONE primary WhatsApp number for the main floating inquiry button.

This number must be configurable from Admin.

For machine pages, create machine-specific WhatsApp links.

Example message:

Hello RGM,

I am interested in this machine:

Heidelberg CD 102-5+L  
Year: 1996  
Code: RGM-M-000125

Machine URL:
[URL]

Please send me the current details and availability.

The exact message template must support English and Arabic.

---

## B. Country Contact Numbers

General RGM contact pages and appropriate company areas may display different contact numbers for:

- Saudi Arabia
- UAE
- Egypt

Do not clutter every machine page with all company numbers.

---

# 11. AUTOMATIC WHATSAPP FOLLOW-UP

RGM wants customers who submit a machine inquiry to automatically receive a WhatsApp message.

This requires an official integration such as:

- Meta WhatsApp Business Platform
- WATI
- another approved provider

Build a WhatsApp provider abstraction.

Do NOT tightly couple business logic directly to one vendor.

Create an architecture such as:

`WhatsAppProvider`

with implementations that can later support:

- WATI
- Meta Cloud API
- Other approved providers

If credentials are not available during initial development:

- Build the integration layer
- Build webhook support where applicable
- Build template configuration
- Build logging
- Add environment flags
- Provide mock/test mode
- Do not block the rest of the website

Automatic outbound WhatsApp messages must use approved templates when platform rules require them.

Do not attempt unauthorized WhatsApp Web automation.

---

# 12. MACHINE DATABASE — SOURCE OF TRUTH

The **Admin Dashboard database** is the official source of truth for machinery.

Do NOT use:

- Google Sheets
- WordPress posts
- WooCommerce products
- email inbox
- spreadsheets

as the permanent inventory source.

Machines may be imported from spreadsheets, but after import the website database becomes the source of truth.

---

# 13. MACHINE CREATION

Admin must be able to add machines:

## Method 1 — Manually

One machine at a time.

## Method 2 — Bulk Upload

Using an Excel / CSV import template.

Both methods must ultimately create the same database structure.

---

# 14. MACHINE CODING SYSTEM

Start a completely new machine coding system.

Suggested public format:

`RGM-M-000001`

`RGM-M-000002`

`RGM-M-000003`

etc.

Requirements:

- Automatically generated
- Unique
- Permanent
- Sequential or safely generated according to implementation
- Never duplicated
- Never reused

If machine `RGM-M-000014` becomes sold, deleted from public inventory or archived:

**RGM-M-000014 must never be assigned again.**

Machine codes are permanent historical identifiers.

---

# 15. MACHINE STATUS

Support at least:

- Draft
- Available
- Reserved
- Sold
- Archived

Default public inventory should include only:

**Available**

and optionally:

**Reserved**

depending on RGM configuration.

---

# 16. SOLD MACHINES

Business rule:

When a machine is marked:

**SOLD**

it must disappear completely from the public website.

Remove it from:

- Stock list
- Search
- Brand pages
- Category pages
- Related machines
- Sitemap where appropriate
- Public API responses

However:

DO NOT physically delete the database record.

Preserve internally:

- Machine code
- Machine details
- Past inquiries
- Leads
- Historical transaction data
- Internal records

This is important for auditability.

Public URL handling should be designed carefully for SEO.

If an old sold-machine URL receives traffic, use the most appropriate SEO-safe strategy such as redirecting to a relevant category or machine search page, according to the migration/SEO plan.

---

# 17. MACHINE PRICE RULE

Default public pricing policy:

**PRICE ON REQUEST**

Every machine has one RGM Selling Price.

Each machine also has:

- Currency
- Selling Price
- Price visibility settings

Never invent prices.

Possible currencies include but are not limited to:

- EUR
- USD
- GBP
- SAR
- AED
- EGP

Currency must be stored separately from numeric price.

---

# 18. PRICE DISPLAY SETTINGS

Every machine must have configuration such as:

Selling Price:
`195000`

Currency:
`EUR`

Show Price on Website:
`NO`

Send Price Automatically by Email:
`YES / NO`

Default:

**Show Price on Website = NO**

Website shows:

**Price on Request**

If:

`Send Price Automatically by Email = YES`

then the customer's automatic email may include the Selling Price.

If:

`Send Price Automatically by Email = NO`

email displays:

“Our sales team will contact you shortly with the current commercial offer.”

Arabic equivalent must also exist.

Never expose price unless machine settings permit it.

---

# 19. INTERNAL COMMERCIAL DATA

The system architecture should support optional internal-only fields for future use, such as:

- Supplier
- Supplier contact
- Purchase price
- Cost
- Commission
- Internal notes
- Source URL
- Internal machine status notes

Even if not all fields are used immediately, design database separation correctly.

STRICT RULE:

Internal commercial fields must never leak into:

- Frontend
- HTML source
- public APIs
- emails to customers
- SEO metadata
- JSON-LD
- JavaScript bundles
- analytics events

Authorization must be enforced server-side.

---

# 20. MACHINE DATA MODEL

Create a comprehensive Machine entity.

At minimum support:

## Identity

- Internal database ID
- Public machine code
- English slug
- Arabic slug where required
- Status

## Basic Information

- Machine name
- Manufacturer
- Model
- Year
- Category
- Subcategory
- Machine type

## Offset-specific information

When relevant:

- Number of colors
- Perfecting configuration
- Coating
- Maximum sheet size

## Technical Data

- Impressions / counter
- Operating hours where relevant
- Serial number
- Condition
- Location
- Description
- Configuration / equipment
- Additional specifications

Not all fields apply to every machine category.

Build flexible conditional forms in Admin.

Example:

Digital machines should not be forced to have offset-specific fields.

Die-cutters should not require color count.

---

# 21. MACHINE MEDIA

Support:

- Primary image
- Multiple gallery images
- Reordering images
- High-resolution machine photos
- Video URLs
- YouTube
- Vimeo if required
- Hosted video if architecture allows
- PDF specification sheets
- Optional machine documents

Image requirements:

- Automatic optimization
- Responsive sizes
- WebP / AVIF where supported
- Lazy loading
- Proper alt text
- Zoom
- Fullscreen gallery
- Thumbnail navigation

Never rely on original multi-megabyte images directly for standard page loading.

---

# 22. MACHINE NAME

Provide structured machine naming.

Suggested pattern where appropriate:

**Manufacturer + Model + Colors + Size + Year + Machine Type**

However:

Do not force unnecessary details into every title.

Admin should be able to manually override generated machine title.

---

# 23. MACHINE LIST / STOCK LIST PAGE

Main route:

`/machines`

Arabic equivalent according to routing strategy.

Create a modern professional inventory page.

Desktop layout:

- Search
- Filters
- Results
- Sorting
- Grid/List toggle where useful

Mobile:

- Search
- Results
- Filters in drawer / modal
- Sticky filter button where appropriate

---

# 24. MACHINERY FILTERS

Support appropriate filters such as:

- Category
- Subcategory
- Manufacturer
- Model
- Year from
- Year to
- Colors
- Sheet size
- Perfecting
- Coating
- Location
- Availability

Filters should depend on category when possible.

For example:

Number of Colors is useful for offset presses but irrelevant for many finishing machines.

Use contextual filtering.

---

# 25. SEARCH

Search should support terms such as:

- Heidelberg
- SM 102
- SM102
- CD 102
- CD102
- 5 color
- 5 colour
- Bobst
- Polar 115
- 2005 Heidelberg
- RGM-M-000125

Support:

- Brand
- Model
- Machine code
- Category
- Specifications
- Relevant description text

Search should be tolerant of common formatting differences.

Example:

`SM102`

should be capable of finding:

`SM 102`

when technically practical.

---

# 26. MACHINE CARD

Every machine card should display only important purchasing information.

Suggested fields:

- Main photo
- Machine name
- Machine code
- Year
- Manufacturer
- Model
- Category
- Colors when relevant
- Sheet size when relevant
- Location
- Availability

Actions:

- View Details
- Request Price

Do not overload cards with complete technical specifications.

---

# 27. MACHINE DETAIL PAGE

This is one of the most important pages in the platform.

Suggested structure:

## Section 1 — Hero / Machine Summary

- Large image/gallery
- Machine name
- Machine code
- Manufacturer
- Model
- Year
- Status
- Location
- Price on Request
- Request Price button
- WhatsApp button

## Section 2 — Key Technical Specifications

Structured information.

## Section 3 — Configuration

Technical equipment list.

## Section 4 — Description

Professional machine description.

## Section 5 — Gallery

Photos.

## Section 6 — Videos

Only if videos exist.

## Section 7 — Documents

Specification PDF where available.

## Section 8 — Inquiry Form

## Section 9 — Related Machines

Only available relevant machines.

## Section 10 — Services CTA

Inspection / shipping / related services where appropriate.

---

# 28. MACHINE INQUIRY FORM

Every machine must have a clear inquiry form.

Recommended fields:

- Full Name
- Company Name
- Country
- Email
- WhatsApp / Phone
- Message
- Privacy consent where required

Do not require customer to manually type:

- Machine code
- Machine model
- Machine URL

The system already knows these values.

Automatically capture:

- Machine database ID
- Machine code
- Machine title
- Machine URL
- Customer language
- Page source
- UTM campaign
- UTM source
- UTM medium
- Referrer
- Submission timestamp

---

# 29. PRODUCT INQUIRY WORKFLOW

When customer submits an inquiry:

1. Validate request server-side.
2. Apply spam protection.
3. Save Lead in database.
4. Link Lead to machine.
5. Store marketing attribution.
6. Create internal sales notification.
7. Send customer automatic email.
8. Attempt customer automatic WhatsApp message.
9. Log email result.
10. Log WhatsApp result.
11. Display success state / Thank You page.

CRITICAL:

The lead must remain safely stored even when:

- Email fails
- WhatsApp fails
- API is temporarily unavailable
- external provider times out

Never make external message delivery a prerequisite for saving the lead.

---

# 30. CUSTOMER AUTOMATIC EMAIL

After machine inquiry, send a branded RGM email.

Email should use customer's preferred website language.

Possible subject:

**Your Inquiry — Heidelberg CD 102-5+L | RGM-M-000125**

Arabic equivalent must exist.

Include:

- Customer first name
- Thank-you message
- RGM logo
- Main machine image
- Machine full name
- Machine code
- Manufacturer
- Model
- Year
- Key specifications
- Location
- Availability
- Short configuration
- Price according to machine email-price setting
- View Machine button
- View Gallery button where useful
- Watch Video button if video exists
- Download Specifications button if PDF exists
- WhatsApp button
- RGM contact information

Never include:

- Supplier
- Internal notes
- Cost
- Supplier price
- Internal commission
- confidential information

---

# 31. CUSTOMER EMAIL MEDIA

Do NOT attach 15–30 machine photos directly to email.

Recommended strategy:

- Main machine image inside email
- Optional 1–2 supporting optimized images
- Button to machine gallery
- Button to video
- Button to PDF specification

This protects email deliverability.

---

# 32. INTERNAL LEAD EMAIL

Send an internal email to the configured inquiry email.

Current expected format:

`[CONFIGURABLE]@rgmachinery.com`

Example destination may later be:

`inquiry@rgmachinery.com`

but do NOT permanently hardcode it.

Internal email should include:

- Lead ID
- Customer name
- Company
- Country
- Email
- WhatsApp
- Customer message
- Machine
- Machine code
- Machine URL
- Selling price
- Currency
- Lead source
- UTM campaign
- Date
- Time
- Customer language

Quick actions:

- Open Lead
- Open Machine
- Email Customer
- WhatsApp Customer

---

# 33. EMAIL INFRASTRUCTURE

Current RGM mailbox provider:

**Hostinger Mail**

Initial production architecture may use Hostinger SMTP if appropriate.

However:

Build email sending behind a provider abstraction.

Example:

`EmailProvider`

Possible providers:

- Hostinger SMTP
- Resend
- Postmark
- other transactional provider

The website must not require major rewriting if RGM later moves automated emails to a dedicated transactional email provider.

---

# 34. EMAIL SETTINGS

Admin / environment configuration should support:

- Sender Name
- Sender Email
- Reply-To Email
- Internal Inquiry Email
- General Contact Email
- Service Inquiry Email
- SMTP / provider configuration
- Test mode

Never expose email credentials in public code.

---

# 35. EMAIL LOGGING

Store logs for automatic emails:

- Lead ID
- Machine ID
- Recipient
- Email template
- Provider
- Provider Message ID when available
- Status
- Created time
- Sent time
- Failure reason
- Retry count if implemented

Possible statuses:

- Pending
- Sent
- Delivered where provider supports
- Failed
- Bounced where provider supports

---

# 36. WHATSAPP CUSTOMER MESSAGE

After successful machine inquiry, customer should receive a machine-specific WhatsApp message when API credentials and approved templates are enabled.

Example:

Hello Ahmed,

Thank you for contacting Roza Graphic Machinery.

You requested information about:

Heidelberg CD 102-5+L  
Year: 1996  
Code: RGM-M-000125

Machine details:
[URL]

Our team will contact you regarding availability and commercial details.

Roza Graphic Machinery

Create Arabic equivalent.

Do not send full photo galleries through WhatsApp automatically unless explicitly configured later.

Use link to machine page.

---

# 37. WHATSAPP LOGGING

Track:

- Lead
- Customer number
- Machine
- Template
- Provider
- Attempt status
- Provider message ID
- Sent time
- Failed reason

Admin should be able to see whether automatic WhatsApp follow-up succeeded.

---

# 38. PUBLIC CONTACT PAGE

Create a professional Contact page.

Include configurable RGM contact information.

Potential sections:

- General inquiry
- Saudi Arabia contact
- UAE contact
- Egypt contact
- Emails
- Phone / WhatsApp
- Registered addresses
- Social media

Do NOT call something an “office” unless RGM has explicitly confirmed it is an office.

Use terminology such as:

- RGM Saudi Arabia
- RGM UAE
- RGM Egypt
- Contact Location

according to approved company data.

---

# 39. HOMEPAGE

Build the homepage around machinery discovery and company trust.

Recommended structure:

1. Header
2. Hero
3. Machine Search
4. Latest / Featured Machines
5. Browse by Category
6. Browse by Manufacturer
7. Find a Machine CTA
8. RGM Introduction
9. Services
10. Why RGM
11. Sell Your Machine CTA
12. Selected projects / company imagery if approved
13. Existing insights/articles preview
14. Country contact / international presence
15. Final CTA
16. Footer

---

# 40. HOMEPAGE HERO

Avoid generic:

“Welcome to Roza Graphic Machinery.”

Primary positioning should focus on the customer's buying intent.

Suggested direction:

**USED PRINTING MACHINERY.  
SOURCED GLOBALLY.**

Supporting text:

Buy, sell and source used printing, packaging and finishing machinery with RGM's technical and commercial support.

CTA:

**Browse Machines**

Secondary CTA:

**Tell Us What You Need**

Include search.

Example placeholder:

Search Heidelberg SM 102, CD 102, Bobst, Polar...

---

# 41. ABOUT RGM

Migrate and improve the current About Us content from the existing website.

Do not invent corporate history.

Create a premium page using:

- Existing company story
- Real company images
- Existing experience
- Markets served
- Technical capabilities
- Contact locations
- Machinery expertise

Rewrite copy for clarity where required without changing factual meaning.

---

# 42. SERVICES

Existing RGM website contains detailed service information.

Audit and migrate those services.

Possible examples may include:

- Machinery sourcing
- Technical inspection
- Installation
- Commissioning
- Dismantling
- Relocation
- Packing
- Loading
- Shipping
- Maintenance
- Cylinder repair
- Technical assistance

Final service list must be based on real existing RGM information.

Do NOT invent services that RGM does not provide.

---

# 43. SERVICE DETAIL PAGE

Each service should have:

- Clear title
- Short overview
- Real service images if available
- What is included
- Process
- Relevant machine types
- Contact CTA
- Service inquiry form
- WhatsApp CTA

Service inquiry must create a Lead.

---

# 44. FIND A MACHINE

Create prominent page:

`/find-a-machine`

Purpose:

Customer cannot find required machine in current inventory.

Form should support:

- Category
- Manufacturer
- Model
- Year From
- Year To
- Number of Colors where relevant
- Sheet Size
- Coating
- Perfecting
- Budget
- Currency
- Preferred machine region
- Destination country
- Additional technical requirements
- Name
- Company
- Country
- Email
- WhatsApp

Lead type:

`MACHINE_WANTED`

After submission:

- Save Lead
- Notify RGM
- Email customer
- WhatsApp customer if automation enabled

---

# 45. SELL YOUR MACHINE

Create:

`/sell-your-machine`

Customer fields:

- Name
- Company
- Country
- Email
- WhatsApp

Machine fields:

- Manufacturer
- Model
- Year
- Serial Number
- Counter / Impressions
- Location
- Condition
- Expected Price
- Currency
- Description

Upload support:

- Machine photos
- Specification PDF
- Video URL

Lead/submission type:

`SELL_MACHINE`

Securely validate uploads.

Do not automatically publish seller machines.

They must be reviewed by RGM Admin.

---

# 46. REQUEST INSPECTION

Include:

`/request-inspection`

Fields may include:

- Manufacturer
- Model
- Year
- Machine location
- Seller details if available
- Requested timeframe
- Destination country
- Customer details
- Comments

Uploads:

- Machine offer
- Photos
- Specification PDF

Lead type:

`INSPECTION_REQUEST`

---

# 47. EXISTING ARTICLES / BLOG

Migrate the existing articles that are useful.

Preserve:

- Content
- Images
- Original dates where appropriate
- SEO metadata where useful
- Search-engine equity
- Relevant URLs where possible

Do not create fake articles.

Do not generate dozens of AI SEO pages.

Create a simple modern:

**Insights / Blog**

section only for existing/future RGM articles.

---

# 48. BRAND PAGES

Create pages for manufacturers that actually have inventory or relevant content.

Example structure:

`/brands/heidelberg`

Page contains:

- Brand heading
- Available RGM machines from this manufacturer
- Relevant categories
- Existing relevant articles if any
- Find a Machine CTA

Avoid writing long generic AI-generated manufacturer history simply for SEO.

---

# 49. CATEGORY STRUCTURE

Create flexible machine taxonomy.

Possible categories include:

- Sheetfed Offset
- Web Offset
- Digital Printing
- Flexographic
- Prepress
- Cutting
- Folding
- Die Cutting
- Binding
- Folder Gluing
- Packaging
- Laminating
- CTP
- Other Machinery

Do not finalize category taxonomy purely from guesses.

Admin must manage:

- Categories
- Subcategories
- Category display order
- Category images
- Arabic name
- English name
- SEO fields

---

# 50. ADMIN DASHBOARD

Build a professional custom Admin Dashboard.

Main areas:

- Dashboard
- Machines
- Add Machine
- Bulk Import
- Categories
- Manufacturers
- Leads
- Machine Wanted
- Sell Machine Submissions
- Inspection Requests
- Services
- Existing Articles
- Pages
- Media
- Email Logs
- WhatsApp Logs
- Users
- Redirects
- SEO Settings
- Contact Settings
- Site Settings

---

# 51. ADMIN ROLES

Required roles:

## ADMIN

Full control.

Can manage:

- Users
- Machines
- Prices
- Internal commercial information
- Leads
- Website content
- Services
- Contacts
- Email
- WhatsApp settings
- SEO
- Integrations
- Website configuration

---

## SALES

Can access:

- Machines
- Public selling price
- Leads
- Machine inquiries
- Machine wanted requests
- Customer contact details
- WhatsApp actions
- Email actions
- Sales notes
- Lead statuses

Can:

- Contact customers
- Add notes
- Update lead status

Sales must NOT automatically receive full system administration privileges.

---

## MARKETING

Can access:

- Public website content
- Images
- Existing articles
- Homepage content
- SEO
- Meta titles
- Meta descriptions
- banners
- analytics reporting where implemented

Marketing must NOT receive unnecessary access to:

- confidential supplier data
- sensitive internal prices/costs
- system security configuration

Implement authorization server-side.

---

# 52. MACHINE ADMIN FORM

Machine creation UI should be easy for a non-developer.

Use logical tabs/sections.

Example:

## General

- Status
- Machine code
- Machine name
- Manufacturer
- Model
- Year
- Category
- Subcategory

## Technical

Dynamic fields according to machine category.

## Commercial

- Selling price
- Currency
- Website price visibility
- Automatic email price visibility

## Location

- Machine country
- City / region if approved
- Location display text

## Configuration

Structured specification entries.

## Description

English description

Arabic description

## Media

- Primary image
- Gallery
- Video
- PDF

## SEO

- English title
- English description
- Arabic title
- Arabic description
- Slugs

## Internal

Admin-only information where enabled.

---

# 53. BULK IMPORT

Create Bulk Import in Admin.

Support:

- XLSX
- CSV

Provide:

**Download Import Template**

Suggested columns:

- Manufacturer
- Model
- Year
- Machine Name
- Category
- Subcategory
- Colors
- Sheet Size
- Impressions
- Serial Number
- Condition
- Location
- Selling Price
- Currency
- English Description
- Arabic Description
- Configuration
- Video URL
- Status

Machine Code should usually be generated by system rather than manually imported.

---

# 54. BULK IMPORT VALIDATION

Never directly publish an uploaded spreadsheet without review.

Workflow:

Upload File

→ Parse

→ Validate

→ Preview

→ Display Issues

Example result:

48 machines found

46 valid

2 require correction

For every invalid row show:

- Row number
- Problem
- Required action

Then provide:

**Import Valid Machines**

or

**Cancel**

Optional:

Publish imported machines immediately

or

Import as Draft

Default should preferably be:

**Draft**

for safety.

---

# 55. LEAD DATABASE

Create structured Lead entity.

Suggested fields:

- Lead ID
- Lead Type
- Customer Name
- Company
- Country
- Email
- WhatsApp
- Language
- Message
- Machine ID if applicable
- Machine Code if applicable
- Source
- UTM Source
- UTM Medium
- UTM Campaign
- Referrer
- Landing Page
- Created Date
- Lead Status
- Assigned User
- Internal Notes

---

# 56. LEAD TYPES

At least:

- MACHINE_INQUIRY
- MACHINE_WANTED
- SELL_MACHINE
- INSPECTION_REQUEST
- SERVICE_INQUIRY
- GENERAL_CONTACT

---

# 57. LEAD STATUS

Support:

- New
- Contacted
- Qualified
- Offer Sent
- Negotiation
- Won
- Lost
- Spam

Allow Sales/Admin notes.

Track:

- Created by
- Created date
- Last updated date
- Assigned sales person

---

# 58. ADMIN LEAD VIEW

Lead page should clearly show:

Customer

Contact data

Machine

Machine code

Machine price

Original customer request

Lead source

Campaign

Timeline

Email activity

WhatsApp activity

Sales notes

Lead status

Assigned salesperson

Actions:

- Email
- WhatsApp
- Change status
- Add note
- Assign
- Open machine

---

# 59. DASHBOARD REPORTING

Admin dashboard should display useful live information such as:

- New leads
- Leads today
- Leads this month
- Machine inquiries
- Machine Wanted requests
- Sell Machine requests
- Available machines
- Most viewed machines
- Most inquired machines
- Lead source
- Customer countries
- Failed customer emails
- Failed WhatsApp messages

Do not fabricate statistics.

Only show data available from real database events.

---

# 60. WEBSITE EMAIL CTA

Important site pages should clearly expose email/contact options.

However:

Do not place large duplicate forms on every page.

Use:

- Contextual CTA
- Contact button
- WhatsApp
- Inquiry form where relevant

For example:

Machine page:

Request Price + WhatsApp

Service page:

Request Service + WhatsApp

About:

Contact RGM

---

# 61. HEADER

Suggested desktop navigation:

RGM Logo

Machines

Brands

Services

Find a Machine

Sell Your Machine

About RGM

Insights

Contact

Right-side actions:

- Search
- EN / AR
- WhatsApp
- Request a Machine

Keep navigation clean.

---

# 62. MOBILE HEADER

Mobile:

- Logo
- Search
- Menu
- Language
- Optional WhatsApp quick action

Avoid overcrowding.

---

# 63. MOBILE MACHINE PAGE

Create sticky bottom actions:

**WhatsApp**

**Request Price**

Only on relevant machine pages.

Make sure sticky bar does not cover:

- forms
- cookie controls
- browser controls
- important content

---

# 64. FOOTER

Include:

Machines

Popular Categories

Manufacturers

Services

Find a Machine

Sell Your Machine

About

Existing Insights

Contact

Privacy Policy

Terms

Configurable:

- Phone
- WhatsApp
- Email
- Country contacts
- Social media links

---

# 65. VISUAL SYSTEM

Build a reusable design system.

Define:

- Brand colors
- Neutral colors
- Typography
- Arabic typography
- Headings
- Body text
- Containers
- Spacing scale
- Borders
- Radius
- Shadows
- Buttons
- Form components
- Inputs
- Dropdowns
- Cards
- Badges
- Tables
- Filter controls
- Modals
- Admin components
- Navigation
- Footer
- Machine cards

Avoid random one-off styling.

---

# 66. VISUAL STYLE

The website should feel:

- Industrial
- Premium
- Modern
- Professional
- International
- Technical
- Trustworthy

Avoid:

- Excessive animations
- excessive rounded UI
- rainbow gradients
- overly futuristic AI design
- stock photos of fake business meetings
- giant sections with little information
- tiny typography
- old WordPress appearance
- cheap marketplace aesthetics

Use real machinery photography prominently.

---

# 67. PERFORMANCE

Design for hundreds and eventually thousands of machines.

Requirements:

- Efficient pagination
- Indexed database queries
- Optimized filters
- Image optimization
- Lazy loading
- CDN
- Server rendering / caching where appropriate
- Minimize JavaScript
- Good Core Web Vitals

Aim for strong Lighthouse results without sacrificing functionality.

---

# 68. ACCESSIBILITY

Follow WCAG AA principles where practical.

Support:

- Keyboard navigation
- Focus states
- Proper headings
- Form labels
- Input error states
- Good contrast
- Accessible modal behavior
- Alternative text
- Arabic accessibility

---

# 69. SEO

Implement full technical SEO.

Include:

- Semantic HTML
- SEO-friendly URLs
- Meta titles
- Meta descriptions
- Canonical URLs
- XML sitemap
- robots.txt
- hreflang for Arabic/English
- OpenGraph
- social images
- breadcrumbs
- structured data
- image alt text
- correct HTTP statuses
- 301 redirect system

Relevant structured data may include:

- Organization
- Product where suitable
- BreadcrumbList
- Article
- LocalBusiness only where factual
- FAQPage where appropriate

Never add misleading structured data.

---

# 70. URL STRUCTURE

Create clear readable URLs.

Examples:

`/machines`

`/machines/heidelberg-cd-102-5-l-1996-rgm-m-000125`

`/brands/heidelberg`

`/categories/sheetfed-offset`

`/services/machine-inspection`

`/find-a-machine`

`/sell-your-machine`

Arabic routing strategy must be consistent.

---

# 71. SEO MIGRATION

Audit existing RGM URLs before launch.

Create:

`docs/SEO_MIGRATION.md`

Include:

Old URL

New URL

Redirect required?

Status

Do not launch without migration review.

---

# 72. ANALYTICS

Prepare integration for:

- Google Analytics 4
- Google Tag Manager
- Google Search Console
- Meta Pixel if supplied later

Track events:

- machine_view
- machine_search
- filter_apply
- machine_inquiry_start
- machine_inquiry_submit
- whatsapp_click
- phone_click
- email_click
- machine_wanted_submit
- sell_machine_submit
- inspection_request_submit
- service_inquiry_submit
- video_click
- pdf_download

Capture UTM values into leads.

---

# 73. COOKIE / TRACKING CONSENT

Implement appropriate privacy/consent controls based on enabled analytics and target markets.

Do not load optional marketing trackers where consent is legally required until proper consent is obtained.

---

# 74. RECOMMENDED TECHNOLOGY

Use modern stable production technologies.

Recommended stack:

Frontend / Web Application:

**Next.js + React + TypeScript**

Styling:

**Tailwind CSS**

Database:

**PostgreSQL**

Recommended managed database:

**Supabase PostgreSQL**

ORM/database tooling:

Use a mature solution such as Prisma or another current stable production-grade equivalent if appropriate.

Media:

Use scalable object/image hosting.

Preferred option:

**Cloudinary**

or another equivalent service if there is a strong technical reason.

Email:

Provider abstraction.

Initial option:

**Hostinger SMTP**

Future recommended providers supported:

- Resend
- Postmark

WhatsApp:

Provider abstraction supporting:

- WATI
- Meta WhatsApp Business Platform

Hosting:

Preferred:

**Vercel**

unless a better technical reason is documented.

Do not use WordPress/WooCommerce merely because the old site may have used them.

This is a structured B2B inventory/lead platform, not a normal ecommerce cart.

---

# 75. NO SHOPPING CART

RGM machines are not consumer products.

Do NOT implement:

- Add to Cart
- Checkout
- online machine payment
- shopping basket

unless explicitly requested in the future.

Primary conversion is:

**Inquiry**

not checkout.

---

# 76. AUTHENTICATION

Admin must use secure authentication.

Do not implement custom password hashing/authentication unnecessarily.

Use a trusted current authentication system.

Requirements:

- Secure login
- Password reset
- Session expiry
- Secure cookies
- Brute-force protection where applicable
- Server-side role validation

---

# 77. SECURITY

Implement secure development practices.

At minimum:

- Server-side validation
- Rate limiting
- Anti-spam
- Safe file upload validation
- File type restrictions
- File size limits
- Safe filenames
- Protected admin APIs
- Proper authorization
- Secret management
- No production secrets in repository
- No sensitive internal data exposed client-side
- Secure headers
- Dependency auditing

Never trust frontend validation alone.

---

# 78. FORMS

All forms must include:

- Clear validation
- Required field indicators
- Error messages
- Loading state
- Success state
- Duplicate submission protection
- Spam mitigation

Avoid overly aggressive CAPTCHA unless necessary.

Prefer good user experience.

---

# 79. DATA PRIVACY

Customer information is private business data.

Do not expose lead data publicly.

Admin and authorized Sales users only.

Marketing access to personal lead information should be limited according to business requirements.

---

# 80. MEDIA STORAGE

Do not store large binary photos directly in relational database fields.

Store media in appropriate object/image storage.

Database should store:

- URL / object identifier
- filename
- media type
- metadata
- ordering
- alt text

---

# 81. ENVIRONMENT VARIABLES

Create:

`.env.example`

Never commit real credentials.

Possible variables:

DATABASE_URL

AUTH_SECRET

NEXT_PUBLIC_SITE_URL

EMAIL_PROVIDER

EMAIL_HOST

EMAIL_PORT

EMAIL_USER

EMAIL_PASSWORD

EMAIL_FROM

EMAIL_REPLY_TO

RGM_INQUIRY_EMAIL

WHATSAPP_PROVIDER

WHATSAPP_API_KEY

WHATSAPP_PHONE_NUMBER

WHATSAPP_TEMPLATE_NAME

CLOUDINARY / STORAGE credentials

GOOGLE_ANALYTICS_ID

GOOGLE_TAG_MANAGER_ID

META_PIXEL_ID

Only include examples/placeholders.

---

# 82. ENVIRONMENTS

Support:

- Local Development
- Staging
- Production

Staging must not accidentally send real customer automated emails or WhatsApp messages.

Provide safe/test configuration.

---

# 83. HOSTINGER

Current RGM email is hosted with:

**Hostinger Mail**

Do not migrate business email unless explicitly requested.

The website may be hosted separately while Hostinger continues providing mailboxes.

Architecture should allow:

Domain:
`rgmachinery.com`

Website hosting:
Vercel or equivalent

Email:
Hostinger Mail

Database:
Managed PostgreSQL

Media:
Cloudinary or equivalent

This separation is acceptable.

---

# 84. DOMAIN / DNS

RGM will provide domain/DNS access only when needed for deployment.

Do not require domain credentials during early development.

Provide deployment documentation explaining required DNS records.

Do NOT ask for account passwords to be stored in repository.

---

# 85. EMAIL AUTHENTICATION

When production email setup is performed, document required DNS authentication such as:

- SPF
- DKIM
- DMARC

Do not modify existing mail DNS without understanding current Hostinger configuration.

Avoid breaking RGM's existing email service.

---

# 86. GITHUB

Create / use a private Git repository.

Suggested name:

`rgm-machinery-platform`

Use meaningful commits.

Never commit:

- API keys
- passwords
- SMTP credentials
- database passwords
- production `.env`

---

# 87. REQUIRED REPOSITORY DOCUMENTATION

Create:

`README.md`

`AGENTS.md`

`ARCHITECTURE.md`

and:

`docs/PRODUCT_REQUIREMENTS.md`

`docs/SITEMAP.md`

`docs/DESIGN_SYSTEM.md`

`docs/MACHINE_DATA_MODEL.md`

`docs/DATABASE_SCHEMA.md`

`docs/ADMIN_DASHBOARD.md`

`docs/BULK_IMPORT.md`

`docs/LEAD_WORKFLOW.md`

`docs/EMAIL_AUTOMATION.md`

`docs/WHATSAPP_INTEGRATION.md`

`docs/SEO.md`

`docs/SEO_MIGRATION.md`

`docs/CONTENT_MIGRATION.md`

`docs/SECURITY.md`

`docs/TESTING.md`

`docs/DEPLOYMENT.md`

`docs/OPERATIONS.md`

---

# 88. AGENTS.MD

Keep `AGENTS.md` short.

It should explain:

- Project goal
- Critical business rules
- Files containing detailed specifications
- Commands for development
- Commands for testing
- Do-not-break constraints

Do not put the entire PRD inside `AGENTS.md`.

---

# 89. CRITICAL DO-NOT-BREAK RULES

Put these rules prominently in documentation:

1. Company name is **Roza Graphic Machinery**.
2. Keep existing logo and brand colors.
3. Public website is English + Arabic.
4. Admin Database is machine source of truth.
5. Machine codes are permanent and never reused.
6. Default website price is Price on Request.
7. Selling Price is stored per machine.
8. Sold machines disappear from public website.
9. Sold machines remain internally in database.
10. Leads are saved before email/WhatsApp attempts.
11. All machine inquiries enter Admin Lead Dashboard.
12. Customer receives automatic email.
13. Customer receives automatic WhatsApp when API integration is enabled.
14. One primary WhatsApp number is used for main inquiry CTA.
15. Country contact numbers may be displayed elsewhere.
16. Existing useful blog/content must be preserved.
17. Do not invent branches/offices.
18. Do not expose supplier/internal cost information.
19. Do not use shopping cart / checkout.
20. Do not invent business facts.

---

# 90. TESTING

Implement automated testing appropriate to architecture.

At minimum test:

- Homepage
- English pages
- Arabic pages
- RTL rendering
- Machine catalog
- Search
- Filters
- Machine page
- Machine code generation
- Machine creation
- Bulk import validation
- Machine inquiry
- Lead database creation
- Customer email logic
- Price-email logic
- Internal notification logic
- WhatsApp integration adapter
- Sold machine removal
- Find a Machine
- Sell Your Machine
- Inspection request
- Authentication
- Role permissions
- File uploads
- 404 handling

---

# 91. E2E CRITICAL FLOW

Create an end-to-end test for:

Admin creates machine

→ Machine publishes

→ Customer finds machine

→ Customer opens page

→ Customer submits inquiry

→ Lead is created

→ Internal notification is queued/sent

→ Customer email is queued/sent

→ WhatsApp automation is triggered when enabled

→ Sales user sees lead

→ Machine marked Sold

→ Machine disappears from public inventory

→ Historical lead remains intact.

---

# 92. QUALITY CONTROL

Before considering project complete:

Run:

- Formatter
- Linter
- Type checking
- Unit tests
- Integration tests
- E2E tests
- Production build

Manually verify:

- Desktop
- Mobile
- Tablet
- English
- Arabic
- RTL
- Machine filters
- Forms
- Emails
- WhatsApp links
- Admin permissions
- SEO metadata
- Broken links
- 301 redirects
- Accessibility basics
- Image loading
- Performance

Fix failures before completion.

---

# 93. IMPLEMENTATION PHASES

Do NOT build randomly.

Follow phases.

## PHASE 1 — Discovery

Audit:

- Existing rgmachinery.com
- Existing URLs
- Existing pages
- Existing articles
- Existing services
- Existing contact data
- Current assets

Create documentation.

Do not modify production site.

---

## PHASE 2 — Architecture

Create:

- Sitemap
- Database schema
- User roles
- Machine model
- Lead model
- Media model
- Email architecture
- WhatsApp architecture
- SEO migration plan

---

## PHASE 3 — Design System

Create:

- Typography
- Brand application
- Components
- Homepage wireframe
- Machine catalog UX
- Machine detail UX
- Mobile UX
- Arabic RTL system
- Admin UX

---

## PHASE 4 — Core Application

Build:

- Project shell
- Authentication
- Database
- Layout
- English/Arabic routing
- CMS/Admin foundation

---

## PHASE 5 — Machinery System

Build:

- Machine Admin
- Machine code
- Machine catalog
- Search
- Filters
- Machine pages
- Machine media
- Price rules

---

## PHASE 6 — Bulk Import

Build:

- Template download
- XLSX parser
- CSV parser
- validation
- preview
- import
- error reporting

---

## PHASE 7 — Lead System

Build:

- Leads
- Machine Inquiry
- Machine Wanted
- Sell Machine
- Inspection
- Services
- General Contact

---

## PHASE 8 — Automation

Build:

- Customer email
- Internal email
- Email logs
- WhatsApp provider interface
- WhatsApp logs
- test mode

---

## PHASE 9 — Content Migration

Migrate:

- About
- Services
- Existing articles
- Contact information
- important existing pages

Do not invent content.

---

## PHASE 10 — SEO Migration

Create redirects.

Check:

- metadata
- sitemap
- robots
- hreflang
- canonical
- structured data
- old URLs

---

## PHASE 11 — Analytics

Implement approved tracking.

---

## PHASE 12 — QA

Complete testing.

---

## PHASE 13 — Deployment Preparation

Prepare:

- staging
- production environment
- database migrations
- DNS guide
- email DNS guide
- backup strategy
- monitoring
- rollback documentation

---

# 94. CONTENT PLACEHOLDERS

Some information has not yet been supplied.

Do not block development.

Create editable settings/placeholders for:

- Final dedicated inquiry email
- Primary inquiry WhatsApp number
- Saudi contact numbers
- UAE contact numbers
- Egypt contact numbers
- Phone numbers
- Other company emails
- Exact registered addresses
- Social links
- Final branch/location wording
- Production email credentials
- WhatsApp/WATI credentials
- Analytics IDs

Clearly mark them:

`CONFIGURATION REQUIRED`

Do not invent values.

---

# 95. CONTENT EDITABILITY

RGM must be able to edit normal website content without touching source code.

Admin should support reasonable editing of:

- Homepage headings
- Homepage intro
- About content
- Contact information
- Services
- Branch/location information
- Social links
- Machine categories
- Machine inventory
- Existing article content
- SEO titles
- SEO descriptions

Do not turn every pixel into a complicated page builder.

Use structured content rather than an uncontrolled drag-and-drop CMS.

---

# 96. SITE SETTINGS

Create centralized Site Settings for:

- Company Name
- Logo
- Primary WhatsApp
- General Phone
- General Email
- Inquiry Email
- Social Links
- Country contacts
- Footer text
- Default SEO
- Google Analytics
- Email settings references
- WhatsApp template configuration
- General inquiry routing

---

# 97. FINAL USER EXPERIENCE

A customer should feel:

“This is an established machinery company.”

“I can quickly understand what they sell.”

“I can easily search the available stock.”

“The machine information is clear.”

“I can contact them immediately.”

“I trust that they understand printing machinery.”

The interface must make these actions obvious:

**Search**

**View Machine**

**Request Price**

**WhatsApp**

**Find a Machine**

**Sell Your Machine**

---

# 98. FINAL ADMIN EXPERIENCE

An RGM administrator should be able to:

Log in

→ Add machine

→ Upload photos

→ Add video

→ Enter specifications

→ Set price

→ Publish

→ Receive leads

→ Open customer inquiry

→ Contact customer

→ Change lead status

→ Mark machine sold

without needing a programmer.

---

# 99. DEFINITION OF DONE

The project is NOT complete just because the homepage looks good.

It is complete only when:

- Responsive website works
- English works
- Arabic works
- RTL works
- Machines can be created manually
- Machines can be imported in bulk
- Unique codes work
- Search works
- Filters work
- Machine detail pages work
- Price on Request works
- Selling prices are safely stored
- Inquiry forms work
- Leads enter dashboard
- Internal RGM emails work
- Customer automatic emails work
- WhatsApp button works
- Automatic WhatsApp architecture works
- Sales/Admin/Marketing roles work
- Find a Machine works
- Sell Your Machine works
- Inspection workflow works
- Existing content is migrated
- Existing SEO is protected
- Sold machines disappear publicly
- Historical sold records remain internally
- Machine internal confidential data remains protected
- Security checks pass
- Tests pass
- Production build succeeds
- Deployment documentation exists
- No production secrets are committed

---

# 100. DEVELOPMENT BEHAVIOR

Before writing major code:

Read all project documentation.

Understand dependencies.

Do not create disconnected components.

Do not change approved business rules without documenting the reason.

When technical ambiguity exists:

Choose the simplest production-grade approach that preserves:

- security
- maintainability
- performance
- future integrations

Avoid unnecessary complexity.

Avoid premature microservices.

Build a modular monolith unless a genuine requirement justifies otherwise.

---

# 101. INITIAL TASK FOR CODEX

Start by performing the following work in order:

1. Audit the existing RGM website.
2. Inventory its current pages, services, articles and URLs.
3. Create the proposed sitemap.
4. Create the information architecture.
5. Create database/data models.
6. Define Admin roles and permissions.
7. Define the machinery taxonomy.
8. Define machine inquiry workflow.
9. Define email automation workflow.
10. Define WhatsApp provider architecture.
11. Create SEO migration strategy.
12. Create UI/design system proposal.
13. Create homepage wireframe.
14. Create machine listing wireframe.
15. Create machine detail wireframe.
16. Create Admin Dashboard architecture.
17. Document the complete implementation plan.

DO NOT immediately begin blindly generating all pages before the architecture and documentation are coherent.

After documentation is established, proceed through the implementation phases while continuously keeping the application buildable and testable.

---

# 102. FINAL PRODUCT VISION

Build a website that represents Roza Graphic Machinery as a modern international machinery company.

It must combine:

**The trust and company presentation of a premium industrial corporate website**

with

**the machine search functionality of a professional machinery marketplace**

with

**the operational power of a modern sales and lead-management platform.**

The website must help RGM:

Show its company.

Show its services.

List its machinery.

Generate qualified inquiries.

Respond automatically.

Manage leads.

Manage inventory.

Sell machinery internationally.

The final platform should be designed to remain useful and expandable for many years rather than being another temporary website redesign.