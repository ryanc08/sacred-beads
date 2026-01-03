/* ==========================================================================
   Sacred Beads AI-Enhanced Customer Service Chatbot
   Uses semantic similarity matching for natural conversation
   ========================================================================== */

// Comprehensive Knowledge Base with variations
const knowledgeBase = [
    // Shipping & Delivery
    {
        patterns: [
            "how long does shipping take",
            "when will my order arrive",
            "delivery time",
            "how many days to ship",
            "shipping duration",
            "when do i get my order",
            "how fast is shipping",
            "international shipping",
            "do you ship worldwide",
            "ship to my country",
            "shipping cost",
            "shipping fee",
            "how much is shipping",
            "free shipping",
            "express shipping",
            "fast delivery",
            "track my order",
            "tracking number",
            "when will package arrive",
            "package get here",
            "order today",
            "how long to receive",
            "delivery days"
        ],
        response: `🚚 **Shipping Information:**

**Delivery Times:**
• Standard International: 7-14 business days
• Express Shipping: 3-5 business days
• USA Domestic: 5-7 business days

**Shipping Costs:**
• **FREE** on orders over $100
• Standard: $9.95
• Express: $24.95

All orders include tracking! You'll receive a tracking number via email once shipped.

We ship worldwide to over 100 countries! 🌍`
    },

    // Returns & Refunds
    {
        patterns: [
            "return policy",
            "can i return",
            "how to return",
            "refund",
            "money back",
            "exchange",
            "not satisfied",
            "don't like it",
            "wrong item",
            "damaged",
            "broken",
            "defective",
            "warranty",
            "guarantee",
            "send it back"
        ],
        response: `↩️ **Returns & Refunds:**

We offer a **30-day satisfaction guarantee!**

**How to Return:**
1. Email hello@sacredbeads.com with your order number
2. We'll send you a return label
3. Ship the item back in original packaging
4. Refund processed within 5-7 business days

**Policy:**
• Full refund or exchange available
• Items must be unused and in original condition
• Free returns for defective/damaged items
• We cover return shipping for our errors

Your satisfaction is our priority! 🙏`
    },

    // Materials
    {
        patterns: [
            "what is it made of",
            "material",
            "amber",
            "olive wood",
            "agate",
            "crystal",
            "authentic",
            "real",
            "genuine",
            "fake",
            "quality",
            "where do materials come from",
            "sourced from",
            "natural",
            "spiritual properties",
            "benefits of amber",
            "why olive wood"
        ],
        response: `✨ **Our Premium Materials:**

**Baltic Amber** 🟠
• Genuine fossilized tree resin (40-60 million years old)
• Sourced from Lithuania & Poland
• Natural healing properties, warm to touch
• Each piece is unique

**Jerusalem Olive Wood** 🟤
• Hand-carved from the Holy Land
• Sacred connection to biblical history
• Beautiful natural grain patterns
• Sustainably harvested

**Yemeni Aqeeq (Agate)** 🔴
• Natural red carnelian from Yemen
• Highly valued in Islamic tradition
• Said to bring protection & blessings
• Each stone hand-polished

**Rose Quartz Crystal** 💗
• Natural pink quartz
• Stone of unconditional love
• Calming energy for meditation

All materials are 100% authentic with certificates available for premium items.`
    },

    // Bead Counts
    {
        patterns: [
            "33 beads",
            "99 beads",
            "how many beads",
            "bead count",
            "why 33",
            "why 99",
            "difference between 33 and 99",
            "which should i choose",
            "tasbih beads",
            "misbaha beads",
            "dhikr",
            "subhanallah",
            "alhamdulillah"
        ],
        response: `📿 **Bead Counts Explained:**

**33 Beads**
Traditional for the "Tasbih of Fatimah":
• SubhanAllah 33x (Glory to God)
• Alhamdulillah 33x (Praise to God)  
• Allahu Akbar 33x (God is Greatest)
Perfect for daily practice, compact and portable.

**99 Beads**
For deeper spiritual practice:
• Recite the 99 Names of Allah
• Extended dhikr sessions
• More immersive meditation
Traditional choice for scholars and devotees.

**Which to Choose?**
• New to practice? Start with 33 beads
• Want deeper sessions? Choose 99 beads
• Both are equally blessed and valid!`
    },

    // Prices
    {
        patterns: [
            "how much",
            "price",
            "cost",
            "expensive",
            "cheap",
            "affordable",
            "budget",
            "money",
            "discount",
            "sale",
            "coupon",
            "promo code",
            "student discount",
            "wholesale"
        ],
        response: `💰 **Pricing Guide:**

**Our Collections:**
• Olive Wood (99 beads): $79
• Baltic Amber (33 beads): $129-189
• Yemeni Aqeeq (33 beads): $245
• Rose Quartz (33 beads): $89
• Premium Sandalwood: $149

**Discounts:**
• 10% off first order (subscribe to newsletter)
• Free shipping over $100
• Bundle deals available

**Why Our Prices?**
Each piece is handcrafted by master artisans using genuine materials. You're not just buying beads - you're investing in a spiritual companion that lasts generations.

For wholesale inquiries, email: wholesale@sacredbeads.com`
    },

    // Custom Orders
    {
        patterns: [
            "custom",
            "customize",
            "personalize",
            "special order",
            "engrave",
            "custom beads",
            "specific number",
            "special request",
            "gift",
            "wedding",
            "bulk order",
            "mosque order",
            "corporate gifts"
        ],
        response: `🎨 **Custom Orders:**

Yes! We create custom prayer beads:

**Customization Options:**
• Specific bead counts (11, 33, 99, or any number)
• Material combinations
• Custom tassel colors
• Engraved imam beads
• Gift packaging with personal message

**Special Orders:**
• Wedding/Nikah favors
• Mosque bulk orders
• Corporate gifts
• Memorial/commemorative beads

**How to Order Custom:**
Email hello@sacredbeads.com with:
1. Your requirements
2. Quantity needed
3. Timeline

We'll respond within 24 hours with a quote!

Custom orders typically take 2-3 weeks to complete.`
    },

    // Care Instructions
    {
        patterns: [
            "how to care",
            "clean",
            "cleaning",
            "maintain",
            "maintenance",
            "wash",
            "store",
            "storage",
            "preserve",
            "protect",
            "oils",
            "polish"
        ],
        response: `🧴 **Care Instructions:**

**Daily Care:**
• Handle with clean, dry hands
• Store in the provided pouch when not in use
• Keep away from direct sunlight
• Avoid contact with water and chemicals

**Cleaning:**
• Wipe gently with a soft, dry cloth
• For amber: use a slightly damp cloth, dry immediately
• Never use soap, alcohol, or harsh cleaners
• Professional cleaning available for valuable pieces

**Storage:**
• Keep in cloth pouch or wooden box
• Store away from heat and humidity
• Don't stack heavy items on top

**Amber Special Care:**
Amber is sensitive to heat. Never leave in hot cars or near heaters.

With proper care, your beads will last for generations! 🌟`
    },

    // Payment
    {
        patterns: [
            "payment",
            "pay",
            "credit card",
            "debit card",
            "paypal",
            "apple pay",
            "google pay",
            "visa",
            "mastercard",
            "payment methods",
            "checkout",
            "secure",
            "safe to buy",
            "installments",
            "payment plan"
        ],
        response: `💳 **Payment Options:**

**We Accept:**
• Visa, Mastercard, American Express
• PayPal
• Apple Pay
• Google Pay
• Shop Pay

**Security:**
• 256-bit SSL encryption
• No payment info stored on our servers
• Verified by Stripe/PayPal

**Payment Plans:**
Shop Pay offers 4 interest-free installments on orders over $50!

All transactions are 100% secure. 🔒`
    },

    // Contact
    {
        patterns: [
            "contact",
            "email",
            "phone",
            "call",
            "speak to someone",
            "talk to human",
            "customer service",
            "support",
            "help me",
            "representative",
            "live chat",
            "hours"
        ],
        response: `📧 **Contact Us:**

**Email:** hello@sacredbeads.com
*(We respond within 24 hours)*

**Social Media:**
• Instagram: @sacredbeads
• Facebook: /sacredbeads
• TikTok: @sacredbeads

**Business Hours:**
Monday-Friday: 9AM-5PM EST
*(Order anytime - we ship daily!)*

**Visit our Contact Page:**
[Contact Form](/contact.html)

Is there something specific I can help you with right now? 💬`
    },

    // About the Company
    {
        patterns: [
            "who are you",
            "about the company",
            "about sacred beads",
            "your story",
            "history",
            "founded",
            "where are you located",
            "who makes",
            "family business",
            "artisans"
        ],
        response: `🕌 **About Sacred Beads:**

We are a family-owned business with over 50 years of tradition in crafting authentic prayer beads.

**Our Story:**
Three generations ago, our grandfather began crafting Tasbih in his small workshop in Istanbul. Today, we continue his legacy, combining traditional techniques with modern ethical standards.

**Our Mission:**
To provide seekers worldwide with authentic, blessed prayer beads that enhance their spiritual practice.

**Our Commitment:**
• 100% handcrafted
• Ethically sourced materials
• Fair wages for artisans
• Carbon-neutral shipping

Learn more on our [About Page](/about.html) 🙏`
    },

    // Order Status
    {
        patterns: [
            "where is my order",
            "order status",
            "track order",
            "hasn't arrived",
            "still waiting",
            "order number",
            "check order",
            "shipping status"
        ],
        response: `📦 **Order Tracking:**

**To Track Your Order:**
1. Check your email for shipping confirmation
2. Click the tracking link provided
3. Or visit the carrier's website with your tracking number

**Don't Have Tracking?**
Email us at hello@sacredbeads.com with:
• Your order number
• Email used for order

**Typical Timelines:**
• Processing: 1-2 business days
• Shipping: 7-14 business days international
• Total: 8-16 business days

If it's been longer than expected, contact us and we'll investigate! 📬`
    },

    // Gift Options
    {
        patterns: [
            "gift",
            "present",
            "gift wrap",
            "gift message",
            "surprise",
            "birthday",
            "eid",
            "ramadan",
            "wedding gift"
        ],
        response: `🎁 **Gift Services:**

**Gift Wrapping:**
• Premium gift box: +$5
• Luxury velvet pouch: Included free!
• Gift message card: Free

**Perfect Occasions:**
• Eid celebrations
• Ramadan gifts
• Wedding/Nikah favors
• Birthday presents
• Graduation
• Convert welcome gifts

**Gift Options at Checkout:**
Select "This is a gift" and we'll:
• Remove all pricing from the package
• Include your personal message
• Use elegant gift packaging

Need gift recommendations? Tell me about the recipient! 💝`
    }
];

