# DIVJOT Pain Relief - Shopify Theme

A complete Shopify theme for DIVJOT Pain Relief product landing page with Hindi content, CRM integration, and conversion-optimized design.

## Features

### 🎯 Core Features
- **Hindi Language Support** - Complete Hindi content for Indian audience
- **Mobile-First Design** - Responsive design optimized for mobile devices
- **CRM Integration** - Direct form submission to your CRM system
- **Countdown Timer** - Creates urgency with auto-resetting timer
- **Order Modal** - Popup form for seamless ordering experience
- **Trust Indicators** - Multiple trust badges and guarantees

### 🛒 E-commerce Features
- **Product Showcase** - Beautiful product display with images
- **Pricing Display** - Clear pricing with discount highlights
- **Order Form** - Complete order form with validation
- **Success Tracking** - Order confirmation and tracking
- **Multiple CTAs** - Strategic call-to-action buttons throughout

### 🎨 Design Elements
- **Announcement Bar** - Sticky top bar for urgent offers
- **Hero Section** - Eye-catching hero with product and pricing
- **Benefits Section** - Product benefits with icons
- **Testimonials** - Customer reviews and ratings
- **FAQ Section** - Common questions and answers
- **Ingredients** - Natural ingredients showcase

### 🔧 Technical Features
- **Form Validation** - Client-side form validation
- **Error Handling** - Proper error handling for API calls
- **Loading States** - Visual feedback during form submission
- **Analytics Ready** - Google Analytics and Facebook Pixel support
- **Performance Optimized** - Lazy loading and optimized assets

## File Structure

```
├── layout/
│   └── theme.liquid          # Main theme layout
├── templates/
│   └── index.liquid          # Homepage template
├── sections/
│   └── hero-section.liquid   # Hero section component
├── snippets/
│   └── product-form.liquid   # Order form component
├── assets/
│   ├── divjot-theme.css     # Main theme styles
│   ├── divjot-theme.js      # Theme JavaScript
│   ├── base.css             # Base Shopify styles
│   └── divjot-product.jpg   # Product image placeholder
├── config/
│   ├── settings_schema.json # Theme settings configuration
│   └── settings_data.json   # Default theme settings
└── README.md                # This file
```

## Setup Instructions

### 1. Upload to Shopify
1. Zip all theme files
2. Go to Shopify Admin → Online Store → Themes
3. Click "Upload theme" and select your zip file
4. Publish the theme

### 2. Configure Settings
1. Go to Theme Settings in Shopify Admin
2. Configure the following sections:
   - **Product Settings**: Set product name, price, description
   - **CRM Settings**: Add your CRM API URL and token
   - **Announcement Bar**: Customize announcement text and colors
   - **Timer Settings**: Set countdown timer duration

### 3. Add Product Images
1. Upload your product images to the theme assets
2. Update the image references in the theme settings
3. Replace `divjot-product.jpg` with your actual product image

### 4. CRM Integration
The theme includes built-in CRM integration with the following configuration:

```javascript
// CRM Configuration
const CRM_CONFIG = {
  apiUrl: "https://projects.erpthemes.com/api/dynamic/addRecordsDynamic?tempID=72&tempName=website_api_",
  authToken: "YOUR_AUTH_TOKEN",
  domain: "jointrelief.co.in"
};
```

Update these values in the theme settings or directly in the JavaScript file.

## Customization

### Colors
The theme uses CSS custom properties for easy color customization:
- `--color-primary`: #28a745 (Green)
- `--color-secondary`: #ff4757 (Red)
- `--color-accent`: #ffd700 (Gold)

### Typography
- Hindi-friendly fonts with fallbacks
- Responsive font sizes
- Proper line heights for readability

### Layout
- Mobile-first responsive design
- Flexible grid system
- Optimized for conversion

## Form Data Structure

The order form collects the following data:
```javascript
{
  name: string,      // Customer name
  phone: string,     // Mobile number (10 digits)
  pincode: string,   // PIN code (6 digits)
  address: string    // Full address
}
```

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance
- Optimized CSS and JavaScript
- Lazy loading for images
- Minimal external dependencies
- Fast loading times

## SEO Features
- Semantic HTML structure
- Meta tags support
- Schema markup ready
- Mobile-friendly design

## Analytics Integration
The theme supports:
- Google Analytics 4
- Facebook Pixel
- Custom event tracking
- Conversion tracking

## Support
For support and customization requests, contact the development team.

## License
This theme is proprietary and licensed for use with DIVJOT Pain Relief product only.

---

**Version**: 1.0.0  
**Last Updated**: October 2024  
**Compatibility**: Shopify 2.0+