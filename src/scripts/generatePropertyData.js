const { LOCATIONS_DATA } = require("../lib/locationsData");
const enValues = require("../messages/en.json");
const arValues = require("../messages/ar.json");
const fs = require("fs");
const { default: mongoose } = require("mongoose");

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

const USER_ID = {
  $oid: "679d428b7bad2c2166dfe3ec",
};
const ARCHIVED = false;
const FEATURED = false;

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

const LOCATIONS = LOCATIONS_DATA;

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

function generateDescription(type, city) {
  return `<p>This beautiful ${type.toLowerCase()} is located in ${city} offering comfort, style, and convenience for all types of buyers or renters. It is also equipped with modern amenities and facilities, making it an ideal choice for a luxurious lifestyle.</p>`;
}

// Generator
function generateProperties(count = 20) {
  const properties = [];

  for (let i = 0; i < count; i++) {
    const type = getRandomItem(PROPERTY_TYPES);
    const location = getRandomItem(LOCATIONS);
    const bedrooms =
      type === "Office" || type === "Land" ? 0 : getRandomInt(1, 6);
    const bathrooms = type === "Land" ? 0 : getRandomInt(1, 6);
    const size = getRandomInt(500, 2000);
    const status = getRandomItem(STATUS_OPTIONS);
    const price =
      status === "sale" ? getRandomInt(100000, 999999) : getRandomInt(100, 999);

    const bedroomText =
      bedrooms > 0
        ? `${bedrooms} ${enValues?.createPropertyPage?.bedrooms}`
        : "";
    const title = `${bedroomText} ${
      enValues.propertyTypes[type.toLowerCase()]
    } ${enValues?.createPropertyPage?.for} ${
      enValues.createPropertyPage[status.toLowerCase()]
    } ${enValues?.createPropertyPage?.in} ${enValues.locations[location.city]}`;

    const bedroomTextArabic =
      bedrooms > 0
        ? `${bedrooms} ${arValues?.createPropertyPage?.bedrooms}`
        : "";
    const titleArabic = `${bedroomTextArabic} ${
      arValues.propertyTypes[type.toLowerCase()]
    } ${arValues?.createPropertyPage?.for} ${
      arValues.createPropertyPage[status.toLowerCase()]
    } ${arValues?.createPropertyPage?.in} ${arValues.locations[location.city]}`;

    const property = {
      title,
      titleArabic,
      status,
      price,
      location,
      size,
      type,
      bedrooms,
      bathrooms,
      description: generateDescription(type, location.city),
      images: getRandomImages(),
      amenities: getRandomAmenities(),
      userId: USER_ID,
      archived: ARCHIVED,
      featured: FEATURED,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    properties.push(property);
  }

  return properties;
}

const properties = generateProperties(10);
fs.writeFileSync("properties.json", JSON.stringify(properties, null, 2));
