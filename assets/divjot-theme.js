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
  initializeEnhancedFormValidation();
  trackUserBehavior();
  initABTesting();
  // WhatsApp integration removed
  initializeFacebookPixel();
  initializeAutoPopup();
  initializeCarousel();

  // Track page load
  trackEvent("page_loaded", {
    page_type: "landing_page",
    product: "DIVJOT Pain Relief",
  });

  // Start timer updates
  setInterval(updateTimers, 1000);

  // Track form interactions with enhanced tracking
  const formInputs = document.querySelectorAll(
    "#orderForm input, #orderForm textarea",
  );
  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      trackEvent("form_field_focused", {
        field: this.name,
        form_type: "order_form",
      });

      // Facebook Pixel - Lead event when user starts filling form
      if (typeof fbq !== "undefined") {
        fbq("track", "Lead", {
          content_name: "DIVJOT Pain Relief Form",
          content_category: "Health",
          value: 3150,
          currency: "INR",
        });
      }
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
    updateTimerDisplay("mainTimer", hours, minutes, seconds);
    updateTimerDisplay("finalTimer", hours, minutes, seconds);
    updateModalTimer(hours, minutes, seconds);
  } else {
    // Timer expired - reset to new time
    timerEndTime = new Date().getTime() + (2 * 60 * 60 * 1000);
  }
}

function updateTimerDisplay(timerId, hours, minutes, seconds = 0) {
  const timerElement = document.getElementById(timerId);
  if (timerElement) {
    const hoursSpan = timerElement.querySelector('[id$="Hours"]');
    const minutesSpan = timerElement.querySelector('[id$="Minutes"]');
    const secondsSpan = timerElement.querySelector('[id$="Seconds"]');

    if (hoursSpan) hoursSpan.textContent = String(hours).padStart(2, "0");
    if (minutesSpan) minutesSpan.textContent = String(minutes).padStart(2, "0");
    if (secondsSpan) secondsSpan.textContent = String(seconds).padStart(2, "0");
  }

  // Update announcement timer
  const announcementTimer = document.getElementById("announcementTimer");
  if (announcementTimer) {
    announcementTimer.textContent = `${String(hours).padStart(2, "0")}:${
      String(minutes).padStart(2, "0")
    }`;
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
// Enhanced Form Validation
function initializeEnhancedFormValidation() {
  const form = document.getElementById("orderForm");
  const submitBtn = form?.querySelector('button[type="submit"]');
  const inputs = document.querySelectorAll(
    "#orderForm input, #orderForm textarea",
  );

  if (!form || !submitBtn) return;

  // Initially disable submit button
  submitBtn.disabled = true;
  submitBtn.classList.remove("enabled");

  inputs.forEach((input) => {
    input.addEventListener("blur", validateField);
    input.addEventListener("input", function () {
      clearFieldError(this);
      validateField({ target: this });
      checkFormValidity();
    });

    // Real-time validation for better UX
    input.addEventListener("keyup", function () {
      if (this.value.length > 0) {
        validateField({ target: this });
        checkFormValidity();
      }
    });
  });

  // Check form validity on load
  checkFormValidity();
}

function checkFormValidity() {
  const form = document.getElementById("orderForm");
  const submitBtn = form?.querySelector('button[type="submit"]');
  const inputs = form?.querySelectorAll("input[required], textarea[required]");

  if (!form || !submitBtn || !inputs) return;

  let allValid = true;
  let allFilled = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      allFilled = false;
    }
    if (input.classList.contains("invalid") || !input.value.trim()) {
      allValid = false;
    }
  });

  // Enable/disable submit button based on validation
  if (allValid && allFilled) {
    submitBtn.disabled = false;
    submitBtn.classList.add("enabled");
    submitBtn.textContent = "अभी ऑर्डर करें - ₹3,150";
  } else {
    submitBtn.disabled = true;
    submitBtn.classList.remove("enabled");
    if (!allFilled) {
      submitBtn.textContent = "कृपया सभी फील्ड भरें";
    } else {
      submitBtn.textContent = "कृपया सही जानकारी दर्ज करें";
    }
  }
}

