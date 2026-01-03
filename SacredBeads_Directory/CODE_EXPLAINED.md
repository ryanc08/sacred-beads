# Code Explained: Line by Line Guide

This guide explains every line of code in your Sacred Beads website.

---

# Part 1: HTML (index.html)

HTML = HyperText Markup Language. It's the structure/skeleton of your page.

---

## The Document Setup

```html
<!DOCTYPE html>
```
**Why:** Tells the browser "this is an HTML5 document." Without it, browsers might render your page in "quirks mode" which causes inconsistent behavior.

---

```html
<html lang="en">
```
**Why:** 
- `<html>` = The root container that wraps everything
- `lang="en"` = Tells search engines and screen readers this page is in English. Helps with accessibility and SEO.

---

```html
<head>
```
**Why:** Contains invisible setup info (metadata). Users don't see this section, but browsers and search engines use it.

---

```html
    <meta charset="UTF-8">
```
**Why:** 
- `charset="UTF-8"` = Allows special characters like é, ñ, 中文, emojis 🕌
- Without it, special characters might show as □ or ?

---

```html
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
```
**Why:** Makes your site work on phones!
- `width=device-width` = Use the phone's actual width, not a zoomed-out desktop view
- `initial-scale=1.0` = Start at 100% zoom

**Without this:** Your site would look tiny on mobile, requiring pinch-to-zoom.

---

```html
    <title>Sacred Beads - Handcrafted Sufi Prayer Beads</title>
```
**Why:** 
- Shows in the browser tab
- Shows in Google search results
- Used when someone bookmarks your site

---

```html
    <meta name="description" content="Discover authentic handcrafted...">
```
**Why:** The text Google shows under your link in search results. Important for SEO (Search Engine Optimization).

---

```html
    <link rel="stylesheet" href="styles.css">
```
**Why:** Connects your CSS file to this HTML file.
- `rel="stylesheet"` = "this link is a stylesheet"
- `href="styles.css"` = the file path

---

```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
```
**Why:** Performance optimization. Tells the browser "we're going to need fonts from Google, start connecting now" so fonts load faster.

---

```html
</head>
<body>
```
**Why:** 
- `</head>` = End of invisible section
- `<body>` = Start of visible content

---

## Semantic HTML Elements

```html
<header class="header">
```
**Why:**
- `<header>` = Semantic tag meaning "this is the top navigation area"
- Better than `<div>` because screen readers understand it
- `class="header"` = A label we'll use in CSS to style it

---

```html
<nav class="nav">
```
**Why:** `<nav>` = Semantic tag for navigation links. Screen readers announce "navigation" to blind users.

---

```html
<a href="#products" class="nav-item">Collection</a>
```
**Why:**
- `<a>` = Anchor tag (a clickable link)
- `href="#products"` = When clicked, scroll to the element with `id="products"`
- The `#` means "find an ID on THIS page" (vs a full URL)

---

```html
<section class="hero" id="hero">
```
**Why:**
- `<section>` = A distinct section of content (semantic)
- `class="hero"` = Label for CSS styling
- `id="hero"` = Unique identifier for linking with `href="#hero"`

**Difference between class and id:**
- `class` = Can be used on multiple elements
- `id` = Must be unique on the page

---

```html
<button class="add-to-cart-btn" data-id="1" data-name="Baltic Amber" data-price="189">
```
**Why:**
- `<button>` = A clickable button element
- `data-id="1"` = Custom data attribute. JavaScript can read this!
- We store product info directly on the button so JS knows what to add to cart

**data-* attributes:** Any attribute starting with `data-` is for passing info to JavaScript.

---

## Why Indentation & Spacing?

```html
<div class="product-card">
    <div class="product-image">
        <img src="photo.jpg" alt="Description">
    </div>
</div>
```

**Why indent?** 
- Shows parent-child relationships visually
- Each level of nesting = one more indent
- Makes code readable and debugging easier

**Standard:** 4 spaces or 1 tab per indent level (pick one, be consistent)

---

# Part 2: CSS (styles.css)

CSS = Cascading Style Sheets. Controls how things look.

---

## The Reset

