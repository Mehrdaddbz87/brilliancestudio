# Brilliance Studio

Brilliance Studio is a premium Next.js website for a design and renovation brand with:

- marketing pages and legal pages
- contact and booking forms
- PostgreSQL + Prisma persistence
- Sanity-ready CMS content for services, references, terms, and imprint
- protected admin access via NextAuth
- Google Analytics / GTM integration with category-based cookie consent

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
- `Sanity`
- `Nodemailer`

## Project Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create or update `.env` with the variables used by the app:

```env
DATABASE_URL=""
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASSWORD=""
CONTACT_RECEIVER_EMAIL=""
BOOKING_RECEIVER_EMAIL=""

NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=""
NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=""

SANITY_PROJECT_ID=""
SANITY_DATASET="production"
SANITY_API_VERSION="2025-01-01"
SANITY_API_READ_TOKEN=""
NEXT_PUBLIC_SANITY_STUDIO_URL=""

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""
ADMIN_EMAIL=""
ADMIN_PASSWORD=""
```

### 3. Generate Prisma client

```bash
npm run prisma:generate
```

### 4. Run database migrations

```bash
npm run prisma:migrate
```

For production-style migration execution:

```bash
npm run prisma:migrate:deploy
```

### 5. Seed local sample content

```bash
npm run db:seed
```

### 6. Start the development server

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
- `npm run prisma:generate` - generate Prisma client
- `npm run prisma:migrate` - create and apply local migrations
- `npm run prisma:migrate:deploy` - apply existing migrations in production
- `npm run prisma:studio` - open Prisma Studio
- `npm run db:seed` - seed CMS and sample submission data

## Folder Structure

```text
admin/                Standalone Sanity Studio source
app/                  App Router files kept for modern Next.js compatibility
components/           Shared UI, SEO, analytics, consent, and page components
lib/                  Auth, CMS, Prisma, Sanity, utilities, and consent logic
pages/                Main site routes and API routes
pages/api/            Contact, booking, auth, and health endpoints
prisma/               Prisma schema, migrations, and seed script
public/               Static assets and placeholder images
styles/               Global Tailwind/CSS files
middleware.js         NextAuth middleware protecting /admin
next.config.ts        Next.js runtime and image configuration
```

## Route Overview

### Main pages

- `/` - homepage
- `/services` - CMS-driven services page
- `/references` - CMS-driven references page
- `/contact` - contact form + embedded booking form
- `/booking` - dedicated booking form
- `/about` - studio overview
- `/terms` - legal / privacy commitments page
- `/impressum` - imprint / legal company information page
- `/login` - admin login
- `/admin` - protected admin area with embedded Sanity Studio

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
  "message": "Project inquiry message"
}
```

Behavior:

- validates required fields
- saves the contact request to PostgreSQL
- sends an email notification through SMTP

#### `POST /api/booking`

Accepts:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "service": "Home design consultation",
  "preferredDate": "2026-04-15"
}
```

Behavior:

- validates required fields
- saves the booking request to PostgreSQL
- sends an email notification through SMTP

#### `GET|POST /api/auth/[...nextauth]`

NextAuth endpoint used for admin authentication.

## CMS And Admin Instructions

### Embedded admin access

The project includes a protected `/admin` page.

Requirements:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

How it works:

- `/admin` is protected by `middleware.js`
- users sign in through `/login`
- access is granted only to the configured admin credentials
- if `NEXT_PUBLIC_SANITY_STUDIO_URL` is set, the Sanity Studio is embedded inside `/admin`

### Standalone Sanity Studio

The standalone Studio source lives in `admin/`.

Current supported editable content includes:

- services page
- references page
- terms page
- imprint page

Legal page sections support:

- section heading
- optional eyebrow
- paragraph body
- bullet/list items
- structured contact details
- compliance notes

### Content fallback behavior

The app resolves CMS content in this order:

1. Sanity content
2. PostgreSQL / Prisma content
3. local fallback content from `lib/cms.js`

This lets the site stay usable even when Sanity is not yet configured.

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

If your local Node version is older and the newest CLI does not work, use a compatible CLI version:

```bash
npx vercel@34.3.0
```

### Required production environment variables

At minimum, configure these in Vercel:

- `NEXT_PUBLIC_SITE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `DATABASE_URL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `CONTACT_RECEIVER_EMAIL`
- `BOOKING_RECEIVER_EMAIL`
- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_API_VERSION`
- `SANITY_API_READ_TOKEN`
- `NEXT_PUBLIC_SANITY_STUDIO_URL`
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`
- `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

### Run production database migrations

After `DATABASE_URL` is configured for the deployment target, apply migrations:

```bash
npm run prisma:migrate:deploy
```

If you are running this against a managed production database, make sure the connection string points to the correct environment before executing.

### Post-deploy checklist

- open the live homepage
- verify `/api/health`
- verify `/terms` and `/impressum`
- test `/contact` and `/booking`
- confirm SMTP works with real credentials
- confirm analytics and GTM only load after cookie consent
- verify `/admin` login and Sanity embedding

## Notes

- The current project contains helper scripts such as `responsive-audit.js`, `interaction-form-audit.js`, `check-meta.js`, and Lighthouse summaries used during development/testing.
- Cookie consent categories currently include `functional`, `analytics`, and `marketing`.
- Legal content is written to support Canadian operations and PIPEDA-oriented privacy handling, but should still be reviewed with qualified legal counsel before launch.
