import { WalletPayment, CardPayment } from "../../interfaces/payment";

export class RazorPayProcessor implements WalletPayment {
  async payByWallet(idemptencyKey: string, amount: number, walletId: string): Promise<string> {
    console.log(`Wallet payment`)
    return Math.random().toLocaleString() + Date.now();
  }
}