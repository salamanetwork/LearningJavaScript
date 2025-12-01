
// ===================================================================================================================//
// Day-001) Deepen Core JavaScript Understanding -> 01) Functions & Execution Mastery -> 01) Closures:
// ===================================================================================================================//
/*
- What Is a Closure?
    - A closure happens when a function remembers and accesses variables from its parent scope even after the parent
    function has finished executing.
    - In simple terms:
        A closure is a function + the surrounding state (variables) it captures.

- Why Closures Exist?
    - JavaScript functions carry their lexical environment with them — meaning they remember where they were created.
    - This memory allows inner functions to use variables from outer functions later on.
*/

/*
- Features:
    - Lexical scoping:	    Functions remember where they were defined.
    - Data privacy:	        Variables remain accessible but protected.
    - Persistent state:	    Data persistence, Values live beyond function execution.
    - Power tool:	        Used in modules, callbacks, event handlers, factories, and
                            architecture tools, performance optimization.
*/

/*
    (var) shares one scope — closure captures the same variable after loop ends.
    (let) creates a new lexical binding per iteration — closure captures each value separately.
*/

/*
- Senior-Level Insight:
    - Closures give you controlled state:
        - It persists
        - It’s private
        - It changes over time

    - This is the foundation for:
        - React hooks (useState)
        - Redux reducers
        - Encapsulated modules
        - Function factories
 */

/*
- Summary — The Final Pill
    - Closures capture variables, not values.
    - You control what is captured by controlling scope.
    - There are 3 ways to fix loop closure issues:
        (Method)	                        (Behavior)
        let	                ->     new binding per iteration
        IIFE	            ->     creates a new variable manually
        factory function    ->    returns functions with private state
 */

// ===================================================================================================================//
// - Example:
function outer()
{
    let count = 0; // this variable belongs to outer()

    function inner()
    {
        count++; // inner() has access to count
        console.log(count);
    }

    return inner;
}

const counter = outer();
counter(); // 1
counter(); // 2
counter(); // 3

/*
- What happened?
    - outer() finished executing
    - Normally count should be destroyed
    - But inner() remembers count through closure -> *the state persists*
*/

// ===================================================================================================================//
// Closures in Real Life: Data Privacy:
function createBankAccount() {
    let balance = 0;

    return {
        deposit(amount) {
            balance += amount;
        },
        getBalance() {
            return balance;
        }
    };
}

const bankAccount = createBankAccount();
bankAccount.deposit(100);
console.log("Bank Account Current Balance: " + bankAccount.getBalance());
bankAccount.deposit(100);
console.log("Bank Account Current Balance: " + bankAccount.getBalance());
// console.log(bankAccount.balance); // undefined (PRIVATE!)
/*
- Why is this powerful?
    - balance is protected
    - Only controlled functions can modify it
    * This is (encapsulation) without a class.
*/

// ===================================================================================================================//
// Common Interview Example:
// Using *let* Keyword
for(let i = 1; i <= 3; i++)
{
    setTimeout(() => console.log(i), 1000);
}
/* Outputs?
    1
    2
    3
*/
/*
- Why?
    Because (let) creates a new lexical binding per iteration — closure captures each value separately.
*/

// Using *var* Keyword
for(var i = 1; i <= 3; i++)
{
    setTimeout(() => console.log(i), 1000);
}
/* Outputs?
    4
    4
    4
*/
/*
- Why?
    Reason: (var) shares one scope — closure captures the same variable after loop ends.
*/

// ===================================================================================================================//
/*
* A real-world closure use case:
*   Debouncing (A Practical Closure Power Move):
*       - Problem:
*           Sometimes users trigger events too fast:
                - typing in a search box
                - resizing a window
                - scrolling
                - clicking rapidly
                * If we call a function every single time, performance suffers, APIs get spammed, and UI feels laggy.
        - Solution — Debounce Function:
            * Run a function only after the user has stopped performing an action for a certain amount of time.
    - How Closures Make Debouncing Possible?
        * We need a variable (timer) that stays in memory between calls. -> * That’s exactly what a closure gives us.
*/

// Debounce Implementation (Vanilla JS):
function debounce(func, delay)
{
    let timer; // closure variable

    return function(...args)
    {
        clearTimeout(timer);
        timer = setTimeout(() =>
        {
            func.apply(this, args);
        }, delay);
    };
}
/*
- Explanation
    - debounce() returns an inner function
    - That inner function remembers timer
    - Every call resets the timer
    - Only the last call executes
*/

// Usage Example: Search Suggestions:
function fetchResults(query)
{
    console.log("Searching for:", query);
}

