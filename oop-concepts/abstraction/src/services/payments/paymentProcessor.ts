import { Database } from "../../db/db";
import { PaymentStatus } from "../../enum/payment";
import { IPaymentRecord } from "../../interfaces/payment";

export abstract class PaymentProcessor {
  protected db: Database;

  // Dependency Injection: Injected via constructor
  constructor(db: Database) {
    this.db = db;
  }

  // Abstract method: Specific to Stripe, PayPal, etc.
  protected abstract processPayment(amount: number, currency: string): Promise<boolean>;

  // Common template method handling idempotency & DB writes
  public async pay(idempotencyKey: string, amount: number, currency: string): Promise<IPaymentRecord> {
    console.log(`\n--- Starting Payment: ${idempotencyKey} (${amount} ${currency}) ---`);

    // 1. Check if the request was already processed
    const existing = await this.db.getPayment(idempotencyKey);
    if (existing) {
      console.log(`[Idempotency] Returning already processed record for: ${idempotencyKey}`);
      return existing;
    }

    // 2. Store idempotency key first with PENDING status
    const record: IPaymentRecord = {
      idempotencyKey,
      amount,
      currency,
      status: PaymentStatus.PENDING,
    };
    await this.db.savePayment(record);

    // 3. Delegate execution to concrete payment provider
    const success = await this.processPayment(amount, currency);

    // 4. Update result with respect to idempotency key
    const finalStatus = success ? PaymentStatus.SUCCESS : PaymentStatus.FAILED;
    await this.db.updateStatus(idempotencyKey, finalStatus);
    record.status = finalStatus;

    return record;
  }
}