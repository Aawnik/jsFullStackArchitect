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
<!-- ======================================== -->
## 02_Core Concept: Fundamentals (DataTypes, Operators, Conditionals, Loops & Functions)
### DataTypes
- Primitive Types
  - string : Text data, '',"",``
  - number : Both integers and floating Numbers (42, 5.116)
  - boolean : Logical values, True/False
  - null : absence of any value
  - undefined : variable that has beed declared but not initialized
  - symbol
  - bigInt
- StructuralTypes
  - Object,Arrays : collection of key-value pairs
  - function, the block of code performing the particular task.
### Operators
- Arthematic : +, -, *, /, %
- Comparision : ===, !== Most prefered over ==, != as these causes **typeCoercion** (where JS automatically converts the values from one dataType to another.Ex.. '5'==5 => False).
- Logical : &&, ||, !
- Ternary operator : the shortcut of if statement
  - `condition ? valueIfTrue : valueIfFalse
### Conditionals
- controls the execution flow of the code based on the conditions.
  - if/else : standard way to execute the code block condotionally.
  - switch : efficient way to compare oneValue against multiple possible cases.
### Loop & Iteration
- Repeatedly executing the block of code.
  - Traditional Loops : for, while, do-while
  - Modern Iteration Methods
    - forEach()
    - map()
    - filter()
### Functions
- The reusable block of code.
  - FunctionDeclaration
    ```js
    function funcName(){...}  // Hoisted
    ```
  - FunctionExpression
    ```javascript
    const func = function funcname(){....}  //notHoisted
    ```
    | A function expression assigned to a var, let, or const follows the hoisting rules of that keyword. The variable is hoisted, but the function body is not, so you cannot call it before the assignment.
  - ArrowFunction
    ```javascript
        const myFunc = ()=>{...}
    ```
> NOTE : Truthiness_&_Falsiness
    > FalsyValues__ false, 0, "", null, undefined, NaN
    > TruthyValues__ [], {}
>Short-Circuiting__used by &&, || operators. Generally used for defaults, conditionalFunction execution
    > &&, stops and returns the first falsy value it finds.
    > ||, stops & returns the first truthy value if finds.
    > `const port = process.env || 3000;
    > `user.isAdmin && deletePost()`, deletePost() function will only be called if user.isAdmin is truthy. If it's falsy, the expression short-circuits, and the function is never executed.