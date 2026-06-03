# 🚀 Deployment Guide

Complete step-by-step guide to deploy **Skills Ecosystem** to GitHub Pages and Vercel.

---

## 📋 Pre-Deployment Checklist

- [x] ✅ Project built successfully (`npm run build`)
- [x] ✅ TypeScript: 0 errors
- [x] ✅ Bundle size: 1.2MB (optimized)
- [x] ✅ PWA manifest configured
- [x] ✅ Service worker generated
- [x] ✅ Git repository initialized
- [x] ✅ Initial commit created
- [x] ✅ README.md completed
- [x] ✅ GitHub Actions workflow configured
- [ ] 🔲 GitHub repository created
- [ ] 🔲 Code pushed to GitHub
- [ ] 🔲 GitHub Pages enabled
- [ ] 🔲 Vercel deployment completed

---

## 🎯 Deployment Overview

```
┌──────────────┐
│ Local Build  │
│  (Complete)  │
└──────┬───────┘
       │
       ├─────────────────┬─────────────────┐
       ▼                 ▼                 ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   GitHub    │   │   Vercel    │   │   Netlify   │
│    Pages    │   │             │   │  (Optional) │
└─────────────┘   └─────────────┘   └─────────────┘
```

---

## 🐙 GitHub Deployment

### Step 1: Create GitHub Repository

**Option A: Via Web UI** (Recommended)

1. Navigate to https://github.com/new
2. Fill in details:
   - **Owner:** `marktantongco`
   - **Repository name:** `skills-ecosystem`
   - **Visibility:** Public
   - **Initialize:** ❌ Do NOT check "Add README" (we have one)
3. Click **"Create repository"**

**Option B: Via GitHub CLI**

```bash
cd /home/x1/.owl-agent/workspace/projects/skills-ecosystem

# Authenticate first
gh auth login

# Create repo
gh repo create marktantongco/skills-ecosystem \
  --public \
  --source=. \
  --remote=origin \
  --description="Award-winning interactive showcase of the open agent skills ecosystem"
```

### Step 2: Push to GitHub

```bash
# If you created via web UI, add the remote:
git remote add origin https://github.com/marktantongco/skills-ecosystem.git

# Push main branch
git push -u origin main

# Verify
git remote -v
git log --oneline -3
```

### Step 3: Enable GitHub Pages

**Automatic Deployment (Recommended)**

The GitHub Actions workflow at `.github/workflows/deploy.yml` will automatically:
- Build the project on every push to `main`
- Deploy to GitHub Pages
- Make the site available at `https://marktantongco.github.io/skills-ecosystem`

**Enable it:**
1. Go to repo **Settings** → **Pages**
2. Source: **GitHub Actions**
3. Wait 2-3 minutes for first deployment
4. Visit `https://marktantongco.github.io/skills-ecosystem`

**Manual Deployment (Alternative)**

```bash
# Build and deploy to gh-pages branch
npm run build
npx gh-pages -d out -b gh-pages -m "deploy: initial deployment"

# Configure Pages source
# Settings → Pages → Source: gh-pages branch
```

### Step 4: Verify GitHub Pages

```bash
# Check deployment status
gh workflow view deploy.yml

# Check Pages URL
gh browse
```

**Expected Result:** Site live at `https://marktantongco.github.io/skills-ecosystem`

---

## ▲ Vercel Deployment

### Step 1: Install Vercel CLI (if not installed)

```bash
npm install -g vercel
```

### Step 2: Authenticate

```bash
vercel login
```

Follow the prompts to authenticate via email or GitHub.

### Step 3: Deploy

**Quick Deploy:**

```bash
cd /home/x1/.owl-agent/workspace/projects/skills-ecosystem

# Deploy to production
vercel --prod
```

**Interactive Deploy:**

```bash
vercel
```

Answer the prompts:
- Set up and deploy? → **Yes**
- Which scope? → **Your account**
- Link to existing project? → **No**
- Project name? → **skills-ecosystem**
- Directory? → **. (current directory)**
- Override settings? → **No**

### Step 4: Custom Domain (Optional)

```bash
# Add custom domain
vercel domains add skills-ecosystem.com

# Or via dashboard
```

### Step 5: Verify Vercel

```bash
# Check deployment
vercel ls

# Open deployment
vercel --prod
```

**Expected Result:** Site live at `https://skills-ecosystem.vercel.app`

