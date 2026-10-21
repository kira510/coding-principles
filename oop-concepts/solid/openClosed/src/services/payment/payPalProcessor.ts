import { WalletPayment, CardPayment } from "../../interfaces/payment";

export class PayPalProcessor implements WalletPayment, CardPayment {
  async payByWallet(idemptencyKey: string, amount: number, walletId: string): Promise<string> {
    console.log(`Wallet payment`)
    return Math.random().toLocaleString() + Date.now();
  }

  async payByCard(idemptencyKey: string, amount: number, cardNo: string): Promise<string> {
    console.log(`card payment`)
    return Math.random().toLocaleString() + Date.now();
  }
}