const debouncedSearch = debounce(fetchResults, 500);

document.getElementById("search").addEventListener("input", e =>
{
    debouncedSearch(e.target.value);
});
/*
- What happens?
    - User types: A → Ab → Abu → Abud → ...
    - Only when user stops typing for 500ms, the search runs
    - Saves bandwidth & CPU
*/
// ===================================================================================================================//

// Another Real Example: Window Resize:
window.addEventListener("resize", debounce(() =>
{
    console.log("Window resized!");
}, 300));
// Without debounce → logs hundreds of times
// With debounce → logs once after resize ends
// ===================================================================================================================//

// Throttling (Cousin of Debouncing) Implementation:
// Runs at controlled intervals, not after inactivity:
function throttle(func, delay)
{
    let lastCall = 0;

    return function(...args)
    {
        const now = Date.now();
        if(now - lastCall >= delay)
        {
            lastCall = now;
            func.apply(this, args);
        }
    };
}
/*
- Used for:
    - scroll events
    - mouse move tracking
    - game loops

*/

// ===================================================================================================================//
// Recap:
// ===================================================================================================================//
// Challenge #1 - Predict the Output:
function makeAdder(x)
{
    return function(y)
    {
        return x + y;
    };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(2));
console.log(add10(2));
console.log(makeAdder(1)(2));
/*
- Outputs:
    7
    12
    3
*/
/*
 - Why?
    - makeAdder(5) → returns a function that remembers x = 5
    - add5(2) → 5 + 2 = 7

    - makeAdder(10) → returns a function that remembers x = 10
    - add10(2) → 10 + 2 = 12

    - makeAdder(1)(2) → directly calls the returned function
    - First: makeAdder(1) → function that does 1 + y
    - Then (...)(2) → 1 + 2 = 3

    - Each call to makeAdder creates a separate closure with its own x.
*/

// ===================================================================================================================//
// Challenge #2 - Shared Closure or Not?:
function setup()
{
    let counter = 0;

    return {
        inc() { counter++; },
        get() { return counter; }
    };
}

const a = setup();
const b = setup();

a.inc();
a.inc();
b.inc();

console.log(a.get(), b.get());
/*
- Outputs:
    2 1
*/
/*
- Why?
    - Each call to setup() creates a brand new closure with its own lexical environment:
        - a → has its own counter → starts at 0
        - b → has its own counter → starts at 0
*/
/*
- Timeline:
    Operation	a.counter	b.counter
    start	        0	        0
    a.inc()	        1	        0
    a.inc()	        2	        0
    b.inc()	        2	        1
*/

/*
- Key Concept:
    - Closures are created per function invocation.
        - a and b do not share the same counter.
    - If we wanted shared state, we’d put counter outside setup().
    - Closures allow you to create instances without classes.
        - This behaves similarly to:
            class Counter {
                #value = 0;
                inc() {
                    this.#value++;
                }
                get() {
                    return this.#value;
                }
            }
        - But using closures avoids:
            - *this* binding issues.
            - prototype complexity.
            - accidental public access.
        - Closures = lightweight object instances.
*/

// ===================================================================================================================//
// Challenge #3 - The Loop Trap (Classic):
var funcs = [];

for (var i = 0; i < 3; i++) // The loop trap
{
    funcs.push(
        function() {
            console.log(i);
        }
    );
}

funcs[0]();
funcs[1]();
funcs[2]();

/*
- Outputs:
    3
    3
    3
*/
/*
- Why?
    - Because var:
        - is function-scoped, NOT block-scoped.
        - creates one shared variable i.
        - after the loop ends, i = 3.
        - all functions reference the same i through closure.
    - So every function prints the final value of i.
    - The closure remembers the variable, not its value at the time.
*/

// Fix #1 — Use let (Block Scope):
var funcs = [];

for (let i = 0; i < 3; i++)
{
    funcs.push(
        function() {
            console.log(i);
        }
    );
}

funcs[0](); // 0
funcs[1](); // 1
funcs[2](); // 2
/*
- Why does this work?
    - (let) creates a new binding for i at each iteration → each closure captures its own copy.
*/

// Fix #2 — IIFE (Old-School Classic)
var funcs = [];

for (var i = 0; i < 3; i++)
{
    funcs.push(
        (function(x)
        {
            return function() {
                console.log(x);
            };
        })(i)
    );
}

funcs[0](); // 0
funcs[1](); // 1
funcs[2](); // 2
/*
- Why does this work?
    - Each iteration:
        - passes the current value of i to an IIFE
        - that IIFE creates a new lexical scope with a separate x
        - closure captures the value, not the shared variable
    - This was the go-to fix before ES6 introduced let.
*/

