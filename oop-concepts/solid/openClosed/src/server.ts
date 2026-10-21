import { PaymentProcessor } from "./services/payment/paymentProcessor";
import { PayPalProcessor } from "./services/payment/payPalProcessor";
import { RazorPayProcessor } from "./services/payment/razorPayProcessor";

async function run() {
  const checkout = new PaymentProcessor();
  const paypal = new PayPalProcessor();
  const razorPay = new RazorPayProcessor();
  
  await checkout.processWalletCheckout(paypal, "user_paypal_99", 50);
  await checkout.processWalletCheckout(razorPay, "apple_wallet_abc", 75);
  await checkout.processCardCheckout(paypal, "4111222233334444", 123);
}