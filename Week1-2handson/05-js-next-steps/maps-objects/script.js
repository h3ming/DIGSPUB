/**
 * Module 05: JavaScript Maps and Objects
 * 
 * This script demonstrates:
 * - JavaScript Objects (key-value pairs)
 * - JavaScript Maps
 * - Different ways to access and iterate data
 * - Practical examples with library inventory
 */

// ===========================================
// SECTION 1: JAVASCRIPT OBJECTS
// ===========================================

/**
 * Demonstrates creating and accessing JavaScript Objects.
 */
function objectDemo() {
    let output = "<h4>Object Demo</h4>";
    
    // Creating an object with properties
    const mapSetting = {
        id: "mapID",
        zoomOffset: -1,
        center: [41.8781, -87.6298],
        enabled: true
    };
    
    output += "<p><strong>Object created:</strong></p>";
    output += `<pre>${JSON.stringify(mapSetting, null, 2)}</pre>`;
    
    // Accessing properties - dot notation
    output += "<p><strong>Dot notation:</strong></p>";
    output += `mapSetting.id = "${mapSetting.id}"<br>`;
    output += `mapSetting.zoomOffset = ${mapSetting.zoomOffset}<br>`;
    
    // Accessing properties - bracket notation
    output += "<p><strong>Bracket notation:</strong></p>";
    output += `mapSetting["id"] = "${mapSetting["id"]}"<br>`;
    output += `mapSetting["center"] = [${mapSetting["center"]}]<br>`;
    
    // Optional chaining (?.) for safe access
    output += "<p><strong>Optional chaining:</strong></p>";
    output += `mapSetting?.nonExistent = ${mapSetting?.nonExistent}<br>`;
    
    // Adding a new property
    mapSetting.newProperty = "I was added later!";
    output += "<p><strong>After adding property:</strong></p>";
    output += `mapSetting.newProperty = "${mapSetting.newProperty}"<br>`;
    
    document.getElementById("objectOutput").innerHTML = output;
    console.log("Object:", mapSetting);
}

/**
 * Demonstrates iterating over object properties.
 */
function objectIteration() {
    let output = "<h4>Object Iteration</h4>";
    
    const person = {
        firstName: "John",
        lastName: "Smith",
        age: 30,
        city: "Chicago"
    };
    
    // for...in loop
    output += "<p><strong>Using for...in:</strong></p>";
    for (const key in person) {
        output += `${key}: ${person[key]}<br>`;
    }
    
    // Object.entries()
    output += "<p><strong>Using Object.entries():</strong></p>";
    for (const [key, value] of Object.entries(person)) {
        output += `${key} → ${value}<br>`;
    }
    
    // Object.keys() and Object.values()
    output += "<p><strong>Object.keys():</strong> [" + Object.keys(person).join(", ") + "]</p>";
    output += "<p><strong>Object.values():</strong> [" + Object.values(person).join(", ") + "]</p>";
    
    document.getElementById("objectOutput").innerHTML = output;
}

// ===========================================
// SECTION 2: JAVASCRIPT MAPS
// ===========================================

/**
 * Demonstrates creating and using JavaScript Maps.
 */
function mapDemo() {
    let output = "<h4>Map Demo</h4>";
    
    // Creating a new Map
    const myMap = new Map();
    
    // Setting values
    myMap.set("firstName", "Miller");
    myMap.set("lastName", "Smith");
    myMap.set(1, "One");          // Numeric key
    myMap.set(true, "Boolean key"); // Boolean key
    
    output += "<p><strong>Map created with various key types:</strong></p>";
    
    // Getting values
    output += `myMap.get("firstName") = "${myMap.get("firstName")}"<br>`;
    output += `myMap.get(1) = "${myMap.get(1)}"<br>`;
    output += `myMap.get(true) = "${myMap.get(true)}"<br>`;
    
    // Map size
    output += `<p><strong>Size:</strong> myMap.size = ${myMap.size}</p>`;
    
    // Check if key exists
    output += `<p><strong>Has key:</strong> myMap.has("firstName") = ${myMap.has("firstName")}</p>`;
    output += `myMap.has("nonexistent") = ${myMap.has("nonexistent")}<br>`;
    
    // Delete a key
    myMap.delete(true);
    output += `<p><strong>After delete(true):</strong> size = ${myMap.size}</p>`;
    
    // IMPORTANT: Don't use dot notation to add to Maps!
    output += "<p><strong>⚠️ Warning:</strong> Don't use myMap.key = value<br>";
    output += "It adds to the object, not the Map entries!</p>";
    
    document.getElementById("mapOutput").innerHTML = output;
    console.log("Map:", myMap);
}

/**
 * Demonstrates iterating over Map entries.
 */
