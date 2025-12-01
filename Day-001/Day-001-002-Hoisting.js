

// ===================================================================================================================//
// Day-001) Deepen Core JavaScript Understanding -> 01) Functions & Execution Mastery -> 02) Hoisting & Execution Context
// ===================================================================================================================//

// Welcome to the JavaScript Engine’s brain.

/*
    - If you understand execution context + hoisting, you unlock:
        - why variables behave weirdly
        - why functions can run before they are declared
        - how the JS engine reads your code
        - what actually happens before your code executes

    - Quick Summary:
        ----------------------------------------------------------------
        Concept                     Meaning
        ----------------------------------------------------------------
        Execution Context           The environment where JS runs code
        Creation Phase              Variables & functions allocated
        Hoisting                    Declarations appear before execution
        var                         Hoisted + undefined
        let & const                 Hoisted + in TDZ
        Function declarations       Fully hoisted
        Function expressions        Variable hoisted only, not the value
        Call Stack                  Order of function execution
        ----------------------------------------------------------------
        Mastering this makes weird JS behavior predictable, not magical.

    - Final Takeaways:
        --------------------------------------------------------------------------------------------------
        Code element            Hoisted?                Initialized?            Default
        --------------------------------------------------------------------------------------------------
        var                     yes                     yes                     undefined
        let                     yes                     no (TDZ)                X
        const                   yes                     no (TDZ)                X
        function declaration    yes                     yes                     full function
        function expression     var name hoisted        value assigned later    undefined until assignment
        --------------------------------------------------------------------------------------------------
*/

// Part 1 — Execution Context:
/*
    - Whenever JavaScript runs code, it creates an Execution Context.

    - There are 3 types:
        - Global Execution Context (GEC)
            - Created once when your script starts
        - Function Execution Context (FEC)
            - Created every time you call a function
        - Eval Execution Context
            - (rarely used, ignore it for now)

    - Each Execution Context Has 2 Phases:
        01) Creation Phase:
            - JavaScript scans your code before execution:
                - reserves memory for variables & functions
                - sets up the scope chain
                - binds (this)
        02) Execution Phase:
            - Runs line by line and assigns values

    - Call Stack: Where Execution Contexts Live:
        - Each time you call a function:
            push context -> run -> pop when done

            - Example:
                function a() { b(); }
                function b() { c(); }
                function c() { console.log("done"); }
                a();

                - Call stack:
                    Global Context
                    -> a()                  // PUSH
                    -> b()                  // PUSH
                    -> c()                  // PUSH
                    <- c done               // POP
                    <- b done               // POP
                    <- a done               // POP
                - Understanding this helps with debugging recursion, async, stack overflow, etc.
*/

// Part 2 — Hoisting:
/*
    - Hoisting is JavaScript’s default behavior of moving declarations to the top of the current scope during the creation phase.
    - Not the assignment — just the declaration.

    - What gets hoisted?
            (Declaration Type)              (Hoisted?)              (Value during creation)
              var                           Yes                     undefined
              let & const                   Yes                     uninitialized(TDZ - Temporal Dead Zone)
              Function Declaration          Yes                     Full Function
              Function Expression           Partially               Variables hoisted, Value not.

    - TDZ - Temporal Dead Zone:
        - let and const are hoisted but not initialized.
            - Using them before declaration throws: ReferenceError
            - Example:
                console.log(a);
                let a = 5; // TDZ

    - Function Hoisting:
        - Works fine — function declarations are fully hoisted.
            - Example:
                greet();
                function greet() {
                    console.log("Hello");
                }
    - Contrast with function expressions:
        - Example:
            greet(); // ❌ TypeError
            var greet = function() {
                console.log("Hi");
            };
            - Here:
                - During creation: greet = undefined
                - Execution tries to call undefined()

    - Deep Dive Execution Example:
        function test()
        {
            console.log(a);  // ?
            console.log(b);  // ?
            console.log(c);  // ?

            var a = 1;
            let b = 2;
            const c = 3;
        }

        test();

        // Outputs:
        undefined
        ReferenceError
        ReferenceError

        // Why?:
            - a exists → hoisted with undefined
            - b and c exist but in TDZ until initialized
*/

// ===================================================================================================================//
// Challenge #1:
console.log(a);
var a = 5;
console.log(a);

/* Explanation:
    var a is hoisted as:
        a = undefined
*/

/* Outputs:
    undefined
    5
*/

// ===================================================================================================================//
// Challenge #2:
console.log(b);
let b = 10;
console.log(b);

/* Explanation:
    let is hoisted, but not initialized → Temporal Dead Zone (TDZ)
    Accessing b before its declaration throws:
        - ReferenceError: Cannot access 'b' before initialization
        - The second console.log(b) is never reached.
*/

/* Outputs:
    ReferenceError: Cannot access 'b' before initialization
*/

// ===================================================================================================================//
// Challenge #3:
foo();
function foo() {
    console.log("hello");
}
foo();

/* Explanation:
    Function declarations are fully hoisted.
    This becomes:
        function foo() { console.log("hello"); }
        foo();
        foo();
*/

/* Outputs:
    hello
    hello
*/

// ===================================================================================================================//
// Challenge #4:
bar();
var bar = function() {
    console.log("world");
};
bar();

/* Explanation:
    var bar hoisted as:
        bar = undefined
    bar() before assignment → tries to call undefined
    The second bar() never executes
*/

/* Outputs:
    TypeError: bar is not a function
*/

// ===================================================================================================================//
// Challenge #5:
function test() {
    console.log(x); // ?
    console.log(y); // ?
    console.log(z); // ?

    var x = 1;
    let y = 2;
    const z = 3;
}

test();

/* Explanation:
    Inside the function's creation phase:
        x = undefined (var)
        y = uninitialized (TDZ)
        z = uninitialized (TDZ)

    Then execution begins:

    - console.log(x) → undefined
    - console.log(y) → ReferenceError (TDZ crash)
    - console.log(z) → never runs
*/

/* Outputs:
    undefined
    ReferenceError: Cannot access 'y' before initialization
*/

// ===================================================================================================================//
// Challenge #6:
function alpha() {
    console.log(msg);
    var msg = "JS";
    beta();
    function beta() {
        console.log(msg);
    }
}
alpha();

/* Explanation:
    Creation phase inside alpha:
        var msg = undefined
        beta = function beta() {...}

    Execution phase:
        - console.log(msg) → undefined (msg exists but uninitialized)
        - msg = "JS"
        - beta() runs:
            - inner function sees msg from outer scope → value is now "JS"
*/

/* Outputs:
    undefined
    JS
*/

// ===================================================================================================================//
// ===================================================================================================================//



















