function validateField(event) {
  const field = event.target;
  const value = field.value.trim();

  // Remove existing styling
  field.classList.remove("invalid", "valid", "error");
  clearFieldError(field);

  let isValid = true;
  let errorMessage = "";

  // Validate based on field type
  switch (field.name) {
    case "name":
      if (value.length === 0) {
        errorMessage = "नाम आवश्यक है";
        isValid = false;
      } else if (value.length < 2) {
        errorMessage = "नाम कम से कम 2 अक्षर का होना चाहिए";
        isValid = false;
      } else if (!/^[a-zA-Zअ-ह\s]+$/.test(value)) {
        errorMessage = "कृपया केवल अक्षर का उपयोग करें";
        isValid = false;
      }
      break;

    case "phone":
      if (value.length === 0) {
        errorMessage = "मोबाइल नंबर आवश्यक है";
        isValid = false;
      } else if (!/^[6-9]\d{9}$/.test(value)) {
        errorMessage = "कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें";
        isValid = false;
      }
      break;

    case "pincode":
      if (value.length === 0) {
        errorMessage = "पिन कोड आवश्यक है";
        isValid = false;
      } else if (!/^\d{6}$/.test(value)) {
        errorMessage = "कृपया सही 6 अंकों का पिन कोड दर्ज करें";
        isValid = false;
      }
      break;

    case "address":
      if (value.length === 0) {
        errorMessage = "पता आवश्यक है";
        isValid = false;
      } else if (value.length < 10) {
        errorMessage = "कृपया पूरा पता दर्ज करें (कम से कम 10 अक्षर)";
        isValid = false;
      }
      break;
  }

  // Apply validation styling and messages
  if (isValid && value.length > 0) {
    field.classList.add("valid");
    showFieldSuccess(field);
  } else if (!isValid) {
    field.classList.add("invalid");
    showFieldError(field, errorMessage);
  }

  return isValid;
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

function showFieldSuccess(field) {
  // Remove existing messages
  const existingMessage = field.parentNode.querySelector(
    ".success-message, .error-message",
  );
  if (existingMessage) {
    existingMessage.remove();
  }

  // Add success message
  const successDiv = document.createElement("div");
  successDiv.className = "success-message";
  successDiv.textContent = "सही है";

  field.parentNode.appendChild(successDiv);
}

function clearFieldError(field) {
  if (typeof field === "object" && field.target) {
    field = field.target;
  }

  field.classList.remove("error", "invalid", "valid");

  const existingMessage = field.parentNode.querySelector(
    ".error-message, .success-message",
  );
  if (existingMessage) {
    existingMessage.remove();
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

    // Enhanced Facebook Pixel tracking with Meta Pixel events
    if (typeof fbq !== "undefined") {
      switch (eventName) {
        case "modal_opened":
          fbq("track", "InitiateCheckout", {
            content_name: "DIVJOT Pain Relief Modal",
            content_category: "Health & Wellness",
            content_type: "product",
            value: 3150,
            currency: "INR",
            content_ids: ["divjot-pain-relief"],
            num_items: 1
          });
          break;

        case "order_submitted":
        case "lead_generated":
        case "mobile_conversion":
          fbq("track", "Purchase", {
            content_name: "DIVJOT Pain Relief",
            content_category: "Health & Wellness",
            content_type: "product",
            value: 3150,
            currency: "INR",
            content_ids: ["divjot-pain-relief"],
            num_items: 1,
            predicted_ltv: 3150
          });
          break;

        case "form_field_focused":
        case "lead_form_field_focused":
        case "lead_form_submitted":
        case "mobile_form_submitted":
          fbq("track", "Lead", {
            content_name: "DIVJOT Pain Relief Form Interaction",
            content_category: "Health & Wellness",
            value: 3150,
            currency: "INR",
            content_ids: ["divjot-pain-relief"]
          });
          break;

        case "cta_click":
          fbq("track", "InitiateCheckout", {
            content_name: "DIVJOT Pain Relief CTA Click",
            content_category: "Health & Wellness",
            value: 3150,
            currency: "INR",
            content_ids: ["divjot-pain-relief"]
          });
          break;

        case "auto_popup_shown":
          fbq("track", "ViewContent", {
            content_name: "DIVJOT Pain Relief Auto Popup",
            content_category: "Engagement",
            value: 3150,
            currency: "INR",
            custom_parameter: "auto_popup"
          });
          break;

        case "mobile_form_shown":
          fbq("track", "ViewContent", {
            content_name: "DIVJOT Pain Relief Mobile Form",
            content_category: "Mobile Engagement",
            value: 3150,
            currency: "INR",
            custom_parameter: "mobile_form"
          });
          break;

        case "lead_form_viewed":
          fbq("track", "ViewContent", {
            content_name: "DIVJOT Pain Relief Lead Form",
            content_category: "Form Engagement",
            value: 3150,
            currency: "INR",
            custom_parameter: "lead_form_view"
          });
          break;

        case "conversion":
          fbq("track", "Purchase", {
            content_name: "DIVJOT Pain Relief Conversion",
            content_category: "Health & Wellness",
            content_type: "product",
            value: eventData.value || 3150,
            currency: "INR",
            content_ids: ["divjot-pain-relief"],
            num_items: 1
          });
          break;

        case "add_to_cart":
          fbq("track", "AddToCart", {
            content_name: "DIVJOT Pain Relief",
            content_category: "Health & Wellness",
            content_type: "product",
            value: 3150,
            currency: "INR",
            content_ids: ["divjot-pain-relief"],
            num_items: 1
          });
          break;

        default:
          // Track custom events with enhanced data
          fbq("trackCustom", eventName, {
            ...eventData,
            content_name: eventData.content_name || "DIVJOT Pain Relief",
            content_category: eventData.content_category || "Health & Wellness",
            value: eventData.value || 3150,
            currency: "INR"
          });
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

// WhatsApp Integration - REMOVED

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

// Enhanced WhatsApp Integration - REMOVED

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

      // Enhanced Facebook Pixel Purchase Event
      if (typeof fbq !== "undefined") {
        fbq("track", "Purchase", {
          value: 3150,
          currency: "INR",
          content_name: "DIVJOT Pain Relief",
          content_type: "product",
          content_ids: ["divjot-pain-relief"],
          num_items: 1,
          predicted_ltv: 3150,
          content_category: "Health",
        });

        // Also track as CompleteRegistration for lead tracking
        fbq("track", "CompleteRegistration", {
          content_name: "DIVJOT Pain Relief Order",
          value: 3150,
          currency: "INR",
        });
      }

      // Submit to additional webhook if configured
      const webhookUrl = document.querySelector("[data-webhook-url]")?.dataset
        .webhookUrl;
      if (webhookUrl) {
        submitToWebhook(orderData, webhookUrl);
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

// Facebook Pixel Enhanced Integration
function initializeFacebookPixel() {
  // Enhanced page view tracking is already done in theme.liquid
  
  // Track scroll depth for engagement
  let scrollTracked25 = false;
  let scrollTracked50 = false;
  let scrollTracked75 = false;
  
  window.addEventListener("scroll", function () {
    const scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100,
    );

    // Track 25% scroll
    if (scrollPercent >= 25 && !scrollTracked25 && typeof fbq !== "undefined") {
      fbq("track", "ViewContent", {
        content_name: "DIVJOT Pain Relief - 25% Scroll",
        content_category: "Engagement",
        value: 3150,
        currency: "INR",
        custom_parameter: "scroll_25"
      });
      scrollTracked25 = true;
    }

    // Track 50% scroll
    if (scrollPercent >= 50 && !scrollTracked50 && typeof fbq !== "undefined") {
      fbq("track", "ViewContent", {
        content_name: "DIVJOT Pain Relief - 50% Scroll",
        content_category: "Engagement",
        value: 3150,
        currency: "INR",
        custom_parameter: "scroll_50"
      });
      scrollTracked50 = true;
    }

    // Track 75% scroll
    if (scrollPercent >= 75 && !scrollTracked75 && typeof fbq !== "undefined") {
      fbq("track", "ViewContent", {
        content_name: "DIVJOT Pain Relief - 75% Scroll",
        content_category: "Engagement",
        value: 3150,
        currency: "INR",
        custom_parameter: "scroll_75"
      });
      scrollTracked75 = true;
    }
  });

  // Track time on page milestones
  setTimeout(() => {
    if (typeof fbq !== "undefined") {
      fbq("track", "ViewContent", {
        content_name: "DIVJOT Pain Relief - 30s Engagement",
        content_category: "Time Engagement",
        value: 3150,
        currency: "INR",
        custom_parameter: "time_30s"
      });
    }
  }, 30000);

  setTimeout(() => {
    if (typeof fbq !== "undefined") {
      fbq("track", "ViewContent", {
        content_name: "DIVJOT Pain Relief - 60s Engagement",
        content_category: "Time Engagement",
        value: 3150,
        currency: "INR",
        custom_parameter: "time_60s"
      });
    }
  }, 60000);

  setTimeout(() => {
    if (typeof fbq !== "undefined") {
      fbq("track", "ViewContent", {
        content_name: "DIVJOT Pain Relief - 120s Engagement",
        content_category: "Time Engagement",
        value: 3150,
        currency: "INR",
        custom_parameter: "time_120s"
      });
    }
  }, 120000);
}

// Enhanced CRM Webhook Integration
async function submitToWebhook(formData, webhookUrl) {
  try {
    const webhookData = {
      name: formData.name,
      phone: formData.phone,
      pincode: formData.pincode,
      address: formData.address,
      product: "DIVJOT Pain Relief",
      price: 3150,
      source: "website",
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      referrer: document.referrer,
      utm_source: new URLSearchParams(window.location.search).get("utm_source"),
      utm_medium: new URLSearchParams(window.location.search).get("utm_medium"),
      utm_campaign: new URLSearchParams(window.location.search).get(
        "utm_campaign",
      ),
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(webhookData),
    });

    return response.ok;
  } catch (error) {
    debugError("Webhook submission error:", error);
    return false;
  }
}

// Auto Popup Functionality
function initializeAutoPopup() {
  let popupShown = false;
  let scrollTriggered = false;
  let timeTriggered = false;

  // Check if popup was already shown in this session
  if (sessionStorage.getItem("divjot_popup_shown")) {
    return;
  }

  // Time-based trigger (30 seconds)
  setTimeout(() => {
    if (!popupShown) {
      showAutoPopup("time_trigger");
      timeTriggered = true;
    }
  }, 30000);

  // Scroll-based trigger (50% scroll)
  window.addEventListener("scroll", function () {
    if (scrollTriggered || popupShown) return;

    const scrollPercent =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
      100;
    if (scrollPercent > 50) {
      showAutoPopup("scroll_trigger");
      scrollTriggered = true;
    }
  });

  // Exit intent trigger (mouse leaves viewport)
  document.addEventListener("mouseleave", function (e) {
    if (popupShown || e.clientY > 0) return;

    showAutoPopup("exit_intent");
  });

  // Mobile touch trigger (after 20 seconds on mobile)
  if (window.innerWidth <= 768) {
    setTimeout(() => {
      if (!popupShown) {
        showAutoPopup("mobile_time_trigger");
      }
    }, 20000);
  }

  function showAutoPopup(trigger) {
    if (popupShown) return;

    popupShown = true;
    sessionStorage.setItem("divjot_popup_shown", "true");

    // Add urgency animation
    const modal = document.getElementById("orderModal");
    if (modal) {
      modal.classList.add("auto-popup");
      openOrderModal();

      // Track auto popup
      trackEvent("auto_popup_shown", {
        trigger: trigger,
        time_on_page: Date.now() - performance.timing.navigationStart,
      });

      // Facebook Pixel
      if (typeof fbq !== "undefined") {
        fbq("track", "InitiateCheckout", {
          content_name: "DIVJOT Pain Relief Auto Popup",
          content_category: "Health",
          value: 3150,
          currency: "INR",
        });
      }
    }
  }
}

// Carousel Functionality
function initializeCarousel() {
  const carousels = document.querySelectorAll(".carousel-container");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const slides = carousel.querySelectorAll(".carousel-slide");
    const prevBtn = carousel.querySelector(".carousel-btn-prev");
    const nextBtn = carousel.querySelector(".carousel-btn-next");
    const indicators = carousel.querySelectorAll(".carousel-indicator");

    if (!track || slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Auto-play functionality
    let autoPlayInterval = setInterval(() => {
      nextSlide();
    }, 4000);

    function updateCarousel() {
      const translateX = -currentSlide * 100;
      track.style.transform = `translateX(${translateX}%)`;

      // Update indicators
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === currentSlide);
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    }

    // Event listeners
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoPlay();
      });
    }

    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        currentSlide = index;
        updateCarousel();
        resetAutoPlay();
      });
    });

    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(() => {
        nextSlide();
      }, 4000);
    }

    // Pause on hover
    carousel.addEventListener("mouseenter", () => {
      clearInterval(autoPlayInterval);
    });

    carousel.addEventListener("mouseleave", () => {
      resetAutoPlay();
    });

    // Touch support for mobile
    let startX = 0;
    let endX = 0;

    carousel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        resetAutoPlay();
      }
    });
  });
}

