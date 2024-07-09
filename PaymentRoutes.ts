import express, { Router } from 'express';
import  PaymentController  from '../controllers/PaymentController';

const router: Router = express.Router();
const paymentController = new PaymentController();

router.post('/initiate-payment', paymentController.initiatePayment);
router.post('/process-payment', paymentController.processPayment);
router.post('/verify-payment', paymentController.verifyPayment);
router.post('/webhook-payment', paymentController.webhookPayment);
router.get('/payment-history', paymentController.getPaymentHistory);
router.get('/payment-status', paymentController.getPaymentStatus);

export default router;