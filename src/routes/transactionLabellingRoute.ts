import { Router } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { createTransactionController, getTransactionByIdController, labelTransactionController } from '../controllers/transactionController';

const transactionRoutes = Router();

transactionRoutes.post('/', authenticateJWT, createTransactionController);
transactionRoutes.get('/user/:userId', authenticateJWT, getTransactionByIdController);
transactionRoutes.patch('/label', authenticateJWT, labelTransactionController);

export default transactionRoutes;