// Export enhanced functions
window.trackConversion = trackConversion;
window.initMobileStickyCTA = initMobileStickyCTA;
window.openOrderModal = openOrderModal;
window.closeOrderModal = closeOrderModal;
window.trackEvent = trackEvent;

// Lead Form Functionality
async function submitLeadForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const leadData = {
    name: formData.get("name").trim(),
    phone: formData.get("phone").trim(),
    address: formData.get("address").trim(),
    pain_type: formData.get("pain_type") || "general",
  };

  // Enhanced validation
  let isValid = true;
  const fields = ["name", "phone", "address"];

  fields.forEach((fieldName) => {
    const field = document.getElementById(`customer${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`);
    if (field && !validateLeadField(field)) {
      isValid = false;
    }
  });

  if (!isValid) {
    showNotification("कृपया सभी फील्ड सही तरीके से भरें", "error");
    return;
  }

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline';
  submitBtn.disabled = true;

  try {
    // Track lead form submission
    trackEvent("lead_form_submitted", {
      ...leadData,
      timestamp: new Date().toISOString(),
      form_type: "lead_form",
    });

    // Enhanced Facebook Pixel - Lead event
    if (typeof fbq !== "undefined") {
      fbq("track", "Lead", {
        content_name: "DIVJOT Pain Relief Lead Form Submission",
        content_category: "Health & Wellness",
        content_type: "product",
        value: 3150,
        currency: "INR",
        content_ids: ["divjot-pain-relief"],
        predicted_ltv: 3150
      });
    }

    // Submit to CRM
    const success = await submitLeadToCRM(leadData);

    if (success) {
      // Track successful lead
      trackEvent("lead_generated", {
        ...leadData,
        timestamp: new Date().toISOString(),
        source: "lead_form",
      });

      // Enhanced Facebook Pixel - Purchase event for successful leads
      if (typeof fbq !== "undefined") {
        fbq("track", "Purchase", {
          content_name: "DIVJOT Pain Relief Lead Conversion",
          content_category: "Health & Wellness",
          content_type: "product",
          value: 3150,
          currency: "INR",
          content_ids: ["divjot-pain-relief"],
          num_items: 1,
          predicted_ltv: 3150,
          custom_parameter: "lead_form_success"
        });

        // Also track as CompleteRegistration for lead funnel tracking
        fbq("track", "CompleteRegistration", {
          content_name: "DIVJOT Pain Relief Registration",
          content_category: "Health & Wellness",
          value: 3150,
          currency: "INR",
          status: "completed"
        });
      }

      // Show success message
      showLeadFormSuccess();
      
      // Reset form
      form.reset();
      
      // Clear validation states
      form.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
        field.classList.remove('valid', 'invalid', 'error');
        const errorMsg = field.parentNode.querySelector('.error-message');
        if (errorMsg) errorMsg.textContent = '';
      });

    } else {
      throw new Error("Lead submission failed");
    }
  } catch (error) {
    debugError("Lead form submission error:", error);
    showNotification(
      "फॉर्म सबमिट करने में समस्या हुई। कृपया दोबारा कोशिश करें।",
      "error"
    );

    // Track failed lead
    trackEvent("lead_form_failed", {
      error: error.message,
      timestamp: new Date().toISOString(),
      form_data: leadData,
    });
  } finally {
    // Reset button state
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
  }
}

