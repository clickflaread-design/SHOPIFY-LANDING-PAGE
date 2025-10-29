// DIVJOT Pain Relief Theme JavaScript

// Debug mode - set to false for production
const DEBUG_MODE = false;

// Debug logging function
function debugLog(...args) {
  if (DEBUG_MODE) {
    console.log(...args);
  }
}

function debugError(...args) {
  if (DEBUG_MODE) {
    console.error(...args);
  }
}

// CRM API Configuration - Get from Shopify settings
function getCRMConfig() {
  const settingsElement = document.querySelector("[data-crm-settings]");
  if (settingsElement) {
    return {
      apiUrl: settingsElement.dataset.crmUrl ||
        "https://projects.erpthemes.com/api/dynamic/addRecordsDynamic?tempID=72&tempName=website_api_",
      authToken: settingsElement.dataset.crmToken || "",
      domain: settingsElement.dataset.crmDomain || "jointrelief.co.in",
    };
  }

  // Fallback configuration
  return {
    apiUrl:
      "https://projects.erpthemes.com/api/dynamic/addRecordsDynamic?tempID=72&tempName=website_api_",
    authToken:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODQyYzk3ZDUxODZkYjBkMzE4ZGQxYjYiLCJzZXNzaW9uIjoiNjg0MmM5N2Q1MTg2ZGIwZDMxOGRkMWI4IiwibmFtZSI6IlZlZGFuYSBXZWxsbmVzIiwiZW1haWwiOiJnc2Fua2xhOEBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6InVzZXIiLCJ1c2VySWQiOiI2ODQyYzk3ZDUxODZkYjBkMzE4ZGQxYjYiLCJpYXQiOjE3NDkyMDc0MjEsImV4cCI6MTkwNjk5NTQyMX0.CVI3qLjA7bWEo6Idh4KMwRFM0q8p-NJ1clP_qJUSd-1XT3xVz3W4fwC8FxHVxCTsKg4i07akjJCyku8Z2REjYmQN-F7emeYysvyzjbs_G5pYxcELG-xYm7VxfkTbU_W8doiyPtX5ZvphZBkEnrTdVzIMIsyjPha4qcncKSw3TC7rWU-Q4oLq7zP67LebXVKfNx111FMX5jQK7Aj7NlQokc93DrykrsDp9vDLUdSjKxTzthG74mRuFdBuBw44AvsY444zHfDffLgBAuPnQkvkDw_voyphvg0j84gzW9rIpz8oCtGNjEqBMVcfBTrE0Uiuc31aGwSOlfLusMXZqzl8bQ",
    domain: "jointrelief.co.in",
  };
}

// Timer Configuration
let timerEndTime = new Date().getTime() + (2 * 60 * 60 * 1000) +
  (47 * 60 * 1000); // 2 hours 47 minutes from now

// DOM Elements
const modal = document.getElementById("orderModal");
const successModal = document.getElementById("successModal");
const orderForm = document.getElementById("orderForm");
const closeBtn = document.querySelector(".close");
const closeSuccessBtn = document.querySelector(".close-success");

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeTimers();
  initializeModal();
  initializeFAQ();
  initializeFormValidation();
  trackUserBehavior();
  initABTesting();
  initWhatsAppIntegration();

  // Track page load
  trackEvent("page_loaded", {
    page_type: "landing_page",
    product: "DIVJOT Pain Relief",
  });

  // Start timer updates
  setInterval(updateTimers, 1000);

  // Track form interactions
  const formInputs = document.querySelectorAll(
    "#orderForm input, #orderForm textarea",
  );
  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      trackEvent("form_started", {
        field: this.name,
        form_type: "order_form",
      });
    }, { once: true });
  });
});

// Timer Functions
function initializeTimers() {
  updateTimers();
}

function updateTimers() {
  const now = new Date().getTime();
  const timeLeft = timerEndTime - now;

  if (timeLeft > 0) {
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Update all timer displays
    updateTimerDisplay("mainTimer", hours, minutes);
    updateTimerDisplay("finalTimer", hours, minutes);
    updateModalTimer(hours, minutes, seconds);
  } else {
    // Timer expired - reset to new time
    timerEndTime = new Date().getTime() + (2 * 60 * 60 * 1000);
  }
}

