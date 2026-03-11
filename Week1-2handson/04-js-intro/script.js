/**
 * Module 04: JavaScript Introduction
 * 
 * This file demonstrates JavaScript fundamentals:
 * - Variables (let, const)
 * - Functions with parameters and return values
 * - Conditional statements (if/else, ternary)
 * - Loops (for, for...of)
 * - DOM manipulation
 * 
 * Open the browser console (F12) to see console.log outputs!
 */

// ===========================================
// SECTION 1: Hello Function
// ===========================================

/**
 * Prompts the user for their name and displays a greeting.
 * Demonstrates:
 * - prompt() for user input
 * - Conditionals
 * - DOM manipulation with getElementById
 * - Template literals with backticks
 */
function hello() {
    // prompt() displays a dialog box for user input
    let name = prompt("What is your name?");
    
    // Check if user entered a name (not empty or cancelled)
    if (name) {
        // Update the DOM - find element by ID and change its content
        document.getElementById("greeting").innerHTML = `Hello, ${name}!`;
    }
}

// ===========================================
// SECTION 2: Number Evaluation
// ===========================================

/**
 * Evaluates a 5-digit number entered by the user.
 * Uses alert() to display results.
 * 
 * Demonstrates:
 * - parseInt() for string to number conversion
 * - Multiple conditions with else if
 * - Modulo operator (%) for odd/even check
 * - Template literals for string interpolation
 */
function evalNumber() {
    // Get user input and convert to integer
    let inputValue = parseInt(prompt("Enter any five-digit number without commas"));
    
    // Validate the input
    if (inputValue > 99999 || inputValue < 10000) {
        alert(inputValue + " is not a valid 5-digit number.");
    } else if (inputValue % 2 === 0) {
        // Modulo (%) returns remainder - if 0, number is even
        alert(`${inputValue} is an even number.`);
    } else {
        alert(`${inputValue} is an odd number.`);
    }
}

/**
 * Alternative version that displays results in the page instead of alert.
 * Uses ternary operator for a more compact conditional.
 */
function evalNumber2() {
    let inputValue = parseInt(prompt("Enter a 5-digit number without commas:"));
    
    // Use logical AND (&&) and check string length
    if (inputValue && inputValue.toString().length === 5) {
        // Ternary operator: condition ? valueIfTrue : valueIfFalse
        let result = inputValue % 2 === 0 ? "even" : "odd";
        document.getElementById("result").innerHTML = `The number ${inputValue} is ${result}.`;
    } else {
        document.getElementById("result").innerHTML = "Invalid input. Please enter a 5-digit number.";
    }
}

// ===========================================
// SECTION 3: Time-Based Conditional
// ===========================================

/**
 * Displays a greeting based on the current time of day.
 * 
 * Demonstrates:
 * - Date object
 * - Multiple else-if conditions
 */
function conditional() {
    // Get the current hour (0-23)
    let currentHour = new Date().getHours();
    let message;
    
    if (currentHour < 10) {
        message = "Good morning!";
    } else if (currentHour < 18) {
        message = "Good day!";
    } else {
        message = "Good evening!";
    }
    
    document.getElementById("timeResult").innerHTML = 
        `It's currently ${currentHour}:00. ${message}`;
}

// ===========================================
// SECTION 4: Loop Demonstrations
// ===========================================

/**
 * Demonstrates a traditional for loop.
 * Output appears in the console AND on the page.
 */
function loopDemo() {
    let output = "For loop output:<br>";
    
    // Traditional for loop
    // Initialize i=0; continue while i<5; increment i after each iteration
    for (let i = 0; i < 5; i++) {
        console.log("The number is " + i);
        output += `The number is ${i}<br>`;
    }
    
    document.getElementById("loopResult").innerHTML = output;
}

/**
 * Demonstrates for...of loop with arrays.
 */
