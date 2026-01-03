# How to Build an E-Commerce Site from Scratch

A beginner's guide to creating the Sacred Beads website.

---

## Prerequisites

**All you need:**
- A text editor (VS Code recommended, free at https://code.visualstudio.com)
- A web browser (Chrome or Edge)
- A folder on your computer

**No installation required** - HTML, CSS, and JavaScript run directly in your browser!

---

## Project Structure

Create a folder called `my-shop` with these files:

```
my-shop/
├── index.html    (your webpage)
├── styles.css    (how it looks)
└── app.js        (how it works)
```

---

## Step 1: Create the HTML (index.html)

HTML is the skeleton of your page. Start with this template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Shop</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Navigation -->
    <header class="header">
        <nav class="nav">
            <a href="#" class="logo">My Shop</a>
            <ul class="nav-links">
                <li><a href="#products">Products</a></li>
                <li><a href="#about">About</a></li>
            </ul>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <h1>Welcome to My Shop</h1>
        <p>Beautiful handcrafted items</p>
        <a href="#products" class="btn">Shop Now</a>
    </section>

    <!-- Products -->
    <section class="products" id="products">
        <h2>Our Products</h2>
        <div class="product-grid">
            <!-- Products go here -->
        </div>
    </section>

    <script src="app.js"></script>
</body>
</html>
```

**Key concepts:**
- `<head>` = invisible setup (title, CSS link)
- `<body>` = visible content
- `class="..."` = labels for styling
- `id="..."` = unique identifiers for linking

---

## Step 2: Style with CSS (styles.css)

CSS makes things beautiful:

```css
/* Reset defaults */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Custom colors (design tokens) */
:root {
    --primary: #1a5f5a;
    --accent: #c9a962;
    --text: #2d2a26;
    --background: #f7f3eb;
}

body {
    font-family: 'Inter', sans-serif;
    background: var(--background);
    color: var(--text);
}

/* Navigation */
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 1rem 2rem;
    background: white;
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary);
    text-decoration: none;
}

/* Hero */
.hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: linear-gradient(135deg, var(--primary), #722f37);
    color: white;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

/* Button */
.btn {
    padding: 1rem 2rem;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: 8px;
    text-decoration: none;
    cursor: pointer;
}

.btn:hover {
    transform: translateY(-2px);
}

/* Product Grid */
.product-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    padding: 2rem;
}
```

**Key concepts:**
- `:root` = store colors as variables
- `display: flex` = arrange items in a row/column
- `display: grid` = create layouts
- `:hover` = styles when mouse hovers

---

## Step 3: Add Interactivity (app.js)

JavaScript makes things work:

```javascript
// Shopping cart stored in browser
const cart = {
    items: [],
    
    add(product) {
        this.items.push(product);
        this.updateCount();
        alert(`${product.name} added to cart!`);
    },
    
    updateCount() {
        const badge = document.querySelector('.cart-count');
        if (badge) {
            badge.textContent = this.items.length;
        }
    }
};

// Listen for "Add to Cart" button clicks
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.add-to-cart-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const product = {
                id: btn.dataset.id,
                name: btn.dataset.name,
                price: btn.dataset.price
            };
            cart.add(product);
        });
    });
});
```

**Key concepts:**
- `document.querySelector()` = find elements on page
- `addEventListener()` = respond to clicks
- `localStorage` = save data in browser

---

## Step 4: Test Your Site

1. Save all files
2. Double-click `index.html`
3. It opens in your browser!
4. Make changes → Save → Refresh browser

---

## Step 5: Add an Admin Panel

Create `admin.html` for managing products without code:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Admin</title>
</head>
<body>
    <h1>Product Manager</h1>
    
    <form id="product-form">
        <input type="text" id="name" placeholder="Product Name">
        <input type="number" id="price" placeholder="Price">
        <button type="submit">Save</button>
    </form>
    
    <script>
        // Load products from localStorage
        let products = JSON.parse(localStorage.getItem('products')) || [];
        
        // Save new product
        document.getElementById('product-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            products.push({
                id: Date.now(),
                name: document.getElementById('name').value,
                price: document.getElementById('price').value
            });
            
            localStorage.setItem('products', JSON.stringify(products));
            alert('Product saved!');
        });
    </script>
</body>
</html>
```

