import { Store } from "./db/store";
import { PaymentProcessor } from "./services/payments/paymentProcessor";
import { StripeProcessor } from "./services/payments/stripeProcessor";

async function run() {
  const db = new Store()
  const stripe: PaymentProcessor = new StripeProcessor(db, '123');

  /*
  Property 'processPayment' is protected and only accessible within class 
  'StripeProcessor' and its subclasses.ts(2445)
  */
  // await stripe.processPayment(150, "USD");  
  const uniqueKey = "order_" + Math.random().toString(36).substring(2);

  const result1 = await stripe.pay(uniqueKey, 150, "USD");
  console.log("Result 1:", result1);
}

run();