function arrayLoopDemo() {
    // Array declaration
    let presidents = ['Washington', 'Adams', 'Jefferson'];
    let output = "Presidents (for...of loop):<br>";
    
    // for...of iterates over the VALUES in an array
    for (const president of presidents) {
        console.log(president);
        output += `${president}<br>`;
    }
    
    // Using .entries() to get both index and value
    output += "<br>With index numbers:<br>";
    for (const [index, president] of presidents.entries()) {
        console.log(`President number ${index + 1} is ${president}`);
        output += `${index + 1}. ${president}<br>`;
    }
    
    document.getElementById("loopResult").innerHTML = output;
}

// ===========================================
// SECTION 5: Variables Demo (let vs const)
// ===========================================

/**
 * Demonstrates the difference between let and const.
 * Watch the console output!
 */
function variablesDemo() {
    let output = "";
    
    // let - can be reassigned
    let x = 1;
    let y = 2;
    
    // const - cannot be reassigned, but objects/arrays can be mutated
    const z = 5;
    const myArray = [1, 2, 3, 4];
    
    console.log("Initial values:");
    console.log(`x=${x}, y=${y}, z=${z}, myArray=${myArray}`);
    output += `Initial: x=${x}, y=${y}, z=${z}, myArray=[${myArray}]<br><br>`;
    
    // Inside a block (if statement creates a new scope)
    if (true) {
        let x = 2;          // Redeclare let in this scope
        y = 4;              // Reassign outer y
        
        console.log(`Inside block: x=${x}, y=${y}`);
        output += `Inside block: x=${x}, y=${y}<br>`;
        
        // z = 6;           // ERROR! Cannot reassign a const
        
        myArray.push(5);    // CAN mutate a const array
        console.log(`myArray after push: ${myArray}`);
        output += `myArray after push: [${myArray}]<br><br>`;
    }
    
    // Outside the block
    console.log("After block:");
    console.log(`x=${x}, y=${y}, z=${z}, myArray=${myArray}`);
    output += `After block: x=${x}, y=${y}, z=${z}, myArray=[${myArray}]<br>`;
    output += `<br><em>Note: x is still 1 (block had its own x), but y changed globally!</em>`;
    
    document.getElementById("varsResult").innerHTML = output;
}

// ===========================================
// SECTION 6: Scope Demonstration
// ===========================================

/**
 * Demonstrates variable scope between functions.
 */
function scopeTest() {
    let newNumber = 5;
    let quickEvalOutput = quickEval(newNumber);
    alert(`The number ${newNumber} is ${quickEvalOutput}.`);
}

/**
 * Helper function for scopeTest.
 * Returns "even" or "odd" based on the number.
 * 
 * @param {number} testNumber - The number to evaluate
 * @returns {string} "even" or "odd"
 */
function quickEval(testNumber) {
    if (testNumber && testNumber % 2 === 0) {
        return "even";
    } else {
        return "odd";
    }
}

// ===========================================
// ADDITIONAL EXAMPLES FOR THE CONSOLE
// ===========================================

/**
 * Recursive function example (from the slides).
 * Determines odd/even by subtracting 2 until reaching 0 or 1.
 * 
 * This is NOT practical for real use (very slow for large numbers),
 * but demonstrates recursion!
 */
function longOddEven(number) {
    if (number === 0) {
        return "even";
    } else if (number === 1) {
        return "odd";
    } else {
        // Recursive call with number - 2
        return longOddEven(number - 2);
    }
}

// You can test this in the console:
// console.log(longOddEven(36));  // "even"
// console.log(longOddEven(15));  // "odd"

/**
 * Ternary operator example
 */
function ternaryDemo() {
    let x = 3;
    
    // Traditional if/else
    let result1;
    if (x < 5) {
        result1 = "yes, x is less than five!";
    } else {
        result1 = "no, x is not less than five.";
    }
    
    // Same logic with ternary operator
    let result2 = x < 5 ? "yes, x is less than five!" : "no, x is not less than five.";
    
    console.log("Traditional:", result1);
    console.log("Ternary:", result2);
}
