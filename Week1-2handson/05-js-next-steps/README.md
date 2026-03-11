# Module 05: JavaScript Next Steps

This advanced module covers APIs, async/await, Objects, Maps, and 
building interactive applications.

## Learning Objectives

- Understand JavaScript Objects and Maps
- Use fetch() with async/await for API calls
- Parse and display JSON data
- Work with the Wikipedia API
- Build an interactive map with Leaflet.js

## Module Structure

```
05-js-next-steps/
├── wiki-api/         # Wikipedia API search example
├── leaflet-map/      # Interactive map with Leaflet.js
└── maps-objects/     # JS Objects and Maps examples
```

## Key Concepts

### Async/Await and Promises

```javascript
// Asynchronous function using async/await
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
}
```

### JavaScript Objects

```javascript
const mapSetting = {
    id: "mapID",
    zoomOffset: -1,
    center: [41.8781, -87.6298]
};

// Access with dot notation
mapSetting.id;         // "mapID"
mapSetting.zoomOffset; // -1

// Access with bracket notation
mapSetting["id"];      // "mapID"
```

### JavaScript Maps

```javascript
const myMap = new Map();
myMap.set("firstName", "Miller");
myMap.set("lastName", "Smith");

myMap.get("firstName");     // "Miller"
myMap.delete("firstName");
myMap.has("lastName");      // true
```

## APIs Covered

### Wikipedia API
- Search for articles
- Retrieve article snippets
- Build dynamic search results

### Leaflet.js Map API
- Display interactive maps
- Add markers and popups
- Custom tile layers

## Exercises

### Wiki API Exercise
1. Modify the search to display more/fewer results
2. Add the article snippet below each link
3. Style the results with CSS

### Map Exercise
1. Change the map center to a different city
2. Add multiple markers
3. Customize the popup content

### Objects/Maps Exercise
1. Create a Map of book titles and authors
2. Write a function to display all entries
3. Add a search feature