function updateTimerDisplay(timerId, hours, minutes) {
  const timerElement = document.getElementById(timerId);
  if (timerElement) {
    const hoursSpan = timerElement.querySelector('[id$="Hours"]');
    const minutesSpan = timerElement.querySelector('[id$="Minutes"]');

    if (hoursSpan) hoursSpan.textContent = String(hours).padStart(2, "0");
    if (minutesSpan) minutesSpan.textContent = String(minutes).padStart(2, "0");
  }
}

function updateModalTimer(hours, minutes, seconds) {
  const hoursSpan = document.getElementById("hours");
  const minutesSpan = document.getElementById("minutes");
  const secondsSpan = document.getElementById("seconds");

  if (hoursSpan) hoursSpan.textContent = String(hours).padStart(2, "0");
  if (minutesSpan) minutesSpan.textContent = String(minutes).padStart(2, "0");
  if (secondsSpan) secondsSpan.textContent = String(seconds).padStart(2, "0");
}

// Modal Functions
function initializeModal() {
  // Close modal when clicking X
  if (closeBtn) {
    closeBtn.addEventListener("click", closeOrderModal);
  }

  // Close success modal
  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener("click", closeSuccessModal);
  }

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeOrderModal();
    }
    if (event.target === successModal) {
      closeSuccessModal();
    }
  });

  // Handle form submission
  if (orderForm) {
    orderForm.addEventListener("submit", handleFormSubmission);
  }
}

function openOrderModal() {
  if (modal) {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";

    // Track modal open event
    trackEvent("modal_opened", {
      source: "cta_button",
      timestamp: new Date().toISOString(),
    });
  }
}

