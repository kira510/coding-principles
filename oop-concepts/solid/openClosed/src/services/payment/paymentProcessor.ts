import { CardPayment, WalletPayment } from "../../interfaces/payment";

export class PaymentProcessor {
  constructor() {}

  public generateIkey() {
    return Math.random().toLocaleString() + Date.now();
  }

  public async processWalletCheckout(provider: WalletPayment, walletId: string, amount: number) {
    console.log("--- Starting Wallet Checkout ---");
    const iKey = this.generateIkey()
    const walletID = '123'; //fetch from db, can take db as dependency
    const success = await provider.payByWallet(iKey, amount, walletID);
    if (success) console.log("Order completed successfully!\n");
  }
  // Accepts ANY provider that satisfies the CreditCardPayment interface
  public async processCardCheckout(provider: CardPayment, card: string, amount: number) {
    console.log("--- Starting Credit Card Checkout ---");
    const iKey = this.generateIkey()
    const success = await provider.payByCard(iKey, amount, card);
    if (success) console.log("Order completed successfully!\n");
  }
}