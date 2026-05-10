# 🔐 Environment Variables Quick Reference

## Backend Environment Variables

```env
# Server Configuration
PORT=5000

# Database
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/QuickBites

# Security
JWT_SECRET=your-secret-key-min-32-chars-long

# Frontend (for CORS)
FRONTEND_URL=https://your-vercel-domain.vercel.app

# Email (Nodemailer)
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password  # NOT your main password for Gmail!

# Cloudinary (Image Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay (Payments - Use TEST keys for development)
RAZORPAY_TEST_API_KEY=rzp_test_xxxxx
RAZORPAY_TEST_KEY_SECRET=xxxxx
```

**File Location:** `backend/.env`  
**Template:** `backend/.env.example`  
**Platform:** Set in Render dashboard environment variables

---

## Frontend Environment Variables

```env
# Backend API
VITE_BACKEND_URL=https://your-render-backend.onrender.com

# Firebase
VITE_FIREBASE_APIKEY=your_firebase_api_key

# Geoapify (Maps)
VITE_GEOAPIKEY=your_geoapify_api_key

# Razorpay (Payments - Use TEST keys for development)
VITE_RAZORPAY_TEST_API_KEY=rzp_test_xxxxx
```

**File Location:** `frontend/.env`  
**Template:** `frontend/.env.example`  
**Platform:** Set in Vercel project environment variables

---

## How to Find Each Value

### MongoDB Atlas Connection String
1. Go to https://www.mongodb.com/cloud/atlas
2. Select your cluster
3. Click "Connect"
4. Choose "Drivers"
5. Copy connection string: `mongodb+srv://user:password@cluster.mongodb.net/database`

### Cloudinary Credentials
1. Go to https://cloudinary.com
2. Dashboard → Account
3. Find: Cloud Name, API Key, API Secret

### Firebase API Key
1. Firebase Console → Your Project
2. Project Settings
3. Look for API Key (starts with AIzaSy...)

### Geoapify API Key
1. Go to https://www.geoapify.com
2. Dashboard → API keys
3. Create new API key

### Razorpay Test Keys
1. Go to https://dashboard.razorpay.com
2. Settings → API Keys (TEST mode)
3. Copy Key ID and Key Secret

### JWT Secret
- Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Use at least 32 characters
- Keep it secret!

### Gmail App Password (for Nodemailer)
1. Google Account → Security
2. Enable 2-Factor Authentication
3. Create App Password
4. Use this instead of your main password

---

## Setting Variables in Render

1. Go to Render dashboard
2. Select your backend service
3. Click "Environment"
4. Add each variable:
   - Key: `MONGODB_URL`
   - Value: `mongodb+srv://...`
5. Save and the service will redeploy automatically

---

## Setting Variables in Vercel

1. Go to Vercel dashboard
2. Select your frontend project
3. Settings → Environment Variables
4. Add each variable:
   - Name: `VITE_BACKEND_URL`
   - Value: `https://your-backend.onrender.com`
5. Save and redeploy

---

## ⚠️ Important Security Notes

- ❌ Never commit `.env` files to git
- ❌ Never share `.env` files in messages/emails
- ✅ Use `.env.example` as template only
- ✅ Use platform-specific environment variable settings (Render/Vercel dashboards)
- ✅ Rotate secrets periodically
- ✅ Use test keys for development, production keys only for live deployment

---

## Variable Update Order

1. **First:** Deploy backend on Render
   - Set all variables except FRONTEND_URL
   - Get Render backend URL
2. **Second:** Deploy frontend on Vercel
   - Set VITE_BACKEND_URL to Render URL
   - Get Vercel frontend URL
3. **Third:** Update backend
   - Set FRONTEND_URL to Vercel URL
   - Redeploy backend

---

## Testing Variables Locally

Create `.env` file in `backend/` or `frontend/` folder:

**backend/.env:**
```env
MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/QuickBites
JWT_SECRET=test-secret-key
FRONTEND_URL=http://localhost:5173
...
```

**frontend/.env:**
```env
VITE_BACKEND_URL=http://localhost:5000
VITE_FIREBASE_APIKEY=...
...
```

Then run:
```bash
cd backend && npm start
cd frontend && npm run dev
```

---

## Troubleshooting

**Variables not loading?**
- Verify correct variable name (case-sensitive!)
- For Vite (frontend): prefix with `VITE_`
- Restart dev server or redeploy

**MongoDB connection fails?**
- Check IP whitelist in MongoDB Atlas
- Ensure password doesn't have special chars (URL encode if needed)
- Test connection string in MongoDB Compass

**Cloudinary uploads fail?**
- Verify cloud name, API key, API secret
- Check upload preset settings
- Test in Cloudinary dashboard

---

Last Updated: May 10, 2026