/*
    - Closures capture references, not values.
    - Compare:
        Version	            ->         What is captured?
            var loop        ->	            one shared i
            let loop	    ->              new i each iteration
            IIFE trick	    ->              value copied into x
    - This is why closures are subtle — they behave differently based on how variables are scoped.
*/

// ===================================================================================================================//
// Challenge #4 - Closure + setTimeout:
for (let i = 1; i <= 3; i++)
{
    setTimeout(() => console.log(i), i * 1000);
}

/*
- Outputs:
    1
    2
    3
*/

/*
- Why does it print 1, 2, 3?
    - Key points:
        - let i is block-scoped → each loop iteration gets a new copy of i.
        - Each arrow function () => console.log(i) closes over its own i.
        - setTimeout schedules each function to run later, but the closure remembers the right i.
    - You basically get:
        - First iteration → i = 1 → closure remembers 1
        - Second → i = 2 → closure remembers 2
        - Third → i = 3 → closure remembers 3
    - Each timeout just logs its own captured value.
*/

// Now replace let with var:
for (var i = 1; i <= 3; i++)
{
    setTimeout(() => console.log(i), i * 1000);
}
/*
- Outputs:
    4
    4
    4
*/

/*
- What happens?
    - After ~1s → 4
    - After ~2s → 4
    - After ~3s → 4
*/

/*
- Why?
    - var i is function-scoped, NOT block-scoped.
    - There is one shared i for all iterations.
    - The loop finishes before the timeouts execute → final i = 4.
    - All arrow functions close over the same variable, so when they finally run, they all see i = 4.
    - Closures capture the variable, not the value at creation time.
 */

// Fixing the var version (old-school way):
for (var i = 1; i <= 3; i++)
{
    (function(x)
    {
        setTimeout(() => console.log(x), x * 1000);
    })(i);
}

/*
- Now:
    - Each IIFE gets its own x
    - Each closure captures x, not the shared i
    - Output → 1, 2, 3 again
 */

// ===================================================================================================================//
// Challenge #5 - Hidden State Mutation:
function secret()
{
    let value = 1;

    return () => value += 2;
}

const x = secret();
console.log(x());
console.log(x());
console.log(secret()());
console.log(x());
/*
- Outputs:
    3
    5
    3
    7
*/

/*
- Step-by-Step Execution:
    - Line 1: const x = secret();
        - Calls secret()
            - value is created in that closure → starts at 1
            - Returns a function that increments value by 2 each call
        - So right now:
            - x → a function with hidden state value = 1

    - Line 02: console.log(x());
        - x() does: value = value + 2
        - value was 1 → now 3

    - Line 03: console.log(x());
        - Now value was 3 → becomes 5

    - Line 04: console.log(secret()());
        - This is a new closure (not x):
            - secret() creates value = 1
            - immediately calls returned function → 1 + 2 = 3
            - But notice: that closure is thrown away.
                - Its state is not saved anywhere (Means without variable; it is just an output value).

    - Line 05: console.log(x());
        - We return to our original closure (x)
        - It still holds value = 5 → now becomes 7
*/

/*
 - Key Lessons:
    Call	        Closure instance	    value evolution
    x()	                x	                1 → 3 → 5 → 7
    secret()()	        new closure	        1 → 3 → discarded

    - Closures maintain independent memory per invocation.
*/

// ===================================================================================================================//
// Challenge #6 - The Lexical Scoping Mind-Bender:
function mystery()
{
    const secrets = [];
    for (var i = 0; i < 3; i++)
    {
        secrets[i] = (function(x)
        {
            return () => x * 2;
        })(i);
    }
    return secrets;
}

const [a, b, c] = mystery();
console.log(a(), b(), c());
/*
- Outputs:
    0 2 4
*/

/*
 - Why does it work?
    - Because of this key line: (function(x) { return () => x * 2; })(i)
        - This is an IIFE (Immediately Invoked Function Expression):
            - It receives the current value of i
            - It creates a brand new lexical scope with parameter x
            - It returns a function that closes over x, not i
        - So each iteration generates:

                (i)	    (x passed in)	(closure returns)	(result of calling)
                0	        0	            () => 0 * 2	            0
                1	        1	            () => 1 * 2	            2
                2	        2	            () => 2 * 2	            4
*/

/*
- Why did Challenge #3 fail but this one works? -> funcs.push(function() { console.log(i); });
    - Closures captured the same i reference.
*/

// ===================================================================================================================//
// ===================================================================================================================//



