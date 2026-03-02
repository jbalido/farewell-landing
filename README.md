# Farewell PH - Landing Page

Professional landing page for Farewell PH, the Philippines' first online funeral services hub.

## Overview

This is a static landing page designed to:
- Build awareness before the main platform launches
- Collect email addresses from interested providers and families
- Establish the Farewell PH brand
- Recruit founding partners

## Features

- **Hero Section**: Compelling headline and call-to-action
- **About Section**: Platform overview with key benefits
- **For Providers**: Benefits of joining as a founding partner
- **For Families**: How the platform helps during difficult times
- **Signup Form**: Collect contact information from interested parties
- **Contact Section**: Ways to get in touch
- **Responsive Design**: Works on all devices
- **Smooth Animations**: Professional scroll effects and transitions

## Tech Stack

- Pure HTML5, CSS3, and JavaScript
- No frameworks or dependencies
- Lightweight and fast loading
- SEO-friendly structure

## Setup

1. Clone or download the files
2. Open `index.html` in a web browser
3. No build process required!

## Form Submission Options

The form currently stores submissions in localStorage. To collect real submissions, choose one of these options:

### Option 1: Formspree (Easiest)

1. Sign up at [formspree.io](https://formspree.io) (free tier available)
2. Create a new form and get your form ID
3. Update `script.js` line 30:
```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});
```

### Option 2: Google Sheets (via Apps Script)

1. Create a Google Sheet
2. Go to Extensions > Apps Script
3. Add this code:
```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.business,
    data.role,
    data.message
  ]);
  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
```
4. Deploy as web app
5. Update `script.js` with your web app URL

### Option 3: Your Own Backend

Connect to your Farewell PH backend API:
```javascript
const response = await fetch('https://farewell.ph/api/waitlist', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Your site will be live at `https://your-project.vercel.app`
5. Add custom domain: `farewell.ph`

### Option 2: Netlify

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run: `netlify deploy`
3. Follow the prompts
4. Add custom domain in Netlify dashboard

### Option 3: GitHub Pages

1. Create a new repository: `farewell-landing`
2. Push these files to the repository
3. Go to Settings > Pages
4. Select branch and folder
5. Your site will be live at `https://username.github.io/farewell-landing`

### Option 4: Traditional Hosting

Upload files via FTP to any web hosting provider:
- Upload all files to public_html or www folder
- Ensure index.html is in the root
- Configure domain DNS to point to hosting

## Custom Domain Setup

To use `farewell.ph`:

1. Purchase domain from a registrar (e.g., GoDaddy, Namecheap)
2. Update DNS records:
   - For Vercel: Add A record pointing to Vercel's IP
   - For Netlify: Add CNAME record pointing to Netlify
   - For GitHub Pages: Add CNAME file with domain name
3. Wait for DNS propagation (up to 48 hours)

## Customization

### Update Contact Email
Change `hello@farewell.ph` in:
- `index.html` (Contact section)
- `script.js` (Error message)

### Update Colors
Modify CSS variables in `styles.css`:
```css
:root {
    --primary-dark: #1e3a5f;
    --primary-blue: #2c5282;
    --accent-gold: #c9a961;
    /* ... */
}
```

### Update Content
Edit text directly in `index.html`

## Exporting Submissions

If using localStorage (default), open browser console and run:
```javascript
exportSubmissions()
```

This downloads a CSV file with all submissions.

## SEO Optimization

The page includes:
- Semantic HTML5 structure
- Meta descriptions
- Proper heading hierarchy
- Alt text for images (add when you include images)

To improve SEO further:
1. Add Open Graph meta tags for social sharing
2. Create a sitemap.xml
3. Add robots.txt
4. Submit to Google Search Console

## Performance

- No external dependencies
- Optimized CSS and JavaScript
- Fast loading time
- Mobile-responsive

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Next Steps

1. Choose a form submission service
2. Deploy to hosting platform
3. Configure custom domain
4. Test form submissions
5. Set up analytics (Google Analytics, Plausible, etc.)
6. Share the link to start collecting signups!

## Support

For questions or issues:
- Email: hello@farewell.ph
- GitHub Issues: [Create an issue]

## License

© 2026 Farewell PH. All rights reserved.
