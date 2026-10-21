import { PaymentStatus } from "../enum/payment";

export interface IPaymentRecord {
  idempotencyKey: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
};