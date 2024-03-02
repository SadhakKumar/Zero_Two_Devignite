export function calculateCoordinates(initialLat, initialLon, distance) {
  // Earth radius in kilometers
  const earthRadius = 6371;

  // Convert distance to radians
  const distanceRadians = distance / earthRadius;

  // Convert initial latitude and longitude to radians
  const initialLatRadians = toRadians(initialLat);
  const initialLonRadians = toRadians(initialLon);

  // Calculate offsets in radians for north, south, east, and west directions
  const latOffset = distanceRadians;
  const lonOffset = distanceRadians / Math.cos(initialLatRadians);

  // Calculate coordinates
  const above = {
    lat: toDegrees(initialLatRadians + latOffset),
    lon: initialLon,
  };
  const below = {
    lat: toDegrees(initialLatRadians - latOffset),
    lon: initialLon,
  };
  const left = {
    lat: initialLat,
    lon: toDegrees(initialLonRadians - lonOffset),
  };
  const right = {
    lat: initialLat,
    lon: toDegrees(initialLonRadians + lonOffset),
  };
  const topLeft = {
    lat: toDegrees(initialLatRadians + latOffset),
    lon: toDegrees(initialLonRadians - lonOffset),
  };
  const topRight = {
    lat: toDegrees(initialLatRadians + latOffset),
    lon: toDegrees(initialLonRadians + lonOffset),
  };
  const bottomLeft = {
    lat: toDegrees(initialLatRadians - latOffset),
    lon: toDegrees(initialLonRadians - lonOffset),
  };
  const bottomRight = {
    lat: toDegrees(initialLatRadians - latOffset),
    lon: toDegrees(initialLonRadians + lonOffset),
  };

  // Store coordinates in an array of objects
  const coordinatesArray = [
    above,//0
    below,//1
    left,//2
    right,//3
    topLeft,//4
    topRight,//5
    bottomLeft,//6
    bottomRight,//7
  ];

  console.log(coordinatesArray);

  return coordinatesArray;
}

// Helper function to convert degrees to radians
function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

// Helper function to convert radians to degrees
function toDegrees(radians) {
  return (radians * 180) / Math.PI;
}

// Example usage
const initialLat = 19.05; // Initial latitude
const initialLon = 72.89; // Initial longitude
const distanceKm = 10; // Distance in kilometers

const result = calculateCoordinates(initialLat, initialLon, distanceKm);
console.log("Coordinates:", result);