// Conversation context
let conversationHistory = [];
let userContext = {};

// Similarity calculation using word overlap and fuzzy matching
function calculateSimilarity(input, pattern) {
    const inputWords = input.toLowerCase().split(/\s+/);
    const patternWords = pattern.toLowerCase().split(/\s+/);

    let matchScore = 0;
    let totalWeight = 0;

    // Check for exact phrase match
    if (input.toLowerCase().includes(pattern.toLowerCase())) {
        return 1.0;
    }

    // Check word matches
    for (const inputWord of inputWords) {
        for (const patternWord of patternWords) {
            const weight = patternWord.length; // Longer words = more important
            totalWeight += weight;

            // Exact match
            if (inputWord === patternWord) {
                matchScore += weight * 1.0;
            }
            // Partial match (word contains pattern or vice versa)
            else if (inputWord.includes(patternWord) || patternWord.includes(inputWord)) {
                matchScore += weight * 0.7;
            }
            // Fuzzy match (similar spelling)
            else if (levenshteinDistance(inputWord, patternWord) <= 2) {
                matchScore += weight * 0.5;
            }
        }
    }

    return totalWeight > 0 ? matchScore / (totalWeight * inputWords.length) : 0;
}

// Levenshtein distance for fuzzy matching
function levenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
            }
        }
    }
    return dp[m][n];
}

