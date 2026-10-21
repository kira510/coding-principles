import { Database } from "../../db/db";
import { PaymentProcessor } from "./paymentProcessor";

export class RazorPayProcessor extends PaymentProcessor {
  private apiKey: string;

  constructor(db: Database, apiKey: string) {
    super(db)
    this.apiKey = apiKey;
  }

  protected async processPayment(amount: number, currency: string): Promise<boolean> {
    console.log(`[Stripe] Charging ${amount} ${currency} using API key: ${this.apiKey}...`);
    return true
  }
}