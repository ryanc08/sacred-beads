# Deployment Guide - Sacred Beads

How to put your site live on the internet.

---

## Option 1: Netlify (Recommended - Free)

**Why Netlify?** Free, fast, automatic HTTPS, drag-and-drop deployment.

### Steps:

1. **Create account** at https://netlify.com (use GitHub or email)

2. **Deploy your site:**
   - Go to https://app.netlify.com/drop
   - Drag your entire `web-preview` folder onto the page
   - Done! You get a URL like `random-name-123.netlify.app`

3. **Custom domain (optional):**
   - Buy a domain (Namecheap, GoDaddy, Google Domains)
   - In Netlify: Site settings → Domain management → Add custom domain
   - Update your DNS to point to Netlify

---

## Option 2: Vercel (Free)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Upload your folder or connect to GitHub
5. Deploy!

---

## Option 3: GitHub Pages (Free)

1. Create a GitHub account at https://github.com
2. Create a new repository named `sacredbeads`
3. Upload your files
4. Go to Settings → Pages → Select "main" branch
5. Your site is live at `yourusername.github.io/sacredbeads`

---

## Before Deploying: Checklist

### Update URLs in index.html:

Find and replace `https://www.sacredbeads.com` with your actual domain:

```html
<!-- Line 18 - Canonical URL -->
<link rel="canonical" href="https://YOUR-DOMAIN.com/">

<!-- Lines 21-30 - Open Graph -->
<meta property="og:url" content="https://YOUR-DOMAIN.com/">
<meta property="og:image" content="https://YOUR-DOMAIN.com/og-image.jpg">

<!-- Lines 33-38 - Twitter -->
<meta name="twitter:url" content="https://YOUR-DOMAIN.com/">
<meta name="twitter:image" content="https://YOUR-DOMAIN.com/twitter-card.jpg">
```

### Update Social Media Links:

In the structured data (around line 60-75), replace with your actual profiles:

```json
"sameAs": [
    "https://www.instagram.com/YOUR_HANDLE",
    "https://www.facebook.com/YOUR_PAGE",
    "https://www.tiktok.com/@YOUR_HANDLE"
]
```

### Update sitemap.xml:

Replace all `https://www.sacredbeads.com` with your domain.

### Update robots.txt:

Replace the sitemap URL with your domain.

---

## After Deploying

### Submit to Google:

1. Go to https://search.google.com/search-console
2. Add your domain
3. Submit your sitemap: `https://your-domain.com/sitemap.xml`

### Test Social Sharing:

1. **Facebook**: https://developers.facebook.com/tools/debug/
2. **Twitter**: https://cards-dev.twitter.com/validator
3. **LinkedIn**: https://www.linkedin.com/post-inspector/

### Set Up Analytics (optional):

1. Go to https://analytics.google.com
2. Create a property for your site
3. Add the tracking code to your `<head>`

---

## Your Files

```
web-preview/
├── index.html       ← Main site
├── admin.html       ← Product management
├── styles.css       ← Styling
├── app.js           ← JavaScript
├── og-image.jpg     ← Facebook/LinkedIn preview
├── twitter-card.jpg ← Twitter preview
├── sitemap.xml      ← For Google
├── robots.txt       ← For search bots
├── TUTORIAL.md      ← Learning guide
├── CODE_EXPLAINED.md ← Detailed explanations
└── DEPLOYMENT.md    ← This file
```

---

## Need a Domain?

Recommended registrars:
- **Namecheap** - ~$10/year for .com
- **Cloudflare** - Cheapest, at-cost pricing
- **Google Domains** - Simple, integrates with Google

---

## Quick Deploy Command (if using Netlify CLI)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd web-preview
netlify deploy --prod
```
