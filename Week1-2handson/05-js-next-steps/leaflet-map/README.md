# Leaflet Map Example

This example demonstrates how to create an interactive map using the 
Leaflet.js library.

## Learning Objectives

- Include external JavaScript libraries
- Work with geographic coordinates
- Create interactive map elements
- Add markers with popups
- Understand tile layers

## What is Leaflet.js?

Leaflet is a lightweight, open-source JavaScript library for interactive maps.
It's mobile-friendly and has a simple API.

**Key features:**
- Tile layers (map images from providers like OpenStreetMap)
- Markers and popups
- Shapes (polygons, circles, rectangles)
- Event handling (clicks, drags, zoom)

## How It Works

### 1. Include Leaflet CSS and JS
```html
<!-- In the <head> -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

<!-- Before your script -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
```

### 2. Create a Container
```html
<div id="map" style="height: 400px;"></div>
```

### 3. Initialize the Map
```javascript
function initMap() {
    // Create map centered on Chicago
    const map = L.map('map').setView([41.8781, -87.6298], 13);
    
    // Add tile layer (map images)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add a marker
    L.marker([41.8781, -87.6298])
        .addTo(map)
        .bindPopup('Chicago!')
        .openPopup();
}
```

### 4. Call on Page Load
```html
<body onload="initMap()">
```

## Coordinates

Geographic coordinates are written as `[latitude, longitude]`:
- Latitude: North/South (-90 to 90)
- Longitude: East/West (-180 to 180)

Common locations:
- Chicago: [41.8781, -87.6298]
- New York: [40.7128, -74.0060]
- Los Angeles: [34.0522, -118.2437]
- London: [51.5074, -0.1278]

## Files

- `index.html` - HTML with map container
- `script.js` - Map initialization and markers
- `style.css` - Page and map styling

## Exercises

### Exercise 1: Change Location
Modify the coordinates to center the map on a different city.

### Exercise 2: Add Multiple Markers
Create an array of locations and loop through them to add markers.

### Exercise 3: Custom Popups
Add more information to the popup, including HTML formatting.

## Resources

- [Leaflet Official Documentation](https://leafletjs.com/)
- [Leaflet Quick Start Guide](https://leafletjs.com/examples/quick-start/)
- [OpenStreetMap](https://www.openstreetmap.org/)
