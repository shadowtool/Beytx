const fs = require("fs");

// Constants
const AMENITIES = [
  "Parking",
  "Air Conditioning",
  "Swimming Pool",
  "Gym",
  "Balconies",
  "24/7 Security",
  "Elevator",
  "Garden",
  "Central Heating",
  "Maid's Room",
  "Driver's Room",
  "Playground",
  "Smart Home System",
  "Pet Friendly",
  "BBQ Area",
];

const USER_ID = { $oid: "67a8a8d5ec37a87285c9fb6b" };
const ARCHIVED = true;
const FEATURED = true;

const PROPERTY_TYPES = ["Villa", "Apartment", "Office", "Townhouse", "Land"];
const STATUS_OPTIONS = ["sale", "rent"];

const IMAGE_POOL = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb",
  "https://images.unsplash.com/photo-1521747116042-5a810fda9664",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858",
  "https://images.unsplash.com/photo-1498373419901-52eba931dc4f",
  "https://images.unsplash.com/photo-1605146769289-440113cc3d00",
  "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904",
  "https://images.unsplash.com/photo-1569152811536-fb47aced8409",
  "https://images.unsplash.com/photo-1581279813180-4dddc1008167",
  "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
];

const LOCATIONS = [
  {
    lat: "29.3375",
    lng: "48.0285",
    city: "Salmiya",
    country: "Kuwait",
    address: "Block 10, Street 5",
  },
  {
    lat: "29.3069",
    lng: "47.9861",
    city: "Hawally",
    country: "Kuwait",
    address: "Block 3, Avenue 6",
  },
  {
    lat: "29.3551",
    lng: "47.9902",
    city: "Jabriya",
    country: "Kuwait",
    address: "Street 2, House 11",
  },
  {
    lat: "29.2958",
    lng: "48.0317",
    city: "Bayan",
    country: "Kuwait",
    address: "Street 4, Block 6",
  },
  {
    lat: "29.2734",
    lng: "47.9786",
    city: "Mishref",
    country: "Kuwait",
    address: "Villa 15, Block 7",
  },
  {
    lat: "29.3626",
    lng: "47.9697",
    city: "Farwaniya",
    country: "Kuwait",
    address: "Near Roundabout, Block 9",
  },
  {
    lat: "29.2547",
    lng: "48.0488",
    city: "Egaila",
    country: "Kuwait",
    address: "Seaside Road, Plot 21",
  },
  {
    lat: "29.3115",
    lng: "47.9812",
    city: "Kuwait City",
    country: "Kuwait",
    address: "Sky Tower, Floor 8",
  },
  {
    lat: "29.3367",
    lng: "48.0045",
    city: "Shaab",
    country: "Kuwait",
    address: "Villa 20, Block 3",
  },
  {
    lat: "29.2943",
    lng: "48.0569",
    city: "Rumaithiya",
    country: "Kuwait",
    address: "Street 12, House 6",
  },
];

// Helper functions
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomImages(count = 4) {
  const shuffled = IMAGE_POOL.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomAmenities(count = 5) {
  const shuffled = AMENITIES.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateDescription(title, type, city) {
  return `<p><strong>${title}</strong></p><p>This beautiful ${type.toLowerCase()} is located in ${city} offering comfort, style, and convenience for all types of buyers or renters.</p>`;
}

// Generator
function generateProperties(count = 20) {
  const properties = [];

  for (let i = 0; i < count; i++) {
    const type = getRandomItem(PROPERTY_TYPES);
    const location = getRandomItem(LOCATIONS);
    const title = `${type.toLowerCase()} in ${location.city.toLowerCase()}`;
    const bedrooms =
      type === "Office" || type === "Land" ? 0 : getRandomInt(1, 6);
    const bathrooms = type === "Land" ? 0 : getRandomInt(1, 6);
    const size = getRandomInt(500, 2000);
    const status = getRandomItem(STATUS_OPTIONS);
    const price =
      status === "sale" ? getRandomInt(100000, 999999) : getRandomInt(100, 999);

    const property = {
      title,
      status,
      price,
      location,
      size,
      type,
      bedrooms,
      bathrooms,
      description: generateDescription(title, type, location.city),
      images: getRandomImages(),
      amenities: getRandomAmenities(),
      userId: USER_ID,
      archived: ARCHIVED,
      featured: FEATURED,
    };

    properties.push(property);
  }

  return properties;
}

// Main Execution
const properties = generateProperties(30); // Change this number as needed
fs.writeFileSync("properties.json", JSON.stringify(properties, null, 2));
console.log("✅ properties.json generated with", properties.length, "entries!");
