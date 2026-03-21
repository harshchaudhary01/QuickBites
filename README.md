# QuickBites

A full-stack MERN (MongoDB, Express, React, Node.js) food ordering platform with separate roles (user, owner, delivery).
Includes auth, shop/item management, location tracking, order flow, OTP password reset, and Cloudinary image uploads.

---

## 🌐 Stack

- Backend: Node.js + Express + MongoDB + Mongoose
- Auth: JWT via cookies
- File upload: Multer + Cloudinary
- Email: Nodemailer (OTP flows)
- Frontend: React + Vite + Tailwind CSS + React Router + Redux Toolkit
- Maps: Leaflet + Geoapify reverse geocoding
- Firebase: Auth + Google sign-in config

---

## 📁 Repo structure

- `backend/`
  - `index.js` (server startup)
  - `config/db.js`
  - `controllers/` (auth, user, shop, item, order)
  - `routes/` (authRoute, user.routes, shop.routes, item.routes, order.routes)
  - `middlewares/isAuth.js`, `multer.js`
  - `models/` schema definitions
  - `utils/cloudinary.js`, `mail.js`, `token.js`
- `frontend/`
  - `src/App.jsx` (routes + serverUrl)
  - `src/pages/` and `src/components/`
  - `src/hooks/` (fetch user/shop/item/orders, location etc.)
  - `src/redux/`
  - `firebase.js`, `vite.config.js`

---

## ⚙️ Prerequisites

- Node.js 18+ / npm
- MongoDB connection URI
- Cloudinary account (cloud name, key, secret)
- Geoapify API key
- (Optional) Firebase API key for Google auth frontend

---

## 🛠️ Environment variables

### Backend (`backend/.env`)
- `PORT=5000`
- `MONGODB_URL=<your MongoDB URI>`
- `JWT_SECRET=<strong secret>`
- `CLOUDINARY_CLOUD_NAME=<cloud name>`
- `CLOUDINARY_API_KEY=<api key>`
- `CLOUDINARY_API_SECRET=<api secret>`
- `EMAIL_USER=<sender email>` (for Nodemailer)
- `EMAIL_PASS=<sender email password/app password>`

### Frontend (`frontend/.env`)
- `VITE_FIREBASE_APIKEY=<firebase api key>`
- `VITE_GEOAPIKEY=<geoapify api key>`
- (Optional) `VITE_SERVER_URL=http://localhost:5000` for variable backend URL

---

## ▶️ Run locally

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🧩 Backend API routes

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `GET /api/auth/signout`
- `POST /api/auth/send-otp`
- `POST /api/auth/verify-otp`
- `POST /api/auth/reset-password`
- `POST /api/auth/google-auth`

### User
- `GET /api/user/current` (protected)
- `POST /api/user/update-location` (protected)

### Shop
- `POST /api/shop/create-edit` (protected, image upload)
- `GET /api/shop/get-my-shop` (protected)
- `GET /api/shop/get-by-city/:city` (protected)

### Item
- `POST /api/item/add-item` (protected, image upload)
- `POST /api/item/edit-item/:itemId` (protected, image upload)
- `GET /api/item/get-by-id/:itemId` (protected)
- `GET /api/item/get-by-city/:city` (protected)
- `GET /api/item/delete/:itemId` (protected)

### Order
- `POST /api/order/place-order` (protected)
- `GET /api/order/my-orders` (protected)
- `GET /api/order/get-assignments` (protected)
- `GET /api/order/get-current-order` (protected)
- `POST /api/order/update-status/:orderId/:shopId` (protected)
- `GET /api/order/accept-order/:assignmentId` (protected)
- `GET /api/order/get-order-by-id/:orderId` (protected)

---

## 🧠 Frontend flow

- Login / signup / forgot password
- Landing page -> home with city-based shops + items
- Add/edit shop and items (owner)
- Add to cart → checkout with Geoapify location handling
- Order tracking, orders history, delivery assignment dashboard
- Redux state slices: `userSlice`, `ownerSlice`, `mapSlice`

---

## ☁️ Deployment

### Backend
- Heroku / Render / any Node host
- Node command: `npm start`
- Ensure `.env` set

### Frontend
- Vite build: `npm run build`
- Host on Netlify / Vercel / GH Pages

---

## 🧪 Validation

- `npm run lint` (frontend ESLint)
- Manual test flows:
  - sign up / login / logout
  - OTP reset password
  - shop/item CRUD
  - cart, checkout, order status + tracking

---

## 💡 Enhancement ideas

- Add role-based route guard on frontend (owner/user/delivery)
- Add tests: Jest (backend) / React Testing Library (frontend)
- Add mobile-responsive improvements
- Add Dockerfile + docker-compose

---

## 🙌 Credits

- Author: Harsh Kumar Chaudhary
- Project: QuickBites MERN delivery app
