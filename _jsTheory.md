## 01_Variable,Scope,Hoisting

### **Variables(`var`,`let`,`const`):** Named containers to store the data
- **`var`**
    - the legacy declaration, functionScoped and is hoisted with the initial value of `undefined`. 
    - NOTE:_Avoided in modern code.
- **`let`**
    - can be reassigned, blockScoped.
- **`const`**
    - cannot be reassigned, must be initialized at the time of declaration. BlockScoped
    ```javascript
        var oldSchool = "avoid me"; // function-scoped
        let score = 10; // block-scoped, can be reassigned
        score = 20;     // valid
        const playerName = "Alice"; // block-scoped, cannotbe reassigned
        // playerName = "Bob"; // would throw a TypeError
    ```
<!-- ====================== -->
### **Scope**
- The context in which variables are accessible. It determines the visibility and lifetime of variables.
  - **Global Scope:** Variables declared outside any function or block are accessible from anywhere in the code.
  - **Function Scope:** Variables declared with `var` are accessible anywhere within the function they are defined in.
  - **Block Scope:** Variables declared with `let` and `const` are only accessible within the block (`{ ... }`) they are defined in (e.g., inside an `if` statement or a `for` loop).
<!-- ============================= -->
### **Hoisting**
- default behavior of moving all `var` and `function` declarations to the top of their scopes *before* execution of the code.
- `let` and `const` are also hoisted, but they are not initialized, which creates the <b>TemporalDeadZone</b>.
- **TemporalDeadZone**, applied only to the `let` & `const`. It is the period started from declaring the variable to its actual declaration. Accessing of these variables within the TDZ results in a `ReferenceError`. This prevents the untentional use of the variable before actually initializing the variables.
    ```javascript
        {
          // Start of TDZ for 'powerLevel'
          // console.log(powerLevel); // -> ReferenceError!
          let powerLevel = 9001; // End of TDZ for 'powerLevel'
          console.log(powerLevel); // -> 9001
        }
    ```
<!-- =================================== -->
### **ScopeChain**
- When code tries to access a variable, the engine first looks in the current scope. If it's not found, it looks in the outer scope, and then the next outer scope, and so on, all the way up to the global scope. This "chain" of nested scopes is called the scope chain. If the variable isn't found anywhere in the chain, a `ReferenceError` is thrown. This is how closures are able to access variables from their parent functions.