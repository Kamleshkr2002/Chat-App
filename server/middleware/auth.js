import { decode } from "punycode";
import User from "../models/User.js";
import jwt from 'jsonwebtoken';

//middleware to protect routes
export const protectRoute = async (req, res, next) => {
    
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password"); // Exclude password from user data
        if (!user) {
            return res.status(401).json({ success: false, message: "user not found" });
        }
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
}