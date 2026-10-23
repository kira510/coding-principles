# Strategy Design Pattern

The **Strategy Design Pattern** is a behavioral pattern that lets you define a family of algorithms, encapsulate each one in its own class, and make them interchangeable at runtime.

At its core, the Strategy pattern is about separating **"what varies"** from **"what stays the same."**

Instead of embedding multiple algorithms inside a single class with conditional logic, you extract each algorithm into its own strategy class. The main class (context) delegates the work to whichever strategy is currently plugged in.

## When to Use It

This pattern becomes valuable when:
- You have multiple ways to perform the same operation, and the choice might change at runtime.
- You want to avoid bloated conditional statements that select between different behaviors.
- You need to isolate algorithm-specific data and logic from the code that uses it.
- Different clients might need different algorithms for the same task.
