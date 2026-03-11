# JavaScript Maps and Objects

This example explores JavaScript Objects and Maps - two fundamental 
data structures for storing key-value pairs.

## Learning Objectives

- Understand JavaScript Objects and their properties
- Learn the Map data structure and its advantages
- Access data using dot notation and bracket notation
- Iterate over Objects and Maps
- Choose the right data structure for your needs

## JavaScript Objects

Objects store key-value pairs called properties.

### Creating Objects
```javascript
const person = {
    firstName: "John",
    lastName: "Smith",
    age: 30
};
```

### Accessing Properties
```javascript
// Dot notation (preferred when key is known)
person.firstName;        // "John"

// Bracket notation (needed for dynamic keys or special characters)
person["firstName"];     // "John"
person["full-name"];     // For keys with hyphens
```

### Adding/Modifying Properties
```javascript
person.email = "john@example.com";  // Add new property
person.age = 31;                     // Modify existing
```

## JavaScript Maps

Maps are a newer data structure specifically designed for key-value storage.

### Creating Maps
```javascript
const myMap = new Map();
myMap.set("key", "value");
myMap.set(123, "numeric key");  // Keys can be any type!
```

### Map Methods
```javascript
myMap.get("key");        // Get a value
myMap.has("key");        // Check if key exists
myMap.delete("key");     // Remove an entry
myMap.size;              // Number of entries
myMap.clear();           // Remove all entries
```

## Object vs Map: When to Use Which?

| Feature | Object | Map |
|---------|--------|-----|
| Key types | Strings/Symbols only | Any type (objects, numbers, etc.) |
| Key order | Not guaranteed* | Insertion order preserved |
| Size | Manual count | `.size` property |
| Iteration | `for...in`, `Object.keys()` | `for...of`, `.forEach()` |
| Performance | Fast for small data | Better for frequent add/delete |
| JSON | Built-in support | Requires conversion |

*Modern JS engines preserve insertion order for string keys, but it's not guaranteed by spec.

## Iterating

### Over Objects
```javascript
// for...in loop (iterates over keys)
for (const key in person) {
    console.log(key, person[key]);
}

// Object.entries() for key-value pairs
for (const [key, value] of Object.entries(person)) {
    console.log(key, value);
}
```

### Over Maps
```javascript
// for...of loop
for (const [key, value] of myMap) {
    console.log(key, value);
}

// forEach method
myMap.forEach((value, key) => {
    console.log(key, value);
});
```

## Files

- `index.html` - Interactive demonstrations
- `script.js` - Object and Map examples
- `style.css` - Page styling

## Exercises

### Exercise 1: Library Inventory
Create a Map where keys are ISBN numbers and values are book objects
(with title, author, pages properties).

### Exercise 2: Object to Map Conversion
Write a function that converts a JavaScript object to a Map.

### Exercise 3: Map Display
Write a function that displays all Map entries as an HTML table.
