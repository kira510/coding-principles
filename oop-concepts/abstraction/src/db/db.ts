import { PaymentStatus } from "../enum/payment";
import { IPaymentRecord } from "../interfaces/payment";

export abstract class Database {
  abstract getPayment(idemptencyKey: string): Promise<IPaymentRecord | null>;
  abstract savePayment(record: IPaymentRecord): Promise<void>;
  abstract updateStatus(idempotencyKey: string, status: PaymentStatus): Promise<void>;
}
