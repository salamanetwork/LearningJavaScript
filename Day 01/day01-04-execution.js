
// ===================================================================================================================//
// Day 01) Deepen Core JavaScript Understanding -> 01) Functions & Execution Mastery -> 03) Execution & Call Stack:
// ===================================================================================================================//
/*
    - Execution Order & Call Stack (The runtime brain):
        - This explains:
            - Why recursion works?
            - Why stack overflow happens?
            - How nested calls resolve?
            - How JS schedules async operations?

        - JavaScript runs code synchronously, single-threaded — one line at a time, one call at a time — unless async enters the scene.
            - To manage function calls, JS uses a structure called:
                - Call Stack:
                    - Think of it like stacking plates:
                        - When a function is called → pushed on top.
                        - When it finishes → popped off

                    - The stack always executes the top-most function.

                    - Example:
                        function c() {
                          console.log("C");
                        }

                        function b() {
                          c();
                          console.log("B");
                        }

                        function a() {
                          b();
                          console.log("A");
                        }

                        a();

                        // Execution Order:
                            a()
                             b()
                              c()


                        // Call Stack Timeline:
                            Global
                            → a
                            → b
                            → c
                            ← c returns
                            ← b returns
                            ← a returns

                        // Outputs:
                            C
                            B
                            A

        - Stack Overflow:
            - Calling a function forever causes: RangeError
            - The stack never empties → memory blown.
            - Example:
                function boom() {
                  boom();
                }
                boom();

                // Outputs -> Error:
                    RangeError: Maximum call stack size exceeded

        - Execution Order Misconception:
            - People think JS runs top to bottom only — not true.
                - It follows the stack.

                - Example:
                    console.log("1");
                    setTimeout(() => console.log("2"), 0);
                    console.log("3");

                    // Outputs:
                        1
                        3
                        2

                    // Why?
                        - setTimeout(cb, 0) places callback into the Task Queue
                        - JS finishes the stack before checking that queue

            - The Full Picture: JavaScript runtime consists of:
                ------------------------------------------------------------
                Component           Purpose
                ------------------------------------------------------------
                Call Stack          Runs functions synchronously
                Heap                Stores objects
                Task Queue          holds async callbacks
                Microtask Queue     holds promises callbacks
                Event Loop          moves tasks to stack when it's empty
                ------------------------------------------------------------

            - Key Insight:
                - The event loop checks the stack. If empty, it pushes queued tasks.
                    - That's why async appears "magical" — it's a scheduling trick.

        - Execution Order Priority:
            - When JavaScript executes code, it processes tasks in this exact priority order:
                01) Call Stack (current execution).
                02) Microtask Queue (Promises, queueMicrotask, mutation observers).
                03) Macrotask Queue / Task Queue (setTimeout, setInterval, I/O, DOM events).

            - Simple Mental Model
                - Think of JavaScript like this:
                    01) Synchronous code first
                    02) Promises next
                    03) setTimeout last

                - More precisely:
                    - Stack → Microtasks → Macrotasks

            - Priority Breakdown:
                01) Call Stack:
                    - Runs immediately, synchronously.
                    - These run first. No exceptions.
                    - Anything like:
                        - console.log();
                        - function calls
                        - assignments
                        - operations

                - 02) Microtask Queue (HIGH PRIORITY ASYNC):
                    - Contains:
                        - Promise.then
                        - async/await
                        - queueMicrotask
                        - MutationObserver

                    - Once the call stack is empty, before anything else, the event loop checks and drains ALL microtasks.
                    - It keeps running microtasks until the queue is empty — no macrotasks yet.
                        - Promises always beat setTimeout.

                - 03) Macrotask / Task Queue (LOWER PRIORITY ASYNC):
                    - Contains:
                        - setTimeout
                        - setInterval
                        - setImmediate
                        - DOM events (click, scroll)
                        - Ajax callbacks
                        - MessageChannel
                        - File I/O timers

                    - These run only after:
                        - call stack is empty
                        - microtask queue is empty

            - Why This Matters?
                - Understanding priority prevents bugs like:
                    - UI lag due to unflushed microtasks.
                    - unexpected ordering of logs
                    - async race conditions
                    - confusion with async/await

            - Execution Priority Summary:
                ----------------------------------------------------------------------------------------------------------------------
                Priority        Component               Examples                            Notes
                ----------------------------------------------------------------------------------------------------------------------
                01) Highest     Call Stack              console.log, function calls         runs immediately
                02) High        Microtask Queue         Promise.then, await                 flushes completely before next macrotask
                03) Lower       Macrotask Queue         setTimeout, events                  runs after microtasks
                ----------------------------------------------------------------------------------------------------------------------
*/

