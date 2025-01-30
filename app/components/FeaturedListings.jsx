// components/FeaturedListings.js
const properties = [
    { id: 'featured-1', title: "Luxury Villa", status:"sale" , price: "$1,200,000", image: "images/villa.jpg", location: "hawally" },
    { id: 'featured-2', title: "Modern Apartment", status:"rent" , price: "$800,000", image: "images/apartment.jpg", location: "jabriya" },
    { id: 'featured-3', title: "Cozy House",status:"sale" , price: "$500,000", image: "images/house.jpg", location: "salmiya" },
];

const FeaturedListings = () => {
    return (
      <section className="container mx-auto py-10">
        <div className="flex justify-center mb-10">
          <h2 className="text-4xl font-bold text-white text-center
          bg-green-600 px-6 py-2 rounded-full
          transition-all duration-500 hover:bg-green-700">
            Featured Listings
          </h2>
        </div>
  
        <div className="grid grid-cols-3 gap-6 mt-6">
          {properties.map((property) => (
            <div key={property.id} className="border rounded-lg p-4 shadow-md bg-gray-200">
              <img src={property.image} alt={property.title} className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-xl text-zinc-800 font-semibold mt-6 
              transition-colors duration-500 hover:text-green-600 ">{property.title}</h3>
              <p className="text-green-600 font-bold mt-2">{property.price}</p>
              <div className="mt-4 "> 
              <p className="text-zinc-800 mt-2 text-right font-light
              transition-colors duration-500 hover:text-green-600">{property.location}</p>
            <p className="text-zinc-800 mt-2 text-right font-light">{property.status}</p>

              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default FeaturedListings;
