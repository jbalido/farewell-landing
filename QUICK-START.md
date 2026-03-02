# Farewell PH Landing Page - Quick Start Guide

## 🚀 Get Your Landing Page Live in 10 Minutes

### Step 1: Test Locally (2 minutes)

Open your terminal and run:

```bash
cd landing-page
python3 -m http.server 8000
```

Then open your browser to: `http://localhost:8000`

You should see your beautiful landing page! 🎉

### Step 2: Push to GitHub (3 minutes)

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `farewell-landing`
   - Description: "Landing page for Farewell PH"
   - Public or Private: Your choice
   - Don't initialize with README
   - Click "Create repository"

2. **Push your code:**
   ```bash
   cd landing-page
   git remote add origin https://github.com/YOUR_USERNAME/farewell-landing.git
   git branch -M main
   git push -u origin main
   ```

### Step 3: Deploy to Vercel (5 minutes)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **farewell-landing**
   - Directory? **./** (just press Enter)
   - Override settings? **N**

4. **Your site is now live!** 🎉
   
   You'll get a URL like: `https://farewell-landing.vercel.app`

### Step 4: Add Custom Domain (Optional)

1. **Purchase farewell.ph domain** (~₱500-1,000/year)
   - Recommended: [Dot.PH](https://www.dot.ph)
   - Alternative: [GoDaddy](https://www.godaddy.com)

2. **Add domain to Vercel:**
   ```bash
   vercel domains add farewell.ph
   ```

3. **Update DNS records** (in your domain registrar):
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

4. **Wait for DNS propagation** (1-48 hours)

### Step 5: Set Up Form Submissions

#### Option A: Formspree (Easiest - 2 minutes)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Copy your form ID
4. Edit `script.js` line 30 and replace:
   ```javascript
   // Replace this demo code
   await new Promise(resolve => setTimeout(resolve, 1000));
   
   // With this:
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
   });
   
   if (!response.ok) throw new Error('Submission failed');
   ```

5. Remove lines 40-50 (localStorage demo code)
6. Commit and push:
   ```bash
   git add script.js
   git commit -m "Connect form to Formspree"
   git push
   ```

7. Vercel will auto-deploy your changes!

#### Option B: Google Sheets (Free - 5 minutes)

See `DEPLOYMENT.md` for detailed Google Sheets setup.

### Step 6: Add Analytics (Optional - 3 minutes)

1. **Create Google Analytics account** at [analytics.google.com](https://analytics.google.com)
2. Get your tracking ID (looks like: G-XXXXXXXXXX)
3. Edit `index.html` and add before `</head>`:

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

4. Commit and push:
   ```bash
   git add index.html
   git commit -m "Add Google Analytics"
   git push
   ```

## ✅ You're Done!

Your landing page is now live and collecting signups!

## 📊 Monitor Your Success

### Check Form Submissions
- **Formspree**: Check your dashboard
- **Google Sheets**: Open your spreadsheet
- **localStorage**: Open browser console and run `exportSubmissions()`

### Check Analytics
- **Google Analytics**: Visit your dashboard
- **Vercel Analytics**: Check Vercel dashboard

## 🎯 Next Steps

1. **Share your landing page:**
   - Post on social media
   - Email funeral homes
   - Share with industry contacts

2. **Monitor and iterate:**
   - Check analytics daily
   - Review form submissions
   - Adjust messaging if needed

3. **Prepare for launch:**
   - Nurture your waitlist
   - Offer founding partner benefits
   - Build excitement for main platform

## 🆘 Troubleshooting

### Form not submitting?
- Check browser console for errors
- Verify Formspree form ID is correct
- Test with a different email address

### Domain not working?
- Check DNS settings with: `nslookup farewell.ph`
- Wait up to 48 hours for DNS propagation
- Verify A record and CNAME are correct

### Site not updating?
- Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Check Vercel deployment status
- Verify git push was successful

## 📞 Need Help?

- Check `DEPLOYMENT.md` for detailed guides
- Check `README.md` for project documentation
- Email: info@farewell.ph

## 🎉 Congratulations!

You've successfully launched your landing page. Now go collect those founding partners! 🚀

---

**Total Time**: ~10-20 minutes
**Total Cost**: ₱500-1,000/year (~$10-20 USD for domain only)
**Difficulty**: Easy ⭐⭐☆☆☆
