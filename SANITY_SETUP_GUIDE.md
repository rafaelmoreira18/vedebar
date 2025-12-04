# 🚀 VedeBar - Sanity CMS Setup & Deployment Guide

## 📋 Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Sanity Project Setup](#sanity-project-setup)
4. [Environment Configuration](#environment-configuration)
5. [Initial Data Migration](#initial-data-migration)
6. [Deployment to Vercel](#deployment-to-vercel)
7. [Configure Webhooks for Auto-Revalidation](#configure-webhooks)
8. [How to Update Menu (For Bar Owners)](#how-to-update-menu)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This guide will help you migrate the VedeBar menu from hardcoded data to **Sanity CMS**, enabling bar owners to update drinks without touching code.

**What's changed:**
- Menu data now comes from Sanity CMS
- Images remain in `/public/bebidas/` (no changes needed)
- ISR (Incremental Static Regeneration) with 60-second revalidation
- On-demand revalidation via webhook when content changes

---

## 📦 Installation

### Step 1: Install Dependencies

```bash
npm install
# or
yarn install
```

This will install:
- `sanity` - Sanity Studio
- `next-sanity` - Sanity client for Next.js
- `@sanity/vision` - GROQ query testing tool

---

## 🏗️ Sanity Project Setup

### Step 2: Create Sanity Project

1. **Go to Sanity Dashboard:**
   - Visit [https://www.sanity.io/manage](https://www.sanity.io/manage)
   - Sign in or create an account

2. **Create New Project:**
   - Click "Create Project"
   - Project Name: `vedebar` (or your preferred name)
   - Dataset: `production`
   - **Copy the Project ID** (you'll need this later)

### Step 3: Initialize Sanity in Your Project

```bash
# Login to Sanity (if not already logged in)
npx sanity login

# Initialize Sanity project
npx sanity init --project-id YOUR_PROJECT_ID --dataset production
```

When prompted:
- Use existing project ID (paste the one you copied)
- Use existing dataset: `production`
- Output path: `./sanity` (already configured)

### Step 4: Deploy Sanity Studio

```bash
npm run sanity:deploy
```

This will deploy your Sanity Studio to:
`https://vedebar.sanity.studio/studio`

---

## 🔐 Environment Configuration

### Step 5: Configure Environment Variables

1. **Copy the example file:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Edit `.env.local` with your values:**

   ```env
   # Sanity Configuration
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production

   # Revalidation Secret (generate random string)
   REVALIDATION_SECRET=generate_random_secret_here

   # Existing RD Station Config
   RD_STATION_TOKEN=your_existing_token
   ```

3. **Generate a Revalidation Secret:**
   ```bash
   # On Mac/Linux
   openssl rand -base64 32

   # On Windows (PowerShell)
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
   ```

   Copy the output and paste it as `REVALIDATION_SECRET`

---

## 📊 Initial Data Migration

### Step 6: Add Menu Items to Sanity

Current menu items that need to be added:

1. **Access Sanity Studio:**
   - Local: `http://localhost:3000/studio`
   - Deployed: `https://vedebar.sanity.studio/studio`

2. **Add Each Drink Manually:**

   Click "+ Create" → "Menu Item (Bebida)" and add:

   | Nome | Descrição | Imagem # | Ordem |
   |------|-----------|----------|-------|
   | Aquariano | gin beg tropical . gin london dry . limão . triple sec . xarope de violeta | 1 | 1 |
   | Tropical 43 | Licor 43 . Maracuja . Espumante Brut . Grenadine | 2 | 2 |
   | Hanami | Vodka Haku . Purê de Yuzu . Missô . Bitter de Laranja . Flor de Sabugueiro | 3 | 3 |
   | Batuque | Whisky Burbon . Brandy Jerez . Fireball . Purê de Pera . Limão . Mel | 6 | 4 |
   | Iça Manauara | Cachaça de Jambu . Maracujá . Amora . Elixir de Pixuri . Espuma de Açaí | 7 | 5 |
   | Jabuti | Gin . Jabuticaba . Limão Siciliano . Bitter Citrico | 8 | 6 |
   | Renascentista | Makers Mark . Limão . Amora . Licor de Cassis . Angostura | 9 | 7 |
   | Jangadinha | Spiced Rum . Gengibre . Hortelã . Limão . Bitter de laranja | 11 | 8 |

3. **Important Notes:**
   - **Número da Imagem**: Choose from: 1, 2, 3, 6, 7, 8, 9, 11 (existing images)
   - **Ordem de Exibição**: 1-8 (controls display order)
   - **Ativo no Cardápio**: Keep checked ✅

4. **Publish Each Item:**
   - Click "Publish" after filling each drink

---

## 🌐 Deployment to Vercel

### Step 7: Add Environment Variables to Vercel

1. **Go to Vercel Dashboard:**
   - Visit [https://vercel.com](https://vercel.com)
   - Select your `vedebar` project

2. **Go to Settings → Environment Variables**

3. **Add These Variables:**

   | Name | Value | Environment |
   |------|-------|-------------|
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | (your project ID) | Production, Preview, Development |
   | `NEXT_PUBLIC_SANITY_DATASET` | `production` | Production, Preview, Development |
   | `REVALIDATION_SECRET` | (your secret) | Production, Preview, Development |
   | `RD_STATION_TOKEN` | (existing) | Production |

4. **Redeploy:**
   ```bash
   git add .
   git commit -m "Add Sanity CMS integration"
   git push
   ```

   Or trigger manual redeploy in Vercel dashboard.

---

## 🔔 Configure Webhooks for Auto-Revalidation

### Step 8: Setup Sanity Webhook

This makes the website update automatically when you change menu items in Sanity.

1. **Go to Sanity Dashboard:**
   - [https://www.sanity.io/manage](https://www.sanity.io/manage)
   - Select your `vedebar` project

2. **Navigate to API → Webhooks**

3. **Create New Webhook:**
   - **Name:** `Vercel Revalidation`
   - **URL:** `https://your-domain.vercel.app/api/revalidate?secret=YOUR_REVALIDATION_SECRET`
     - Replace `your-domain` with your actual Vercel domain
     - Replace `YOUR_REVALIDATION_SECRET` with the secret from `.env.local`
   - **Dataset:** `production`
   - **Trigger on:** Document changes (create, update, delete)
   - **Filter (optional):** `_type == "menuItem"`
   - **HTTP Method:** `POST`
   - **API Version:** `v2021-06-07`
   - **Include drafts:** `No` ❌

4. **Save Webhook**

5. **Test Webhook:**
   - Edit a menu item in Sanity Studio
   - Check webhook logs in Sanity dashboard
   - Website should update within ~60 seconds

---

## 👨‍💼 How to Update Menu (For Bar Owners)

### Accessing Sanity Studio

**Option 1: Embedded Studio (Recommended)**
- Visit: `https://your-domain.com/studio`
- Login with your Sanity credentials

**Option 2: Deployed Studio**
- Visit: `https://vedebar.sanity.studio/studio`

### Adding a New Drink

1. **Click "+ Create"** → **"Menu Item (Bebida)"**

2. **Fill in the fields:**
   - **Nome da Bebida:** Name of the drink
   - **Descrição / Ingredientes:** Ingredients separated by ` . `
   - **Número da Imagem:** Choose from: `1, 2, 3, 6, 7, 8, 9, 11`
   - **Ordem de Exibição:** Position in menu (1-8)
   - **Ativo no Cardápio:** ✅ Keep checked to show on website

3. **Click "Publish"**

4. **Wait ~60 seconds** for website to update

### Editing an Existing Drink

1. **Click on the drink** from the list
2. **Edit any field**
3. **Click "Publish"**
4. Website updates automatically

### Temporarily Hiding a Drink

1. **Open the drink**
2. **Uncheck "Ativo no Cardápio"** ❌
3. **Click "Publish"**
4. Drink disappears from website (but stays in Sanity)

### Changing Menu Order

1. **Edit the drink**
2. **Change "Ordem de Exibição"** number
3. **Click "Publish"**
4. Drinks will reorder on website

### Important Constraints

⚠️ **FIXED MENU SIZE:**
- **Exactly 8 drinks** must be active at all times
- Cannot add more than 8 active drinks
- You can create more drinks, but only 8 can be "Ativo" simultaneously

⚠️ **FIXED IMAGES:**
- **Cannot upload new images**
- Must use existing images: `1, 2, 3, 6, 7, 8, 9, 11`
- Images are located in `/public/bebidas/01.jpg`, `/public/bebidas/02.jpg`, etc.

---

## 🧪 Testing Locally

### Step 9: Test Development Environment

1. **Start Sanity Studio:**
   ```bash
   npm run sanity:dev
   ```
   Opens at: `http://localhost:3333`

2. **Start Next.js (in another terminal):**
   ```bash
   npm run dev
   ```
   Opens at: `http://localhost:3000`

3. **Test the flow:**
   - Add/edit drinks in Studio (`localhost:3333`)
   - See changes on website (`localhost:3000`)
   - Test revalidation API:
     ```bash
     curl "http://localhost:3000/api/revalidate?secret=YOUR_SECRET"
     ```

---

## 🛠️ Troubleshooting

### Issue: Menu Not Showing

**Solution:**
- Check `.env.local` has correct `NEXT_PUBLIC_SANITY_PROJECT_ID`
- Ensure at least 1 drink is published and "Ativo" in Sanity
- Check browser console for errors
- Fallback data will show if Sanity returns empty

### Issue: Changes Not Appearing

**Solution:**
- Wait 60 seconds (ISR revalidation time)
- Trigger manual revalidation:
  ```bash
  curl "https://your-domain.com/api/revalidate?secret=YOUR_SECRET"
  ```
- Check webhook logs in Sanity dashboard
- Clear browser cache

### Issue: Webhook Not Working

**Solution:**
- Verify webhook URL is correct
- Check `REVALIDATION_SECRET` matches in Vercel and webhook URL
- Test webhook manually in Sanity dashboard
- Check Vercel function logs

### Issue: Images Not Loading

**Solution:**
- Images are still in `/public/bebidas/` (no changes needed)
- Valid image numbers: `1, 2, 3, 6, 7, 8, 9, 11`
- Check `imageNumber` field in Sanity matches existing images

---

## 📚 Additional Resources

- **Sanity Documentation:** [https://www.sanity.io/docs](https://www.sanity.io/docs)
- **Next.js ISR:** [https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- **GROQ Query Language:** [https://www.sanity.io/docs/groq](https://www.sanity.io/docs/groq)

---

## 🎉 Success Checklist

- [ ] Sanity project created
- [ ] Environment variables configured
- [ ] All 8 drinks added to Sanity
- [ ] Local testing successful
- [ ] Deployed to Vercel
- [ ] Webhook configured and tested
- [ ] Bar owners trained on how to update menu

---

**Need Help?** Contact your developer or check the Sanity community: [https://slack.sanity.io](https://slack.sanity.io)
