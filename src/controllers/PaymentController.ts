import { Paystack, PaystackOptions }  from 'paystack-node';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY as string
const PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY as string

const options: PaystackOptions = {
  secretKey: PAYSTACK_SECRET_KEY,
  publicKey: PAYSTACK_PUBLIC_KEY,
  encryptionKey: '',
  bearerToken: ''
}

class PaymentController {
  private paystackInstance: any;

  constructor() {
    this.paystackInstance = new Paystack(options);
  }

  async initiatePayment(req: any, res: any) {
    const { creatorId, amount, paymentMethod } = req.body;
    const payment = await this.paystackInstance.transaction.initialize({
      amount,
      email: 'customer@example.com',
      metadata: {
        creatorId,
        paymentMethod,
      },
    });
    res.json({ payment });
  }

  async processPayment(req: any, res: any) {
    const { paymentReference } = req.body;
    const payment = await this.paystackInstance.transaction.verify(paymentReference);
    if (payment.status === 'success') {
      // Update payment status in database
      //...
      res.json({ message: 'Payment processed successfully' });
    } else {
      res.status(400).json({ message: 'Payment failed' });
    }
  }

  async verifyPayment(req: any, res: any) {
    const { paymentReference } = req.body;
    const payment = await this.paystackInstance.transaction.verify(paymentReference);
    if (payment.status === 'success') {
      res.json({ message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ message: 'Payment failed' });
    }
  }

  async webhookPayment(req: any, res: any) {
    const { event } = req.body;
    if (event === 'charge.success') {
      const paymentReference = req.body.data.reference;
      // Update payment status in database
      //...
      res.json({ message: 'Payment successful' });
    } else {
      res.status(400).json({ message: 'Payment failed' });
    }
  }

  async getPaymentHistory(req: any, res: any) {
    const creatorId = req.query.creatorId;
    const paymentHistory = await  (creatorId);
    res.json({ paymentHistory });
  }
  


  async getPaymentStatus(req: any, res: any) {
    const paymentReference = req.query.paymentReference;
    const payment = await this.paystackInstance.transaction.verify(paymentReference);
    res.json({ paymentStatus: payment.status });
  }
}

export default PaymentController;