// Find best matching response
function findBestMatch(userInput) {
    let bestMatch = null;
    let bestScore = 0;
    const threshold = 0.15; // Minimum similarity threshold

    for (const entry of knowledgeBase) {
        for (const pattern of entry.patterns) {
            const score = calculateSimilarity(userInput, pattern);
            if (score > bestScore && score >= threshold) {
                bestScore = score;
                bestMatch = entry;
            }
        }
    }

    return { match: bestMatch, confidence: bestScore };
}

// Handle greetings - only trigger on short greetings, not messages that contain greeting words
function handleGreeting(input) {
    const lowerInput = input.toLowerCase().trim();
    const words = lowerInput.split(/\s+/);

    // Only trigger greeting for short messages (1-4 words) that look like greetings
    if (words.length > 5) return null;

    const greetings = ['hi', 'hello', 'hey', 'salam', 'assalam', 'peace', 'good morning', 'good evening', 'howdy', 'greetings'];
    const isGreeting = greetings.some(g => lowerInput.startsWith(g) || lowerInput === g);

    if (isGreeting && words.length <= 5) {
        const responses = [
            "Wa Alaikum Assalam! 🕌 Welcome to Sacred Beads. I'm here to help with any questions about our prayer beads, shipping, materials, or anything else. What would you like to know?",
            "Peace be upon you! 🙏 How can I assist you today? Feel free to ask about our products, shipping, returns, or anything else.",
            "Hello and welcome! ✨ I'd love to help you find the perfect prayer beads. What questions do you have?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    return null;
}

// Handle thanks
function handleThanks(input) {
    const thanks = ['thank', 'thanks', 'appreciate', 'helpful', 'great help'];
    const lowerInput = input.toLowerCase();

    if (thanks.some(t => lowerInput.includes(t))) {
        const responses = [
            "You're very welcome! 🙏 Is there anything else I can help you with?",
            "My pleasure! Feel free to ask if you have more questions. May your practice be blessed! ☽",
            "Happy to help! Don't hesitate to reach out if you need anything else. 💚"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    return null;
}

// Handle goodbyes
function handleGoodbye(input) {
    const goodbyes = ['bye', 'goodbye', 'see you', 'take care', 'later', 'gotta go'];
    const lowerInput = input.toLowerCase();

    if (goodbyes.some(g => lowerInput.includes(g))) {
        const responses = [
            "Ma'a Salama! 🕌 May peace be with you. Come back anytime!",
            "Take care! May your prayers be answered. 🙏 Visit us again soon!",
            "Goodbye! Thank you for visiting Sacred Beads. Blessings to you! ☽"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    return null;
}

// Main response generator
function generateResponse(userInput) {
    // Add to conversation history
    conversationHistory.push({ role: 'user', content: userInput });

    // Check for greetings
    const greeting = handleGreeting(userInput);
    if (greeting) return greeting;

    // Check for thanks
    const thanks = handleThanks(userInput);
    if (thanks) return thanks;

    // Check for goodbye
    const goodbye = handleGoodbye(userInput);
    if (goodbye) return goodbye;

    // Find best matching knowledge
    const { match, confidence } = findBestMatch(userInput);

    if (match && confidence >= 0.15) {
        // Store context
        userContext.lastTopic = match;
        return match.response;
    }

    // Smart fallback based on keywords
    const lowerInput = userInput.toLowerCase();

    // Check for question words to give helpful suggestions
    if (lowerInput.includes('?') || lowerInput.startsWith('how') || lowerInput.startsWith('what') || lowerInput.startsWith('where') || lowerInput.startsWith('when') || lowerInput.startsWith('can')) {
        return `I'm not 100% sure about that specific question, but I can help with:

📦 **Shipping & Delivery** - times, costs, tracking
↩️ **Returns & Refunds** - our 30-day guarantee
✨ **Materials** - amber, olive wood, agate, crystal
📿 **Bead Counts** - 33 vs 99 beads explained
💰 **Pricing** - costs, discounts, wholesale
🎨 **Custom Orders** - personalization options

Try asking about one of these topics, or email us at **hello@sacredbeads.com** for personalized help!`;
    }

    // General fallback
    return `I want to make sure I give you accurate information! While I'm still learning, I can definitely help with:

• Product questions (materials, sizes, pricing)
• Shipping and delivery info
• Returns and refunds
• Custom orders
• Care instructions

Could you rephrase your question? Or if you need immediate help, reach us at **hello@sacredbeads.com** - we typically respond within 24 hours! 📧`;
}

// Export for use in chatbot.js
window.generateAIResponse = generateResponse;

// Update the chatbot class to use the new AI
if (window.SacredBeadsChatbot) {
    window.SacredBeadsChatbot.prototype.getResponse = function (userMessage) {
        return generateResponse(userMessage);
    };
}
