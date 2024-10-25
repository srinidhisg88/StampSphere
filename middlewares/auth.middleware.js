import jwt from 'jsonwebtoken'
import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];  // Assuming "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach decoded token to the request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token is invalid or expired" });
    }
};
