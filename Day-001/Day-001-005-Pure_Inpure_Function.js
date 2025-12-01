
// ===================================================================================================================//
// Day-001) Deepen Core JavaScript Understanding -> 01) Functions & Execution Mastery -> 05) Pure vs Impure Functions:
// ===================================================================================================================//
/*
    - Side Effects in Programming:
        - A side effect is any observable change in the program or external environment when a function is executed, beyond returning a value.
        - Pure functions have no side effects, while impure functions do.

        - Side effects include:
            - modifying external variables
            - updating DOM
            - changing a global array/object
            - making a network request
            - reading/writing files
            - random numbers
            - getting the current time

        - Common Side Effects
            ---------------------------------------------------------------------------------------------------------
            Side Effect	                                        Explanation
            ---------------------------------------------------------------------------------------------------------
            Modifying global or external variables	            Changes variables outside the function’s scope
            Modifying input arguments (mutable objects)	        Example: altering an array, list, or object passed as parameter
            Writing to files or reading from files	            Any disk I/O
            Writing to a database	                            Inserting, updating, deleting records
            Network requests	                                Calling APIs, sending HTTP requests
            Printing to console / logging	                    console.log(), print()
            Changing program control flow	                    Exiting program, throwing errors
            Using random number generators	                    Makes output unpredictable
            Using system time / timers	                        Date.now(), setTimeout()
            UI updates	                                        Changing DOM in JavaScript, updating UI components
            ---------------------------------------------------------------------------------------------------------

        - Function WITH side effects:
            let count = 0;

            function increment() {
              count++;      // modifies external state
              console.log(count);  // console output
            }

        - Function WITHOUT side effects (pure function):
            function add(a, b) {
              return a + b; // no external modification
            }

        - Why Side Effects Matter:
            ---------------------------------------------------------------------------------------------------------
            Pros	                                                    Cons
            ---------------------------------------------------------------------------------------------------------
            Enable real-world interaction (UI, files, network)	        Harder to test
            Needed for persistence and communication	                Harder to reason about program behavior
            Used for app logic (DB, APIs)	                            Can introduce bugs and race conditions
            ---------------------------------------------------------------------------------------------------------

        - Best Practices:
            - Avoid unnecessary side effects.
            - Keep pure logic separate from side-effect logic.
            - Use functional style patterns like immutability and controlled state management  .

// ===================================================================================================================//

    - Pure vs Impure Functions:

        A) Pure Function:
            - A function is pure if:
                - It always returns the same output for the same input.
                - It has no side effects.

            - Example:
                function add(a, b) {
                    return a + b;
                }

                add(2, 3); // always 5

                - Why?:
                    - Same inputs → same output.
                    - Touches nothing outside.

        B) Impure Function:
            - A function is impure if it:
                - Changes something outside its scope.
                - Depends on something external.
                - Produces different results for same input.

            - Example #01:
                let counter = 0;

                function increment() {
                  counter++;
                  return counter;
                }

                - Why?:
                    - Modifies external state → side effect.
                    - Not predictable: output depends on previous calls.

            - Example #02:
                function getRandomNumber() {
                  return Math.random();
                }

                - Why?:
                    - Same input → different output → impure.

        - Why Pure Functions Matter:
            - They are the building blocks of reliable code.

            - Summary:
                --------------------------------------------------
                Benefit	            Why it matters
                --------------------------------------------------
                Predictable	        Always same result
                Testable	        No environment dependency
                Cacheable	        Can memoize results safely
                Parallelizable	    No shared state mutation
                Debuggable	        No hidden side effects
                --------------------------------------------------

        - Quick Test
            - To check if a function is pure, ask:
                - Does it depend only on its inputs?
                - Does it avoid modifying anything outside?
                    - If both yes → pure.


    - Summary
        --------------------------------------------------
        Type	                        Pure	Impure
        --------------------------------------------------
        Same input gives same output	✔	    ❌
        Mutates external state	        ❌	    ✔
        Readable/testable	            ✔	    ❌
        Side effects	                ❌	    ✔
        --------------------------------------------------


*/
// ===================================================================================================================//
// ===================================================================================================================//

// Challenge:

// This is impure because it mutates the input array.
function addToArray(arr, value) {
    arr.push(value);
    return arr;
}

// Pure version:
function addToArray(arr, value) {
    return [...arr, value];
}
/*
    - Why?:
        - Returns new array → no mutation.
        - Original array untouched.
        - Predictable and safe.
 */
