// ===================================================================================================================//
// Execution Example With Promises:
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");

/*
 - Step-by-step execution:
    --------------------------------------------------------------------
    Step                                    Action          Output
    --------------------------------------------------------------------
    Call stack runs console.log             prints A        A
    Call stack runs console.log             prints D        D
    Call stack empty → check microtasks     prints C        C
    Now check macrotasks                    prints B        B
    --------------------------------------------------------------------

 - Outputs:
    A
    D
    C
    B

 - Why?
    - Execution order priority:
        Call stack → Microtask queue (Promises) → Task queue (setTimeout)

 - Why Does C Beat B?
    - Because: Microtasks run before macrotasks
        01) Promise .then() → microtask.
        02) setTimeout → macrotask.

    - Promise callbacks have higher execution priority.
*/

// ===================================================================================================================//
// Another Example (Mind Twister):
setTimeout(() => console.log(1), 0);
Promise.resolve().then(() => console.log(2));
console.log(3);

/*
 - Outputs:
    3   (Sync/Call Stack)
    2   (Microtask)
    1   (Macrotask)

 - Why?
    - Execution order priority:
        Call stack → Microtask queue (Promises) → Task queue (setTimeout)
 */

// ===================================================================================================================//
// More Complex Example:
console.log("Start");

setTimeout(() => console.log("Timeout"));

Promise.resolve().then(() => {
    console.log("Promise 1");
    Promise.resolve().then(() => console.log("Promise 2"));
});

console.log("End");
/*
 - Outputs:
    Start       (Sync/Call Stack)
    End         (Sync/Call Stack)
    Promise 1   (Microtask)
    Promise 2   (Microtask)
    Timeout     (Macrotask)

 - Why?
    - Microtasks can add new microtasks
    - All must finish before macrotasks start
 */

// ===================================================================================================================//
// Execution Order Challenge
console.log("A");                                                       // (Sync/Call Stack)        (01)

setTimeout(() => {                                          // (Macrotask)              (08)
    console.log("B");                                                       // (Sync/Call Stack)    (09)
}, 0);

Promise.resolve().then(() => {                                      // (Microtask)             (03)
    console.log("C");                                                        // (Sync/Call Stack)   (04)
    setTimeout(() => console.log("D"), 0);                // (Macrotask)         (12)
    Promise.resolve().then(() => console.log("E"));                     // (Microtask)         (07)
});

console.log("F");                                                       // (Sync/Call Stack)        (02)

setTimeout(() => {                                          // (Macrotask)              (10)
    console.log("G");                                                       // (Sync/Call Stack)    (11)
}, 0);

Promise.resolve().then(() => {                                     // (Microtask)              (05)
    console.log("H");                                                       // (Sync/Call Stack)    (06)
});

/*
 - Outputs:
    A
    F
    C
    H
    E
    B
    G
    D

 - Why?
    - Microtasks can add new microtasks
    - All must finish before macrotasks start

 - Execution Walk through:
    I) Synchronous code first (Call Stack):
        console.log("A");   // 1
            ...
        console.log("F");   // 2️

        - So we start with:
            A
            F

        - At the same time, we schedule:
            - setTimeout(…B…) → macrotask
            - setTimeout(…G…) → macrotask
            - two Promise.resolve().then(...) handlers → microtasks

    II) Then all Microtasks (in order queued):
        - Microtasks are:
            01) First .then(...):
                Promise.resolve().then(() => {
                    console.log("C");              // 3️
                    setTimeout(() => console.log("D"), 0); // macrotask
                    Promise.resolve().then(() => console.log("E")); // microtask
                });

                - This prints:
                    C

                - And inside it we:
                    - queue another microtask → console.log("E")
                    - queue another macrotask → setTimeout(D)

            02) Second top-level .then(...):
                Promise.resolve().then(() => {
                    console.log("H");              // 4️
                });

            - Now microtask queue is:
                - already ran: first then (C)
                - still to run: inner then (E) + H
                - But note: order of queueing is:
                - C (top-level)
                - H (top-level)
                - then inside C → E

            - So actual microtask run order:
                01) C
                02) H
                03) E

            - So after all microtasks:
                A
                F
                C
                H
                E

    III) Then Macrotasks (setTimeouts), in order queued:
        - We queued three timeouts in this order:
            01) setTimeout(B, 0);   // early
            02) setTimeout(G, 0);   // later
            03) setTimeout(D, 0);   // inside first promise

        - So they fire:
            B
            G
            D

    IV) The Final Output:
        A
        F
        C
        H
        E
        B
        G
        D


 */

// ===================================================================================================================//
// ===================================================================================================================//








