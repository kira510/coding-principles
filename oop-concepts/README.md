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


# Core OOP Concepts Cheat Sheet

---

### 1. Abstraction
* **Definition:** Hiding complex internal implementation details and exposing only the essential interface to the outside world.
* **Core Idea:** Focuses on **what** an object does, rather than **how** it does it.
* **Purpose:** Shields the caller from changes in the underlying system and reduces cognitive overload.

---

### 2. Encapsulation
* **Definition:** Bundling data (state) and methods (behavior) into a single unit (a class), and restricting direct outside access to internal fields using access modifiers (`private`, `protected`, `public`).
* **Core Idea:** Information hiding and data protection.
* **Purpose:** Prevents external code from corrupting internal object state and enforces business rules.

---

### 3. Inheritance
* **Definition:** A mechanism where a new class (child/subclass) derives properties and behaviors from an existing class (parent/superclass) using `extends`.
* **Core Idea:** Represents a strict **"IS-A"** relationship (e.g., a Dog *is an* Animal).
* **Purpose:** Code reuse and hierarchical specialization.

---

### 4. Composition
* **Definition:** Designing complex systems by assembling smaller, independent components together, typically by injecting them via constructors.
* **Core Idea:** Represents a **"HAS-A"** relationship (e.g., a Car *has an* Engine).
* **Purpose:** Flexible, loosely-coupled architectures that can easily swap behaviors at runtime without deep class hierarchies.

---

### 5. Abstract Class
* **Definition:** A language tool: a base class that **cannot be directly instantiated** on its own and is meant solely to be extended by subclasses.
* **Core Idea:** A partial blueprint that can provide both shared implemented code and unfilled `abstract` method contracts that children must implement.
* **Purpose:** Acts as a common foundation and enforces a required template of methods across all derived classes.

---

## Quick Summary

| Concept | Question It Answers | Key Phrase |
| :--- | :--- | :--- |
| **Abstraction** | How do I make this simple to use? | *"Hide the machinery, expose the button."* |
| **Encapsulation** | How do I protect this object's data? | *"Keep internal state private."* |
| **Inheritance** | What is this object a specialized type of? | *"IS-A relationship."* |
| **Composition** | What parts make up this object? | *"HAS-A relationship."* |
| **Abstract Class** | What tool gives a common base & rules for children? | *"Incomplete blueprint for subclasses."* |