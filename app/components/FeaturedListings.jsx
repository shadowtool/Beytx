// components/FeaturedListings.js
const properties = [
    { id: 'featured-1', title: "Luxury Villa", status: "sale", price: "$1,200,000", image: "images/villa.jpg", location: "hawally", beds: 4, baths: 3, area: "3500 sqft", agent: { name: "John Doe", logo: "images/agent1.jpg" } },
    { id: 'featured-2', title: "Modern Apartment", status: "rent", price: "$800,000", image: "images/apartment.jpg", location: "jabriya", beds: 3, baths: 2, area: "2000 sqft", agent: { name: "Jane Smith", logo: "images/agent2.jpg" } },
    { id: 'featured-3', title: "Cozy House", status: "sale", price: "$500,000", image: "images/house.jpg", location: "salmiya", beds: 2, baths: 1, area: "1500 sqft", agent: { name: "Alice Johnson", logo: "images/agent2.jpg" } },
];

const FeaturedListings = () => {
    return (
      <section className="container mx-auto py-10">
        <div className="flex justify-center mb-2">
          <div className="bg-emerald-500 text-white rounded-md flex w-full max-w-8xl">
            <button className="flex-1 px-6 py-2 rounded-l-md transition-all duration-500 hover:bg-emerald-600">Villas</button>
            <div className="w-px bg-white"></div>
            <button className="flex-1 px-6 py-2 transition-all duration-500 hover:bg-emerald-600">Apartments</button>
            <div className="w-px bg-white"></div>
            <button className="flex-1 px-6 py-2 rounded-r-md transition-all duration-500 hover:bg-emerald-600">Land</button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-6">
          {properties.map((property) => (
            <div key={property.id} className="border rounded-lg shadow-md bg-gray-200 relative overflow-hidden">
              <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-white ${property.status === "sale" ? "bg-emerald-600" : "bg-indigo-600"}`}>
                {property.status === "sale" ? "Buy" : "Rent"}
              </div>
              <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
              <div className="p-4 flex">
                <div className="flex-1">
                  <h3 className="text-xl text-zinc-800 font-semibold transition-colors duration-500 hover:text-emerald-600">{property.title}</h3>
                  <p className="text-emerald-600 font-bold mt-2">{property.price}</p>
                  <div className="mt-4 flex flex-col items-start">
                    <p className="text-gray-500 mt-2 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6c0 4.418 6 10 6 10s6-5.582 6-10a6 6 0 00-6-6zM8 8a2 2 0 114 0 2 2 0 01-4 0z" /></svg>
                      {property.location}
                    </p>
                    <div className="text-gray-500 mt-2 flex items-center space-x-4">
                      <p className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7a2 2 0 100-4 2 2 0 000 4zm0 2c-2.21 0-4 1.79-4 4v5h8v-5c0-2.21-1.79-4-4-4zm-6 9v-5c0-3.31 2.69-6 6-6s6 2.69 6 6v5h1v2H5v-2h1z" /></svg>
                        {property.beds} Beds
                      </p>
                      <div className="border-l border-gray-300 h-6 mx-2"></div>
                      <p className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7a2 2 0 100-4 2 2 0 000 4zm0 2c-2.21 0-4 1.79-4 4v5h8v-5c0-2.21-1.79-4-4-4zm-6 9v-5c0-3.31 2.69-6 6-6s6 2.69 6 6v5h1v2H5v-2h1z" /></svg>
                        {property.baths} Baths
                      </p>
                      <div className="border-l border-gray-300 h-6 mx-2"></div>
                      <p className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7a2 2 0 100-4 2 2 0 000 4zm0 2c-2.21 0-4 1.79-4 4v5h8v-5c0-2.21-1.79-4-4-4zm-6 9v-5c0-3.31 2.69-6 6-6s6 2.69 6 6v5h1v2H5v-2h1z" /></svg>
                        {property.area}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-1/5 flex flex-col items-center">
                  <img src={property.agent.logo} alt={property.agent.name} className="w-12 h-12 rounded-full" />
                  <span className="text-sm text-gray-700 mt-1">{property.agent.name}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-4 border-t border-gray-300 pt-4">
                <button className="border border-emerald-500 text-emerald-500 px-4 py-2 rounded-md flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27 11.36 11.36 0 004.25.81 1 1 0 011 1v3.64a1 1 0 01-1 1A19.93 19.93 0 012 4a1 1 0 011-1h3.64a1 1 0 011 1 11.36 11.36 0 00.81 4.25 1 1 0 01-.27 1.11l-2.2 2.2z" /></svg>
                  Phone
                </button>
                <button className="border border-emerald-500 text-emerald-500 px-4 py-2 rounded-md flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.91 8.19 6.84 9.5-.1-.82-.2-2.08.04-2.97.22-.82 1.42-5.23 1.42-5.23s-.36-.72-.36-1.78c0-1.67.97-2.92 2.18-2.92 1.03 0 1.53.77 1.53 1.7 0 1.03-.66 2.57-1 3.99-.28 1.18.6 2.14 1.77 2.14 2.13 0 3.77-2.25 3.77-5.5 0-2.87-2.06-4.88-5.01-4.88-3.41 0-5.41 2.55-5.41 5.18 0 1.03.4 2.14.9 2.74.1.12.12.23.09.35-.1.38-.33 1.18-.38 1.35-.06.23-.18.28-.42.17-1.56-.73-2.54-3.02-2.54-4.87 0-3.96 2.88-7.6 8.31-7.6 4.37 0 7.77 3.12 7.77 7.29 0 4.34-2.74 7.83-6.55 7.83-1.28 0-2.48-.67-2.89-1.45l-.79 3.02c-.29 1.12-1.08 2.52-1.61 3.38C9.5 21.92 10.74 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" /></svg>
                  WhatsApp
                </button>
                <button className="border border-emerald-500 text-emerald-500 px-4 py-2 rounded-md flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-2.59l.29-.29a1 1 0 00-1.42-1.42l-2.29 2.29a1 1 0 000 1.42l2.29 2.29a1 1 0 001.42-1.42L15.41 10H18a1 1 0 000-2zM6 8a1 1 0 000 2h2.59l-.29.29a1 1 0 001.42 1.42l2.29-2.29a1 1 0 000-1.42L9.71 6.29a1 1 0 00-1.42 1.42L8.59 8H6z" /></svg>
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default FeaturedListings;