---

## Summary

| File | Purpose | Language |
|------|---------|----------|
| index.html | Structure | HTML |
| styles.css | Appearance | CSS |
| app.js | Behavior | JavaScript |
| admin.html | Management | HTML + JS |

---

# Part 2: Building SEO from Scratch

This section teaches you SEO by DOING. Each step has you type real code and test it yourself.

---

## What is SEO?

SEO = Search Engine Optimization

It's how you help Google understand your site so people can find you.

**Without SEO:** Your site is invisible on Google
**With SEO:** Your site appears when people search for your products

---

## 🔨 Exercise 1: Basic Meta Tags

Meta tags are invisible info in your `<head>` that search engines read.

### DO THIS NOW:

1. Open `index.html` in your editor
2. Find the `<head>` section
3. Add these tags inside `<head>`:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- ADD THESE NEW TAGS: -->
    
    <!-- This is what shows in Google search results -->
    <title>My Shop - Beautiful Handcrafted Items | Free Shipping</title>
    
    <!-- This is the description under your Google link -->
    <meta name="description" content="Shop beautiful handcrafted items made with love. Free shipping on orders over $50. Unique gifts for every occasion.">
    
    <!-- Keywords help Google understand topics (less important now, but good practice) -->
    <meta name="keywords" content="handcrafted, gifts, unique items, artisan, handmade">
    
    <!-- Tell Google to index your page -->
    <meta name="robots" content="index, follow">
</head>
```

### TEST IT:

1. Save the file
2. Open in browser
3. Look at the browser TAB - you should see your new title!
4. Right-click → View Page Source → Find your meta tags

### ✅ CHECKPOINT: Can you see your title in the browser tab?

---

## 🔨 Exercise 2: Open Graph (Social Sharing)

When someone shares your link on Facebook or LinkedIn, Open Graph controls what they see.

### DO THIS NOW:

1. In your `<head>`, add these tags AFTER your basic meta tags:

```html
    <!-- Open Graph for Facebook/LinkedIn -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="My Shop - Beautiful Handcrafted Items">
    <meta property="og:description" content="Shop beautiful handcrafted items made with love.">
    <meta property="og:image" content="https://yoursite.com/preview-image.jpg">
    <meta property="og:url" content="https://yoursite.com/">
```

### WHAT EACH LINE DOES:

| Tag | What It Controls |
|-----|------------------|
| `og:type` | "website" or "product" or "article" |
| `og:title` | The big headline when shared |
| `og:description` | The text snippet when shared |
| `og:image` | The preview picture (should be 1200x630 pixels) |
| `og:url` | Your website address |

### TEST IT:

1. Go to: https://developers.facebook.com/tools/debug/
2. Paste your website URL
3. Click "Debug"
4. See what Facebook would show!

### ✅ CHECKPOINT: Can you see your title and description in the debugger?

---

## 🔨 Exercise 3: Twitter Cards

Twitter has its own sharing format.

### DO THIS NOW:

1. Add these tags in your `<head>`:

```html
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="My Shop - Beautiful Handcrafted Items">
    <meta name="twitter:description" content="Shop beautiful handcrafted items made with love.">
    <meta name="twitter:image" content="https://yoursite.com/twitter-image.jpg">
```

### WHAT'S DIFFERENT FROM OPEN GRAPH?

- Twitter uses `name=` instead of `property=`
- Twitter uses `twitter:` prefix instead of `og:`
- Twitter card types: `summary`, `summary_large_image`, `player`

### ✅ CHECKPOINT: Your `<head>` should now have 10+ meta tags

---

## 🔨 Exercise 4: Structured Data (The Power Move)

Structured data tells Google EXACTLY what your page contains. This is what makes those fancy search results with stars, prices, and images.

### DO THIS NOW:

1. Add this script inside your `<head>`:

```html
    <!-- Structured Data for Google -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Handcrafted Wooden Bowl",
        "description": "Beautiful hand-carved wooden bowl",
        "image": "https://yoursite.com/bowl.jpg",
        "brand": {
            "@type": "Brand",
            "name": "My Shop"
        },
        "offers": {
            "@type": "Offer",
            "price": "49.99",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
        }
    }
    </script>
