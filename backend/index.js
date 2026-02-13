import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute.js"
import userRouter from "./routes/user.routes.js";
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

// "use" is use for the global change, it means it globally
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter); // we want that every routes in the authRouter passes through "/api/auth"
app.use("/api/user",userRouter); // we want that every routes in the authRouter passes through "/api/user"

app.listen(port, ()=>{
    connectDB();
    console.log(`server is running at ${port}`);
})