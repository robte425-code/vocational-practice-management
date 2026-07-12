# Vocational Practice Management — Marketing site

Marketing website for **Vocational Practice Management** (secondary mark: VPM), aimed at Washington vocational rehabilitation firm owners and managers.

UI mockups use a fictional firm named **CounselWorks**. Do not use legacy internal suite brand names on this site.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Fonts: Fraunces (display) + Source Sans 3

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Demo form / email

`POST /api/demo` accepts: `name`, `firm`, `email`, `phone`, `firmSize`, `message`.

Without Postmark configured, leads are logged server-side and the API returns success (suitable for local demos).

### Optional Postmark delivery

Uses the same env vars as the Requests app. Create `.env.local` (or set in Vercel):

```bash
POSTMARK_SERVER_TOKEN=
EMAIL_FROM=Vocational Practice Management <noreply@your-verified-domain>
# Optional; defaults to "outbound"
# POSTMARK_MESSAGE_STREAM=outbound
DEMO_INBOX_EMAIL=ghim@voc-hotline.org
```

`EMAIL_FROM` must be a verified Postmark sender signature or domain.

## Deploy to Vercel

1. Push this repo to GitHub (new repository).
2. In Vercel → **Add New Project** → import the repo.
3. Framework preset: Next.js (auto-detected).
4. Add env vars if using Postmark (`POSTMARK_SERVER_TOKEN`, `EMAIL_FROM`, `DEMO_INBOX_EMAIL`; same Postmark vars as Requests).
5. Deploy. Production updates on every push to `main`.

No domain is required for the first deploy; attach a custom domain later in Vercel project settings.

## Project layout

```
src/app/page.tsx            # Landing page
src/app/layout.tsx          # Fonts + metadata
src/app/api/demo/route.ts   # Demo lead capture
src/components/             # Header, form, mocks, reveal
src/app/globals.css         # Brand tokens + motion
```