```

### UNDERSTAND THE FORMAT:

```
┌─────────────────────────────────────────────┐
│  @context: "https://schema.org"             │  ← Standard vocabulary
│  @type: "Product"                           │  ← What kind of thing?
│  name: "..."                                │  ← Product name
│  offers:                                    │  ← Price info
│      price: "49.99"                         │
│      priceCurrency: "USD"                   │
└─────────────────────────────────────────────┘
```

### TEST IT:

1. Go to: https://search.google.com/test/rich-results
2. Paste your website URL (or paste the HTML code directly)
3. Click "Test URL"
4. See if Google detects your structured data!

### ✅ CHECKPOINT: Does the Rich Results Test show "Product" detected?

---

## 🔨 Exercise 5: Build a Complete Head Section

Now let's put it all together. This is what a professional `<head>` looks like.

### DO THIS NOW:

Create a NEW file called `seo-test.html` and type this ENTIRE thing by hand (don't copy-paste - typing helps you learn):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- 1. BASIC SETUP -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- 2. PRIMARY SEO -->
    <title>My Shop - Handcrafted Gifts | Free Shipping Over $50</title>
    <meta name="description" content="Discover unique handcrafted gifts made by artisans. Beautiful home decor, jewelry, and accessories. Free shipping on orders over $50.">
    <meta name="keywords" content="handcrafted, gifts, artisan, handmade, unique gifts, home decor">
    <meta name="author" content="My Shop">
    <meta name="robots" content="index, follow">
    
    <!-- 3. CANONICAL URL (prevents duplicate content) -->
    <link rel="canonical" href="https://myshop.com/">
    
    <!-- 4. OPEN GRAPH / FACEBOOK -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://myshop.com/">
    <meta property="og:title" content="My Shop - Handcrafted Gifts">
    <meta property="og:description" content="Discover unique handcrafted gifts made by artisans.">
    <meta property="og:image" content="https://myshop.com/og-image.jpg">
    <meta property="og:site_name" content="My Shop">
    
    <!-- 5. TWITTER CARD -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://myshop.com/">
    <meta name="twitter:title" content="My Shop - Handcrafted Gifts">
    <meta name="twitter:description" content="Discover unique handcrafted gifts made by artisans.">
    <meta name="twitter:image" content="https://myshop.com/twitter-card.jpg">
    
    <!-- 6. STRUCTURED DATA -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "My Shop",
        "url": "https://myshop.com",
        "logo": "https://myshop.com/logo.png",
        "sameAs": [
            "https://instagram.com/myshop",
            "https://facebook.com/myshop"
        ]
    }
    </script>
    
    <!-- 7. STYLES (always load last in head) -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>SEO Test Page</h1>
    <p>View the source code to see the SEO tags!</p>
</body>
</html>
```

### COUNT YOUR TAGS:

After typing, count how many meta tags you have:
- [ ] Title tag (1)
- [ ] Description (1)
- [ ] Keywords (1)
- [ ] Robots (1)
- [ ] Canonical (1)
- [ ] Open Graph tags (6)
- [ ] Twitter tags (5)
- [ ] Structured data (1 script)

**Total: 17+ SEO elements!**

### ✅ CHECKPOINT: Open the file in your browser and right-click → View Source. Can you find all your tags?

---

## 🔨 Exercise 6: Create Your Sitemap

A sitemap is a list of all your pages for Google to crawl.

### DO THIS NOW:

1. Create a new file called `sitemap.xml`
2. Type this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    
    <!-- Homepage -->
    <url>
        <loc>https://myshop.com/</loc>
        <lastmod>2026-01-03</lastmod>
        <priority>1.0</priority>
    </url>
    
    <!-- Products page -->
    <url>
        <loc>https://myshop.com/#products</loc>
        <lastmod>2026-01-03</lastmod>
        <priority>0.8</priority>
    </url>
    
    <!-- About page -->
    <url>
        <loc>https://myshop.com/#about</loc>
        <lastmod>2026-01-03</lastmod>
        <priority>0.5</priority>
    </url>
    
