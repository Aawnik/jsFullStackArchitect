> ### Explain the difference in hoisting behavior between `var`, `let`, and `function` declarations
- behavior of moving the variable declarations to the top of their respective scopes *before* the actual code execution.
    - `function` declarations are hoisted completely—both the **name** and the **functionBody** are moved to the top, as such that we can call a function before it's physically declared in the code.
    - `var` declarations are also hoisted, but only the variable **name** is lifted up and is initialized with `undefined`.
      - Accessing a `var` before its declaration line will give you `undefined`, not an error.
    - `let` and `const` are hoisted, but they are not initialized. They exist in the **TemporalDeadZone** till is being declared, and accessing them before that line throws a `ReferenceError`.

> ### As an architect, why would you enforce a "no-var" rule using a linter on a new project?
- `"no-var"` would help us to eliminate the common JavaScript bugs related to the scope & hoisting.
    - `var` is function-scoping. which leads the variable leaking into unintended scopes, causing bugs which are hard to track.
        - For instance, a loop counter variable (`for (var i=...`) becomes available throughout the entire function.
    - By enforcing `let` and `const`, we ensure variables are confined to the block in which they are defined, which leads to more predictable, readable, and maintainable code. It's a foundational step for building a robust application.

> ### What is the output of the following code and why?
    ```javascript
        for (var i = 0; i < 3; i++) {
          setTimeout(() => {
            console.log(i);
          }, 10);
        }
    ```
  - The output will be `3`, printed three times. 
    - This is a classic closure and `var` scope problem. where the `setTimeout` callbacks are scheduled but don't run until the loop has finished. Because `i` was declared with `var`, there is only **one** `i` variable shared across the entire function scope. By the time the callbacks execute, the loop has completed, and the final value of `i` will be  `3`. 
    - Each callback refers to the same `i`, so they all print `3`. If `var` were replaced with `let`, the output would be `0, 1, 2`, because `let` creates a new `i` for each loop iteration (block-scoped).

> ### What is the purpose of the global scope, and what are the primary dangers of polluting it?
  - global scope is the outermost scope, and its variables are accessible from any other scope in the application. Its primary purpose is to host objects that are truly universal, like the `window` or `document` objects in a browser. 
    - The danger of polluting the global scope is **name collisions**. If two different parts of your application, or two different third-party libraries, define a global variable with the same name, they will overwrite each other, leading to unpredictable behavior and bugs that are extremely difficult to debug. Modern JavaScript avoids this by using modules (e.g., ES6 modules), which create their own scope and only expose what is explicitly exported.

> ### A junior dev says, "I used `const` for an **object**, but I can still change its properties. I thought it was constant." How do you explain this?
  - So, `const` creates an immutable **binding**, not an immutable **value**.means the variable identifier cannot be reassigned to point to a different object or value in memory. However, if the value it points to is an object (a structural type), the object's internal state (its properties) can still be changed.
    - The `const` protects the *reference* to the object, not the object itself.
    - ```javascript
        const user = { name: "Alice" };
        user.name = "Bob"; // This is perfectly valid.
        // user = { name: "Charlie" }; // This would throw an error.
        ```
    - then, would explain that to make an object's properties immutable, we would need to use a method like `Object.freeze()`.

> ### Can you provide a code example where **block scope is clearly advantageous** over function scope?
  - by using `if` 
    - ```javascript
        function processData(data) {
          if (data.isValid) {
            let tempResult = 'valid'; // Block-scoped
            // ... process with tempResult
          }
          // console.log(tempResult); // -> ReferenceError: tempResult is not fined
          // If we had used 'var', tempResult would be accessible here,
          // "leaking" out of the if block and potentially causing confusion.
        }
        ```
    - Here, `tempResult` is a temporary variable that is only needed inside the `if` block. Using `let` correctly restricts its scope to that block. If we had used `var`, `tempResult` would be accessible throughout the entire `processData` function, even after the `if` block, function ends. This containment is a key advantage of block scoping for writing cleaner, less error-prone code.