function closeOrderModal() {
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

function closeSuccessModal() {
  if (successModal) {
    successModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// Form Handling
function initializeFormValidation() {
  const inputs = document.querySelectorAll(
    "#orderForm input, #orderForm textarea",
  );

  inputs.forEach((input) => {
    input.addEventListener("blur", validateField);
    input.addEventListener("input", clearFieldError);
  });
}

function validateField(event) {
  const field = event.target;
  const value = field.value.trim();

  // Remove existing error styling
  field.classList.remove("error");

  // Validate based on field type
  switch (field.name) {
    case "name":
      if (value.length < 2) {
        showFieldError(field, "नाम कम से कम 2 अक्षर का होना चाहिए");
        return false;
      }
      break;

    case "phone":
      if (!/^[6-9]\d{9}$/.test(value)) {
        showFieldError(field, "कृपया सही मोबाइल नंबर दर्ज करें");
        return false;
      }
      break;

    case "pincode":
      if (!/^\d{6}$/.test(value)) {
        showFieldError(field, "कृपया सही पिन कोड दर्ज करें");
        return false;
      }
      break;

    case "address":
      if (value.length < 10) {
        showFieldError(field, "कृपया पूरा पता दर्ज करें");
        return false;
      }
      break;
  }

  return true;
}

function showFieldError(field, message) {
  field.classList.add("error");

  // Remove existing error message
  const existingError = field.parentNode.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  // Add new error message
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  errorDiv.style.color = "#ff4757";
  errorDiv.style.fontSize = "0.8rem";
  errorDiv.style.marginTop = "5px";

  field.parentNode.appendChild(errorDiv);
}

function clearFieldError(event) {
  const field = event.target;
  field.classList.remove("error");

  const errorMessage = field.parentNode.querySelector(".error-message");
  if (errorMessage) {
    errorMessage.remove();
  }
}

async function handleFormSubmission(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const orderData = {
    name: formData.get("name").trim(),
    phone: formData.get("phone").trim(),
    pincode: formData.get("pincode").trim(),
    address: formData.get("address").trim(),
  };

  // Validate all fields
  let isValid = true;
  const fields = ["name", "phone", "pincode", "address"];

  fields.forEach((fieldName) => {
    const field = document.getElementById(fieldName);
    if (field && !validateField({ target: field })) {
      isValid = false;
    }
  });

  if (!isValid) {
    showNotification("कृपया सभी फील्ड सही तरीके से भरें", "error");
    return;
  }

  // Show loading state
  const submitBtn = event.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "ऑर्डर प्रोसेस हो रहा है...";
  submitBtn.disabled = true;
  submitBtn.classList.add("loading");

  try {
    // Submit to CRM
    const success = await submitLeadToCRM(orderData);

    if (success) {
      // Track successful order
      trackEvent("order_submitted", {
        ...orderData,
        timestamp: new Date().toISOString(),
        price: 3150,
      });

      // Show success modal
      closeOrderModal();
      showSuccessModal();

      // Reset form
      event.target.reset();
    } else {
      throw new Error("CRM submission failed");
    }
  } catch (error) {
    debugError("Order submission error:", error);
    showNotification(
      "ऑर्डर सबमिट करने में समस्या हुई। कृपया दोबारा कोशिश करें।",
      "error",
    );

    // Track failed order
    trackEvent("order_failed", {
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  } finally {
    // Reset button state
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    submitBtn.classList.remove("loading");
  }
}

// CRM Integration
async function submitLeadToCRM(formData) {
  try {
    debugLog("Submitting data to CRM:", formData);

    // Get CRM configuration from settings
    const crmConfig = getCRMConfig();

    // Map form data to CRM expected format
    const crmData = {
      name: formData.name,
      mobile: formData.phone,
      pincode: formData.pincode,
      address: formData.address,
      domain: crmConfig.domain,
    };

    // Send data to CRM API
    const response = await fetch(crmConfig.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": crmConfig.authToken,
        "Accept": "application/json",
        "Accept-Language": "en",
      },
      body: JSON.stringify(crmData),
    });

    debugLog("CRM API Response Status:", response.status);

    // Get response text first to handle different response formats
    const responseText = await response.text();
    debugLog("CRM API Raw Response:", responseText);

    // Try to parse as JSON, but handle cases where it might not be JSON
    let result = {};
    try {
      result = JSON.parse(responseText);
      debugLog("CRM API Parsed Response:", result);
    } catch (parseError) {
      debugLog("Response is not JSON, treating as text:", responseText);
      // If response is not JSON but status is ok, consider it successful
      if (response.ok) {
        return true;
      }
    }

    // Check for success in multiple ways
    const isSuccessful = response.ok || // HTTP status is 2xx
      response.status === 200 || // Specifically 200
      response.status === 201 || // Created
      result.success === true || // Explicit success field
      result.status === "success" || // Status field
      result.message?.toLowerCase().includes("success") || // Success in message
      responseText.toLowerCase().includes("success") || // Success in raw text
      (response.status < 400 && !result.error); // No error and good status

    debugLog("Is submission successful:", isSuccessful);
    return isSuccessful;
  } catch (error) {
    debugError("Error submitting to CRM API:", error);

    // Check if it's a network error vs API error
    if (error instanceof TypeError && error.message.includes("fetch")) {
      debugError("Network error - possibly CORS or connectivity issue");
    }

    return false;
  }
}

function showSuccessModal() {
  if (successModal) {
    successModal.style.display = "block";
    document.body.style.overflow = "hidden";
  }
}

// FAQ Functionality
function initializeFAQ() {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      const isOpen = answer.style.display === "block";

      // Close all other answers
      document.querySelectorAll(".faq-answer").forEach((ans) => {
        ans.style.display = "none";
      });

      // Toggle current answer
      answer.style.display = isOpen ? "none" : "block";

      // Add visual indicator
      this.style.color = isOpen ? "#333" : "#28a745";
    });
  });
}

