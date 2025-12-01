
// ===================================================================================================================//
// Day-001) Deepen Core JavaScript Understanding -> 02) Arrays & Modern Methods -> 06) Map:
// ===================================================================================================================//
/*
    - map() - Transform Arrays Like a Pro:
        - Once you truly understand map, you unlock a functional programming mindset—this.
        - is where JavaScript starts feeling elegant.

        - Definition:
            - map() creates a new array by applying a function to each element of the original array.

        - Key Points:
            -----------------------------------------------
            | Feature                 | Value             |
            | ----------------------- | ----------------- |
            | Mutates original array? | ❌ NO              |
            | Returns new array?      | ✔ YES             |
            | Input                   | callback function |
            | Output                  | same length array |
            -----------------------------------------------

        - Basic Syntax:
            array.map((element, index, array) => {
                // return transformed value
            });

            - Parameters:
                ------------------------------
                | Name      | Meaning        |
                | --------| ---------------- |
                | element | current item     |
                | index   | item position    |
                | array   | the entire array |
                ------------------------------

                - Most of the time, you only need the first one (element).

        - Map vs forEach
            ---------------------------------------------------
            | Feature                 | `map()` | `forEach()` |
            | ----------------------- | ------- | ----------- |
            | Returns new array       | ✔       | ❌           |
            | Used for transformation | ✔       | ❌           |
            | Used for side effects   | ❌       | ✔           |
            ---------------------------------------------------



*/
// ===================================================================================================================//
// ===================================================================================================================//

// Real-World Examples:

// Convert Fahrenheit to Celsius:
const f = [32, 68, 95];
const c = f.map(temp => ((temp - 32) * 5) / 9);

console.log(c); // [0, 20, 35]

// ===================================================================================================================//
// Extract Only Names From Objects
const users = [
    { name: "Ahmed", age: 30 },
    { name: "Sara", age: 25 }
];

const names = users.map(u => u.name);
console.log(names); // ["Ahmed", "Sara"]

// ===================================================================================================================//
// Add a Property to Each Object (Immutably):
const products = [
    { name: "Laptop", price: 1000 },
    { name: "Phone", price: 500 }
];

const taxed = products.map(p => ({
    ...p,
    tax: p.price * 0.15
}));

console.log(taxed);

// ===================================================================================================================//
// Convert Strings to Uppercase
["js", "html", "css"].map(str => str.toUpperCase());
// ["JS", "HTML", "CSS"]

// ===================================================================================================================//
// Extract Years from Dates
const dates = ["2024-01-01", "2023-05-10"];
const years = dates.map(d => d.slice(0, 4));
// ["2024", "2023"]

// ===================================================================================================================//
// Predict?:
const arr = [1, 2, 3];
const result = arr.map(n => {
    if (n % 2 === 0) return n * 10;
    return n;
});

console.log(result);
// [1, 20, 3]

// ===================================================================================================================//
// ===================================================================================================================//