// ZIP code coordinates database (longitude, latitude)
export const zipCoordinates: Record<string, [number, number]> = {
  "10001": [-73.9964, 40.7509], // New York
  "90210": [-118.4004, 34.0901], // Beverly Hills
  "60601": [-87.6249, 41.8856], // Chicago
  "75001": [-96.8373, 32.9795], // Dallas
  "33101": [-80.1937, 25.7743], // Miami
  "02108": [-71.0637, 42.3590], // Boston
  "98101": [-122.3321, 47.6101], // Seattle
  "94102": [-122.4194, 37.7749], // San Francisco
  "80201": [-104.9903, 39.7392], // Denver
  "70112": [-90.0715, 29.9511], // New Orleans
  "19102": [-75.1624, 39.9526], // Philadelphia
  "20001": [-77.0162, 38.9041], // Washington DC
  "30301": [-84.3877, 33.7488], // Atlanta
  "37201": [-86.7833, 36.1622], // Nashville
  "77001": [-95.3621, 29.7604], // Houston
}

export const getZipCodeCity = (zipCode: string): string => {
  const cities: Record<string, string> = {
    "10001": "New York",
    "90210": "Beverly Hills",
    "60601": "Chicago",
    "75001": "Dallas",
    "33101": "Miami",
    "02108": "Boston",
    "98101": "Seattle",
    "94102": "San Francisco",
    "80201": "Denver",
    "70112": "New Orleans",
    "19102": "Philadelphia",
    "20001": "Washington DC",
    "30301": "Atlanta",
    "37201": "Nashville",
    "77001": "Houston",
  };
  return cities[zipCode] || "Unknown City";
}

export const getZipCodeState = (zipCode: string): string => {
  const states: Record<string, string> = {
    "10001": "NY",
    "90210": "CA",
    "60601": "IL",
    "75001": "TX",
    "33101": "FL",
    "02108": "MA",
    "98101": "WA",
    "94102": "CA",
    "80201": "CO",
    "70112": "LA",
    "19102": "PA",
    "20001": "DC",
    "30301": "GA",
    "37201": "TN",
    "77001": "TX",
  };
  return states[zipCode] || "US";
}

// Calculate distance between two ZIP codes
export const calculateDistance = (fromZip: string, toZip: string): number => {
  // If the same ZIP code, distance is 0
  if (fromZip === toZip) return 0;
  
  // If either ZIP code is missing or invalid, use a fallback distance
  if (!fromZip || !toZip || fromZip.length !== 5 || toZip.length !== 5) {
    return 500; // Default fallback distance
  }
  
  // For well-known ZIP code pairs, use pre-calculated distances (optional enhancement)
  const knownDistances: Record<string, number> = {
    // New York to Los Angeles
    "10001-90210": 2445,
    "90210-10001": 2445,
    // Chicago to Miami
    "60601-33101": 1192,
    "33101-60601": 1192,
    // San Francisco to New York
    "94102-10001": 2578,
    "10001-94102": 2578,
  };
  
  // Check if we have a pre-calculated distance for this pair
  const pairKey = `${fromZip}-${toZip}`;
  if (knownDistances[pairKey]) {
    return knownDistances[pairKey];
  }
  
  // Otherwise calculate with Haversine formula
  // Default coordinates for unknown ZIP codes (US center)
  const defaultCoord: [number, number] = [-95.7129, 37.0902];
  
  // Get coordinates
  const fromCoord = zipCoordinates[fromZip] || defaultCoord;
  const toCoord = zipCoordinates[toZip] || defaultCoord;
  
  // If both ZIP codes use the default coordinate, we need a better estimate
  if (!zipCoordinates[fromZip] && !zipCoordinates[toZip]) {
    // Calculate a more realistic distance based on ZIP code numerical difference
    // (This is not accurate but better than returning 0)
    const zipDifference = Math.abs(parseInt(fromZip) - parseInt(toZip));
    return Math.min(Math.max(Math.round(zipDifference / 20), 50), 2500);
  }
  
  // Haversine formula to calculate distance between two points on Earth
  const R = 3958.8; // Earth's radius in miles
  const dLat = (toCoord[1] - fromCoord[1]) * Math.PI / 180;
  const dLon = (toCoord[0] - fromCoord[0]) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(fromCoord[1] * Math.PI / 180) * Math.cos(toCoord[1] * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  // Return rounded distance
  return Math.round(distance);
}

// Calculate estimated moving time based on distance
export const calculateMovingTime = (distance: number): string => {
  if (distance < 50) return "Same day"
  if (distance < 300) return "1-2 days"
  if (distance < 1000) return "2-3 days"
  if (distance < 2000) return "3-5 days"
  return "5-7 days"
}
