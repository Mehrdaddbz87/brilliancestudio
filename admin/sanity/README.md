## Sanity Studio

This folder now contains a standalone Sanity Studio setup for the Next.js
frontend.

Editable documents:

1. `servicesPage`
2. `referencesPage`
3. `termsPage`
4. `impressumPage`

Editable areas:

1. Services: title, description, CTA labels, service cards, images, flexible sections
2. Portfolio: gallery cards, images, categories, CTA labels, flexible sections
3. Terms & Conditions: intro content and legal sections
4. Impressum: intro content and legal sections

## Single Admin User

The Studio is structured as singleton pages, but user access itself is managed
in Sanity project settings, not in repository code.

To keep a single admin user:

1. Open your Sanity project management dashboard.
2. Invite only one person with `Administrator` access.
3. Do not add additional editors unless needed.

## Local Usage

1. Copy `admin/.env.example` to `admin/.env` and fill in your Sanity values.
2. Run `npm install` inside `admin/`.
3. Run `npm run dev` inside `admin/`.

## Deploy

1. Build with `npm run build` inside `admin/`.
2. Deploy with `npm run deploy` inside `admin/`.
3. Keep the same `SANITY_PROJECT_ID` and `SANITY_DATASET` as used by the frontend.

The Next.js frontend reads the same content through `lib/sanity.js`, so once
the project credentials are configured, the CMS and frontend stay connected.
