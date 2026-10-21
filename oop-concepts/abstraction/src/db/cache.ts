import { PaymentStatus } from "../enum/payment";
import { IPaymentRecord } from "../interfaces/payment";
import { Database } from "./db";

export class Cache extends Database {
  private records = new Map<string, IPaymentRecord>();

  async getPayment(idempotencyKey: string): Promise<IPaymentRecord | null> {
    return this.records.get(idempotencyKey) || null;
  }
  async savePayment(record: IPaymentRecord): Promise<void> {
    console.log(`[DB] Inserting record for key: ${record.idempotencyKey} as PENDING`);
    this.records.set(record.idempotencyKey, { ...record });
  }
  async updateStatus(idempotencyKey: string, status: PaymentStatus): Promise<void> {
    console.log(`[DB] Updating key: ${idempotencyKey} status to: ${status}`);
    const record = this.records.get(idempotencyKey);
    if (record) {
      record.status = status;
    }
  }
}