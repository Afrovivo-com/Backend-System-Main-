"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.SECRET_KEY;
const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]; // Split by space to get the token part
    if (!token) {
        return res.status(401).json({ message: "Access Denied" });
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, secretKey);
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};
exports.authenticateJWT = authenticateJWT;
