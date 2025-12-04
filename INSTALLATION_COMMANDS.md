# 📦 Installation Commands Summary

Quick reference for all commands needed to setup Sanity CMS for VedeBar.

---

## 1️⃣ Install Dependencies

```bash
npm install
```

Or with Yarn:
```bash
yarn install
```

---

## 2️⃣ Sanity Login & Setup

```bash
# Login to Sanity
npx sanity login

# Initialize Sanity (use existing project ID)
npx sanity init --project-id YOUR_PROJECT_ID --dataset production
```

---

## 3️⃣ Configure Environment Variables

```bash
# Copy example file
cp .env.local.example .env.local

# Generate revalidation secret (Mac/Linux)
openssl rand -base64 32

# Generate revalidation secret (Windows PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

Then edit `.env.local` with your values.

---

## 4️⃣ Deploy Sanity Studio

```bash
npm run sanity:deploy
```

---

## 5️⃣ Development

### Start Sanity Studio Locally
```bash
npm run sanity:dev
```
Opens at: `http://localhost:3333`

### Start Next.js Development Server
```bash
npm run dev
```
Opens at: `http://localhost:3000`

---

## 6️⃣ Production Deployment

```bash
# Commit changes
git add .
git commit -m "Add Sanity CMS integration"
git push

# Vercel will auto-deploy
# Or trigger manual deployment in Vercel dashboard
```

---

## 7️⃣ Test Revalidation API

### Local
```bash
curl "http://localhost:3000/api/revalidate?secret=YOUR_SECRET"
```

### Production
```bash
curl "https://your-domain.vercel.app/api/revalidate?secret=YOUR_SECRET"
```

---

## 8️⃣ Sanity Commands Reference

```bash
# Start Sanity Studio (development)
npm run sanity:dev

# Build Sanity Studio
npm run sanity:build

# Deploy Sanity Studio
npm run sanity:deploy

# Sanity CLI help
npx sanity help
```

---

## 🔧 Troubleshooting Commands

### Check Sanity Configuration
```bash
npx sanity debug
```

### Check Sanity Dataset
```bash
npx sanity dataset list
```

### Check Environment Variables
```bash
# Show all env vars (Mac/Linux)
cat .env.local

# Show all env vars (Windows)
type .env.local
```

### Clear Next.js Cache
```bash
rm -rf .next
npm run build
```

---

## 📝 Package.json Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build Next.js for production |
| `npm start` | Start Next.js production server |
| `npm run lint` | Run ESLint |
| `npm run sanity:dev` | Start Sanity Studio locally |
| `npm run sanity:build` | Build Sanity Studio |
| `npm run sanity:deploy` | Deploy Sanity Studio |

---

## 🌐 URLs

| Service | Local | Production |
|---------|-------|------------|
| **Next.js App** | `http://localhost:3000` | `https://your-domain.vercel.app` |
| **Sanity Studio (Embedded)** | `http://localhost:3000/studio` | `https://your-domain.vercel.app/studio` |
| **Sanity Studio (Deployed)** | - | `https://vedebar.sanity.studio/studio` |
| **Revalidation API** | `http://localhost:3000/api/revalidate` | `https://your-domain.vercel.app/api/revalidate` |

---

## 📋 Environment Variables Checklist

Make sure these are set in `.env.local` (local) and Vercel (production):

- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID`
- [ ] `NEXT_PUBLIC_SANITY_DATASET`
- [ ] `REVALIDATION_SECRET`
- [ ] `RD_STATION_TOKEN` (existing)

---

## ✅ Quick Setup Checklist

1. [ ] `npm install`
2. [ ] `npx sanity login`
3. [ ] Create Sanity project at [sanity.io/manage](https://www.sanity.io/manage)
4. [ ] Copy `.env.local.example` to `.env.local`
5. [ ] Fill in environment variables
6. [ ] `npm run sanity:deploy`
7. [ ] Add menu items in Sanity Studio
8. [ ] Test locally: `npm run dev`
9. [ ] Deploy to Vercel: `git push`
10. [ ] Configure webhook in Sanity dashboard

---

**All Set!** 🎉 Your VedeBar menu is now powered by Sanity CMS.
