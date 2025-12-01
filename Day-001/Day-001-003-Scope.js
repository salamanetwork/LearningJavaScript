
// ===================================================================================================================//
// Day-001) Deepen Core JavaScript Understanding -> 01) Functions & Execution Mastery -> 03) Scope & Lexical Environment:
// ===================================================================================================================//
/*
    - Scope & Lexical Environment (The heart of JavaScript’s reasoning system):
        - If closures tell us what is remembered,
            and hoisting tells us when things exist,
                scope tells us where things are visible.

        - What Is Scope?
            -Scope defines where a variable can be accessed in your code.
            - JavaScript has three major scope types:
                --------------------------------------------------------------------------------------
                Scope Type          Created By                          Visibility
                --------------------------------------------------------------------------------------
                Global Scope        outside all blocks & functions      everywhere
                Function Scope      inside a function                   only inside that function
                Block Scope         inside {} with let / const          only inside that block
                --------------------------------------------------------------------------------------

        - Function Scope (via var):
            - var ignores block boundaries — it's function-scoped.
            - Example:
                function test() {
                    if (true) {
                        var x = 5;
                    }
                    console.log(x); // 5
                }
                test();

        - Block Scope (via let / const):
            - let and const respect block boundaries.
            - Example:
                function test() {
                if (true) {
                    let x = 5;
                    const y = 10;
                }
                console.log(x); // ❌ ReferenceError
            }

        - Lexical Environment (The Real Engine):
            - Every execution context has:
                - Environment Record (variables, functions)
                - Outer Reference (pointer to the parent scope)

            - When JS looks up a variable:
                01) check current scope
                02) if not found → go to parent scope
                03) repeat until global scope
                04) if still not found → ReferenceError
                - This lookup chain is called the Scope Chain: [ Inner -> Outer -> Global ]
                    - Example:
                        let a = 1;                          // Global

                        function outer() {
                            let b = 2;                      // Outer

                            function inner() {
                                let c = 3;                  // Inner
                                console.log(a + b + c);
                            }

                            inner();
                        }

                        outer();

                        // Output: 6

        - JavaScript uses lexical (static) scoping:
            - Meaning:
                - The scope is determined by where functions are written, not where they are called.
                    - Example:
                            let num = 10;

                            function a() { console.log(num); }

                            function b() {
                                let num = 20;
                                a();
                            }

                            b(); // ?

                            // Output: 10

                            // Why?: Because a() was defined in global scope, so it uses the global num, not b's num.

            - Scope Trap Example:
                function x() {
                    let a = 1;
                    function y() {
                        console.log(a);
                    }
                    a = 100; // modifies the same variable
                    return y;
                }

                const z = x();
                z(); // ?

                // Output: 10

                // Why?: Because Closures don’t copy values — they reference variables in the lexical environment.

*/
// Challenge:
let x = 1;

function alpha() {
    let x = 10;

    function beta() {
        console.log(x);
    }

    return beta;
}

const fn = alpha();
fn();

// Output: 10
/* Why?:
    - beta() was defined inside alpha(), so its lexical environment includes alpha’s x, not the global x.
    - Even though fn() is called in the global scope, the function remembers the scope in which it was created.
    - this is lexical scoping + closure in action.
*/

// ===================================================================================================================//
// ===================================================================================================================//