# Brilliance Studio

Brilliance Studio is a premium Next.js website for a luxury home renovation and design brand with:

- Marketing, service, portfolio, and legal pages
- Dynamic service detail pages backed by static content with optional DB overrides
- Individual portfolio project detail pages (`/portfolio/[slug]`) with image, description, and CTA
- A central contact inquiry form with custom accessible service dropdown and SMTP email delivery
- PostgreSQL + Prisma persistence for CMS content
- Locally managed CMS for services, portfolio, terms, and imprint with static fallback
- Canada-specific Terms of Service (PIPEDA, Construction Act, WSIB, HST/GST, warranties)
- Canada-specific Imprint with CRA Business Number, trade licensing, and consumer protection disclosures
- Protected admin panel via NextAuth with auto-logout after 10 minutes of inactivity
- Image upload support in the admin panel (JPEG, PNG, WebP, GIF, SVG)
- Google Analytics / GTM integration with category-based cookie consent
- Global scroll indicator on all public pages with automatic hide-on-scroll
- Animated UI interactions via Framer Motion with `prefers-reduced-motion` support
- Fully accessible forms with ARIA attributes, custom combobox dropdown, and keyboard navigation
- SEO-optimized pages with per-page meta tags, Open Graph, and JSON-LD structured data

The project uses a hybrid setup:

- `pages/` handles the main website routes and API routes
- `app/` remains available for App Router usage where needed

## Tech Stack

- `Next.js 15`
- `React 19`
- `TypeScript`
- `Tailwind CSS`
- `Framer Motion`
- `Prisma`
- `PostgreSQL`
- `NextAuth.js`
- `Nodemailer`
- `Formidable` (multipart file upload handling)

## Project Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start PostgreSQL

The easiest way is Docker:

```bash
docker run --name brilliancestudio-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=brilliancestudio \
  -p 5432:5432 \
  -d postgres:16
```

To start an existing container after a restart:

```bash
docker start brilliancestudio-postgres
```

### 3. Configure environment variables

Create `.env` in the project root:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/brilliancestudio?schema=public"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASSWORD=""
CONTACT_RECEIVER_EMAIL=""

NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=""
NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=""

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""
ADMIN_EMAIL=""
ADMIN_PASSWORD=""
```

**SMTP note:** Use a Gmail App Password (not your regular password). Generate one at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) after enabling 2-factor authentication. Enter the 16-character password without spaces.

### 4. Generate Prisma client

```bash
npm run prisma:generate
```

### 5. Run database migrations

```bash
npm run prisma:migrate
```

For production-style migration execution:

```bash
npm run prisma:migrate:deploy
```

### 6. Seed local sample content

```bash
npm run db:seed
```

### 7. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful Scripts

- `npm run dev` - start the local development server
- `npm run build` - build the app for production
- `npm run start` - run the production build locally
- `npm run lint` - run ESLint
- `npm run format` - format the codebase
- `npm run format:check` - validate formatting without changing files
- `npm run test` - run Jest unit tests
- `npm run test:e2e` - run Playwright end-to-end tests (requires dev server running)
- `npm run test:e2e:headed` - run E2E tests with visible browser
- `npm run prisma:generate` - generate Prisma client
- `npm run prisma:migrate` - create and apply local migrations
- `npm run prisma:migrate:deploy` - apply existing migrations in production
- `npm run prisma:studio` - open Prisma Studio
- `npm run db:seed` - seed CMS and sample submission data

## Folder Structure

```text
app/                  App Router files kept for modern Next.js compatibility
components/           Shared UI, SEO, analytics, consent, admin, and page components
components/admin/     Admin-specific components (ContentManager, SessionGuard)
components/ui/        Low-level UI primitives (Logo)
lib/                  Auth, local content, Prisma, utilities, and consent logic
pages/                Main site routes and API routes
pages/api/            Contact, auth, upload, and health endpoints
pages/portfolio/      Portfolio listing (index.js) and detail pages ([slug].js)
pages/services/       Services listing (index.js) and detail pages ([slug].js)
prisma/               Prisma schema, migrations, and seed script
public/               Static assets and placeholder images
public/uploads/       User-uploaded images via the admin panel
styles/               Global Tailwind/CSS files
tests/                Jest unit tests and Playwright E2E tests
next.config.ts        Next.js runtime and image configuration
```

## Route Overview

### Main pages

- `/` - homepage with hero, services preview, and portfolio teasers
- `/services` - CMS-driven services overview with all 7 service categories
- `/services/[slug]` - individual service detail page with benefits and CTA
- `/portfolio` - CMS-driven portfolio showcase; each card links to its detail page
- `/portfolio/[slug]` - individual portfolio project detail page with image, description, metadata, and CTA
- `/contact` - contact form with custom accessible service dropdown and ARIA validation
- `/about` - studio overview with values and brand statement
- `/terms` - Canada-specific terms of service and PIPEDA-aligned privacy commitments
- `/impressum` - Canada-specific imprint with CRA BN, HST, WSIB, trade licensing, and consumer protection
- `/login` - admin login (no site chrome — header, footer, analytics excluded)
- `/admin` - protected local admin dashboard
- `/admin/services` - protected services content manager with image upload
- `/admin/portfolio` - protected portfolio content manager with image upload

### API routes

#### `GET /api/health`

Health check endpoint.

Response:

```json
{ "status": "ok" }
```

#### `POST /api/contact`

Accepts:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "service": "Custom Home Design & Build",
  "message": "Project inquiry message"
}
```

