import express from "express"
import getCurrentUser from "../controllers/user.controller";
import isAuth from "../middlewares/isAuth";

const userRouter = express.Router();

authRouter.get("/current", isAuth ,getCurrentUser);

export default userRouter;