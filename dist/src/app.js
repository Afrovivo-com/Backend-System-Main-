"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("./server");
const sessions_1 = __importDefault(require("./config/sessions"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const authMiddleware_1 = require("./middlewares/authMiddleware");
dotenv_1.default.config();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const config = {
    env: 'development',
    port: port,
    hostname: 'localhost'
};
const server = (0, server_1.create)(config);
server.use(sessions_1.default);
server.use(express_1.default.json()); // Ensure JSON parsing is enabled
server.use('/api/auth', authRoute_1.default);
server.get('/api/protected', authMiddleware_1.authenticateJWT, (req, res) => {
    res.json({ message: "You have accessed a protected route!", user: req.user });
});
server.listen(config.port, () => {
    console.log(`Listening with port number ${config.port}`);
});
