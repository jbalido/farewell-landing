# Fix GitHub Authentication Issue

## Problem
You're getting a 403 error because:
- Repository owner: `jbalido`
- Authenticated as: `bizmatesph-jaysser-balido`

## Solution 1: Use SSH (Recommended)

### Step 1: Check if you have SSH key
```bash
ls -la ~/.ssh
```

If you see `id_rsa.pub` or `id_ed25519.pub`, you have a key. Skip to Step 3.

### Step 2: Generate SSH key (if needed)
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter for all prompts (use defaults)
```

### Step 3: Copy your SSH public key
```bash
cat ~/.ssh/id_ed25519.pub
# Or if you have RSA key:
cat ~/.ssh/id_rsa.pub
```

### Step 4: Add SSH key to GitHub
1. Go to GitHub.com
2. Click your profile picture → Settings
3. Click "SSH and GPG keys"
4. Click "New SSH key"
5. Paste your public key
6. Click "Add SSH key"

### Step 5: Change remote to SSH
```bash
cd landing-page
git remote remove origin
git remote add origin git@github.com:jbalido/farewell-landing.git
git push -u origin main
```

## Solution 2: Use Personal Access Token

### Step 1: Create Personal Access Token
1. Go to GitHub.com
2. Click profile picture → Settings
3. Click "Developer settings" (bottom left)
4. Click "Personal access tokens" → "Tokens (classic)"
5. Click "Generate new token" → "Generate new token (classic)"
6. Name: "Farewell Landing Deploy"
7. Expiration: 90 days (or your preference)
8. Scopes: Check "repo" (full control)
9. Click "Generate token"
10. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Use token in URL
```bash
cd landing-page
git remote remove origin
git remote add origin https://YOUR_TOKEN@github.com/jbalido/farewell-landing.git
git push -u origin main
```

## Solution 3: Use GitHub CLI (Easiest)

### Step 1: Install GitHub CLI
```bash
brew install gh
```

### Step 2: Authenticate
```bash
gh auth login
# Choose: GitHub.com
# Choose: HTTPS
# Authenticate with: Login with a web browser
# Follow the prompts
```

### Step 3: Push
```bash
cd landing-page
git remote remove origin
gh repo create jbalido/farewell-landing --public --source=. --remote=origin
git push -u origin main
```

## Solution 4: Switch GitHub Account

### Option A: Use correct account globally
```bash
# Check current user
git config --global user.name
git config --global user.email

# Update to jbalido account
git config --global user.name "jbalido"
git config --global user.email "your_jbalido_email@example.com"
```

### Option B: Use correct account for this repo only
```bash
cd landing-page
git config user.name "jbalido"
git config user.email "your_jbalido_email@example.com"
```

Then try pushing again with HTTPS.

## Quick Fix: Create Under Current Account

If you want to deploy quickly, create the repo under your current account:

```bash
cd landing-page
git remote remove origin
git remote add origin https://github.com/bizmatesph-jaysser-balido/farewell-landing.git
# Or create new repo on GitHub first, then:
git push -u origin main
```

## Verify Remote
```bash
git remote -v
```

Should show:
```
origin  git@github.com:jbalido/farewell-landing.git (fetch)
origin  git@github.com:jbalido/farewell-landing.git (push)
```

Or for HTTPS:
```
origin  https://github.com/jbalido/farewell-landing.git (fetch)
origin  https://github.com/jbalido/farewell-landing.git (push)
```

## After Fixing

Once authentication is working:
```bash
git push -u origin main
```

You should see:
```
Enumerating objects: 15, done.
Counting objects: 100% (15/15), done.
...
To github.com:jbalido/farewell-landing.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

## Deploy to Vercel After Push

```bash
vercel
# Link to the GitHub repo when prompted
```

Or deploy directly without GitHub:
```bash
vercel --prod
```
