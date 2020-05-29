function createMap(earthquakes) {

  // Create light map layer
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Lightmap": lightmap
  };

  var overlayMaps = {
    "Earthquakes": earthquakes
  };
  
  // Create map centered on Salt Lake City, UT
  var map = L.map("map", {
    center: [40.76, -111.89],
    zoom: 5,
    layers: [lightmap, earthquakes]
  });
}

function createMarkers(response) {
  var earthquakeMarkers = [];

  for (var index = 0; index < response.features.length; index++) {
    var earthquake = response.features[index];

    var geojsonMarkerOptions = {
      radius: 8,
      fillColor: "#ff7800",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
  };
  
  L.geoJSON(someGeojsonFeature, {
      pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, geojsonMarkerOptions);
      }
  }).addTo(map);

    var earthquakeMarker = L.CircleMarker([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]])
      .bindPopup("<h3>" + earthquake.properties.place + "<h3><hr/><h3>Time: " + earthquake.properties.time + "</h3>");
    
    earthquakeMarkers.push(earthquakeMarker);
  }
  createMap(L.layerGroup(earthquakeMarkers));
}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);
