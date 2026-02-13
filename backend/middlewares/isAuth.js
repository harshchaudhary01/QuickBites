import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookie.token;
        if (!token) {
            return res.status(400).json({ message: `Token not found!` })
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodeToken) {
            return res.status(400).json({ message: `Token not verified!` })
        }
        console.log(decodeToken)
        req.userId = decodeToken.userId;
        next();
    } catch (error) {
        res.status(500).json({message: `auth middleware error: ${error}`});
    }
}

export default isAuth;