Behavior:

- validates required fields and email format
- saves the contact request to PostgreSQL
- sends an email notification through SMTP to `CONTACT_RECEIVER_EMAIL`
- returns detailed error messages in development mode

#### `POST /api/upload`

Admin-only image upload endpoint.

- Accepts: `multipart/form-data` with a `file` field
- Allowed types: JPEG, PNG, WebP, GIF, SVG
- Max file size: 10 MB
- Saves to `public/uploads/` with a sanitized, timestamped filename
- Returns: `{ "url": "/uploads/filename.jpg" }`
- Requires an active admin session

#### `GET|POST /api/auth/[...nextauth]`

NextAuth endpoint used for admin authentication.

#### `GET|POST /api/services`

Local services content endpoint.

- `GET` returns the services page record and its items from PostgreSQL
- `POST` creates a new service item (admin session required)

#### `PATCH|DELETE /api/services/:id`

Protected service item mutation endpoint for the local admin.

#### `GET|POST /api/portfolio`

Local portfolio content endpoint.

- `GET` returns the portfolio page record and its items from PostgreSQL
- `POST` creates a new portfolio item (admin session required)

#### `PATCH|DELETE /api/portfolio/:id`

Protected portfolio item mutation endpoint for the local admin.

## Admin Panel

### Access

Sign in at `/login` with the credentials set in `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

### Session security

- **Auto-logout after 10 minutes** of inactivity (mouse, keyboard, scroll, touch)
- A warning modal with a 60-second countdown appears at 1 minute remaining
- "Stay logged in" resets the timer; "Sign out now" logs out immediately
- The session also ends immediately when the browser tab is hidden or switched

### Content management

- `/admin/services` — create, edit, and delete service entries with optional image upload
- `/admin/portfolio` — create, edit, and delete portfolio entries with image upload and preview
- Deleting an entry requires confirmation through a styled modal dialog
- Success and error feedback is shown via toast notifications

### Image upload

In both the services and portfolio admin forms, the image field supports:

- Direct file upload via an "Upload" button (opens a file picker)
- Manual URL entry in the text field
- Live image preview after upload or URL entry

Uploaded files are stored in `public/uploads/` and served as static assets.

## CMS And Admin Instructions

### Content fallback behavior

The app resolves CMS content in this order:

1. PostgreSQL / Prisma content (when DB is available)
2. Local fallback content from `lib/cms.js`

This lets the site stay usable even when the database is empty or unavailable. Service detail pages (`/services/[slug]`) fall back to static content from `lib/service-pages.js` when the DB is unreachable.

### Legal page content

Legal page sections in `lib/cms.js` support:

- section heading and optional eyebrow
- paragraph body
- bullet / list items
- structured contact details
- compliance notes

## Deployment Steps

### Deploy to Vercel

If the Vercel CLI is installed and logged in:

```bash
vercel
```

For a production deployment:

```bash
vercel --prod
```

### Required production environment variables

Configure all of the following in Vercel (or your hosting provider):

- `NEXT_PUBLIC_SITE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `DATABASE_URL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `CONTACT_RECEIVER_EMAIL`
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`
- `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

### Run production database migrations

After `DATABASE_URL` is configured for the deployment target, apply migrations:

```bash
npm run prisma:migrate:deploy
```

### Post-deploy checklist

- open the live homepage and verify scroll indicator, hero, and footer
- verify `/api/health`
- verify `/terms` and `/impressum`
- test `/contact` form submission and confirm email delivery
- confirm SMTP works with real credentials
- confirm analytics and GTM only load after cookie consent
- verify `/admin` login and local content management
- test image upload in admin portfolio and services panels
- confirm auto-logout triggers after inactivity

## Notes

- Cookie consent categories: `functional`, `analytics`, and `marketing`
- The scroll indicator appears on all public pages where content extends beyond the viewport and hides automatically on scroll
- Legal content is written to support Canadian operations and PIPEDA-oriented privacy handling, but should be reviewed with qualified legal counsel before launch
- Uploaded images in `public/uploads/` are committed via `.gitkeep` but actual uploaded files should be excluded from version control in production (use object storage like S3 or Vercel Blob for production uploads)
