# Farewell PH Brochure

## Overview

The Farewell PH brochure is a professionally designed, print-ready document that can be downloaded as a PDF and shared with potential funeral home partners.

## Files

- `brochure.html` - The brochure webpage with print-to-PDF functionality
- `farewell-ph-logo.svg` - Logo file used in the brochure

## Features

### Design Elements
- **Professional Layout**: Clean, modern design with the Farewell PH brand colors
- **Logo Integration**: Dove emoji (🕊️) and Farewell PH branding throughout
- **Print-Optimized**: Designed specifically for PDF generation with proper page breaks
- **Responsive**: Works on all devices (desktop, tablet, mobile)

### Content Sections
1. **Hero Statement** - Get Your Funeral Home Discovered Online
2. **The Problem** - Why funeral homes need online presence
3. **The Solution** - What Farewell PH offers
4. **Founding Partner Benefits** - Priority placement, free listing, personal assistance
5. **How It Works** - 4-step process
6. **What You Get** - Detailed feature breakdown
7. **Coverage Areas** - 6 cities currently onboarding
8. **Pricing** - FREE during launch
9. **Why Join Now** - Urgency, limited slots, zero risk
10. **Testimonials** - What funeral homes are saying
11. **FAQs** - 7 common questions answered
12. **Get Started** - Three ways to join
13. **Contact Information** - Email, website, Facebook
14. **About Farewell PH** - Mission and background

## How to Use

### For Website Visitors
1. Click "📄 Download Full Brochure (PDF)" button on the landing page
2. Brochure opens in a new tab
3. Click "📄 Download as PDF" button at the top
4. Use browser's print dialog to save as PDF

### Direct Access
Visit: `https://farewell.ph/brochure.html`

### Auto-Print Mode
Add `?print=true` to URL for automatic print dialog:
`https://farewell.ph/brochure.html?print=true`

## Generating PDF

### Method 1: Browser Print (Recommended)
1. Open `brochure.html` in any modern browser
2. Click "📄 Download as PDF" button
3. In print dialog:
   - Destination: "Save as PDF"
   - Layout: Portrait
   - Margins: Default
   - Background graphics: Enabled (for colors)
4. Click "Save"

### Method 2: Command Line (Advanced)
Using Puppeteer or similar headless browser:

```bash
# Install puppeteer
npm install puppeteer

# Generate PDF
node generate-pdf.js
```

Example `generate-pdf.js`:
```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file:///path/to/brochure.html', {
    waitUntil: 'networkidle0'
  });
  await page.pdf({
    path: 'farewell-ph-brochure.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px'
    }
  });
  await browser.close();
})();
```

## Customization

### Update Content
Edit `brochure.html` directly. All content is in semantic HTML sections.

### Update Styling
Styles are embedded in `<style>` tag in the `<head>` section. Key variables:
- Primary Dark: `#0f172a`
- Accent Gold: `#f59e0b`
- Background: `#ffffff`

### Update Logo
Replace the logo in the `.logo-header` section or update `farewell-ph-logo.svg`.

## Print Optimization

The brochure includes special print styles:
- Hides navigation buttons when printing
- Optimizes page breaks for readability
- Ensures colors and backgrounds print correctly
- Prevents awkward section splits

## Sharing the Brochure

### Digital Sharing
1. **Email**: Attach the PDF or send the link
2. **Facebook**: Share the brochure.html link
3. **WhatsApp**: Send PDF directly to leads
4. **Website**: Link from landing page (already implemented)

### Physical Sharing
1. Generate PDF using browser print
2. Print on high-quality paper (recommended: 100gsm or higher)
3. Consider professional printing for bulk quantities

## Integration with Landing Page

The brochure is integrated into the landing page:
- Download button in hero section
- Opens in new tab for easy access
- Maintains consistent branding
- Mobile-responsive

## Best Practices

### For Lead Generation
1. **Email Follow-up**: Send PDF after initial contact
2. **Meeting Material**: Have printed copies for in-person meetings
3. **Digital Handout**: Share link during video calls
4. **Social Media**: Post PDF on Facebook business page

### For Conversion
1. **Emphasize FREE**: Highlight no-cost launch period
2. **Create Urgency**: Mention "First 5 per city" limit
3. **Personal Touch**: Include handwritten note with printed copies
4. **Follow Up**: Contact leads within 24 hours of sharing

## Technical Details

### Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

### File Size
- HTML: ~25KB
- Generated PDF: ~200-300KB (varies by browser)

### Performance
- Loads instantly (no external dependencies)
- Print-ready in <1 second
- No JavaScript required for viewing

## Maintenance

### Regular Updates
- Update coverage areas as you expand
- Add real testimonials as you get them
- Update pricing if launch period ends
- Refresh contact information if changed

### Version Control
Keep track of brochure versions:
- v1.0 (March 2026): Initial launch version
- Update version number in footer when making significant changes

## Support

For questions or issues:
- Email: info@farewell.ph
- Facebook: facebook.com/farewellph
- Website: farewell.ph

## License

© 2026 Farewell PH. All rights reserved.

---

**Last Updated**: March 3, 2026
**Version**: 1.0
