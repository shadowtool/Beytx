import React from "react";

const LinksSection = () => {
  const LOCATIONS = ["Salmiya", "Farwaniya", "Jahra", "Fahaheel", "Bayan"];
  const LINKS = [
    "Apartments for Rent in Dubai",
    "Apartments for Rent in Downtown Dubai",
    "Apartments for Rent in Dubai Marina",
    "Apartments for Rent in Jumeirah Village Circle (JVC)",
    "Apartments for Rent in Business Bay",
    "Apartments for Rent in Dubai Creek Harbour (The Lagoons)",
    "Apartments For Rent in Deira",
    "Studio Apartments For Rent in Dubai",
    "Apartments For Rent in Dubai Monthly",
    "Apartments For Rent in Dubai Silicon Oasis",
    "Apartments For Rent in Jumeirah Lake Towers (JLT)",
    "Apartments For Rent in Bur Dubai",
    "Apartments For Rent in International City",
  ];

  return (
    <div className="h-fit w-full p-4 bg-green-100 backdrop-blur-sm py-10 md:hidden">
      <h4 className="  mb-8">Explore by major locations</h4>
      <div className="w-full h-fit max-w-full overflow-x-auto hide-scrollbar flex flex-nowrap items-center gap-6">
        {LOCATIONS?.map((el) => (
          <button
            className="h-fit w-fit min-w-28 py-2.5 border border-solid rounded-md border-green-600 bg-white flex items-center justify-center text-green-600"
            key={el}
          >
            {el}
          </button>
        ))}
      </div>
      <div className="my-6 flex flex-col gap-3">
        {LINKS?.map((el) => (
          <a href="#" className="  underline text-black" key={el}>
            {el}
          </a>
        ))}
      </div>
    </div>
  );
};

export default LinksSection;
