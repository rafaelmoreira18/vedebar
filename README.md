# 🍸 VedeBar - Next.js Website with Sanity CMS

Modern website for VedeBar with dynamic menu management powered by Sanity CMS.

---

## 🚀 Quick Start

**New to this project?** Start here:

1. **[QUICKSTART.md](QUICKSTART.md)** - Get running in 10 minutes
2. **[SANITY_SETUP_GUIDE.md](SANITY_SETUP_GUIDE.md)** - Complete setup guide
3. **[INSTALLATION_COMMANDS.md](INSTALLATION_COMMANDS.md)** - Command reference

---

## 📋 What's This Project?

VedeBar is a Next.js 15 landing page for a bar featuring:

- 🎨 **Dynamic Menu** - Editable via Sanity CMS
- 🌟 **GSAP Animations** - Smooth scroll effects
- 📱 **Responsive Design** - Mobile-first with Tailwind CSS
- 🔄 **ISR (Incremental Static Regeneration)** - Fast, always fresh
- 📧 **RD Station Integration** - Lead capture

---

## 🏗️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework (App Router) |
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **GSAP** | Animations |
| **Sanity CMS** | Content management |
| **Formik + Yup** | Forms & validation |
| **Vercel** | Hosting |

---

## 📦 Installation

```bash
# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with your credentials

# Start development
npm run dev
```

**Full instructions:** [SANITY_SETUP_GUIDE.md](SANITY_SETUP_GUIDE.md)

---

## 🎯 Key Features

### 🍹 Dynamic Menu Management

Bar owners can update drinks without touching code:

- Access: `https://your-domain.com/studio`
- Edit drinks, ingredients, display order
- Changes appear automatically (ISR + webhooks)
- Fixed image selection (no uploads needed)

### ⚡ Performance

- **ISR**: 60-second revalidation
- **On-Demand Revalidation**: Via Sanity webhook
- **CDN-Cached**: Sanity queries use CDN
- **Fallback Data**: Graceful degradation if CMS is unavailable

### 🎨 User Experience

- Smooth GSAP animations
- Modal drink details
- Video backgrounds
- Sticky navigation
- Google Maps integration
- Operating hours display

---

## 📁 Project Structure

```
vedebar/
├── sanity/              # Sanity CMS configuration
│   ├── schemas/         # Content models
│   └── sanity.config.ts # Studio config
├── src/
│   ├── app/             # Next.js app router
│   │   ├── page.tsx     # Server component (ISR)
│   │   ├── page.client.tsx # Client component (UI)
│   │   ├── studio/      # Embedded Sanity Studio
│   │   └── api/         # API routes
│   ├── components/      # React components
│   └── lib/             # Utilities
│       ├── sanity.client.ts  # Sanity connection
│       ├── sanity.queries.ts # GROQ queries
│       └── imageHelpers.ts   # Image utilities
├── public/
│   ├── bebidas/         # Drink images (01.jpg - 11.jpg)
│   └── espaços/         # Space images
└── backend/             # RD Station proxy (Node.js)
```

