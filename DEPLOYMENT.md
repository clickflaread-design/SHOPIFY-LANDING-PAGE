# DIVJOT Shopify Theme - Deployment Guide

## 🚀 Deploy to Shopify via GitHub

### Method 1: Direct GitHub Integration (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial DIVJOT theme commit"
   git push origin main
   ```

2. **Connect to Shopify:**
   - Go to your Shopify Admin
   - Navigate to **Online Store > Themes**
   - Click **Add theme > Connect from GitHub**
   - Select your repository and branch
   - Click **Connect**

3. **Publish Theme:**
   - Once connected, click **Actions > Publish**
   - Your theme will be live!

### Method 2: Manual Upload

1. **Create Theme ZIP:**
   ```bash
   # Exclude unnecessary files
   zip -r divjot-theme.zip . -x "*.git*" "*.vscode*" "README.md" "DEPLOYMENT.md" "THEME_STATUS.md"
   ```

2. **Upload to Shopify:**
   - Go to **Online Store > Themes**
   - Click **Add theme > Upload ZIP file**
   - Select your `divjot-theme.zip`
   - Click **Upload**

### Method 3: Shopify CLI (Advanced)

1. **Install Shopify CLI:**
   ```bash
   npm install -g @shopify/cli @shopify/theme
   ```

2. **Login and Deploy:**
   ```bash
   shopify auth login
   shopify theme push
   ```

## ⚙️ Configuration After Deployment

### 1. Theme Settings
Go to **Customize Theme** and configure:

- **Product Settings:**
  - Product Name: "DIVJOT'S Pain Relief"
  - Product Price: 3150
  - Product Description: "100% आयुर्वेदिक जोड़ों के दर्द की दवा"

- **CRM Settings:**
  - CRM API URL: `https://projects.erpthemes.com/api/dynamic/addRecordsDynamic?tempID=72&tempName=website_api_`
  - CRM Auth Token: [Your token]
  - Domain: "jointrelief.co.in"

- **Analytics & Tracking:**
  - Facebook Pixel ID: [Your pixel ID]
  - Google Analytics ID: [Your GA4 ID]
  - Google Tag Manager ID: [Your GTM ID]

- **WhatsApp Integration:**
  - WhatsApp Number: 919876543210
  - Default Message: "मुझे DIVJOT Pain Relief के बारे में जानकारी चाहिए"

### 2. Upload Product Images
- Go to **Settings > Files**
- Upload your product images
- Update image references in theme settings

### 3. Test Functionality
- ✅ Test order form submission
- ✅ Verify CRM integration
- ✅ Check mobile responsiveness
- ✅ Test analytics tracking
- ✅ Verify WhatsApp integration

## 🔧 Troubleshooting

### Common Issues:

1. **"Role can't be set to main" Error:**
   - Ensure `layout/theme.liquid` exists and is valid
   - Check all required files are present
   - Verify JSON syntax in config files

2. **CRM Integration Not Working:**
   - Check CRM API URL and token in theme settings
   - Verify CORS settings on your CRM endpoint
   - Check browser console for errors

3. **Analytics Not Tracking:**
   - Verify Pixel/Analytics IDs in theme settings
   - Check if tracking codes are properly loaded
   - Test in incognito mode

4. **Mobile Issues:**
   - Clear browser cache
   - Test on actual mobile devices
   - Check viewport meta tag

## 📁 Required File Structure

Ensure these files exist:
```
├── layout/theme.liquid ✅
├── templates/index.liquid ✅
├── templates/404.liquid ✅
├── templates/page.liquid ✅
├── config/settings_schema.json ✅
├── config/settings_data.json ✅
├── locales/en.default.json ✅
├── locales/hi.json ✅
├── assets/ (CSS, JS, images) ✅
├── sections/ (theme sections) ✅
├── snippets/ (reusable code) ✅
```

## 🎯 Post-Deployment Checklist

- [ ] Theme uploaded successfully
- [ ] All settings configured
- [ ] Product images uploaded
- [ ] Order form working
- [ ] CRM integration tested
- [ ] Analytics tracking verified
- [ ] Mobile responsiveness checked
- [ ] WhatsApp integration working
- [ ] Timer functionality active
- [ ] All Hindi content displaying correctly

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Verify all theme settings are configured
3. Test in different browsers
4. Check mobile compatibility

For technical support, create an issue in the GitHub repository.