
import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    const token = req.cookies.jwt

    if (!token) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
         req.user = decoded.userId;  // Attach decoded token to the request
        // console.log(req.user)
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token is invalid or expired" });
    }
};