function validateLeadField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  
  // Clear previous validation
  field.classList.remove('invalid', 'valid', 'error');
  const errorSpan = document.getElementById(fieldName + 'Error');
  if (errorSpan) errorSpan.textContent = '';

  let isValid = true;
  let errorMessage = "";

  switch (fieldName) {
    case "name":
      if (value.length === 0) {
        errorMessage = "नाम आवश्यक है";
        isValid = false;
      } else if (value.length < 2) {
        errorMessage = "नाम कम से कम 2 अक्षर का होना चाहिए";
        isValid = false;
      } else if (!/^[a-zA-Zअ-ह\s]+$/.test(value)) {
        errorMessage = "कृपया केवल अक्षर का उपयोग करें";
        isValid = false;
      }
      break;

    case "phone":
      if (value.length === 0) {
        errorMessage = "मोबाइल नंबर आवश्यक है";
        isValid = false;
      } else if (!/^[6-9]\d{9}$/.test(value)) {
        errorMessage = "कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें";
        isValid = false;
      }
      break;

    case "address":
      if (value.length === 0) {
        errorMessage = "पता आवश्यक है";
        isValid = false;
      } else if (value.length < 10) {
        errorMessage = "कृपया पूरा पता दर्ज करें (कम से कम 10 अक्षर)";
        isValid = false;
      }
      break;
  }

  // Apply validation styling
  if (isValid && value.length > 0) {
    field.classList.add('valid');
  } else if (!isValid) {
    field.classList.add('invalid', 'error');
    if (errorSpan) {
      errorSpan.textContent = errorMessage;
    }
  }

  return isValid;
}

