## Rule of Thumb: Inheritance vs. Composition

### Use Inheritance (`abstract class`) when:
* **Strict "IS-A" relationship:** The child is fundamentally an instance of the parent (e.g., `Stripe` *is a* `PaymentProcessor`).
* **Fixed, minimal workflow:** The operational scope is small and well-defined (e.g., just `pay()`).
* **Strict lifecycle reuse:** You want all child classes to strictly follow the parent's template/execution steps.

---

### Use Composition (`interface` + injected strategy) when:
* **Varying capabilities:** Different providers support different features (e.g., some support `refund()`, others do not).
* **Growing feature sets:** You have more than 2–3 operations and the system will expand over time.
* **Runtime flexibility:** You need to swap or mock behaviors dynamically without changing class hierarchies.