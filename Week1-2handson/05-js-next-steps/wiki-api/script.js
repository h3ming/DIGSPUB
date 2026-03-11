/**
 * Module 05: Wikipedia API Example
 * 
 * This script demonstrates:
 * - Building API URLs with parameters
 * - Using async/await with fetch()
 * - Parsing JSON responses
 * - Dynamically creating DOM elements
 * - Error handling with try/catch
 */

// ===========================================
// MAIN SEARCH FUNCTION
// ===========================================

/**
 * Main function to search Wikipedia.
 * 
 * @param {string} searchTerm - The term to search for
 */
function wikiAPI(searchTerm) {
    // Validate input
    if (!searchTerm || searchTerm.trim() === "") {
        alert("Please enter a search term.");
        return;
    }
    
    // Get the parent div where results will be displayed
    const parentDiv = document.getElementById("wiki");
    
    // Clear any previous results
    removeResults(parentDiv);
    
    // Show loading message
    parentDiv.innerHTML = "<p class='loading'>Searching...</p>";
    
    // Build the API URL
    // ----------------------------------------
    
    // Base URL and path
    const baseURL = "https://en.wikipedia.org";
    const apiPath = "/w/api.php";
    const apiURL = new URL(apiPath, baseURL);
    
    // API parameters using a Map
    // Maps are great for key-value pairs and remember insertion order
    const paramsMap = new Map();
    paramsMap
        .set("action", "query")      // Type of API action
        .set("origin", "*")          // Enable CORS for browser requests
        .set("format", "json")       // Response format
        .set("list", "search")       // Type of query (search list)
        .set("srsearch", searchTerm) // The actual search term
        .set("srlimit", "10");       // Limit results (max 500)
    
    // Convert Map to URL search parameters
    const searchParams = new URLSearchParams(paramsMap);
    
    // Add parameters to the URL
    apiURL.search = searchParams.toString();
    
    // Get the final URL string
    const url = apiURL.toString();
    
    // Log the URL for debugging
    console.log("API URL:", url);
    
    // Call the fetch function
    fetchData(url, parentDiv);
}

// ===========================================
// FETCH DATA FUNCTION
// ===========================================

/**
 * Asynchronous function to fetch data from the Wikipedia API.
 * 
 * @param {string} url - The API URL to fetch
 * @param {HTMLElement} wikiElement - The element to display results in
 */
async function fetchData(url, wikiElement) {
    try {
        // Fetch data from the API
        // await pauses execution until the Promise resolves
        const response = await fetch(url);
        
        // Check if the response was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse the JSON response
        const wikiObject = await response.json();
        
        // Log the response to the console for inspection
        console.log("Response as JSON string:");
        console.log(JSON.stringify(wikiObject, null, 2));
        
        console.log("Response as JavaScript Object:");
        console.log(wikiObject);
        
        console.log("Search results array:");
        console.log(wikiObject.query.search);
        
        // Get the search results array using dot notation
        const pages = wikiObject.query.search;
        
        // Clear the loading message
        wikiElement.innerHTML = "";
        
        // Check if we have any results
        if (pages.length === 0) {
            wikiElement.innerHTML = "<p>No results found.</p>";
            return;
        }
        
        // Display total hits
        const totalHits = wikiObject.query.searchinfo.totalhits;
        const countP = document.createElement("p");
        countP.className = "result-count";
        countP.innerText = `Found ${totalHits.toLocaleString()} results. Showing first ${pages.length}:`;
        wikiElement.appendChild(countP);
        
        // Loop through each page result
        for (const page of pages) {
            // Build the Wikipedia page URL
            // Example: https://en.wikipedia.org/?curid=26810748
            const pageURL = `https://en.wikipedia.org/?curid=${page.pageid}`;
            
            // Create an anchor element
            const newAnchor = document.createElement("a");
            newAnchor.href = pageURL;
            newAnchor.className = "wiki-link";
            newAnchor.innerText = page.title;
            newAnchor.target = "_blank";  // Open in new tab
            
            // Add the link to the page
            wikiElement.appendChild(newAnchor);
            
            // EXERCISE: Add the snippet text below each link
            // Hint: Create a <p> element with page.snippet as its innerHTML
            // Note: snippet contains HTML tags like <span class="searchmatch">
            
            /*
            const snippetP = document.createElement("p");
            snippetP.className = "wiki-snippet";
            snippetP.innerHTML = page.snippet + "...";
            wikiElement.appendChild(snippetP);
            */
        }
        
    } catch (error) {
        // Handle any errors
        console.error("Error fetching or processing data:", error);
        wikiElement.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}

// ===========================================
// HELPER FUNCTIONS
// ===========================================

/**
 * Removes all child elements from a parent element.
 * 
 * @param {HTMLElement} parentElement - The element to clear
 */
function removeResults(parentElement) {
    // Remove all children
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}

/**
 * Clears the search input and results.
 */
function clearAll() {
    // Clear input
    document.getElementById("searchTerm").value = "";
    
    // Clear results
    const wikiDiv = document.getElementById("wiki");
    removeResults(wikiDiv);
    
    // Alternative using forEach and arrow function:
    // document.querySelectorAll("input").forEach((input) => (input.value = ""));
}

// ===========================================
// ADDITIONAL EXAMPLES (for learning)
// ===========================================

/**
 * Example: Using .then() instead of async/await
 * This is the older syntax that async/await replaced.
 * Included for educational purposes.
 */
function fetchDataWithThen(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Data received:", data);
            // Process data here
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

/**
 * Example: Simple test function you can call from the console
 * Try typing: testSearch("JavaScript")
 */
function testSearch(term) {
    console.log(`Testing search for: ${term}`);
    wikiAPI(term);
}
