# 📂 VedeBar Project Structure

## Overview

```
vedebar/
├── 📄 Documentation
│   ├── SANITY_MIGRATION_SUMMARY.md    # Complete migration overview
│   ├── SANITY_SETUP_GUIDE.md          # Step-by-step setup guide
│   ├── INSTALLATION_COMMANDS.md       # Quick command reference
│   └── PROJECT_STRUCTURE.md           # This file
│
├── 🎨 Sanity CMS
│   ├── sanity/
│   │   ├── schemas/
│   │   │   ├── menuItem.ts            # Menu item schema
│   │   │   └── index.ts               # Schema exports
│   │   ├── sanity.config.ts           # Sanity Studio config
│   │   └── sanity.cli.ts              # Sanity CLI config
│   │
│   └── src/app/studio/[[...tool]]/
│       └── page.tsx                   # Embedded Sanity Studio route
│
├── 🔗 Next.js Integration
│   ├── src/lib/
│   │   ├── sanity.client.ts           # Sanity client (CDN & non-CDN)
│   │   ├── sanity.queries.ts          # GROQ queries + types
│   │   └── imageHelpers.ts            # Image path utilities
│   │
│   ├── src/app/
│   │   ├── page.tsx                   # Server component (ISR)
│   │   ├── page.client.tsx            # Client component (GSAP animations)
│   │   ├── page.tsx.backup            # Original hardcoded version
│   │   └── api/revalidate/
│   │       └── route.ts               # On-demand revalidation API
│   │
│   └── src/components/
│       ├── DrinksSection.tsx          # Menu display (unchanged)
│       ├── DrinkModal.tsx             # Drink details modal (unchanged)
│       └── ... (other components)
│
├── 🖼️ Static Assets
│   └── public/
│       ├── bebidas/                   # Drink images (unchanged)
│       │   ├── 01.jpg
│       │   ├── 02.jpg
│       │   ├── 03.jpg
│       │   ├── 06.jpg
│       │   ├── 07.jpg
│       │   ├── 08.jpg
│       │   ├── 09.jpg
│       │   └── 11.jpg
│       │
│       ├── espaços/                   # Space images
│       ├── VedeLogoWhite.png
│       └── ... (videos, etc.)
│
├── 🔧 Configuration
│   ├── .env.local.example             # Environment variables template
│   ├── .gitignore                     # Git ignore (updated)
│   ├── package.json                   # Dependencies + scripts
│   ├── tsconfig.json                  # TypeScript config
│   ├── next.config.ts                 # Next.js config
│   └── tailwind.config.js             # Tailwind CSS config
│
└── 🗄️ Backend (Unchanged)
    └── backend/
        ├── server.js                  # RD Station proxy
        └── package.json               # Backend dependencies
```

---

## 🔑 Key Files Explained

### Sanity CMS Files

| File | Purpose |
|------|---------|
| `sanity/schemas/menuItem.ts` | Defines the menu item schema (fields, validation) |
| `sanity/sanity.config.ts` | Configures Sanity Studio |
| `src/app/studio/[[...tool]]/page.tsx` | Embeds Sanity Studio at `/studio` route |

### Data Fetching Files

| File | Purpose |
|------|---------|
| `src/lib/sanity.client.ts` | Creates Sanity clients (CDN & non-CDN) |
| `src/lib/sanity.queries.ts` | GROQ queries to fetch menu items + TypeScript types |
| `src/lib/imageHelpers.ts` | Converts imageNumber (1-11) to `/bebidas/01.jpg` |

### Page Components

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | **Server Component** - Fetches data from Sanity with ISR |
| `src/app/page.client.tsx` | **Client Component** - Handles animations, modals, interactions |
| `src/app/page.tsx.backup` | Original hardcoded version (backup) |

### API Routes

| File | Purpose |
|------|---------|
| `src/app/api/revalidate/route.ts` | On-demand ISR revalidation (triggered by Sanity webhook) |

---

## 🔄 Data Flow Diagram

```
┌─────────────────┐
│  Sanity Studio  │  ← Bar owners edit menu
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Sanity CMS     │  ← Content stored
│  (Cloud)        │
└────────┬────────┘
         │
         │ GROQ Query
         ▼
┌─────────────────┐
│  page.tsx       │  ← Server Component fetches data
│  (Server)       │     ISR: revalidate every 60s
└────────┬────────┘
         │
         │ Props
         ▼
┌─────────────────┐
│ page.client.tsx │  ← Client Component renders UI
│  (Client)       │     GSAP animations, modals
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  User sees      │  ← Final rendered page
│  menu on site   │
└─────────────────┘
```

