/**
 * Module 05: Leaflet Map Example
 * 
 * This script demonstrates:
 * - Initializing a Leaflet map
 * - Adding tile layers from OpenStreetMap
 * - Creating markers with popups
 * - Map navigation (flyTo)
 * - Working with coordinates
 */

// Global variable to hold the map instance
// We need this to be accessible from multiple functions
let map;

// ===========================================
// LOCATION DATA
// ===========================================

// Define some city coordinates [latitude, longitude]
const locations = {
    chicago: {
        coords: [41.8781, -87.6298],
        name: "Chicago",
        info: "The Windy City - home to deep dish pizza and great architecture!"
    },
    newYork: {
        coords: [40.7128, -74.0060],
        name: "New York City",
        info: "The Big Apple - the city that never sleeps!"
    },
    losAngeles: {
        coords: [34.0522, -118.2437],
        name: "Los Angeles",
        info: "The City of Angels - Hollywood and sunny beaches!"
    }
};

// ===========================================
// MAP INITIALIZATION
// ===========================================

/**
 * Initializes the Leaflet map.
 * Called when the page loads via onload event on the body.
 */
function initMap() {
    // Create the map instance
    // L.map('map') targets the element with id="map"
    // .setView([lat, lng], zoomLevel) sets initial view
    // Zoom level: 1 = world, 10 = city, 15 = streets
    map = L.map('map').setView(locations.chicago.coords, 12);
    
    // Add a tile layer (the actual map images)
    // OpenStreetMap is free and doesn't require an API key
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add an initial marker for Chicago
    addMarker(locations.chicago.coords, locations.chicago.name, locations.chicago.info);
    
    console.log("Map initialized successfully!");
}

// ===========================================
// MARKER FUNCTIONS
// ===========================================

/**
 * Adds a marker to the map with a popup.
 * 
 * @param {Array} coords - [latitude, longitude]
 * @param {string} title - Popup title
 * @param {string} description - Popup description
 */
function addMarker(coords, title, description) {
    // Create a marker at the specified coordinates
    const marker = L.marker(coords).addTo(map);
    
    // Create popup content with HTML
    const popupContent = `
        <div class="popup-content">
            <h3>${title}</h3>
            <p>${description}</p>
            <small>Coordinates: ${coords[0].toFixed(4)}, ${coords[1].toFixed(4)}</small>
        </div>
    `;
    
    // Bind the popup to the marker
    marker.bindPopup(popupContent);
    
    return marker;
}

/**
 * Adds a marker at a random location near the current map center.
 */
function addRandomMarker() {
    const center = map.getCenter();
    
    // Generate random offset (roughly within view)
    const latOffset = (Math.random() - 0.5) * 0.1;
    const lngOffset = (Math.random() - 0.5) * 0.1;
    
    const newCoords = [
        center.lat + latOffset,
        center.lng + lngOffset
    ];
    
    const marker = addMarker(
        newCoords, 
        "Random Marker", 
        "This marker was placed randomly!"
    );
    
    // Open the popup immediately
    marker.openPopup();
}

// ===========================================
// NAVIGATION FUNCTIONS
// ===========================================

/**
 * Smoothly flies the map to Chicago.
 */
function flyToChicago() {
    flyToLocation(locations.chicago);
}

/**
 * Smoothly flies the map to New York.
 */
function flyToNewYork() {
    flyToLocation(locations.newYork);
}

/**
 * Smoothly flies the map to Los Angeles.
 */
function flyToLA() {
    flyToLocation(locations.losAngeles);
}

/**
 * Flies to a location and adds a marker.
 * 
 * @param {Object} location - Location object with coords, name, and info
 */
function flyToLocation(location) {
    // flyTo animates smoothly to the new location
    map.flyTo(location.coords, 12, {
        duration: 2  // Animation duration in seconds
    });
    
    // Add a marker for the destination
    const marker = addMarker(location.coords, location.name, location.info);
    
    // Open the popup after a delay (to let the animation finish)
    setTimeout(() => {
        marker.openPopup();
    }, 2000);
}

// ===========================================
// ADDITIONAL EXAMPLES
// ===========================================

/**
 * Example: Add a circle to the map
 * Try calling this from the console: addCircle()
 */
function addCircle() {
    const center = map.getCenter();
    
    L.circle([center.lat, center.lng], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.3,
        radius: 1000  // Radius in meters
    }).addTo(map)
    .bindPopup("This is a circle with 1km radius");
}

/**
 * Example: Add a polygon to the map
 * Try calling this from the console: addPolygon()
 */
function addPolygon() {
    const center = map.getCenter();
    const offset = 0.01;
    
    // Create a triangle around the center
    const polygon = L.polygon([
        [center.lat + offset, center.lng],
        [center.lat - offset, center.lng - offset],
        [center.lat - offset, center.lng + offset]
    ], {
        color: 'blue',
        fillColor: '#30f',
        fillOpacity: 0.3
    }).addTo(map)
    .bindPopup("This is a polygon!");
}

/**
 * Example: Get current map bounds
 * Useful for understanding the visible area
 */
function getMapInfo() {
    const center = map.getCenter();
    const zoom = map.getZoom();
    const bounds = map.getBounds();
    
    console.log("Map Information:");
    console.log(`  Center: ${center.lat.toFixed(4)}, ${center.lng.toFixed(4)}`);
    console.log(`  Zoom level: ${zoom}`);
    console.log(`  Bounds: NE ${bounds.getNorthEast()}, SW ${bounds.getSouthWest()}`);
}