</urlset>
```

### UNDERSTAND THE FORMAT:

| Tag | What It Means |
|-----|---------------|
| `<loc>` | The full URL of the page |
| `<lastmod>` | When you last updated it (YYYY-MM-DD) |
| `<priority>` | How important (1.0 = most, 0.0 = least) |

### ✅ CHECKPOINT: You should have a `sitemap.xml` file in your folder

---

## 🔨 Exercise 7: Create robots.txt

This file tells search engine bots what they can and can't access.

### DO THIS NOW:

1. Create a new file called `robots.txt`
2. Type this:

```
# Welcome to My Shop!
# This file tells search engines what to crawl

User-agent: *
Allow: /

# Don't index admin pages
Disallow: /admin.html

# Where's the sitemap?
Sitemap: https://myshop.com/sitemap.xml
```

### UNDERSTAND THE FORMAT:

| Line | What It Means |
|------|---------------|
| `User-agent: *` | "This applies to all search bots" |
| `Allow: /` | "You can access everything" |
| `Disallow: /admin.html` | "Don't index the admin page" |
| `Sitemap:` | "Here's where to find my sitemap" |

### ✅ CHECKPOINT: You should have a `robots.txt` file in your folder

---

## 🔨 Exercise 8: Test Everything

Now let's verify all your SEO is working.

### DO THESE TESTS:

**Test 1: Page Title**
1. Open your HTML file in a browser
2. Look at the browser TAB
3. ✅ Does it show your custom title?

**Test 2: View Source**
1. Right-click → View Page Source
2. Press Ctrl+F and search for "og:title"
3. ✅ Can you find all your Open Graph tags?

**Test 3: Rich Results**
1. Go to: https://search.google.com/test/rich-results
2. Click "Code" tab
3. Paste your entire HTML code
4. Click "Test Code"
5. ✅ Does it detect your structured data?

**Test 4: Mobile Friendly**
1. Go to: https://search.google.com/test/mobile-friendly
2. Paste your URL (when live) or code
3. ✅ Is your site mobile-friendly?

---

## SEO Cheat Sheet

Copy this into every new page you create:

```html
<!-- COPY THIS INTO YOUR <head> FOR EVERY PAGE -->

<!-- Basic -->
<title>Page Name | Site Name</title>
<meta name="description" content="60-160 character description">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://yoursite.com/this-page">

<!-- Social -->
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Description">
<meta property="og:image" content="https://yoursite.com/image.jpg">
<meta property="og:url" content="https://yoursite.com/this-page">
<meta name="twitter:card" content="summary_large_image">
```

---

## Quick Reference: SEO File Checklist

After completing this tutorial, you should have:

```
your-site/
├── index.html        ← With full SEO in <head>
├── sitemap.xml       ← List of all pages
├── robots.txt        ← Bot instructions
├── og-image.jpg      ← 1200x630px Facebook preview
└── twitter-card.jpg  ← 1200x600px Twitter preview
```

---

## Summary: What You Built

| What | Why | Where |
|------|-----|-------|
| Meta tags | Google understands your content | `<head>` |
| Open Graph | Facebook/LinkedIn shows nice previews | `<head>` |
| Twitter Cards | Twitter shows nice previews | `<head>` |
| Structured Data | Google shows rich results (stars, prices) | `<head>` |
| Sitemap | Google finds all your pages | `sitemap.xml` |
| Robots.txt | Control what bots can access | `robots.txt` |

---

## Next Steps to Learn More

1. **Google Search Console** - https://search.google.com/search-console (submit your site)
2. **MDN Web Docs** - https://developer.mozilla.org (official reference)
3. **Schema.org** - https://schema.org (all structured data types)
4. **freeCodeCamp** - https://freecodecamp.org (free courses)

---

## Your Site Files

```
c:\Users\Chase\Desktop\Antigravity\web-preview\
├── index.html         ← Your store (with full SEO)
├── admin.html         ← Product management
├── styles.css         ← Styling
├── app.js             ← JavaScript
├── sitemap.xml        ← For Google
├── robots.txt         ← Bot instructions
├── og-image.jpg       ← Facebook preview image
├── twitter-card.jpg   ← Twitter preview image
├── TUTORIAL.md        ← This file
├── CODE_EXPLAINED.md  ← Line-by-line explanations
└── DEPLOYMENT.md      ← How to go live
```

**You did it! 🎉** You now know how to build a website AND optimize it for search engines.

