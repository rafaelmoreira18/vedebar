# ⚡ Quick Start - VedeBar Sanity CMS

**Get your menu up and running in 10 minutes!**

---

## 🚀 Step 1: Install Dependencies (2 min)

```bash
npm install
```

---

## 🔐 Step 2: Create Sanity Project (3 min)

1. **Go to:** [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. **Click:** "Create Project"
3. **Name:** `vedebar`
4. **Dataset:** `production`
5. **Copy the Project ID** (looks like: `abc123xyz`)

---

## ⚙️ Step 3: Configure Environment (1 min)

```bash
# Copy the template
cp .env.local.example .env.local

# Edit .env.local and add:
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
REVALIDATION_SECRET=any_random_string_123
```

---

## 🎨 Step 4: Deploy Sanity Studio (2 min)

```bash
# Login to Sanity
npx sanity login

# Deploy Studio
npm run sanity:deploy
```

**Your studio is now at:** `https://vedebar.sanity.studio/studio`

---

## 📝 Step 5: Add Menu Items (2 min)

1. **Open:** [https://vedebar.sanity.studio/studio](https://vedebar.sanity.studio/studio)
2. **Click:** "+ Create" → "Menu Item (Bebida)"
3. **Add 8 drinks** from the table below

### Quick Data Entry

| Nome | Imagem # | Ordem | Descrição |
|------|----------|-------|-----------|
| Aquariano | 1 | 1 | gin beg tropical . gin london dry . limão . triple sec . xarope de violeta |
| Tropical 43 | 2 | 2 | Licor 43 . Maracuja . Espumante Brut . Grenadine |
| Hanami | 3 | 3 | Vodka Haku . Purê de Yuzu . Missô . Bitter de Laranja . Flor de Sabugueiro |
| Batuque | 6 | 4 | Whisky Burbon . Brandy Jerez . Fireball . Purê de Pera . Limão . Mel |
| Iça Manauara | 7 | 5 | Cachaça de Jambu . Maracujá . Amora . Elixir de Pixuri . Espuma de Açaí |
| Jabuti | 8 | 6 | Gin . Jabuticaba . Limão Siciliano . Bitter Citrico |
| Renascentista | 9 | 7 | Makers Mark . Limão . Amora . Licor de Cassis . Angostura |
| Jangadinha | 11 | 8 | Spiced Rum . Gengibre . Hortelã . Limão . Bitter de laranja |

**Don't forget:** Click "Publish" after each drink!

---

## 🧪 Step 6: Test Locally (Optional)

```bash
# Start Next.js
npm run dev
```

**Open:** [http://localhost:3000](http://localhost:3000)

**Check:** Menu should display with drinks from Sanity

---

## ☁️ Step 7: Deploy to Production

### Add Environment Variables in Vercel

1. **Go to:** [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. **Select:** Your project
3. **Settings** → **Environment Variables**
4. **Add:**
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = (your project ID)
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
   - `REVALIDATION_SECRET` = (your secret)

### Deploy

```bash
git add .
git commit -m "Add Sanity CMS integration"
git push
```

**Vercel auto-deploys!** ✅

---

## 🔔 Step 8: Configure Auto-Updates

1. **Go to:** [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. **Select your project** → **API** → **Webhooks**
3. **Create webhook:**
   - **URL:** `https://your-domain.vercel.app/api/revalidate?secret=YOUR_SECRET`
   - **Dataset:** `production`
   - **Trigger:** Document changes

**Done!** Website now updates automatically when you edit drinks in Sanity.

---

## ✅ Checklist

- [ ] `npm install` completed
- [ ] Sanity project created
- [ ] `.env.local` configured
- [ ] Sanity Studio deployed
- [ ] 8 drinks added to Sanity
- [ ] Tested locally (optional)
- [ ] Environment variables added to Vercel
- [ ] Code pushed to GitHub
- [ ] Webhook configured

---

## 🎉 You're Done!

**Website:** `https://your-domain.vercel.app`
**Admin:** `https://your-domain.vercel.app/studio`

---

## 📚 Need More Help?

| Question | Read |
|----------|------|
| Full setup details | [SANITY_SETUP_GUIDE.md](SANITY_SETUP_GUIDE.md) |
| Command reference | [INSTALLATION_COMMANDS.md](INSTALLATION_COMMANDS.md) |
| What was changed | [SANITY_MIGRATION_SUMMARY.md](SANITY_MIGRATION_SUMMARY.md) |
| Project structure | [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) |

---

## 🆘 Troubleshooting

**Menu not showing?**
→ Check you have at least 1 published drink in Sanity with "Ativo" checked

**Changes not appearing?**
→ Wait 60 seconds, or trigger: `curl "https://your-domain.com/api/revalidate?secret=YOUR_SECRET"`

**Images not loading?**
→ Verify "Número da Imagem" is one of: 1, 2, 3, 6, 7, 8, 9, 11

---

**That's it!** Your menu is now editable via Sanity CMS. 🎊
