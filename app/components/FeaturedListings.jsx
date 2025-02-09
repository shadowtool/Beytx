

// components/FeaturedListings.js
import Image from 'next/image';

const properties = [
    { id: 'featured-1', title: "Luxury Villa", type: "Villa", status: "sale", price: "KWD 1,200,000", image: "images/villa.jpg", location: "hawally", beds: 4, baths: 3, area: "3500 sqft", agent: { name: "John Doe", logo: "images/agent1.jpg" } },
    { id: 'featured-2', title: "Modern Apartment", type: "Apartment", status: "rent", price: "KWD 800,000", image: "images/apartment.jpg", location: "jabriya", beds: 3, baths: 2, area: "2000 sqft", agent: { name: "Jane Smith", logo: "images/agent2.jpg" } },
    { id: 'featured-3', title: "Cozy House", type: "House", status: "sale", price: "KWD 500,000", image: "images/house.jpg", location: "salmiya", beds: 2, baths: 1, area: "1500 sqft", agent: { name: "Alice Johnson", logo: "images/agent2.jpg" } },
];

const FeaturedListings = () => {
    return (
      <section className="container mx-auto py-10 ">
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
            <div key={property.id} className="border rounded-lg shadow-md bg-zinc-200 relative overflow-hidden ">
              <div className={`absolute top-2 left-0 w-16 px-3 py-1 rounded-r-full text-white ${property.status === "sale" ? "bg-emerald-800 border border-zinc-400 " : "bg-red-800 border border-zinc-400 "}`}>
                {property.status === "sale" ? "Buy" : "Rent"}
              </div>
              <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
              <div className="p-4 flex">
                <div className="flex-1">
                  <p className="text-pretty text-gray-500">{property.type}</p>
                  <p className="text-emerald-600 font-bold mt-1 mb-2 text-2xl">{property.price}</p>
                  <h3 className="text-xl text-zinc-600 font-semibold transition-colors duration-500 hover:text-emerald-600">{property.title}</h3>
                  <div className="mt-2 flex flex-col items-start text-balance">
                    <p className="text-emerald-900  flex items-center mb-2 mt-1 ">
                      <svg className="w-4 h-4 mr-1" fill="green" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6c0 4.418 6 10 6 10s6-5.582 6-10a6 6 0 00-6-6zM8 8a2 2 0 114 0 2 2 0 01-4 0z" /></svg>
                      {property.location}
                    </p>
                    <div className="text-gray-500 mt-2 flex items-center space-x-2">
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
                <div className="w-1/5 flex flex-col items-center ">
                  <img src={property.agent.logo} alt={property.agent.name} className="w-14 h-14 rounded-full border border-emerald-500" />
                  <span className="text-center text-sm text-gray-700 mt-1">{property.agent.name}</span>
                </div>
              </div>
              <div className="mt-0 flex justify-between border-t border-gray-300 pt-4">
                <div className="flex space-x-1">
                  <button className="border border-emerald-600 text-gray-500 px-4 py-2 rounded-md flex items-center ml-1 bg-zinc-100">
                    <Image src="/Images/phone-icon.png" alt="Phone" width={22} height={22} className="mr-2" />
                    Call
                  </button>
                  <button className="border border-emerald-600 text-gray-500 px-4 py-2 rounded-md flex items-center bg-zinc-100">
                    <Image src="/Images/Whatsapp-off.png" alt="Whatsapp" width={24} height={24} className="mr-2" />
                    WhatsApp
                  </button>
                </div>
                <div className="flex space-x-1">
                  <button className="border border-emerald-600 text-gray-500 px-4 py-2 rounded-md flex items-center bg-zinc-100">
                    <Image src="/Images/email-icon.png" alt="email" width={24} height={24} className="mr-2" />
                    Email
                  </button>
                  <button className="border border-emerald-600 text-gray-500 px-2 py-2 rounded-md flex items-center mr-2 bg-zinc-100 ">
                    <Image src="/Images/share-icon.png" alt="Share" width={20} height={20} className="mr-2" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default FeaturedListings;
