# 📸 Image Integration Guide - DIVJOT Theme

## 🖼️ Images Added to Theme

### **Image Files Created:**
1. **`assets/product.png`** - Main product image (DIVJOT Pain Relief bottle)
2. **`assets/knee-pain.png`** - Knee pain illustration for problem section

### **Where Images Are Used:**

#### 1. **Product Image (`product.png`)**
- **Hero Section**: Main product showcase
- **Offer Section**: Product display in promotional content
- **Problem-Solution Section**: Solution side product image
- **Fallback**: Used when no custom image is uploaded in settings

#### 2. **Knee Pain Image (`knee-pain.png`)**
- **Problem-Solution Section**: Illustrates the pain problem
- **Visual Context**: Shows the issue that DIVJOT solves

## 🔧 **How to Replace Placeholder Images**

### **Method 1: Upload via Shopify Admin (Recommended)**

1. **Go to Shopify Admin**
   - Navigate to **Online Store → Themes**
   - Click **Actions → Edit code**

2. **Upload Images**
   - Click **Assets** folder
   - Click **Add a new asset**
   - Upload your `product.png` and `knee-pain.png` files
   - Replace the existing placeholder files

3. **Alternative: Use Theme Settings**
   - Go to **Customize theme**
   - In sections that have image pickers, upload images directly
   - This overrides the default asset images

### **Method 2: Direct File Replacement**

1. **Replace Files**
   - Replace `assets/product.png` with your actual product image
   - Replace `assets/knee-pain.png` with your knee pain illustration

2. **Image Requirements**
   - **Format**: PNG or JPG
   - **Product Image**: Recommended 400x400px minimum
   - **Knee Pain Image**: Recommended 500x500px minimum
   - **Quality**: High resolution for crisp display

## 📱 **Image Optimization**

### **Responsive Sizing:**
- Images automatically resize for different screen sizes
- Uses Shopify's `img_url` filter for optimization
- Lazy loading implemented for better performance

### **Size Variations Used:**
```liquid
<!-- Hero Section -->
{{ settings.product_image | img_url: '400x400' }}

<!-- Offer Section -->
{{ settings.product_image | img_url: '200x200' }}

<!-- Problem Section -->
{{ settings.problem_image | img_url: '500x500' }}
```

## 🎨 **Image Styling**

### **Product Image Styling:**
- Rounded corners (15px border-radius)
- Drop shadow for depth
- Responsive sizing
- Center alignment

### **Knee Pain Image Styling:**
- Rounded corners
- Shadow effects
- Responsive layout
- Problem section integration

## 📍 **Image Locations in Code**

### **Hero Section** (`sections/hero-section.liquid`):
```liquid
<div class="product-image">
  {% if settings.product_image %}
    <img src="{{ settings.product_image | img_url: '400x400' }}" alt="{{ settings.product_name }}" loading="lazy">
  {% else %}
    <img src="{{ 'product.png' | asset_url }}" alt="DIVJOT Pain Relief" loading="lazy">
  {% endif %}
</div>
```

### **Problem-Solution Section** (`sections/problem-solution.liquid`):
```liquid
<!-- Problem Image -->
<div class="problem-image">
  {% if section.settings.problem_image %}
    <img src="{{ section.settings.problem_image | img_url: '500x500' }}" alt="Joint Pain Problem" loading="lazy">
  {% else %}
    <img src="{{ 'knee-pain.png' | asset_url }}" alt="Knee Pain Problem" loading="lazy">
  {% endif %}
</div>

<!-- Solution Image -->
<div class="solution-image">
  {% if section.settings.solution_image %}
    <img src="{{ section.settings.solution_image | img_url: '300x300' }}" alt="DIVJOT Solution" loading="lazy">
  {% else %}
    <img src="{{ 'product.png' | asset_url }}" alt="DIVJOT Pain Relief Solution" loading="lazy">
  {% endif %}
</div>
```

### **Offer Section** (`sections/offer-section.liquid`):
```liquid
<div class="offer-product-image">
  {% if section.settings.product_image %}
    <img src="{{ section.settings.product_image | img_url: '200x200' }}" alt="{{ section.settings.product_name }}" loading="lazy">
  {% else %}
    <img src="{{ 'product.png' | asset_url }}" alt="DIVJOT Pain Relief" loading="lazy">
  {% endif %}
</div>
```

## 🎯 **New Problem-Solution Section**

### **Features:**
- **Split Layout**: Problem on left, solution on right
- **Visual Contrast**: Red theme for problem, green for solution
- **Image Integration**: Uses both knee-pain.png and product.png
- **Interactive Points**: Problem points (❌) vs solution points (✅)
- **Call-to-Action**: Order button in solution side

### **Content Structure:**
- **Problem Side**: 
  - Knee pain image
  - Problem description
  - Pain points with red X icons
- **Solution Side**:
  - Product image
  - Solution description
  - Benefits with green checkmarks
  - Order button

## 📱 **Mobile Responsiveness**

### **Mobile Layout:**
- Problem and solution stack vertically
- Images resize appropriately
- Text remains readable
- Buttons stay accessible

### **Image Optimization:**
- Lazy loading for performance
- Responsive sizing
- Optimized file formats
- Fast loading on mobile

## 🚀 **Implementation Status**

### ✅ **Completed:**
- [x] Created placeholder image files
- [x] Updated hero section to use product.png
- [x] Created problem-solution section
- [x] Added knee-pain.png integration
- [x] Updated offer section with product image
- [x] Added responsive styling
- [x] Implemented lazy loading
- [x] Added to main template

### 📋 **Next Steps:**
1. **Replace Placeholder Images**: Upload actual product and knee pain images
2. **Test Responsiveness**: Verify images look good on all devices
3. **Optimize Performance**: Ensure fast loading times
4. **A/B Test**: Test different product images for conversion

## 🎨 **Image Specifications**

### **Product Image (product.png):**
- **Recommended Size**: 800x800px
- **Format**: PNG with transparent background preferred
- **Content**: Clear product shot, well-lit, professional
- **Background**: White or transparent
- **Quality**: High resolution for zoom/retina displays

### **Knee Pain Image (knee-pain.png):**
- **Recommended Size**: 600x600px
- **Format**: PNG or JPG
- **Content**: Clear illustration of knee/joint pain
- **Style**: Medical illustration or realistic photo
- **Context**: Should clearly show the problem DIVJOT solves

---

**🎉 Images are now integrated throughout the theme with proper fallbacks and responsive design!**