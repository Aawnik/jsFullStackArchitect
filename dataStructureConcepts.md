## Objects
- used to store the collection of key-value pairs.
  - key, generally the strings
  - value, any datatype including other objects or functions.
- **Syntax**: { key1: value1, "key-2": value2 }
- **Accessing Properties**:
    - **Dot Notation**: myObject.key1 (clean, preferred)
    - **Bracket Notation**: myObject["key-2"] (required for keys with special characters or dynamic keys stored in a variable)
> When you assign an object to a variable, the variable stores a reference (or a pointer) to the object's location in memory. It does not store the object itself.
    ```javascript
        const objA = { name: "Alice" };
        const objB = objA; // objB now points to the SAME object in memory
        objB.name = "Bob";
        console.log(objA.name); // -> "Bob", because objA and objB reference the same object
    ```
- **Pass-by-Value** vs. **Pass-by-Reference** (for objects):
  - Primitives are passed by value (a copy is made).
  - Objects are passed by reference (a copy of the reference is made). 
  - This means if you pass an object to a function and modify its properties inside that function, the changes will be visible outside the function.

- **Object Methods**
  - `Object.keys(obj)`: Returns an array of an object's own property keys.
  - `Object.values(obj)`: Returns an array of an object's own property values.
  - `Object.entries(obj)`: Returns an array of an object's own [key, value] pairs.
  - `obj.hasOwnProperty(key)`: Returns true if the object has the specified property as its own property (not inherited).






