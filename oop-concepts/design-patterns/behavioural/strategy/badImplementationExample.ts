class Order {
  private readonly weight: number;
  private readonly destinationZone: string;
  private readonly value: number;

  constructor(weight: number, destinationZone: string, value: number) {
    this.weight = weight
    this.destinationZone = destinationZone;
    this.value = value;
  }

  getTotalWeight(): number {
    return this.weight
  }

  getDestinationZone(): string {
    return this.destinationZone;
  }

  getOrderValue(): number {
    return this.value;
  }
}

class ShippingCostCalculatorNaive {
   calculateShippingCost(order: Order, strategyType: string): number {
       let cost = 0.0;

       if (strategyType.toUpperCase() === "FLAT_RATE") {
           console.log("Calculating with Flat Rate strategy.");
           cost = 10.0;

       } else if (strategyType.toUpperCase() === "WEIGHT_BASED") {
           console.log("Calculating with Weight-Based strategy.");
           cost = order.getTotalWeight() * 2.5;

       } else if (strategyType.toUpperCase() === "DISTANCE_BASED") {
           console.log("Calculating with Distance-Based strategy.");
           if (order.getDestinationZone() === "ZoneA") {
               cost = 5.0;
           } else if (order.getDestinationZone() === "ZoneB") {
               cost = 12.0;
           } else {
               cost = 20.0; // fallback
           }

       } else if (strategyType.toUpperCase() === "THIRD_PARTY_API") {
           console.log("Calculating with Third-Party API strategy.");
           // Simulated external call
           cost = 7.5 + (order.getOrderValue() * 0.02);

       } else {
           throw new Error("Unknown shipping strategy: " + strategyType);
       }

       console.log("Calculated Shipping Cost: $" + cost);
       return cost;
   }
}

class ECommerceAppV1 {
   static main(): void {
       const calculator = new ShippingCostCalculatorNaive();
       const order1 = new Order(5, 'ZoneB', 100);

       console.log("--- Order 1 ---");
       calculator.calculateShippingCost(order1, "FLAT_RATE");
       calculator.calculateShippingCost(order1, "WEIGHT_BASED");
       calculator.calculateShippingCost(order1, "DISTANCE_BASED");
       calculator.calculateShippingCost(order1, "THIRD_PARTY_API");

       // What if we want to try a new "PremiumZone" strategy?
       // We have to go modify this calculator class again...
   }
}