# QuickBites Deployment Guide

This guide helps you deploy QuickBites backend to **Render** and frontend to **Vercel**.

---

## 📋 Pre-Deployment Checklist

- [ ] Remove `.env` files from git (add to `.gitignore`)
- [ ] Create `.env.example` files with template variables
- [ ] Update database connection strings
- [ ] Set up all API keys and secrets
- [ ] Test locally before deploying

---

## 🚀 Backend Deployment (Render)

### Step 1: Prepare Backend

1. **Remove sensitive files from git:**
   ```bash
   # If .env is already committed, remove it:
   git rm --cached backend/.env
   echo "backend/.env" >> .gitignore
   git add .gitignore && git commit -m "Remove sensitive .env file"
   ```

2. **Ensure `.env.example` is committed:**
   ```bash
   git add backend/.env.example
   git commit -m "Add .env.example template"
   ```

3. **Test production build locally:**
   ```bash
   cd backend
   npm install
   npm start
   ```

### Step 2: Deploy to Render

1. Go to [https://render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Fill in the configuration:
   - **Name:** `quickbites-backend`
   - **Region:** Choose closest to your users
   - **Branch:** `main` (or your branch)
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or Starter if you need better uptime)

5. Click **"Advanced"** and add environment variables:
   ```
   MONGODB_URL = mongodb+srv://user:password@cluster.mongodb.net/QuickBites
   JWT_SECRET = your_secret_key_here
   FRONTEND_URL = https://your-vercel-app.vercel.app
   MAIL_USER = your_email@gmail.com
   MAIL_PASS = your_app_password
   CLOUDINARY_CLOUD_NAME = your_cloud_name
   CLOUDINARY_API_KEY = your_api_key
   CLOUDINARY_API_SECRET = your_api_secret
   RAZORPAY_TEST_API_KEY = your_key
   RAZORPAY_TEST_KEY_SECRET = your_secret
   ```

6. Click **"Create Web Service"**
7. Wait for deployment to complete (~5-10 minutes)
8. Copy your Render URL: `https://quickbites-backend-xxxx.onrender.com`

### Step 3: Verify Backend

```bash
curl https://quickbites-backend-xxxx.onrender.com/api/auth/test
```

---

## 🌐 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

1. **Ensure `.env.example` is in frontend folder:**
   ```bash
   git add frontend/.env.example
   git commit -m "Add frontend .env.example"
   ```

2. **Verify `vercel.json` is present:**
   ```bash
   # Should already be created - check frontend/vercel.json
   ```

3. **Test production build locally:**
   ```bash
   cd frontend
   npm install
   npm run build
   npm run preview
   ```

### Step 2: Deploy to Vercel

1. Go to [https://vercel.com](https://vercel.com) and sign up/login with GitHub
2. Click **"Add New..."** → **"Project"**
3. Select your QuickBites repository
4. Configure project:
   - **Framework Preset:** Vite
   - **Root Directory:** `./frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **"Environment Variables"** and add:
   ```
   VITE_BACKEND_URL = https://quickbites-backend-xxxx.onrender.com
   VITE_FIREBASE_APIKEY = your_firebase_key
   VITE_GEOAPIKEY = your_geoapify_key
   VITE_RAZORPAY_TEST_API_KEY = your_razorpay_key
   ```
6. Click **"Deploy"**
7. Wait for deployment (~2-3 minutes)
8. Copy your Vercel URL: `https://quickbites-xxxx.vercel.app`

### Step 3: Update Backend FRONTEND_URL

1. Go back to Render dashboard
2. Edit the `quickbites-backend` service
3. Update environment variable:
   ```
   FRONTEND_URL = https://your-vercel-app.vercel.app
   ```
4. Redeploy

---

## 🔒 Important Security Notes

### Protecting Secrets

1. **Never commit `.env` files:**
   ```bash
   # .gitignore should contain:
   backend/.env
   frontend/.env
   ```

2. **Use `.env.example` for templates:**
   - Share this with team members
   - Show which variables are needed
   - Never include actual secret values

3. **Render & Vercel Secrets:**
   - Both platforms have secure environment variable storage
   - They are encrypted and never exposed
   - Use them instead of committing `.env` files

### Credential Management

- **MongoDB URL:** Use restricted database user (not admin)
- **JWT Secret:** Use strong, random string (min 32 chars)
- **API Keys:** Rotate periodically
- **Mail Password:** Use app-specific password (Gmail), not your main password

---

## 🐛 Troubleshooting

### Backend Issues

**Issue:** "Cannot connect to MongoDB"
- Check `MONGODB_URL` in Render environment variables
- Ensure IP whitelist includes `0.0.0.0/0` in MongoDB Atlas
- Verify connection string format: `mongodb+srv://user:pass@host/dbname`

**Issue:** "CORS error when calling from frontend"
- Check `FRONTEND_URL` matches your Vercel domain exactly
- Backend CORS must match frontend domain

**Issue:** "Socket.io connection fails"
- Socket.io requires persistent connections which may not work on free Render plans
- Consider upgrading to Starter plan ($7/month) or using HTTP polling

### Frontend Issues

**Issue:** "VITE_BACKEND_URL not found"
- Ensure `vercel.json` is present and committed
- Check environment variables in Vercel dashboard
- Rebuild project after adding env vars

**Issue:** "Blank white page after deploy"
- Check browser console for errors
- Verify build output directory is `dist`
- Check that output directory setting in Vercel is correct

---

## 📊 Recommended Upgrades

### For Better Performance & Reliability

| Service | Free Plan | Recommendation |
|---------|-----------|-----------------|
| **Render** | Limited uptime, spins down after 15 min inactivity | Starter ($7/month) for always-on |
| **Vercel** | Great for free | Pro ($20/month) if heavy traffic |
| **MongoDB** | M0 (512MB) good for small projects | M2 or higher if data grows |

---

## ✅ Post-Deployment Checklist

- [ ] Backend accessible at your Render URL
- [ ] Frontend accessible at your Vercel URL
- [ ] Login functionality works end-to-end
- [ ] Image uploads work (Cloudinary)
- [ ] Payment flow works (Razorpay)
- [ ] Email notifications send (for OTP)
- [ ] Maps and location features work

---

## 📞 Support

For deployment issues:
- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas:** https://docs.atlas.mongodb.com