// Notification System
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Style the notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "15px 20px",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
    zIndex: "10001",
    maxWidth: "300px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
  });

  // Set background color based on type
  switch (type) {
    case "success":
      notification.style.background = "#28a745";
      break;
    case "error":
      notification.style.background = "#ff4757";
      break;
    case "warning":
      notification.style.background = "#ffa502";
      break;
    default:
      notification.style.background = "#007bff";
  }

  // Add to DOM
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// Enhanced Analytics and Tracking
function trackEvent(eventName, eventData = {}) {
  try {
    // Google Analytics 4 tracking
    if (typeof gtag !== "undefined") {
      gtag("event", eventName, {
        event_category: "ecommerce",
        event_label: eventData.label || eventName,
        value: eventData.value || 0,
        currency: "INR",
        ...eventData,
      });
    }

    // Facebook Pixel tracking with enhanced events
    if (typeof fbq !== "undefined") {
      switch (eventName) {
        case "modal_opened":
          fbq("track", "InitiateCheckout", {
            content_name: "DIVJOT Pain Relief",
            content_category: "Health",
            value: 3150,
            currency: "INR",
          });
          break;

        case "order_submitted":
          fbq("track", "Purchase", {
            content_name: "DIVJOT Pain Relief",
            content_type: "product",
            value: 3150,
            currency: "INR",
            content_ids: ["divjot-pain-relief"],
            num_items: 1,
          });
          break;

        case "form_started":
          fbq("track", "Lead", {
            content_name: "DIVJOT Pain Relief Form",
            value: 3150,
            currency: "INR",
          });
          break;

        case "add_to_cart":
          fbq("track", "AddToCart", {
            content_name: "DIVJOT Pain Relief",
            content_type: "product",
            value: 3150,
            currency: "INR",
          });
          break;

        default:
          fbq("trackCustom", eventName, eventData);
      }
    }

    // Enhanced Custom tracking with user behavior
    const trackingData = {
      event: eventName,
      data: eventData,
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      referrer: document.referrer,
      session_id: getSessionId(),
    };

    debugLog("Event tracked:", trackingData);

    // Store in localStorage for analytics
    const events = JSON.parse(localStorage.getItem("divjot_events") || "[]");
    events.push(trackingData);

    // Keep only last 100 events
    if (events.length > 100) {
      events.splice(0, events.length - 100);
    }

    localStorage.setItem("divjot_events", JSON.stringify(events));

    // Send to custom analytics endpoint if configured
    if (window.CUSTOM_ANALYTICS_URL) {
      fetch(window.CUSTOM_ANALYTICS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trackingData),
      }).catch((error) => debugLog("Custom analytics error:", error));
    }
  } catch (error) {
    debugError("Error tracking event:", error);
  }
}

// Session Management
function getSessionId() {
  let sessionId = sessionStorage.getItem("divjot_session_id");
  if (!sessionId) {
    sessionId = "session_" + Date.now() + "_" +
      Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem("divjot_session_id", sessionId);
  }
  return sessionId;
}

// Enhanced Conversion Tracking
function trackConversion(conversionType, value = 3150) {
  // Google Ads Conversion Tracking
  if (typeof gtag !== "undefined" && window.GOOGLE_ADS_CONVERSION_ID) {
    gtag("event", "conversion", {
      "send_to":
        `${window.GOOGLE_ADS_CONVERSION_ID}/${window.GOOGLE_ADS_CONVERSION_LABEL}`,
      "value": value,
      "currency": "INR",
    });
  }

  // Facebook Conversion API (if configured)
  if (typeof fbq !== "undefined") {
    fbq("track", "Purchase", {
      value: value,
      currency: "INR",
      content_name: "DIVJOT Pain Relief",
      content_type: "product",
    });
  }

  // Track in our system
  trackEvent("conversion", {
    type: conversionType,
    value: value,
    product: "DIVJOT Pain Relief",
  });
}

// User Behavior Tracking
function trackUserBehavior() {
  let scrollDepth = 0;
  let timeOnPage = Date.now();
  let interactions = 0;

  // Scroll depth tracking
  window.addEventListener("scroll", function () {
    const currentScroll = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100,
    );
    if (currentScroll > scrollDepth && currentScroll % 25 === 0) {
      scrollDepth = currentScroll;
      trackEvent("scroll_depth", { depth: scrollDepth });
    }
  });

  // Click tracking
  document.addEventListener("click", function (event) {
    interactions++;

    // Track CTA clicks
    if (
      event.target.matches(".cta-btn, .secondary-cta, .primary-cta, .order-btn")
    ) {
      trackEvent("cta_click", {
        button_text: event.target.textContent,
        button_class: event.target.className,
        interactions_before: interactions,
      });
    }

    // Track link clicks
    if (event.target.matches("a")) {
      trackEvent("link_click", {
        url: event.target.href,
        text: event.target.textContent,
      });
    }
  });

  // Time on page tracking
  window.addEventListener("beforeunload", function () {
    const timeSpent = Math.round((Date.now() - timeOnPage) / 1000);
    trackEvent("time_on_page", {
      seconds: timeSpent,
      interactions: interactions,
      max_scroll_depth: scrollDepth,
    });
  });
}

