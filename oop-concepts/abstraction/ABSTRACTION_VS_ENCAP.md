# Abstraction vs. Encapsulation: Working Hand-in-Hand

While often confused, **Abstraction** and **Encapsulation** are two complementary sides of the same coin:

* **Encapsulation** builds the protective capsule around the data (*"Keep internal state safe"*).
* **Abstraction** exposes a clean, simple interface to interact with that capsule (*"Keep usage simple"*).

---

## 🚗 The Real-World Analogy

* **Abstraction = The Steering Wheel & Pedals**  
  You press the gas pedal to accelerate. You do not need to understand spark timings, valve compression, or fuel injection. The messy complexity is hidden.

* **Encapsulation = The Locked Hood (Bonnet)**  
  The engine compartment is bolted shut. You are physically prevented from touching live wires, fuel lines, or belts while driving, protecting both you and the car's engine from damage.

---

## 💻 Code Example: Bank Account

Notice how both principles work together inside a single class:

```typescript
export class BankAccount {
  // ==========================================
  // 1. ENCAPSULATION (Data Protection)
  // ==========================================
  // State is private. Outside code cannot directly set: account.balance = -999999
  private balance: number = 0;

  // The capsule guards state transitions through strict validation
  public deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive.");
    }

    this.balance += amount;

    // Trigger complex internal process
    this.runComplianceAndFraudAudit(amount);
  }

  public getBalance(): number {
    return this.balance;
  }

  // ==========================================
  // 2. ABSTRACTION (Complexity Hiding)
  // ==========================================
  // The caller doesn't know (or care) how compliance audits work.
  // It is an internal detail hidden away from the public API.
  private runComplianceAndFraudAudit(amount: number): void {
    // 50+ lines of algorithmic checks, risk scores, and audit logging...
    console.log(`[Audit] Checked compliance rules for deposit of $${amount}.`);
  }
}