**Full breakdown:** [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

---

## 🛠️ Available Scripts

### Next.js
```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

### Sanity
```bash
npm run sanity:dev   # Start Sanity Studio (localhost:3333)
npm run sanity:build # Build Sanity Studio
npm run sanity:deploy # Deploy Sanity Studio to cloud
```

---

## 🔐 Environment Variables

Create `.env.local` with:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
REVALIDATION_SECRET=your_random_secret

# RD Station
RD_STATION_TOKEN=your_token
```

**See:** [.env.local.example](.env.local.example)

---

## 🌐 URLs

| Service | Local | Production |
|---------|-------|------------|
| Website | `http://localhost:3000` | `https://your-domain.vercel.app` |
| Sanity Studio | `http://localhost:3000/studio` | `https://your-domain.vercel.app/studio` |
| Revalidation API | `/api/revalidate?secret=XXX` | `/api/revalidate?secret=XXX` |

---

## 📝 Content Management

### For Bar Owners

**Update Menu:**
1. Go to `/studio`
2. Login with Sanity credentials
3. Edit drinks
4. Click "Publish"
5. Changes appear in ~60 seconds

**Constraints:**
- Exactly 8 drinks active at once
- Image numbers: 1, 2, 3, 6, 7, 8, 9, 11 only
- No image uploads (use existing)

### For Developers

**Add New Content Type:**
1. Create schema in `sanity/schemas/`
2. Add to `sanity/schemas/index.ts`
3. Create GROQ query in `src/lib/sanity.queries.ts`
4. Fetch in server component
5. Render in client component

**See:** [sanity/README.md](sanity/README.md)

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect GitHub repo** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy:** `git push` triggers auto-deploy

### Manual

```bash
npm run build
npm start
```

**Full guide:** [SANITY_SETUP_GUIDE.md](SANITY_SETUP_GUIDE.md#deployment-to-vercel)

---

## 🔔 Webhooks

Configure Sanity webhook for auto-updates:

1. **Sanity Dashboard** → API → Webhooks
2. **URL:** `https://your-domain.com/api/revalidate?secret=YOUR_SECRET`
3. **Trigger:** Document changes (menuItem)
4. **Method:** POST

**Result:** Website updates automatically when content changes

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **[QUICKSTART.md](QUICKSTART.md)** | 10-minute setup guide |
| **[SANITY_SETUP_GUIDE.md](SANITY_SETUP_GUIDE.md)** | Complete setup instructions |
| **[SANITY_MIGRATION_SUMMARY.md](SANITY_MIGRATION_SUMMARY.md)** | What was changed & why |
| **[INSTALLATION_COMMANDS.md](INSTALLATION_COMMANDS.md)** | Command reference |
| **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** | Codebase overview |
| **[FILES_CREATED.md](FILES_CREATED.md)** | List of all files created |

---

## 🧪 Testing

### Local Testing

```bash
# Terminal 1: Sanity Studio
npm run sanity:dev

# Terminal 2: Next.js
npm run dev
```

Edit drinks in Studio → See changes on website

### Test Revalidation

```bash
# Local
curl "http://localhost:3000/api/revalidate?secret=YOUR_SECRET"

# Production
curl "https://your-domain.com/api/revalidate?secret=YOUR_SECRET"
```

---

## 🛡️ Security

- ✅ Revalidation endpoint protected by secret token
- ✅ Sanity permissions managed via dashboard
- ✅ Environment variables not committed
- ✅ CORS configured for backend
- ✅ TypeScript type safety

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Menu not showing | Check Sanity has published items with `active: true` |
| Changes not appearing | Wait 60s or trigger manual revalidation |
| Images not loading | Verify `imageNumber` is valid (1,2,3,6,7,8,9,11) |
| Studio not accessible | Check environment variables are set |
| Webhook not firing | Verify URL and secret match exactly |

**More help:** [SANITY_SETUP_GUIDE.md#troubleshooting](SANITY_SETUP_GUIDE.md#troubleshooting)

---

## 🎓 Learn More

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)

### Sanity
- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Schema Types](https://www.sanity.io/docs/schema-types)

### GSAP
- [GSAP Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

---

## 📞 Support

**For setup issues:**
1. Check documentation in `*.md` files
2. Review Sanity dashboard logs
3. Check Vercel deployment logs
4. Contact developer

**For content updates:**
- Bar owners: Access `/studio` and edit directly
- Questions: Check [SANITY_SETUP_GUIDE.md](SANITY_SETUP_GUIDE.md#how-to-update-menu)

---

## ✅ Status

- ✅ Next.js 15 + React 19
- ✅ Sanity CMS integrated
- ✅ ISR + On-Demand Revalidation
- ✅ TypeScript throughout
- ✅ Production-ready
- ✅ Fully documented

---

## 📄 License

Private project for VedeBar.

---

## 🎉 Credits

Built with:
- [Next.js](https://nextjs.org)
- [Sanity](https://www.sanity.io)
- [GSAP](https://gsap.com)
- [Tailwind CSS](https://tailwindcss.com)

---

**Ready to start?** → [QUICKSTART.md](QUICKSTART.md)
