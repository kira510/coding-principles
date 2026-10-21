export interface WalletPayment {
  payByWallet(idemptencyKey: string, amount: number, walletId: string): Promise<string>;
}

export interface CardPayment {
  payByCard(idemptencyKey: string, amount: number, cardNo: string): Promise<string>;
}
