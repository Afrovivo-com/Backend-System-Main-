import express, { Request, Response } from "express";
import { create } from './server';
import sess from "./config/sessions";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute";
import transactionRoutes from "./routes/transactionLabellingRoute";
import storeRoute from "./routes/storeRoute";
import { authenticateJWT } from './middlewares/authMiddleware';

dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const config = {
    env: 'development',
    port:port,
    hostname: 'localhost'
}

const server = create(config);
server.use(sess);
server.use(express.json()); // Ensure JSON parsing is enabled
server.use('/api/auth', authRoute);
server.use("/api", storeRoute);
server.get('/api/protected', authenticateJWT, (req: Request, res: Response) => {
    res.json({ message: "You have accessed a protected route!", user: (req as any).user });
});
server.use('/api/transactions',transactionRoutes);
server.listen(config.port, () => {
    console.log(`Listening with port number ${config.port}`);
});
