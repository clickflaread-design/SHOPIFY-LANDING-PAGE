// Configuration file for easy customization
const CONFIG = {
    // CRM Webhook Configuration
    CRM_WEBHOOK_URL: "https://your-crm-webhook-url.com/api/leads", // Replace with your actual webhook URL

    // Analytics Configuration
    GOOGLE_ANALYTICS_ID: "GA_MEASUREMENT_ID", // Replace with your GA4 measurement ID
    FACEBOOK_PIXEL_ID: "YOUR_PIXEL_ID", // Replace with your Facebook Pixel ID

    // Shopify Configuration
    SHOPIFY_STORE_URL: "your-store.myshopify.com", // Replace with your Shopify store URL
    SHOPIFY_PIXEL_ID: "YOUR_SHOPIFY_PIXEL_ID", // Replace with your Shopify Pixel ID

    // Product Configuration
    PRODUCT: {
        name: "Divjit Pain Relief",
        id: "divjit-pain-relief",
        category: "Health Supplements",
        originalPrice: 2999,
        discountedPrice: 1499,
        currency: "INR",
    },

    // Pricing Tiers
    PRICING: {
        1: { price: 1499, total: 1499, savings: 0 },
        2: { price: 1499, total: 2799, savings: 200 },
        3: { price: 1499, total: 3999, savings: 500 },
    },

    // Form Configuration
    FORM: {
        requiredFields: ["name", "phone", "pincode", "address"],
        phoneRegex: /^[6-9]\d{9}$/,
        pincodeRegex: /^\d{6}$/,
        minNameLength: 2,
        minAddressLength: 10,
    },

    // Countdown Configuration (in hours)
    COUNTDOWN_HOURS: 24,

    // Success Messages
    MESSAGES: {
        success:
            "आपका ऑर्डर सफलतापूर्वक प्राप्त हो गया है। हमारी टीम 24 घंटे में आपसे संपर्क करेगी।",
        error: "कुछ तकनीकी समस्या हुई है। कृपया दोबारा कोशिश करें या हमें कॉल करें।",
        validation: {
            nameRequired: "कृपया अपना नाम लिखें",
            nameMinLength: "नाम कम से कम 2 अक्षर का होना चाहिए",
            phoneRequired: "कृपया मोबाइल नंबर लिखें",
            phoneInvalid: "कृपया सही 10 अंकों का मोबाइल नंबर लिखें",
            pincodeRequired: "कृपया पिन कोड लिखें",
            pincodeInvalid: "कृपया सही 6 अंकों का पिन कोड लिखें",
            addressRequired: "कृपया पूरा पता लिखें",
            addressMinLength: "कृपया पूरा पता विस्तार से लिखें",
        },
    },
};

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
    module.exports = CONFIG;
}
