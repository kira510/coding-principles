# Architectural Trade-offs: Abstraction & Interfaces

---

## ⚠️ Disadvantages of Abstraction

1. **Over-Engineering & Unnecessary Indirection:**
   * Adding abstraction layers too early adds boilerplate.
   * Developers must jump through multiple interfaces and abstract wrappers just to find where the actual code executes.

2. **Harder Debugging & Traceability:**
   * Stack traces become cluttered with intermediate abstraction layers.
   * Diagnosing runtime bugs requires tracing through layers of indirection rather than inspecting a direct call.

3. **Leaky Abstractions:**
   * Abstractions rarely hide 100% of the underlying reality.
   * Network latencies, database connection drops, and hardware limits inevitably bleed through, forcing callers to handle low-level issues anyway.

4. **Performance Overhead:**
   * Extra memory allocations and indirect function lookups introduce small computational overheads (critical in high-frequency/low-latency systems).

---

## ⚠️ Disadvantages of Interfaces (The "Public Bypass" Problem)

1. **Lack of `protected` Visibility (Everything is Public):**
   * Interfaces can only define `public` contracts; they cannot declare `protected` or `private` methods.
   * Concrete implementations are forced to expose internal execution steps publicly.

2. **Workflow & Safety Bypass Risk:**
   * Because methods must be public, outside callers can invoke low-level operations directly on an instance.
   * This allows callers to bypass critical orchestration steps like database writes, idempotency checks, rate limits, or audit logging.

3. **No Code Reuse / Implementation Sharing:**
   * Interfaces define shapes, not behavior.
   * Common logic cannot be shared inside an interface, leading to duplicate code across implementations unless paired with separate helper services.

4. **No State Storage:**
   * Interfaces cannot hold state or variables; they can only enforce method and property signatures.


## Summary Rule of Thumb: Interface vs. Abstract Class
### 🔌 Use `interface` when:
* Classes only share a **concept or contract** (*"We can both make a payment"*).
* The internal workings are **completely different** between implementations.
* You need **multiple capabilities** per class (e.g., `implements PaymentGateway, Refundable`).
* You want **maximum decoupling** and effortless unit testing/mocking.
---
### ⚙️ Use `abstract class` when:
* Classes share **heavy underlying machinery** (*"We all need automated retries, OAuth token refreshing, or dirty-tracking"*).
* You want to **eliminate duplicate infrastructure code** across subclasses.
* You need to **enforce a strict template/lifecycle** where internal steps must remain `protected` from outside callers.