function showLeadFormSuccess() {
  // Create success overlay
  const successOverlay = document.createElement('div');
  successOverlay.className = 'lead-success-overlay';
  successOverlay.innerHTML = `
    <div class="lead-success-modal">
      <div class="success-icon">✅</div>
      <h3>ऑर्डर सफलतापूर्वक सबमिट हो गया!</h3>
      <p>हमारी टीम जल्द ही आपसे संपर्क करेगी।</p>
      <div class="success-details">
        <div class="detail-item">
          <span class="icon">📞</span>
          <span>24 घंटे में कॉल</span>
        </div>
        <div class="detail-item">
          <span class="icon">🚚</span>
          <span>3-5 दिन में डिलीवरी</span>
        </div>
        <div class="detail-item">
          <span class="icon">💰</span>
          <span>कैश ऑन डिलीवरी</span>
        </div>
      </div>
      <button onclick="closeLeadSuccess()" class="success-close-btn">बंद करें</button>
    </div>
  `;

  // Add styles
  successOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
  `;

  document.body.appendChild(successOverlay);
  document.body.style.overflow = 'hidden';

  // Auto close after 5 seconds
  setTimeout(() => {
    closeLeadSuccess();
  }, 5000);
}

function closeLeadSuccess() {
  const overlay = document.querySelector('.lead-success-overlay');
  if (overlay) {
    overlay.remove();
    document.body.style.overflow = 'auto';
  }
}

// Initialize lead form timers
function initializeLeadFormTimers() {
  const formTimers = document.querySelectorAll('#formTimer, #leadFormTimer');
  
  formTimers.forEach(timer => {
    const hoursSpan = timer.querySelector('[id$="Hours"]');
    const minutesSpan = timer.querySelector('[id$="Minutes"]');
    const secondsSpan = timer.querySelector('[id$="Seconds"]');
    
    if (hoursSpan && minutesSpan && secondsSpan) {
      setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = timerEndTime - now;
        
        if (timeLeft > 0) {
          const hours = Math.floor(timeLeft / (1000 * 60 * 60));
          const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
          
          hoursSpan.textContent = String(hours).padStart(2, '0');
          minutesSpan.textContent = String(minutes).padStart(2, '0');
          secondsSpan.textContent = String(seconds).padStart(2, '0');
        }
      }, 1000);
    }
  });
}

// Enhanced mobile lead form experience
function initializeMobileLeadForm() {
  if (window.innerWidth <= 768) {
    const leadFormSection = document.querySelector('.lead-form-section');
    if (leadFormSection) {
      // Make form sticky on mobile for better visibility
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Form is visible
            trackEvent('lead_form_viewed', {
              device: 'mobile',
              timestamp: new Date().toISOString()
            });
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(leadFormSection);
    }
  }
}

// Initialize lead form functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize lead form timers
  initializeLeadFormTimers();
  
  // Initialize mobile lead form enhancements
  initializeMobileLeadForm();
  
  // Add lead form validation
  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    const leadInputs = leadForm.querySelectorAll('input[required], textarea[required]');
    const leadSubmitBtn = document.getElementById('submitBtn');
    
    // Initially disable button
    if (leadSubmitBtn) {
      leadSubmitBtn.disabled = true;
      leadSubmitBtn.classList.remove('enabled');
    }
    
    // Add real-time validation
    leadInputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateLeadField(this);
        checkLeadFormValidity();
      });
      
      input.addEventListener('input', function() {
        // Clear error state on input
        this.classList.remove('invalid', 'error');
        const errorSpan = document.getElementById(this.name + 'Error');
        if (errorSpan) errorSpan.textContent = '';
        checkLeadFormValidity();
      });
      
      // Track field interactions
      input.addEventListener('focus', function() {
        trackEvent('lead_form_field_focused', {
          field: this.name,
          timestamp: new Date().toISOString()
        });
      }, { once: true });
    });
    
    function checkLeadFormValidity() {
      let allValid = true;
      let allFilled = true;
      
      leadInputs.forEach(input => {
        const value = input.value.trim();
        
        if (!value) {
          allFilled = false;
          allValid = false;
          return;
        }
        
        // Check if field has validation errors
        if (input.classList.contains('invalid') || input.classList.contains('error')) {
          allValid = false;
        }
        
        // Additional validation
        if (input.name === 'phone' && !/^[6-9]\d{9}$/.test(value)) {
          allValid = false;
        }
        
        if (input.name === 'name' && (value.length < 2 || !/^[a-zA-Zअ-ह\s]+$/.test(value))) {
          allValid = false;
        }
        
        if (input.name === 'address' && value.length < 10) {
          allValid = false;
        }
      });
      
      // Enable/disable button
      if (leadSubmitBtn) {
        if (allValid && allFilled) {
          leadSubmitBtn.disabled = false;
          leadSubmitBtn.classList.add('enabled');
          leadSubmitBtn.querySelector('.btn-text').textContent = '🛒 अभी ऑर्डर करें - ₹3150';
        } else {
          leadSubmitBtn.disabled = true;
          leadSubmitBtn.classList.remove('enabled');
          if (!allFilled) {
            leadSubmitBtn.querySelector('.btn-text').textContent = 'कृपया सभी फील्ड भरें';
          } else {
            leadSubmitBtn.querySelector('.btn-text').textContent = 'कृपया सही जानकारी दर्ज करें';
          }
        }
      }
    }
  }
});

// Export lead form functions
window.submitLeadForm = submitLeadForm;
window.closeLeadSuccess = closeLeadSuccess;
window.validateLeadField = validateLeadField;

// CSS for lead form success modal
const leadFormStyles = document.createElement('style');
leadFormStyles.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .lead-success-modal {
    background: white;
    border-radius: 20px;
    padding: 40px;
    text-align: center;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    animation: slideUp 0.3s ease;
  }
  
  @keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  .success-icon {
    font-size: 4rem;
    margin-bottom: 20px;
  }
  
  .lead-success-modal h3 {
    color: #27ae60;
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
  
  .lead-success-modal p {
    color: #666;
    margin-bottom: 25px;
    font-size: 1.1rem;
  }
  
  .success-details {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 30px;
  }
  
  .detail-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1rem;
    color: #2c3e50;
  }
  
  .detail-item .icon {
    font-size: 1.2rem;
  }
  
  .success-close-btn {
    background: linear-gradient(135deg, #27ae60, #2ecc71);
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .success-close-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(39, 174, 96, 0.4);
  }
  
  @media (max-width: 480px) {
    .lead-success-modal {
      padding: 25px;
      margin: 20px;
    }
    
    .success-details {
      gap: 10px;
    }
    
    .detail-item {
      font-size: 0.9rem;
    }
  }
`;

document.head.appendChild(leadFormStyles);

// Meta Pixel Lead Form Interaction Tracking
function trackLeadFormInteraction(interaction) {
  if (typeof fbq !== 'undefined') {
    switch(interaction) {
      case 'name_field_focus':
        fbq('track', 'Lead', {
          content_name: 'DIVJOT Pain Relief Name Field Focus',
          content_category: 'Form Interaction',
          value: 3150,
          currency: 'INR',
          custom_parameter: 'name_field_focus'
        });
        break;
      
      case 'phone_field_focus':
        fbq('track', 'Lead', {
          content_name: 'DIVJOT Pain Relief Phone Field Focus',
          content_category: 'Form Interaction',
          value: 3150,
          currency: 'INR',
          custom_parameter: 'phone_field_focus'
        });
        break;
      
      case 'address_field_focus':
        fbq('track', 'Lead', {
          content_name: 'DIVJOT Pain Relief Address Field Focus',
          content_category: 'Form Interaction',
          value: 3150,
          currency: 'INR',
          custom_parameter: 'address_field_focus'
        });
        break;
    }
  }
  
  // Also track with custom event system
  trackEvent('lead_form_field_interaction', {
    interaction: interaction,
    timestamp: new Date().toISOString()
  });
}

// Enhanced Meta Pixel Conversion Tracking
function trackMetaPixelConversion(conversionType, value = 3150, additionalData = {}) {
  if (typeof fbq !== 'undefined') {
    // Track Purchase event
    fbq('track', 'Purchase', {
      content_name: `DIVJOT Pain Relief ${conversionType}`,
      content_category: 'Health & Wellness',
      content_type: 'product',
      value: value,
      currency: 'INR',
      content_ids: ['divjot-pain-relief'],
      num_items: 1,
      predicted_ltv: value,
      ...additionalData
    });

    // Track CompleteRegistration for lead funnel
    fbq('track', 'CompleteRegistration', {
      content_name: `DIVJOT Pain Relief ${conversionType} Registration`,
      content_category: 'Lead Generation',
      value: value,
      currency: 'INR',
      status: 'completed',
      ...additionalData
    });

    // Track custom conversion event
    fbq('trackCustom', 'DIVJOTConversion', {
      conversion_type: conversionType,
      product_name: 'DIVJOT Pain Relief',
      value: value,
      currency: 'INR',
      timestamp: new Date().toISOString(),
      ...additionalData
    });
  }
}

// Page Visibility API for engagement tracking
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    // Page became hidden
    if (typeof fbq !== 'undefined') {
      fbq('trackCustom', 'PageHidden', {
        content_name: 'DIVJOT Pain Relief Page Hidden',
        time_on_page: Date.now() - performance.timing.navigationStart
      });
    }
  } else {
    // Page became visible
    if (typeof fbq !== 'undefined') {
      fbq('trackCustom', 'PageVisible', {
        content_name: 'DIVJOT Pain Relief Page Visible'
      });
    }
  }
});

// Export Meta Pixel functions
window.trackLeadFormInteraction = trackLeadFormInteraction;
window.trackMetaPixelConversion = trackMetaPixelConversion;