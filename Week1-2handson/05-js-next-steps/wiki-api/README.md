# Wikipedia API Example

This example demonstrates how to search Wikipedia using their public API
and display results dynamically on the page.

## Learning Objectives

- Build API URLs with parameters
- Use async/await with fetch()
- Parse JSON responses
- Dynamically create HTML elements
- Handle errors gracefully

## How It Works

### 1. Collect User Input
```html
<input id="searchTerm" type="text" />
<button onclick="wikiAPI(...)">Search</button>
```

### 2. Build the API URL
```javascript
const baseURL = "https://en.wikipedia.org";
const apiPath = "/w/api.php";

// Parameters via Map
const paramsMap = new Map();
paramsMap.set("action", "query");
paramsMap.set("origin", "*");      // Enable CORS
paramsMap.set("format", "json");
paramsMap.set("list", "search");
paramsMap.set("srsearch", searchTerm);
```

### 3. Fetch Data
```javascript
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    // Process data...
}
```

### 4. Display Results
```javascript
for (const page of pages) {
    const link = document.createElement("a");
    link.href = `https://en.wikipedia.org/?curid=${page.pageid}`;
    link.innerText = page.title;
    parentDiv.appendChild(link);
}
```

## Wikipedia API URL Structure

```
https://en.wikipedia.org/w/api.php
    ?action=query          // What we want to do
    &origin=*              // Enable CORS for browser requests
    &format=json           // Response format
    &list=search           // Type of query
    &srsearch=Chicago      // Search term
```

Example URL:
```
https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&list=search&srsearch=Chicago
```

## JSON Response Structure

```json
{
    "query": {
        "searchinfo": { "totalhits": 177908 },
        "search": [
            {
                "ns": 0,
                "title": "Chicago",
                "pageid": 6886,
                "snippet": "<span>Chicago</span> is the most populous city..."
            },
            // ... more results
        ]
    }
}
```

## Files

- `index.html` - Search form and results container
- `script.js` - API functions and DOM manipulation
- `style.css` - Styling for search interface

## Exercises

### Exercise 1: Show More Info
Display the `snippet` text below each link (you'll need to strip HTML tags).

### Exercise 2: Limit Results
Add an input for the user to specify how many results they want.
Use the `srlimit` parameter in the API URL.

### Exercise 3: Clear Button
Add a button that clears both the input and the results.
