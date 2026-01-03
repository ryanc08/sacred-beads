/* ==========================================================================
   Sacred Beads Customer Service Chatbot
   A friendly FAQ-based chatbot for customer support
   ========================================================================== */

// Chatbot knowledge base
const chatbotKnowledge = {
    greetings: [
        "Assalamu Alaikum! 🕌 Welcome to Sacred Beads. How can I help you today?",
        "Peace be upon you! I'm here to help with any questions about our prayer beads.",
        "Hello! Thank you for visiting Sacred Beads. What would you like to know?"
    ],

    responses: {
        // Shipping related
        shipping: {
            keywords: ['shipping', 'ship', 'delivery', 'deliver', 'how long', 'days', 'arrive'],
            answer: "🚚 **Shipping Info:**\n\n• Standard shipping: 7-14 business days internationally\n• Express shipping: 3-5 business days (available at checkout)\n• **FREE shipping** on orders over $100!\n\nAll orders include tracking."
        },

        // Returns
        returns: {
            keywords: ['return', 'refund', 'money back', 'exchange', 'not happy', 'damaged'],
            answer: "↩️ **Returns & Refunds:**\n\nWe offer a **30-day satisfaction guarantee**!\n\n• Full refund or exchange if you're not happy\n• Contact us at hello@sacredbeads.com\n• Please include your order number\n\nWe want you to love your prayer beads."
        },

        // Materials
        materials: {
            keywords: ['material', 'made of', 'amber', 'wood', 'agate', 'crystal', 'authentic', 'real', 'genuine'],
            answer: "✨ **Our Materials:**\n\n• **Baltic Amber** - Genuine fossilized resin from Lithuania\n• **Olive Wood** - Hand-carved from Jerusalem\n• **Yemeni Agate** - Natural red aqeeq stones\n• **Crystal** - High-quality rose quartz\n\nAll materials are ethically sourced and 100% authentic."
        },

        // Bead counts
        beads: {
            keywords: ['33', '99', 'beads', 'count', 'how many', 'tasbih', 'misbaha'],
            answer: "📿 **Bead Counts:**\n\n• **33 beads** - For saying SubhanAllah, Alhamdulillah, and Allahu Akbar 33 times each\n• **99 beads** - For the 99 names of Allah or longer dhikr sessions\n\nBoth are traditional and perfect for daily practice."
        },

        // Prices
        prices: {
            keywords: ['price', 'cost', 'expensive', 'cheap', 'afford', 'budget', 'money', '$'],
            answer: "💰 **Our Prices:**\n\n• **$79** - Jerusalem Olive Wood (99 beads)\n• **$129-189** - Baltic Amber collections\n• **$245** - Premium Yemeni Aqeeq\n\nAll prices include quality guarantee and authenticity certificate for premium items."
        },

        // Custom orders
        custom: {
            keywords: ['custom', 'personalize', 'special order', 'engrave', 'customize', 'request'],
            answer: "🎨 **Custom Orders:**\n\nYes! We can create custom prayer beads:\n\n• Specific bead counts\n• Special materials\n• Personalized tassels\n• Gift packaging\n\nContact us with your requirements and we'll provide a quote!"
        },

        // Care
        care: {
            keywords: ['care', 'clean', 'maintain', 'wash', 'store', 'protect'],
            answer: "🧴 **Care Instructions:**\n\n• Store in a cloth pouch away from sunlight\n• Wipe gently with a soft, dry cloth\n• Avoid water and chemicals\n• Handle with clean, dry hands\n\nWith proper care, your beads will last generations!"
        },

        // Payment
        payment: {
            keywords: ['pay', 'payment', 'credit card', 'paypal', 'visa', 'mastercard', 'checkout'],
            answer: "💳 **Payment Options:**\n\nWe accept:\n• All major credit cards (Visa, Mastercard, Amex)\n• PayPal\n• Apple Pay / Google Pay\n\nAll transactions are secure and encrypted."
        },

        // Contact
        contact: {
            keywords: ['contact', 'email', 'phone', 'reach', 'talk', 'human', 'support', 'help'],
            answer: "📧 **Contact Us:**\n\n• **Email:** hello@sacredbeads.com\n• **Response time:** 24-48 hours\n• **Social:** @sacredbeads on Instagram\n\nYou can also use our [Contact Form](/contact.html)!"
        },

        // Hours
        hours: {
            keywords: ['hours', 'open', 'available', 'when'],
            answer: "🕐 **Business Hours:**\n\nOur online store is open 24/7!\n\nCustomer service responds:\n• Monday - Friday: 9am - 5pm EST\n• Weekends: Limited support"
        }
    },

    fallback: [
        "I'm not sure I understand. Could you rephrase that? Or you can ask about:\n• Shipping\n• Returns\n• Materials\n• Prices\n• Custom orders",
        "I'd love to help! Try asking about shipping, returns, materials, or prices. Or contact us at hello@sacredbeads.com",
        "Hmm, I don't have info on that. Please email hello@sacredbeads.com and our team will assist you!"
    ],

    quickReplies: [
        "Shipping info",
        "Return policy",
        "Materials used",
        "Prices",
        "Custom orders",
        "Contact us"
    ]
};

