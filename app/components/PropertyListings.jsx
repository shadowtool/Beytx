'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { usePropertyContext } from '../context/PropertyContext';

// Sample data - replace with your API call
const allProperties = Array.from({ length: 100 }, (_, index) => ({
  id: `property-${index + 1}`,
  title: `Property ${index + 1}`,
  status: index % 2 === 0 ? "sale" : "rent",
  price: `$${Math.floor(Math.random() * 1000000 + 500000)}`,
  image: "images/house.jpg",
  location: ["hawally", "jabriya", "salmiya"][index % 3],
}));

const PropertyListings = () => {
  const { filterStatus } = usePropertyContext();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loadMoreRef = useRef(null);
  const itemsPerPage = 9;

  const loadMoreProperties = useCallback(() => {
    setLoading(true);
    const filteredProperties = filterStatus 
      ? allProperties.filter(prop => prop.status === filterStatus)
      : allProperties; // Show all properties when no filter is selected
    
    const startIndex = (page - 1) * itemsPerPage;
    const newProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage)
      .map(prop => ({
        ...prop,
        id: `${prop.id}-page-${page}` // Make IDs unique across pages
      }));
    
    setTimeout(() => {
      setProperties(prev => [...prev, ...newProperties]);
      setLoading(false);
      setPage(prev => prev + 1);
    }, 1000);
  }, [page, filterStatus]);

  useEffect(() => {
    setProperties([]);
    setPage(1);
    loadMoreProperties();
  }, [filterStatus]);

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreProperties();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [loading, loadMoreProperties]);

  return (
    <section className="container mx-auto py-10 px-4">
      <div className="flex justify-center mb-10">
        <h2 className="text-4xl font-bold text-white text-center
        bg-green-600 px-6 py-2 rounded-full
        transition-all duration-500 hover:bg-green-700">
          Property Listings
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="border rounded-lg p-4 shadow-md bg-gray-200">
            <img src={property.image} alt={property.title} className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-xl text-zinc-800 font-semibold mt-6 
            transition-colors duration-500 hover:text-green-600">{property.title}</h3>
            <p className="text-green-600 font-bold mt-2">{property.price}</p>
            <div className="mt-4">
              <p className="text-zinc-800 mt-2 text-right font-light
              transition-colors duration-500 hover:text-green-600">{property.location}</p>
              <p className="text-zinc-800 mt-2 text-right font-light">{property.status}</p>
            </div>
          </div>
        ))}
      </div>

      <div ref={loadMoreRef} className="flex flex-col items-center mt-8">
        {loading && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
            <div className="text-green-600 text-xl">Loading more properties...</div>
          </>
        )}
      </div>
    </section>
  );
};

export default PropertyListings;
