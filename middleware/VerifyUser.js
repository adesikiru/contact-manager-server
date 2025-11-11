// server/middleware/VerifyUser.js middleware file verifies JWT tokens and attaches user info to the request object. 

import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export const VerifyUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
            try {
                if (err) {
                    return res.status(401).json({ error: "Unauthorized Access" });
                }
                const user = await UserModel.findOne({ _id: payload._id }).select("-password");
                req.user = user;
                next();
            } catch (err) {
                return res.status(500).json({ error: err.message });
            }
        });
    } else {
        return res.status(403).json({ error: "Forbidden Access" });
    }
}