// A/B Testing Support
function initABTesting() {
  // Simple A/B testing for button colors, text, etc.
  const variant = Math.random() < 0.5 ? "A" : "B";
  localStorage.setItem("ab_variant", variant);

  trackEvent("ab_test_assigned", { variant: variant });

  // Apply variant styles
  if (variant === "B") {
    document.body.classList.add("variant-b");
  }

  return variant;
}

// WhatsApp Integration
function initWhatsAppIntegration() {
  // Add WhatsApp floating button
  const whatsappBtn = document.createElement("div");
  whatsappBtn.className = "whatsapp-float";
  whatsappBtn.innerHTML = `
    <a href="https://wa.me/919876543210?text=मुझे%20DIVJOT%20Pain%20Relief%20के%20बारे%20में%20जानकारी%20चाहिए" target="_blank">
      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMyNUQzNjYiLz4KPHBhdGggZD0iTTMwLjUgMTkuNUMzMC41IDI1LjU3NCAyNS41NzQgMzAuNSAxOS41IDMwLjVDMTcuNTEgMzAuNSAxNS42MzggMjkuOTI2IDE0LjA1IDI4Ljk1TDkuNSAzMC41TDExLjA1IDI2LjA1QzEwLjA3NCAyNC40NjIgOS41IDIyLjU5IDkuNSAxOS41QzkuNSAxMy40MjYgMTQuNDI2IDguNSAyMC41IDguNUMyNi41NzQgOC41IDMxLjUgMTMuNDI2IDMxLjUgMTkuNVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=" alt="WhatsApp">
    </a>
  `;

  document.body.appendChild(whatsappBtn);

  // Track WhatsApp clicks
  whatsappBtn.addEventListener("click", function () {
    trackEvent("whatsapp_click", {
      source: "floating_button",
    });
  });
}

// Utility Functions
function formatPhoneNumber(phone) {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, "");

  // Format as Indian mobile number
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{5})(\d{5})/, "$1 $2");
  }

  return phone;
}

function validatePincode(pincode) {
  // Indian pincode validation
  return /^\d{6}$/.test(pincode);
}

// Smooth scrolling for anchor links
document.addEventListener("click", function (event) {
  if (event.target.matches('a[href^="#"]')) {
    event.preventDefault();

    const targetId = event.target.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
});

// Lazy loading for images
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
}

// Initialize lazy loading when DOM is ready
document.addEventListener("DOMContentLoaded", initializeLazyLoading);

// Performance monitoring
function monitorPerformance() {
  if ("performance" in window) {
    window.addEventListener("load", function () {
      setTimeout(function () {
        const perfData = performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;

        trackEvent("page_load_time", {
          load_time: loadTime,
          dom_ready: perfData.domContentLoadedEventEnd -
            perfData.navigationStart,
        });
      }, 0);
    });
  }
}

// Initialize performance monitoring
monitorPerformance();

// Export functions for global access
window.openOrderModal = openOrderModal;
window.closeOrderModal = closeOrderModal;
window.trackEvent = trackEvent;

// Mobile Sticky CTA
function initMobileStickyCTA() {
  if (window.innerWidth <= 768) {
    const stickyDiv = document.createElement("div");
    stickyDiv.className = "mobile-sticky-cta";
    stickyDiv.innerHTML = `
      <button onclick="openOrderModal()">
        🛒 अभी ऑर्डर करें - ₹3,150 (70% छूट)
      </button>
    `;
    document.body.appendChild(stickyDiv);

    // Hide/show based on scroll
    let lastScrollTop = 0;
    window.addEventListener("scroll", function () {
      const scrollTop = window.pageYOffset ||
        document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop && scrollTop > 200) {
        // Scrolling down
        stickyDiv.style.transform = "translateY(100%)";
      } else {
        // Scrolling up
        stickyDiv.style.transform = "translateY(0)";
      }
      lastScrollTop = scrollTop;
    });
  }
}

