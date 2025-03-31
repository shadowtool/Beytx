import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { DownIcon } from "@/imports/icons";

const BedsAndBathsDropdown = ({
  classes = {}, // Container, button, menu, section, heading, optionsContainer, option
  placeholder = "Beds & Baths",
  menuPlacement = "bottom",
  bedOptions = [1, 2, 3, 4, 5, 6, 7],
  bathOptions = [1, 2, 3, 4, 5, 6, 7],
  bedLabel = "Bedrooms",
  bathLabel = "Bathrooms",
}) => {
  const { register, setValue, watch } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  const beds = watch("beds");
  const baths = watch("baths");

  const handleOptionClick = (field, value) => {
    setValue(field, value);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full ${classes.dropdown || ""}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2 text-left border rounded flex items-center justify-between focus:ring-2 focus:ring-emerald-500 transition-all duration-300 ${
          beds || baths ? "bg-emerald-100 border-emerald-600" : "bg-white"
        } ${classes.button || ""}`}
      >
        <span>
          {beds || baths
            ? `${beds || "Any"} Beds, ${baths || "Any"} Baths`
            : placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <DownIcon size={20} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-10 w-64 bg-white border rounded-lg shadow-lg ${
              menuPlacement === "top" ? "bottom-[110%] mb-1" : "top-[110%] mt-1"
            } right-0 ${classes.menu || ""}`}
          >
            <div className={`p-4 ${classes.section || ""}`}>
              <h5
                className={`text-sm font-medium text-gray-700 mb-2 ${
                  classes.heading || ""
                }`}
              >
                {bedLabel}
              </h5>
              <div
                className={`flex flex-wrap gap-2 ${
                  classes.optionsContainer || ""
                }`}
              >
                {bedOptions.map((num) => (
                  <button
                    key={`bed-${num}`}
                    type="button"
                    onClick={() => handleOptionClick("beds", num)}
                    className={`px-3 py-1 text-sm border rounded-md hover:bg-emerald-100 text-gray-700
                      ${
                        beds === num
                          ? "bg-emerald-100 border-emerald-600"
                          : "bg-white border-gray-300"
                      } ${classes.option || ""}`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t" />

            <div className={`p-4 ${classes.section || ""}`}>
              <h5
                className={`text-sm font-medium text-gray-700 mb-2 ${
                  classes.heading || ""
                }`}
              >
                {bathLabel}
              </h5>
              <div
                className={`flex flex-wrap gap-2 ${
                  classes.optionsContainer || ""
                }`}
              >
                {bathOptions.map((num) => (
                  <button
                    key={`bath-${num}`}
                    type="button"
                    onClick={() => handleOptionClick("baths", num)}
                    className={`px-3 py-1 text-sm border rounded-md hover:bg-emerald-100 text-gray-700
                      ${
                        baths === num
                          ? "bg-emerald-100 border-emerald-600"
                          : "bg-white border-gray-300"
                      } ${classes.option || ""}`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BedsAndBathsDropdown;
