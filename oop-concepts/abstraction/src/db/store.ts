import { PaymentStatus } from "../enum/payment";
import { IPaymentRecord } from "../interfaces/payment";
import { Database } from "./db";

export class Store extends Database {
  private pgRecords = new Map<string, IPaymentRecord>();

  async getPayment(idempotencyKey: string): Promise<IPaymentRecord | null> {
    return this.pgRecords.get(idempotencyKey) || null;
  }
  async savePayment(record: IPaymentRecord): Promise<void> {
    console.log(`[DB] Inserting record for key: ${record.idempotencyKey} as PENDING`);
    this.pgRecords.set(record.idempotencyKey, { ...record });
  }
  async updateStatus(idempotencyKey: string, status: PaymentStatus): Promise<void> {
    console.log(`[DB] Updating key: ${idempotencyKey} status to: ${status}`);
    const record = this.pgRecords.get(idempotencyKey);
    if (record) {
      record.status = status;
    }
  }
}