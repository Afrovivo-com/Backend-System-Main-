declare module 'paystack-node' {
    interface PaystackOptions {
      secretKey: string;
      publicKey: string;
      encryptionKey: string;
      bearerToken: string;
    }
  
    class Paystack {
      constructor(options: PaystackOptions);
  
      verifyPayment(reference: string): Promise<any>;
  
      chargeCard(card: {
        number: string;
        expiry_month: string;
        expiry_year: string;
        cvv: string;
      }, amount: number, email: string): Promise<any>;
  
      // Add more methods as needed
    }
  
    export function initialize(options: PaystackOptions): Paystack;
  
    export function verifyPayment(reference: string): Promise<any>;
  
    export function chargeCard(card: {
      number: string;
      expiry_month: string;
      expiry_year: string;
      cvv: string;
    }, amount: number, email: string): Promise<any>;
  
    // Add more exports as needed
  }