// Enhanced WhatsApp Integration
function initWhatsAppIntegration() {
  const whatsappNumber =
    document.querySelector("[data-whatsapp-number]")?.dataset.whatsappNumber ||
    "919876543210";
  const whatsappMessage =
    document.querySelector("[data-whatsapp-message]")?.dataset
      .whatsappMessage || "मुझे DIVJOT Pain Relief के बारे में जानकारी चाहिए";

  const whatsappBtn = document.createElement("div");
  whatsappBtn.className = "whatsapp-float";
  whatsappBtn.innerHTML = `
    <a href="https://wa.me/${whatsappNumber}?text=${
    encodeURIComponent(whatsappMessage)
  }" target="_blank" rel="noopener">
      <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5 0C7.85 0 0 7.85 0 17.5C0 20.65 0.875 23.625 2.45 26.25L0 35L9.1 32.725C11.55 34.125 14.425 35 17.5 35C27.15 35 35 27.15 35 17.5C35 7.85 27.15 0 17.5 0ZM28 24.5C27.65 25.55 26.2 26.425 25.025 26.775C24.15 27.025 23.025 27.25 18.9 25.375C13.825 23.1 10.675 17.85 10.425 17.5C10.2 17.15 8.4 14.7 8.4 12.175C8.4 9.65 9.65 8.4 10.15 7.875C10.65 7.35 11.2 7.175 11.55 7.175C11.725 7.175 11.875 7.175 12 7.2C12.5 7.225 12.775 7.275 13.075 8.025C13.425 8.875 14.25 11.4 14.35 11.6C14.45 11.8 14.55 12.075 14.4 12.425C14.25 12.8 14.125 12.95 13.875 13.25C13.625 13.55 13.4 13.775 13.15 14.1C12.925 14.375 12.675 14.675 12.975 15.225C13.275 15.75 14.225 17.325 15.675 18.6C17.525 20.225 19.075 20.8 19.625 21.05C20.175 21.3 20.475 21.25 20.775 20.925C21.075 20.6 21.875 19.7 22.225 19.175C22.575 18.65 22.925 18.725 23.425 18.925C23.925 19.125 26.425 20.35 26.975 20.625C27.525 20.9 27.875 21.025 27.975 21.25C28.075 21.475 28.075 22.325 27.725 23.325L28 24.5Z" fill="white"/>
      </svg>
    </a>
  `;

  document.body.appendChild(whatsappBtn);

  // Track WhatsApp clicks
  whatsappBtn.addEventListener("click", function () {
    trackEvent("whatsapp_click", {
      source: "floating_button",
      number: whatsappNumber,
    });

    // Facebook Pixel tracking
    if (typeof fbq !== "undefined") {
      fbq("track", "Contact");
    }
  });
}

// Mobile Form Enhancements
function enhanceMobileForms() {
  const inputs = document.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    // Prevent zoom on iOS
    if (input.type === "tel" || input.type === "email") {
      input.style.fontSize = "16px";
    }

    // Add mobile-friendly attributes
    if (input.name === "phone") {
      input.setAttribute("inputmode", "tel");
      input.setAttribute("pattern", "[0-9]*");
    }

    if (input.name === "pincode") {
      input.setAttribute("inputmode", "numeric");
      input.setAttribute("pattern", "[0-9]*");
    }

    if (input.name === "name") {
      input.setAttribute("autocomplete", "name");
    }

    if (input.name === "address") {
      input.setAttribute("autocomplete", "street-address");
    }
  });
}

// Performance Monitoring for Mobile
function initMobilePerformanceMonitoring() {
  // Monitor Core Web Vitals using Performance Observer API
  if ("PerformanceObserver" in window) {
    try {
      // Monitor Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        trackEvent("core_web_vital", {
          name: "LCP",
          value: lastEntry.startTime,
        });
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          trackEvent("core_web_vital", {
            name: "FID",
            value: entry.processingStart - entry.startTime,
          });
        });
      });
      fidObserver.observe({ entryTypes: ["first-input"] });

      // Monitor Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        trackEvent("core_web_vital", { name: "CLS", value: clsValue });
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
    } catch (error) {
      debugLog("Performance monitoring not supported");
    }
  }

  // Monitor network conditions
  if ("connection" in navigator) {
    const connection = navigator.connection;
    trackEvent("network_info", {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
    });
  }

  // Monitor device info
  trackEvent("device_info", {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    screenWidth: screen.width,
    screenHeight: screen.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
  });
}