---

## 🌐 Netlify Deployment (Optional)

### Via Netlify Web UI

1. Go to https://app.netlify.com/start
2. **Connect to Git provider:** GitHub
3. **Pick repository:** `marktantongco/skills-ecosystem`
4. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `out`
5. Click **Deploy site**

### Via Netlify CLI

```bash
# Install CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=out
```

---

## 🔍 Post-Deployment Verification

### Checklist

- [ ] GitHub Pages URL loads successfully
- [ ] Vercel URL loads successfully
- [ ] All sections render correctly (Hero, Features, Comparison, Install, Deploy)
- [ ] Navigation works (smooth scroll to anchors)
- [ ] Mobile responsive (test at 375px, 768px, 1440px)
- [ ] PWA installable (check browser install prompt)
- [ ] Service worker registered (check DevTools → Application)
- [ ] Animations play smoothly (hero text reveal, card staggers, scroll reveals)
- [ ] Dark theme active
- [ ] Glassmorphism effects visible
- [ ] No console errors
- [ ] Lighthouse score: Performance 95+, Accessibility 98+

### Test Commands

```bash
# Run Lighthouse audit
npx lighthouse https://marktantongco.github.io/skills-ecosystem --view

# Check broken links
npx linkinator https://marktantongco.github.io/skills-ecosystem

# Test mobile performance
npx lighthouse https://marktantongco.github.io/skills-ecosystem --preset=perf --view --emulated-form-factor=mobile
```

---

## 🐛 Troubleshooting

### GitHub Pages Not Loading

**Issue:** 404 error on GitHub Pages URL

**Fix:**
```bash
# Check Pages settings
gh repo edit --enable-pages --pages-branch gh-pages

# Force redeploy
git commit --allow-empty -m "chore: trigger pages rebuild"
git push origin main
```

### Vercel Build Failing

**Issue:** Build error in Vercel

**Fix:**
1. Check Vercel logs: `vercel logs`
2. Verify build succeeds locally: `npm run build`
3. Check Node version in `package.json`:
   ```json
   "engines": { "node": ">=18.0.0" }
   ```

### Animations Not Playing

**Issue:** GSAP/Framer Motion animations don't work

**Possible causes:**
- JavaScript not loaded (check Network tab)
- Prefers-reduced-motion enabled (check DevTools)
- GSAP license/CDN issue

**Fix:** Verify bundle includes motion libraries:
```bash
# Check bundle
npx source-map-explorer out/_next/static/chunks/*.js
```

### PWA Not Installing

**Issue:** Browser doesn't show install prompt

**Requirements:**
- [x] HTTPS (GitHub Pages auto-provides)
- [x] Valid manifest.json
- [x] Service worker registered
- [ ] User engagement (needs 30+ seconds on site)

**Verify:**
```bash
# Check manifest
curl https://marktantongco.github.io/skills-ecosystem/manifest.json

# Check service worker
curl https://marktantongco.github.io/skills-ecosystem/sw.js
```

---

## 🔄 Continuous Deployment

### Automatic Deployments Configured

✅ **GitHub Pages:** Deploys on every push to `main` via GitHub Actions
✅ **Vercel:** Deploys on every push to `main` (if connected via dashboard)

### Manual Redeployment

```bash
# Redeploy to GitHub Pages
git commit --allow-empty -m "chore: redeploy"
git push origin main

# Redeploy to Vercel
vercel --prod --force
```

---

## 📊 Analytics (Optional)

### Add Vercel Analytics

```bash
npm install @vercel/analytics
```

```tsx
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Add Google Analytics

Add to `src/app/layout.tsx`:

```tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

---

## 🎉 Success Criteria

Your deployment is successful when:

✅ GitHub Pages URL returns 200 status
✅ Vercel URL returns 200 status
✅ Lighthouse Performance > 95
✅ Lighthouse Accessibility > 98
✅ Mobile responsive on iPhone/Android
✅ PWA install prompt appears after 30s
✅ All animations play smoothly at 60fps
✅ No console errors
✅ All internal links work
✅ Service worker caches assets

---

**Expected Deployment Time:** 5-10 minutes
**Expected URLs:**
- GitHub Pages: `https://marktantongco.github.io/skills-ecosystem`
- Vercel: `https://skills-ecosystem.vercel.app` (auto-generated)