---

## 🎯 Important Directories

### Development
- **Work here:** `src/app/`, `src/components/`, `src/lib/`
- **Don't modify:** `public/bebidas/` (fixed images)

### Sanity Studio
- **Schema definitions:** `sanity/schemas/`
- **Studio config:** `sanity/sanity.config.ts`
- **Access studio:** `http://localhost:3000/studio` or deployed URL

### Backend (Separate)
- **RD Station proxy:** `backend/server.js`
- **Not affected by Sanity migration**

---

## 📝 Configuration Files

| File | Purpose |
|------|---------|
| `.env.local.example` | Template for environment variables |
| `.env.local` | **Your secrets** (not in git) |
| `package.json` | Dependencies, scripts |
| `next.config.ts` | Next.js configuration |
| `tsconfig.json` | TypeScript settings |

---

## 🚀 Scripts Overview

```bash
# Next.js
npm run dev          # Start Next.js dev server (localhost:3000)
npm run build        # Build for production
npm start            # Start production server

# Sanity
npm run sanity:dev   # Start Sanity Studio locally (localhost:3333)
npm run sanity:build # Build Sanity Studio
npm run sanity:deploy # Deploy Sanity Studio to cloud
```

---

## 🔗 Routes

| Route | Description |
|-------|-------------|
| `/` | Main landing page (menu, spaces, etc.) |
| `/studio` | Embedded Sanity Studio (CMS) |
| `/api/revalidate` | Revalidation webhook endpoint |
| `/menu` | Menu page (if exists) |

---

## 📦 Dependencies

### Sanity
- `sanity` - Sanity Studio
- `next-sanity` - Next.js integration
- `@sanity/vision` - GROQ query tool

### Existing
- `next` - Next.js framework
- `react` - React library
- `gsap` - Animations
- `formik` - Forms
- `yup` - Validation

---

## 🎨 Image Strategy

**No image uploads in Sanity!**

- Images stored in: `/public/bebidas/`
- Sanity stores: `imageNumber` (1, 2, 3, 6, 7, 8, 9, 11)
- Helper function: `getMenuItemImagePath(imageNumber)` → `/bebidas/01.jpg`

**Why?**
- Keeps image quality consistent
- No storage costs in Sanity
- Faster load times (Next.js optimized)

---

## 🔒 Environment Variables

### Required for Sanity

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
REVALIDATION_SECRET=random_secret_string
```

### Existing (RD Station)

```env
RD_STATION_TOKEN=your_token
```

---

## 📚 Documentation Files

| File | When to Read |
|------|--------------|
| `SANITY_MIGRATION_SUMMARY.md` | Overview of what was done |
| `SANITY_SETUP_GUIDE.md` | **Start here** - Full setup instructions |
| `INSTALLATION_COMMANDS.md` | Quick command reference |
| `PROJECT_STRUCTURE.md` | This file - understand the codebase |

---

## 🎓 For Developers

**Key files to understand:**
1. `sanity/schemas/menuItem.ts` - Data model
2. `src/lib/sanity.queries.ts` - How data is fetched
3. `src/app/page.tsx` - Server-side data fetching
4. `src/app/page.client.tsx` - Client-side rendering
5. `src/app/api/revalidate/route.ts` - Cache invalidation

**Workflow:**
1. Edit schema in `sanity/schemas/`
2. Write queries in `src/lib/sanity.queries.ts`
3. Fetch data in `src/app/page.tsx` (server)
4. Render in `src/app/page.client.tsx` (client)

---

## 👨‍💼 For Bar Owners

**You only need to know:**
- Access Sanity Studio at: `your-domain.com/studio`
- Edit drinks, publish changes
- Changes appear in ~60 seconds

**You DON'T need to touch:**
- Code files
- Configuration
- Deployment

---

## ✅ Quick Reference

**Development:**
```bash
npm run dev              # Start Next.js
npm run sanity:dev       # Start Sanity Studio
```

**Production:**
```bash
npm run build            # Build Next.js
npm run sanity:deploy    # Deploy Sanity Studio
```

**Access:**
- Site: `http://localhost:3000`
- Studio: `http://localhost:3000/studio`
- API: `http://localhost:3000/api/revalidate?secret=YOUR_SECRET`

---

**Need help?** Start with [SANITY_SETUP_GUIDE.md](SANITY_SETUP_GUIDE.md)