// Chatbot class
class SacredBeadsChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.createChatWidget();
        this.bindEvents();
        this.addMessage('bot', this.getGreeting());
    }

    createChatWidget() {
        const chatHTML = `
            <div class="chatbot-container" id="chatbot-container">
                <button class="chatbot-toggle" id="chatbot-toggle" aria-label="Open customer support chat">
                    <svg class="chatbot-icon-open" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                        <circle cx="12" cy="10" r="1.5"/>
                        <circle cx="8" cy="10" r="1.5"/>
                        <circle cx="16" cy="10" r="1.5"/>
                    </svg>
                    <svg class="chatbot-icon-close" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                    <span class="chatbot-notification" id="chatbot-notification">1</span>
                </button>
                
                <div class="chatbot-window" id="chatbot-window">
                    <div class="chatbot-header">
                        <div class="chatbot-header-info">
                            <div class="chatbot-avatar">☽</div>
                            <div>
                                <h4>Sacred Beads Support</h4>
                                <span class="chatbot-status">● Online</span>
                            </div>
                        </div>
                        <button class="chatbot-minimize" id="chatbot-minimize">−</button>
                    </div>
                    
                    <div class="chatbot-messages" id="chatbot-messages">
                        <!-- Messages appear here -->
                    </div>
                    
                    <div class="chatbot-quick-replies" id="chatbot-quick-replies">
                        <!-- Quick reply buttons -->
                    </div>
                    
                    <div class="chatbot-input-area">
                        <input type="text" id="chatbot-input" placeholder="Type your question..." autocomplete="off">
                        <button id="chatbot-send" aria-label="Send message">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);

        // Cache DOM elements
        this.container = document.getElementById('chatbot-container');
        this.toggle = document.getElementById('chatbot-toggle');
        this.window = document.getElementById('chatbot-window');
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.quickRepliesContainer = document.getElementById('chatbot-quick-replies');
        this.input = document.getElementById('chatbot-input');
        this.sendBtn = document.getElementById('chatbot-send');
        this.notification = document.getElementById('chatbot-notification');
        this.minimizeBtn = document.getElementById('chatbot-minimize');

        // Add quick replies
        this.renderQuickReplies();
    }

    bindEvents() {
        // Toggle chat window
        this.toggle.addEventListener('click', () => this.toggleChat());
        this.minimizeBtn.addEventListener('click', () => this.toggleChat());

        // Send message
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Quick replies
        this.quickRepliesContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-reply-btn')) {
                this.input.value = e.target.textContent;
                this.sendMessage();
            }
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        this.container.classList.toggle('open', this.isOpen);

        if (this.isOpen) {
            this.notification.style.display = 'none';
            this.input.focus();
            this.scrollToBottom();
        }
    }

    sendMessage() {
        const text = this.input.value.trim();
        if (!text) return;

        // Add user message
        this.addMessage('user', text);
        this.input.value = '';

        // Hide quick replies after first message
        this.quickRepliesContainer.style.display = 'none';

        // Bot response with typing delay
        this.showTyping();
        setTimeout(() => {
            this.hideTyping();
            const response = this.getResponse(text);
            this.addMessage('bot', response);
        }, 800 + Math.random() * 700);
    }

    addMessage(sender, text) {
        const messageHTML = `
            <div class="chatbot-message ${sender}">
                ${sender === 'bot' ? '<div class="chatbot-message-avatar">☽</div>' : ''}
                <div class="chatbot-message-content">${this.formatMessage(text)}</div>
            </div>
        `;

        this.messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
        this.messages.push({ sender, text });
    }

    formatMessage(text) {
        // Convert markdown-like formatting
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    }

    showTyping() {
        const typingHTML = `
            <div class="chatbot-message bot typing" id="typing-indicator">
                <div class="chatbot-message-avatar">☽</div>
                <div class="chatbot-message-content">
                    <div class="typing-dots">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </div>
        `;
        this.messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        this.scrollToBottom();
    }

    hideTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    getGreeting() {
        const greetings = chatbotKnowledge.greetings;
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    getResponse(userMessage) {
        // Use AI-enhanced response if available
        if (window.generateAIResponse) {
            return window.generateAIResponse(userMessage);
        }

        // Fallback to basic matching if AI module not loaded
        const message = userMessage.toLowerCase();

        // Check each response category
        for (const [category, data] of Object.entries(chatbotKnowledge.responses)) {
            for (const keyword of data.keywords) {
                if (message.includes(keyword)) {
                    return data.answer;
                }
            }
        }

        // Check for greetings
        const greetingWords = ['hi', 'hello', 'hey', 'salam', 'assalam', 'peace'];
        if (greetingWords.some(word => message.includes(word))) {
            return "Wa Alaikum Assalam! 🕌 How can I help you today? Ask me about shipping, materials, prices, or anything else!";
        }

        // Check for thanks
        const thankWords = ['thank', 'thanks', 'appreciate', 'helpful'];
        if (thankWords.some(word => message.includes(word))) {
            return "You're very welcome! 🙏 Is there anything else I can help you with?";
        }

        // Fallback response
        const fallbacks = chatbotKnowledge.fallback;
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    renderQuickReplies() {
        const buttons = chatbotKnowledge.quickReplies
            .map(text => `<button class="quick-reply-btn">${text}</button>`)
            .join('');
        this.quickRepliesContainer.innerHTML = buttons;
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.sacredBeadsChatbot = new SacredBeadsChatbot();
});
