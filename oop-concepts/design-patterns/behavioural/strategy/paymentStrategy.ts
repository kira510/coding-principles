interface IPaymentStrategy {
  pay(amount: number): string; 
}

enum PaymentTypes {
  CREDIT = 'credit',
  UPI = 'upi',
  CRYPTO = 'crypto',
}

interface Payment {
  upi?: string,
  wallet?: string,
  creditCard?: string,
}

class UPIPayment implements IPaymentStrategy {
  private code: string;

  constructor(code: string) {
    this.code = code;
  }

  pay(amount: number): string {
    console.log(`Processing UPI payment with code: ${this.code}`);
    return 'txn_upi_1242343';
  }
}

class CreditCardPayment implements IPaymentStrategy {
  private creditCardNo: string;

  constructor(creditCardNo: string) {
    this.creditCardNo = creditCardNo;
  }

  pay(amount: number): string {
    console.log(`Processing Credit Card payment for: ${this.creditCardNo}`);
    return 'txn_cc_1242343';
  }
}

class CryptoPayment implements IPaymentStrategy {
  private walletAddress: string;

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress;
  }

  pay(amount: number): string {
    console.log(`Processing Crypto payment to wallet: ${this.walletAddress}`);
    return 'txn_crypto_1242343';
  }
}

class PaymentProcessorService {
  private strategy: IPaymentStrategy | undefined;

  constructor() {}

  setStrategy(type: PaymentTypes, payload: Payment): void {
    switch (type) {
      case PaymentTypes.CREDIT:
        this.strategy = new CreditCardPayment(payload.creditCard!);
        break;
      case PaymentTypes.UPI:
        this.strategy = new UPIPayment(payload.upi!);
        break;
      case PaymentTypes.CRYPTO:
        this.strategy = new CryptoPayment(payload.wallet!);
        break;
      default:
        throw new Error(`Invalid payment type: ${type}`);
    }
  }

  executePayment(amount: number): string {
    if (!this.strategy) {
      throw new Error("Payment strategy is not set!");
    }
    return this.strategy.pay(amount);
  }
}