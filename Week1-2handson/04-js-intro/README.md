# Module 04: JavaScript Introduction

This module introduces JavaScript fundamentals including variables, 
functions, conditionals, loops, and DOM manipulation.

## Learning Objectives

- Understand `let` vs `const` variable declarations
- Write functions with parameters and return values
- Use conditional statements (if/else, ternary operator)
- Create loops (for, for...of)
- Manipulate the DOM with JavaScript

## Variables: let vs const

```javascript
// let - can be reassigned
let x = 1;
x = 2;  // OK

// const - cannot be reassigned
const z = 5;
// z = 6;  // ERROR!

// const with objects/arrays - contents can be mutated
const myArray = [1, 2, 3];
myArray.push(4);  // OK - array contents changed, not the reference
```

## Functions

### Basic Function Syntax
```javascript
function functionName(parameters) {
    // statements
    return value;
}
```

### Example: Evaluate a Number
```javascript
function evalNumber() {
    let inputValue = parseInt(prompt("Enter a 5-digit number:"));
    
    if (inputValue > 99999 || inputValue < 10000) {
        alert(inputValue + " is not a valid 5-digit number.");
    } else if (inputValue % 2 === 0) {
        alert(`${inputValue} is an even number.`);
    } else {
        alert(`${inputValue} is an odd number.`);
    }
}
```

## Conditional Statements

### if / else if / else
```javascript
if (condition1) {
    // runs if condition1 is true
} else if (condition2) {
    // runs if condition1 is false AND condition2 is true
} else {
    // runs if all conditions are false
}
```

### Ternary Operator
A compact if/else for simple conditions:
```javascript
// condition ? valueIfTrue : valueIfFalse
let result = x < 5 ? "small" : "big";
```

## Loops

### Traditional for loop
```javascript
for (let i = 0; i < 5; i++) {
    console.log("The number is " + i);
}
```

### for...of loop (iterating arrays)
```javascript
let presidents = ['Washington', 'Adams', 'Jefferson'];
for (const president of presidents) {
    console.log(president);
}
```

## DOM Manipulation

```javascript
// Get element by ID
document.getElementById("myId")

// Get element by selector
document.querySelector("#myId")
document.querySelector(".myClass")

// Change content
element.innerHTML = "New content";
element.innerText = "Plain text";

// Change styles
element.style.color = "blue";
```

## Event Handlers

```html
<!-- Inline event handler -->
<button onclick="myFunction()">Click me</button>

<!-- In the body element for page load -->
<body onload="initFunction()">
```

## Files in This Example

- `index.html` - HTML with buttons and output areas
- `style.css` - Basic styling
- `script.js` - JavaScript functions demonstrating all concepts

## Exercises

### Exercise 1: Modify evalNumber()
Change the function to check for a 4-digit number instead of 5-digit.

### Exercise 2: Add a Time-Based Greeting
The `conditional()` function shows different greetings based on time.
Modify the hour thresholds or add more conditions.

### Exercise 3: Loop Exercise
Write a function that uses a loop to display numbers 1-10 in the output area.

## Browser Console

Press F12 and use the Console tab to:
- Run JavaScript directly
- View `console.log()` output
- Debug errors
- Inspect variables