```css
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

**Line by line:**
- `*` = Select ALL elements
- `*::before, *::after` = Also select pseudo-elements
- `margin: 0` = Remove default spacing outside elements
- `padding: 0` = Remove default spacing inside elements
- `box-sizing: border-box` = When you set width: 100px, it INCLUDES padding and border (instead of adding them on top)

**Why reset?** Browsers have default styles (margins on `<h1>`, padding on `<body>`). Resetting gives you a clean slate.

---

## CSS Variables (Design Tokens)

```css
:root {
    --color-primary: #1a5f5a;
    --color-accent: #c9a962;
    --space-md: 1rem;
}
```

**Line by line:**
- `:root` = The highest-level element (the `<html>` tag). Variables here are available everywhere.
- `--color-primary` = A custom variable name (must start with --)
- `#1a5f5a` = A hex color code (teal green)

**Why use variables?**
1. Change one place, updates everywhere
2. Gives colors meaningful names
3. Makes themes easy to create

**Using a variable:**
```css
.button {
    background: var(--color-primary);
}
```

---

## Selectors Explained

```css
.header {
```
**Why the dot?** `.` means "select elements with this CLASS name"

```css
#products {
```
**Why the hash?** `#` means "select the element with this ID"

```css
.product-card:hover {
```
**Why :hover?** A "pseudo-class" that applies styles only when mouse hovers over it

```css
.btn-primary:hover {
    transform: translateY(-2px);
}
```
**Why transform?** Moves the button up 2 pixels on hover, creating a "lifting" effect

---

## The Box Model

Every element is a box with these layers:

```
+---------------------------+
|         MARGIN            |  ← Space outside the box
|   +-------------------+   |
|   |     BORDER        |   |  ← The edge line
|   |   +-----------+   |   |
|   |   |  PADDING  |   |   |  ← Space inside, around content
|   |   | +-------+ |   |   |
|   |   | |CONTENT| |   |   |  ← Your text/image
|   |   | +-------+ |   |   |
|   |   +-----------+   |   |
|   +-------------------+   |
+---------------------------+
```

```css
.card {
    padding: 1rem;        /* Inside space */
    margin: 2rem;         /* Outside space */
    border: 1px solid #ccc;
}
```

---

## Flexbox Layout

```css
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

**Line by line:**
- `display: flex` = Activate flexbox on this container
- `justify-content: space-between` = Push items to opposite ends (left and right)
- `align-items: center` = Vertically center items

**Flexbox = One-dimensional layout** (either row OR column)

---

## Grid Layout

```css
.product-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
}
```

**Line by line:**
- `display: grid` = Activate grid layout
- `grid-template-columns: repeat(3, 1fr)` = Create 3 equal columns
  - `repeat(3, ...)` = Repeat 3 times
  - `1fr` = 1 fraction of available space
- `gap: 2rem` = Space between grid items

**Grid = Two-dimensional layout** (rows AND columns)

---

## Responsive Design

```css
@media (max-width: 768px) {
    .product-grid {
        grid-template-columns: 1fr;
    }
}
```

**What this does:**
- `@media` = A media query (conditional CSS)
- `max-width: 768px` = "When screen is 768px or narrower..."
- Changes grid from 3 columns to 1 column

**Common breakpoints:**
- 768px = Tablets
- 480px = Phones

---

## Why Semicolons?

```css
.btn {
    padding: 1rem;    /* ← Semicolon ends each property */
    background: blue; /* ← Even the last one (good practice) */
}
```

**Why?** CSS doesn't care about line breaks. Semicolons tell it "this property is finished."

---

## Why Curly Braces?

```css
.btn {
    /* Properties go inside braces */
}
```

**Why?** Groups all the properties that belong to this selector.

---

# Part 3: JavaScript (app.js)

JavaScript = The programming language that makes things interactive.

---

## Variables

```javascript
const cart = {
    items: []
};
```

**Line by line:**
- `const` = Declare a constant (can't reassign to a new value)
- `cart` = The variable name
- `{ items: [] }` = An object with an `items` property containing an empty array

**const vs let vs var:**
- `const` = Can't be reassigned (use for most things)
- `let` = Can be reassigned (use when value changes)
- `var` = Old style, avoid it

---

## Functions

```javascript
function addToCart(product) {
    cart.items.push(product);
}
```

**Line by line:**
- `function` = Declares a function
- `addToCart` = Function name (camelCase convention)
- `(product)` = Parameter - data passed in when called
- `cart.items.push(product)` = Add `product` to the end of the `items` array

---

## Arrow Functions

```javascript
const addToCart = (product) => {
    cart.items.push(product);
};
```

**Same thing, modern syntax:**
- `=>` = "Arrow" function syntax (shorter to write)
- Used heavily in modern JavaScript

---

## DOM Selection

```javascript
const button = document.querySelector('.add-to-cart-btn');
```

**Line by line:**
- `document` = The web page
- `.querySelector()` = Find the FIRST element matching this CSS selector
- `'.add-to-cart-btn'` = A CSS selector (class name)

**querySelectorAll:**
```javascript
const allButtons = document.querySelectorAll('.add-to-cart-btn');
```
Returns ALL matching elements (as a list).

---

## Event Listeners

```javascript
button.addEventListener('click', () => {
    console.log('Button clicked!');
});
```

**Line by line:**
- `addEventListener` = "When this event happens, run this code"
- `'click'` = The event type (could be 'hover', 'submit', etc.)
- `() => { ... }` = The function to run when clicked

---

## Template Literals

```javascript
const message = `Hello, ${name}! You have ${count} items.`;
```

**Why backticks?**
- Allows `${variable}` inside the string
- Allows multiple lines without \n

**Old way:**
```javascript
const message = "Hello, " + name + "! You have " + count + " items.";
```

---

## forEach Loop

```javascript
buttons.forEach(btn => {
    btn.addEventListener('click', handleClick);
});
```

**What this does:**
- `forEach` = Run this code for EACH item in the array
- `btn` = The current button in each iteration
- Attaches a click listener to every button

---

## localStorage

```javascript
// Save data
localStorage.setItem('cart', JSON.stringify(cartData));

