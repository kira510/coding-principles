enum RateType {
  FLATE_RATE = 'flatRate',
  WEIGHT_BASED = 'weightBased',
  DISTACE_BASED = 'distanceBased',
  THIRD_PARTY = 'thirdParty'
}

interface ShippingStrategy {
  calculateCost(order: Order): number;
}

class FlatRateShipping implements ShippingStrategy {
   private rate: number;

   constructor(rate: number) {
       this.rate = rate;
   }

   calculateCost(order: Order): number {
       console.log("Calculating with Flat Rate strategy ($" + this.rate + ")");
       return this.rate;
   }
}

class WeightBasedShipping implements ShippingStrategy {
   private readonly ratePerKg: number;

   constructor(ratePerKg: number) {
       this.ratePerKg = ratePerKg;
   }

   calculateCost(order: Order): number {
       console.log("Calculating with Weight-Based strategy ($" + this.ratePerKg + "/kg)");
       return order.getTotalWeight() * this.ratePerKg;
   }
}

class DistanceBasedShipping implements ShippingStrategy {
   private ratePerKm: number;

   constructor(ratePerKm: number) {
       this.ratePerKm = ratePerKm;
   }

   calculateCost(order: Order): number {
       console.log("Calculating with Distance-Based strategy for zone: " + order.getDestinationZone());
       switch (order.getDestinationZone()) {
           case "ZoneA":
               return this.ratePerKm * 5.0;
           case "ZoneB":
               return this.ratePerKm * 7.0;
           default:
               return this.ratePerKm * 10.0;
       }
   }
}

class ThirdPartyApiShipping implements ShippingStrategy {
   private readonly baseFee: number;
   private readonly percentageFee: number;

   constructor(baseFee: number, percentageFee: number) {
       this.baseFee = baseFee;
       this.percentageFee = percentageFee;
   }

   calculateCost(order: Order): number {
       console.log("Calculating with Third-Party API strategy.");
       // Simulate API call
       return this.baseFee + (order.getOrderValue() * this.percentageFee);
   }
}

class ShippingCostService {
  private strategy: ShippingStrategy;

  constructor(rateType: RateType) {
    this.strategy = this.setStrategy(rateType);
  }

  setStrategy(rateType: RateType): ShippingStrategy {
    switch(rateType) {
      case RateType.FLATE_RATE:
        this.strategy = new FlatRateShipping(5);
      case RateType.DISTACE_BASED:
        this.strategy = new DistanceBasedShipping(10);
      case RateType.THIRD_PARTY:
        this.strategy = new ThirdPartyApiShipping(40, 2)
      case RateType.WEIGHT_BASED:
        this.strategy = new WeightBasedShipping(6)
      default:
        throw new Error(`Unsupported weight`)
    }
  }

  calculateShippingCost(order: Order): number {
    if (!this.strategy) {
        throw new Error("Shipping strategy not set.");
    }
    const cost = this.strategy.calculateCost(order);
    console.log("ShippingCostService: Final Calculated Shipping Cost: $" + cost +
              " (using " + this.strategy.constructor.name + ")");
    return cost;
  }
}


//-----------------------
class ECommerceAppV2 {
   static main(): void {
       const order1 = new Order(3, 'ZoneA', 100);

       // Create context with an initial strategy
       const shippingService = new ShippingCostService(RateType.FLATE_RATE);

       console.log("--- Order 1: Using Flat Rate (initial) ---");
       shippingService.calculateShippingCost(order1);

       console.log("\n--- Order 1: Changing to Weight-Based ---");
       shippingService.setStrategy(RateType.WEIGHT_BASED);
       shippingService.calculateShippingCost(order1);

       console.log("\n--- Order 1: Changing to Distance-Based ---");
       shippingService.setStrategy(RateType.DISTACE_BASED);
       shippingService.calculateShippingCost(order1);

       console.log("\n--- Order 1: Changing to Third-Party API ---");
       shippingService.setStrategy(RateType.THIRD_PARTY);
       shippingService.calculateShippingCost(order1);

       // Adding a NEW strategy is easy:
       // 1. Create a new class implementing ShippingStrategy (e.g., FreeShippingStrategy)
       // 2. Client can then instantiate and use it:
       //    const freeShipping: ShippingStrategy = new FreeShippingStrategy();
       //    shippingService.setStrategy(freeShipping);
       //    shippingService.calculateShippingCost(primeMemberOrder);
       // No modification to ShippingCostService is needed!
   }
}
