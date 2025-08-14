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

> ### What are the key differences between Array.prototype.forEach() and Array.prototype.map()?
  - the returnValue and its use
    - `forEach()`,  iterates over an array and executes a callback for each element, but it always returns **undefined**.
      - used for logging each item or saving it to a database
    - `map()`,  iterates over an array, applies a transformation function to each element, and returns a new array containing the transformed elements.
      - map when you need to create a new array based on the original.

> ### What is the difference between a function declaration and an arrow function concerning the this keyword?
  - A regular function declaration (function() {}) gets its own this context, which is determined by how the function is called. It can be the global object, the object that called the method, or undefined in strict mode.
  - arrow function (() => {}), however, does not have its own this. It lexically inherits this from its surrounding parent scope at the time it is defined.

> ### Q: Consider this code:
```javascript
  const user = { name: "Eve" };
  function updateUser(u) { u.name = "Frank"; }
  updateUser(user);
  console.log(user.name);
```
> What is the output and why?
  - The output is "Frank". which demonstrates that objects are passed by reference. 
  - When user is passed to the updateUser function, the parameter `u` receives a reference of the same object in memory. 
  - Thus, modifying `u.name` is directly modifying the original user object.
> ### Q: Give two distinct scenarios where you must use bracket notation to access an object property instead of dot notation.
  - When the property key is not a valid JavaScript identifier, such as when it **contains spaces or hyphens**. 
    - For example: user["first-name"].
  - When the **property key is dynamic**, meaning it's stored in a variable.
    - For example: `const key = "name"; console.log(user[key]);`. 
      - This is impossible with dot notation.

> ### Q: How would you efficiently check **if an object is empty **(has no own properties)?
  - The most robust and common way is to use `Object.keys()`. You can check if the length of the returned array is zero: `Object.keys(myObject).length === 0`. 
  - This is superior to a `for...in` loop because it's more concise and only considers the object's own enumerable properties.

> ### What does JSON.stringify() do, and why is it frequently used in development?
  - JSON.stringify() converts a JavaScript object or value into a JSON (JavaScript Object Notation) string. 
  - It's incredibly useful in development for two main reasons: 
    - 1) **Debugging**: It allows you to easily `console.log` a complex object and see its entire structure as a readable string.
    - 2) **DataTransfer**: It's essential for sending data to a web server or storing it, as data must be in a string format for HTTP requests or storage systems like localStorage.

> ### Q: You want to create a true, independent copy of an object, not just a reference. How can you achieve a "shallow copy"?
  - A **shallowCopy** can be easily achieved using the spread syntax: 
    - `const newObj = { ...oldObj };` or `Object.assign({}, oldObj)`. which creates a new object and copies all the properties from the old object into it. It's called a "shallow" copy
    - because if any of the properties are themselves objects, only the references to those nested objects are copied, not the nested objects themselves.