// Load data
const saved = localStorage.getItem('cart');
const cartData = JSON.parse(saved);
```

**Why localStorage?**
- Saves data in the browser permanently
- Survives page refreshes and browser closes
- Limited to ~5MB per site

**JSON.stringify / JSON.parse:**
- localStorage only stores strings
- `stringify` = Convert object to string
- `parse` = Convert string back to object

---

## DOMContentLoaded

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // Your code here
});
```

**Why?**
- JavaScript runs as soon as it's loaded
- But HTML might not be fully loaded yet!
- `DOMContentLoaded` waits until all HTML is ready

---

# Part 4: Spacing & Formatting Conventions

## Why Consistent Spacing?

```javascript
// Hard to read:
if(x>5){doThing();doOther();}

// Easy to read:
if (x > 5) {
    doThing();
    doOther();
}
```

**Rules:**
- Spaces around operators (`x > 5` not `x>5`)
- Space after keywords (`if (` not `if(`)
- One statement per line
- Indent inside blocks

---

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase | `productName` |
| CSS classes | kebab-case | `product-card` |
| Constants | UPPER_SNAKE | `MAX_ITEMS` |
| Functions | camelCase | `addToCart()` |

---

## Comments

```javascript
// Single line comment

/* 
   Multi-line
   comment 
*/

/**
 * Documentation comment
 * @param {string} name - The product name
 */
```

**When to comment:**
- Explain WHY, not WHAT
- Document complex logic
- Mark TODO items

---

# Quick Reference

| Syntax | Meaning |
|--------|---------|
| `< >` | HTML tags |
| `{ }` | CSS/JS code blocks |
| `[ ]` | Arrays |
| `.` | CSS class / JS property access |
| `#` | CSS ID selector |
| `${ }` | JS template variable |
| `=>` | Arrow function |
| `//` | JS comment |
| `/* */` | CSS/JS multi-line comment |

---

# Your Files Location

```
c:\Users\Chase\Desktop\Antigravity\web-preview\
├── index.html      ← Open this to view your store
├── admin.html      ← Open this to manage products
├── styles.css      ← Edit this to change appearance
├── app.js          ← Edit this to change behavior
├── TUTORIAL.md     ← Basic tutorial
└── CODE_EXPLAINED.md  ← This file (detailed explanations)
```
