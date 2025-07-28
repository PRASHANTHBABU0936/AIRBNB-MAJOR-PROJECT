mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: coordinates,
    zoom: 9
});

map.on('load', () => {
    map.resize();

    // Add marker after map loads
    new mapboxgl.Marker({ color: "red" })
        .setLngLat(coordinates)
        .addTo(map);
});


// mapboxgl.accessToken = mapToken;
// const map = new mapboxgl.Map({
//     container: 'map', // container ID
//     style: 'mapbox://styles/mapbox/streets-v11', // map style
//     center: [-74.5, 40], // starting position [lng, lat]
//     zoom: 9 // starting zoom
// });


// mapboxgl.accessToken = mapToken;
// const map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v11',
//  center: coordinates,   zoom: 9
// });

// map.on('load', () => {
//     map.resize();
// });

// const marker=new mapboxgl.Maparker()
// .setLngLat




// mapboxgl.accessToken = mapToken;

// If `coordinates` comes from EJS
// Example: <script>const coordinates = <%- JSON.stringify(listing.geometry.coordinates) %>;</script>





// const map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v11',
//     center: coordinates,  // dynamic coordinates
//     zoom: 9
// });

// map.on('load', () => {
//     map.resize();
// });

// // Add a marker
// new mapboxgl.Marker({ color: 'red' })
//   .setLngLat(coordinates)
//   .addTo(map);