// Enhanced Form Submission with Better Mobile UX
async function handleFormSubmission(event) {
  event.preventDefault();

  // Show mobile loading if on mobile
  let mobileLoader;
  if (window.innerWidth <= 768) {
    mobileLoader = document.createElement("div");
    mobileLoader.className = "mobile-loading";
    mobileLoader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(mobileLoader);
  }

  const formData = new FormData(event.target);
  const orderData = {
    name: formData.get("name").trim(),
    phone: formData.get("phone").trim(),
    pincode: formData.get("pincode").trim(),
    address: formData.get("address").trim(),
  };

  // Enhanced validation for mobile
  let isValid = true;
  const fields = ["name", "phone", "pincode", "address"];

  fields.forEach((fieldName) => {
    const field = document.getElementById(fieldName);
    if (field && !validateField({ target: field })) {
      isValid = false;
      // Scroll to first error on mobile
      if (window.innerWidth <= 768 && isValid === false) {
        field.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  });

  if (!isValid) {
    if (mobileLoader) mobileLoader.remove();
    showNotification("कृपया सभी फील्ड सही तरीके से भरें", "error");
    return;
  }

  // Show loading state
  const submitBtn = event.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "ऑर्डर प्रोसेस हो रहा है...";
  submitBtn.disabled = true;
  submitBtn.classList.add("loading");

  try {
    // Track form submission attempt
    trackEvent("form_submission_started", orderData);

    // Submit to CRM
    const success = await submitLeadToCRM(orderData);

    if (success) {
      // Track successful conversion
      trackConversion("order_completed", 3150);

      // Facebook Pixel Purchase Event
      if (typeof fbq !== "undefined") {
        fbq("track", "Purchase", {
          value: 3150,
          currency: "INR",
          content_name: "DIVJOT Pain Relief",
          content_type: "product",
        });
      }

      // Google Analytics Purchase Event
      if (typeof gtag !== "undefined") {
        gtag("event", "purchase", {
          transaction_id: "order_" + Date.now(),
          value: 3150,
          currency: "INR",
          items: [{
            item_id: "divjot-pain-relief",
            item_name: "DIVJOT Pain Relief",
            category: "Health",
            quantity: 1,
            price: 3150,
          }],
        });
      }

      // Show success modal
      closeOrderModal();
      showSuccessModal();

      // Reset form
      event.target.reset();

      // Track successful order
      trackEvent("order_completed", {
        ...orderData,
        timestamp: new Date().toISOString(),
        price: 3150,
        source: "website_form",
      });
    } else {
      throw new Error("CRM submission failed");
    }
  } catch (error) {
    debugError("Order submission error:", error);
    showNotification(
      "ऑर्डर सबमिट करने में समस्या हुई। कृपया दोबारा कोशिश करें।",
      "error",
    );

    // Track failed order
    trackEvent("order_failed", {
      error: error.message,
      timestamp: new Date().toISOString(),
      form_data: orderData,
    });
  } finally {
    // Reset button state
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    submitBtn.classList.remove("loading");

    // Remove mobile loader
    if (mobileLoader) mobileLoader.remove();
  }
}

// Initialize mobile enhancements
document.addEventListener("DOMContentLoaded", function () {
  initMobileStickyCTA();
  enhanceMobileForms();
  initMobilePerformanceMonitoring();

  // Set mobile font scale from settings
  if (window.innerWidth <= 768) {
    const mobileScale =
      document.querySelector("[data-mobile-font-scale]")?.dataset
        .mobileFontScale || 90;
    document.documentElement.style.setProperty(
      "--mobile-font-scale",
      mobileScale / 100,
    );
  }

  // Enhanced mobile form submission
  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    orderForm.removeEventListener("submit", handleFormSubmission);
    orderForm.addEventListener("submit", handleFormSubmission);
  }
});

// Viewport height fix for mobile browsers
function setVH() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

setVH();
window.addEventListener("resize", setVH);
window.addEventListener("orientationchange", setVH);

// Export enhanced functions
window.trackConversion = trackConversion;
window.initMobileStickyCTA = initMobileStickyCTA;
