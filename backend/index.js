import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute.js"
import userRouter from "./routes/user.routes.js";
import shopRouter from "./routes/shop.routes.js";
import itemRouter from "./routes/item.routes.js";
import orderRouter from "./routes/order.routes.js";
const app = express();
const port = process.env.PORT || 5000;

// Allow the frontend origin dynamically during development. `origin: true`
// reflects the request origin in `Access-Control-Allow-Origin`, which
// works with `credentials: true` for dev setups (Vite may use 5173 or 5174).
app.use(cors({
    // origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    origin: (origin, callback) => callback(null, true),
    credentials: true
}));

// "use" is use for the global change, it means it globally
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRouter); // we want that every routes in the authRouter passes through "/api/auth"
app.use("/api/user",userRouter); // we want that every routes in the authRouter passes through "/api/user"

app.use("/api/shop",shopRouter);
app.use("/api/item", itemRouter);

app.use("/api/order", orderRouter);

app.listen(port, ()=>{
    connectDB();
    console.log(`server is running at ${port}`);
})