function mapIteration() {
    let output = "<h4>Map Iteration</h4>";
    
    // Create a Map with chained .set() calls
    const simpleMap = new Map();
    simpleMap.set(1, "January")
             .set(2, "February")
             .set(3, "March")
             .set(4, "April");
    
    // for...of with destructuring
    output += "<p><strong>Using for...of with destructuring:</strong></p>";
    for (const [key, value] of simpleMap) {
        output += `${key} → ${value}<br>`;
    }
    
    // forEach method
    output += "<p><strong>Using forEach:</strong></p>";
    simpleMap.forEach((value, key) => {
        output += `Key: ${key}, Value: ${value}<br>`;
    });
    
    // Convert to array
    output += "<p><strong>Spread to array:</strong></p>";
    output += `[...simpleMap] = ${JSON.stringify([...simpleMap])}</p>`;
    
    document.getElementById("mapOutput").innerHTML = output;
}

// ===========================================
// SECTION 3: LIBRARY INVENTORY EXAMPLE
// ===========================================

// Create the library inventory Map (global so we can add to it)
const libraryInventory = new Map();

// Initialize with some books
libraryInventory.set("978-0321765723", {
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    pages: 464,
    genre: "Programming",
    available: true
});

libraryInventory.set("978-0596517748", {
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    pages: 176,
    genre: "Programming",
    available: true
});

libraryInventory.set("978-0226458366", {
    title: "Book Wars",
    author: "John B. Thompson",
    pages: 511,
    genre: "Publishing",
    available: false
});

/**
 * Displays all books in the library.
 */
function showLibrary() {
    let output = "<h4>Library Inventory</h4>";
    output += `<p>Total books: ${libraryInventory.size}</p>`;
    
    output += "<table class='book-table'>";
    output += "<tr><th>ISBN</th><th>Title</th><th>Author</th><th>Pages</th><th>Available</th></tr>";
    
    // Iterate over the Map
    for (const [isbn, book] of libraryInventory) {
        const status = book.available ? "✓ Yes" : "✗ No";
        const statusClass = book.available ? "available" : "unavailable";
        
        output += `<tr>
            <td>${isbn}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td class="${statusClass}">${status}</td>
        </tr>`;
    }
    
    output += "</table>";
    
    document.getElementById("libraryOutput").innerHTML = output;
}

/**
 * Search for a book by ISBN.
 */
function searchBook() {
    const isbn = prompt("Enter ISBN to search (e.g., 978-0321765723):");
    
    if (!isbn) return;
    
    let output = "<h4>Search Results</h4>";
    
    if (libraryInventory.has(isbn)) {
        const book = libraryInventory.get(isbn);
        output += `<p><strong>Found!</strong></p>`;
        output += `<p><strong>Title:</strong> ${book.title}</p>`;
        output += `<p><strong>Author:</strong> ${book.author}</p>`;
        output += `<p><strong>Pages:</strong> ${book.pages}</p>`;
        output += `<p><strong>Genre:</strong> ${book.genre}</p>`;
        output += `<p><strong>Available:</strong> ${book.available ? "Yes" : "No"}</p>`;
    } else {
        output += `<p>No book found with ISBN: ${isbn}</p>`;
        output += `<p>Try one of these: 978-0321765723, 978-0596517748, 978-0226458366</p>`;
    }
    
    document.getElementById("libraryOutput").innerHTML = output;
}

/**
 * Add a new book to the library.
 */
function addBook() {
    const isbn = prompt("Enter ISBN:");
    if (!isbn) return;
    
    const title = prompt("Enter title:");
    if (!title) return;
    
    const author = prompt("Enter author:");
    if (!author) return;
    
    const pages = parseInt(prompt("Enter number of pages:")) || 0;
    
    // Add to the Map
    libraryInventory.set(isbn, {
        title: title,
        author: author,
        pages: pages,
        genre: "Unknown",
        available: true
    });
    
    let output = `<h4>Book Added!</h4>`;
    output += `<p>"${title}" by ${author} has been added to the library.</p>`;
    output += `<p>Library now has ${libraryInventory.size} books.</p>`;
    
    document.getElementById("libraryOutput").innerHTML = output;
}

// ===========================================
// SECTION 4: MONTH MAP (from slides)
// ===========================================

/**
 * Simple Map example mapping numbers to month names.
 */
function monthMapDemo() {
    let output = "<h4>Month Map Demo</h4>";
    
    // Create and populate with chained .set()
    const monthMap = new Map();
    monthMap.set(1, "January")
            .set(2, "February")
            .set(3, "March")
            .set(4, "April")
            .set(5, "May")
            .set(6, "June")
            .set(7, "July")
            .set(8, "August")
            .set(9, "September")
            .set(10, "October")
            .set(11, "November")
            .set(12, "December");
    
    // Show all months
    output += "<p><strong>All months:</strong></p>";
    for (const [num, name] of monthMap) {
        output += `${num}: ${name}<br>`;
    }
    
    // Get current month
    const currentMonth = new Date().getMonth() + 1; // getMonth() is 0-indexed
    output += `<p><strong>Current month:</strong> ${monthMap.get(currentMonth)}</p>`;
    
    // Demonstrate updating
    monthMap.set(3, "New March Name");
    output += `<p><strong>After update:</strong> monthMap.get(3) = "${monthMap.get(3)}"</p>`;
    
    // Reset it
    monthMap.set(3, "March");
    
    document.getElementById("monthOutput").innerHTML = output;
    console.log("Month Map:", [...monthMap]);
}
