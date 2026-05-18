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
- Forgot password flow with bcrypt-hashed passwords, secure reset tokens, and SMTP delivery
- Image upload support in the admin panel (JPEG, PNG, WebP, GIF) via Vercel Blob in production
- Google Analytics / GTM integration with category-based cookie consent
- Global scroll indicator on all public pages with automatic hide-on-scroll
- Animated UI interactions via Framer Motion with `prefers-reduced-motion` support
- Fully accessible forms with ARIA attributes, custom combobox dropdown, and keyboard navigation
- SEO-optimized pages with per-page meta tags, Open Graph, and JSON-LD structured data
- Security headers (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy) on all routes

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
- `bcryptjs` (password hashing)
- `Formidable` (multipart file upload handling)
- `@vercel/blob` (cloud image storage in production)

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
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/brilliancestudio?schema=public"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

SMTP_HOST="smtp.ionos.com"
SMTP_PORT="587"
SMTP_USER="info@brilliancestudio.ca"
SMTP_PASSWORD=""
CONTACT_RECEIVER_EMAIL="info@brilliancestudio.ca"

NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=""
NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=""

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""
ADMIN_EMAIL=""
ADMIN_PASSWORD=""
```

**SMTP note:** The project uses IONOS SMTP. Outgoing server: `smtp.ionos.com`, port `587` (TLS). Use the password configured for your IONOS email account.

**Production (Supabase):** Use the Session Pooler URL for `DIRECT_URL` and Transaction Pooler URL for `DATABASE_URL`. Both use `aws-1-ca-central-1.pooler.supabase.com`.

### 4. Generate Prisma client

```bash
npm run prisma:generate
```

### 5. Run database migrations

```bash
npm run prisma:migrate
```

For production (Supabase pooler advisory lock issue — use db push):

```bash
npx prisma db push
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
public/uploads/       User-uploaded images (local dev only; use Vercel Blob in production)
styles/               Global Tailwind/CSS files
tests/                Jest unit tests and Playwright E2E tests
next.config.ts        Next.js runtime, security headers, and image configuration
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
- `/login` - admin login (no site chrome)
- `/forgot-password` - request a password reset link via email
- `/reset-password` - set a new admin password (requires valid token from email)
- `/admin` - protected local admin dashboard
- `/admin/services` - protected services content manager with image upload
- `/admin/portfolio` - protected portfolio content manager with image upload

### API routes

#### `GET /api/health`
Health check. Returns `{ "status": "ok" }`.

#### `POST /api/contact`
Validates, stores in DB, and sends SMTP email notification. Input is HTML-escaped before email rendering.

#### `POST /api/upload`
Admin-only image upload. Accepted types: JPEG, PNG, WebP, GIF. Max 10 MB. Uses Vercel Blob in production, local `public/uploads/` in development. Requires admin session.

#### `POST /api/auth/forgot-password`
Generates a cryptographically secure reset token (1 hour expiry), saves to DB, and sends a reset link to the configured admin email. Rate limited to 3 requests per 15 minutes per IP.

#### `POST /api/auth/reset-password`
Validates the token, hashes the new password with bcrypt (cost 12), and stores in the `AdminCredential` DB table. Rate limited to 5 attempts per 15 minutes per IP. Password policy: 12+ characters, letter + number + special character required.

#### `GET|POST /api/auth/[...nextauth]`
NextAuth credentials endpoint for admin login.

#### `GET|POST /api/services` and `PATCH|DELETE /api/services/:id`
CMS services CRUD. GET is public; mutations require admin session.

#### `GET|POST /api/portfolio` and `PATCH|DELETE /api/portfolio/:id`
CMS portfolio CRUD. GET is public; mutations require admin session.

## Admin Panel

### Access

Sign in at `/login` with the credentials set in `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

After the first password reset via `/forgot-password`, the new bcrypt-hashed password is stored in the `AdminCredential` database table and used for all subsequent logins. The `ADMIN_PASSWORD` env var serves as a bootstrap fallback only when no `AdminCredential` row exists.

### Password reset flow

1. Go to `/login` and click **"Forgot password?"**
2. Enter the admin email and submit
3. A reset link is sent to the admin email via IONOS SMTP (expires in 1 hour)
4. Click the link and set a new password (12+ chars, letter + number + special character)
5. Real-time validation shows requirements as you type

### Session security

- JWT sessions expire after **8 hours**
- **Auto-logout after 10 minutes** of inactivity (mouse, keyboard, scroll, touch)
- Warning modal with 60-second countdown appears at 1 minute remaining
- Security headers applied globally: CSP, X-Frame-Options (DENY), X-Content-Type-Options (nosniff), Referrer-Policy

### Content management

- `/admin/services` - create, edit, and delete service entries with optional image upload
- `/admin/portfolio` - create, edit, and delete portfolio entries with image upload and preview
- Deleting an entry requires confirmation through a styled modal dialog
- Success and error feedback is shown via toast notifications

### Image upload

- Direct file upload via an "Upload" button (opens a file picker)
- Accepted formats: JPEG, PNG, WebP, GIF (SVG excluded for security)
- **Production:** stored in Vercel Blob (set `BLOB_READ_WRITE_TOKEN` in Vercel environment variables)
- **Development:** stored in `public/uploads/`

## CMS And Admin Instructions

### Content fallback behavior

1. PostgreSQL / Prisma content (when DB is available)
2. Local fallback content from `lib/cms.js`

Service detail pages fall back to static content from `lib/service-pages.js` when the DB is unreachable.

## Deployment Steps

### Deploy to Vercel

```bash
vercel --prod
```

### Required production environment variables

- `NEXT_PUBLIC_SITE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `DATABASE_URL` (Supabase Transaction Pooler URL with `?pgbouncer=true`)
- `DIRECT_URL` (Supabase Session Pooler URL)
- `SMTP_HOST` (`smtp.ionos.com`)
- `SMTP_PORT` (`587`)
- `SMTP_USER` (`info@brilliancestudio.ca`)
- `SMTP_PASSWORD`
- `CONTACT_RECEIVER_EMAIL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `BLOB_READ_WRITE_TOKEN` (from Vercel Blob storage — auto-added when Blob store is connected)

### Post-deploy checklist

- Homepage loads with HTTPS
- `/api/health` returns `{"status":"ok"}`
- Contact form sends email to `info@brilliancestudio.ca`
- `/admin` login works
- Forgot password flow sends email and reset link works
- Image upload works in admin portfolio/services
- Cookie consent banner appears on first visit
- Auto-logout triggers after inactivity

## Notes

- Cookie consent categories: `functional`, `analytics`, and `marketing`
- Legal content supports Canadian operations (PIPEDA, Ontario Building Code, WSIB) but should be reviewed with qualified legal counsel before launch
- For Supabase: use `npx prisma db push` instead of `prisma migrate deploy` to avoid advisory lock timeouts with the connection pooler
- Uploaded images in `public/uploads/` should be excluded from Git in production (use Vercel Blob)