# Farewell PH Landing Page - Deployment Guide

## Quick Deploy (5 minutes)

### Option 1: Vercel (Recommended - Free)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd landing-page
   vercel
   ```

3. **Follow prompts:**
   - Set up and deploy? `Y`
   - Which scope? Select your account
   - Link to existing project? `N`
   - Project name? `farewell-landing`
   - Directory? `./`
   - Override settings? `N`

4. **Your site is live!** You'll get a URL like: `https://farewell-landing.vercel.app`

5. **Add custom domain:**
   ```bash
   vercel domains add farewell.ph
   ```
   Then update your DNS records as instructed.

### Option 2: Netlify (Free)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**
   ```bash
   cd landing-page
   netlify deploy
   ```

3. **Follow prompts:**
   - Create & configure a new site? `Y`
   - Team? Select your team
   - Site name? `farewell-landing`
   - Publish directory? `./`

4. **Deploy to production:**
   ```bash
   netlify deploy --prod
   ```

5. **Add custom domain in Netlify dashboard**

### Option 3: GitHub Pages (Free)

1. **Create GitHub repository**
   - Go to GitHub and create new repository: `farewell-landing`
   - Don't initialize with README

2. **Push code**
   ```bash
   cd landing-page
   git remote add origin https://github.com/YOUR_USERNAME/farewell-landing.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Source: Deploy from branch
   - Branch: `main` / `root`
   - Save

4. **Your site will be live at:**
   `https://YOUR_USERNAME.github.io/farewell-landing`

## Domain Setup (farewell.ph)

### Step 1: Purchase Domain

Purchase `farewell.ph` from a domain registrar:
- **Recommended for .ph domains:**
  - [Dot.PH](https://www.dot.ph) - Official .ph registrar
  - [GoDaddy](https://www.godaddy.com)
  - [Namecheap](https://www.namecheap.com)

Cost: ~₱500-1,000/year (~$10-20 USD)

### Step 2: Configure DNS

#### For Vercel:

Add these DNS records in your domain registrar:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### For Netlify:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: YOUR_SITE.netlify.app
```

#### For GitHub Pages:

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

### Step 3: Wait for DNS Propagation

DNS changes can take 1-48 hours to propagate globally. Check status:
```bash
nslookup farewell.ph
```

## Form Submission Setup

### Option 1: Formspree (Easiest - Free tier available)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Get your form endpoint
4. Update `script.js` line 30-37:

```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});

if (!response.ok) throw new Error('Submission failed');
```

5. Remove the demo code (lines 40-50)

### Option 2: Google Sheets (Free)

1. **Create Google Sheet** with columns:
   - Timestamp, Name, Email, Business, Role, Message

2. **Open Apps Script** (Extensions > Apps Script)

3. **Paste this code:**
```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.business || '',
      data.role,
      data.message || ''
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. **Deploy:**
   - Click Deploy > New deployment
   - Type: Web app
   - Execute as: Me
   - Who has access: Anyone
   - Click Deploy
   - Copy the web app URL

5. **Update `script.js`:**
```javascript
const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});
```

### Option 3: Connect to Farewell PH Backend

Create a waitlist endpoint in your Laravel backend:

1. **Create migration:**
```bash
php artisan make:migration create_waitlist_table
```

2. **Add to backend API:**
```php
// routes/api.php
Route::post('/waitlist', [WaitlistController::class, 'store']);

// app/Http/Controllers/Api/WaitlistController.php
public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:waitlist,email',
        'business' => 'nullable|string|max:255',
        'role' => 'required|in:provider,family,other',
        'message' => 'nullable|string|max:1000',
    ]);

    Waitlist::create($validated);

    return response()->json(['success' => true]);
}
```

3. **Update `script.js`:**
```javascript
const response = await fetch('https://farewell.ph/api/waitlist', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});
```

## Analytics Setup (Optional but Recommended)

### Google Analytics

1. Create account at [analytics.google.com](https://analytics.google.com)
2. Get tracking ID
3. Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Plausible Analytics (Privacy-friendly alternative)

1. Sign up at [plausible.io](https://plausible.io)
2. Add to `index.html` before `</head>`:

```html
<script defer data-domain="farewell.ph" src="https://plausible.io/js/script.js"></script>
```

## SSL Certificate

All recommended hosting platforms (Vercel, Netlify, GitHub Pages) provide free SSL certificates automatically via Let's Encrypt. Your site will be served over HTTPS.

## Performance Optimization

The landing page is already optimized:
- ✅ No external dependencies
- ✅ Minimal CSS and JavaScript
- ✅ Optimized images (when you add them)
- ✅ Mobile responsive

### Additional optimizations:

1. **Add favicon:**
   - Create `favicon.ico` and place in root
   - Add to `index.html`: `<link rel="icon" href="favicon.ico">`

2. **Compress images** (when you add them):
   - Use [TinyPNG](https://tinypng.com)
   - Or [Squoosh](https://squoosh.app)

3. **Enable caching** (automatic on Vercel/Netlify)

## Testing Checklist

Before going live:

- [ ] Test form submission
- [ ] Test on mobile devices
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Check all links work
- [ ] Verify email address is correct
- [ ] Test smooth scrolling navigation
- [ ] Check responsive design
- [ ] Verify SSL certificate is active
- [ ] Test page load speed (use [PageSpeed Insights](https://pagespeed.web.dev))
- [ ] Check SEO (use [Google Search Console](https://search.google.com/search-console))

## Monitoring

### Uptime Monitoring (Free)

- [UptimeRobot](https://uptimerobot.com) - Free for 50 monitors
- [Pingdom](https://www.pingdom.com) - Free tier available

### Form Submission Monitoring

Check submissions regularly:
- Formspree: Dashboard
- Google Sheets: Check spreadsheet
- Backend: Database or admin panel

## Cost Summary

| Service | Cost | Notes |
|---------|------|-------|
| Domain (.ph) | ₱500-1,000/year | One-time annual fee |
| Hosting (Vercel/Netlify) | Free | Generous free tier |
| SSL Certificate | Free | Included with hosting |
| Form Submissions (Formspree) | Free | Up to 50/month on free tier |
| Analytics (Plausible) | Free | Or use Google Analytics |
| **Total** | **₱500-1,000/year** | **~$10-20 USD/year** |

## Support

If you encounter issues:

1. Check hosting platform documentation
2. Verify DNS settings with `nslookup farewell.ph`
3. Check browser console for JavaScript errors
4. Test form submission in browser console

## Next Steps After Deployment

1. ✅ Deploy to hosting platform
2. ✅ Configure custom domain
3. ✅ Set up form submissions
4. ✅ Add analytics
5. ✅ Test everything
6. 📢 Share the link!
7. 📧 Start collecting signups
8. 📊 Monitor analytics and submissions
9. 🚀 Prepare for main platform launch

## Quick Commands Reference

```bash
# Vercel
vercel                    # Deploy
vercel --prod            # Deploy to production
vercel domains add farewell.ph  # Add domain

# Netlify
netlify deploy           # Deploy preview
netlify deploy --prod    # Deploy to production
netlify open             # Open dashboard

# Git
git add .
git commit -m "Update landing page"
git push

# Local testing
python3 -m http.server 8000  # Start local server
# Then open: http://localhost:8000
```

Good luck with your launch! 🚀
