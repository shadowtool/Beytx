"use client";

import { useState, useEffect, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CheckboxIcon, CloseIcon } from "@/imports/icons";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchableDropdown({
  name,
  options = [],
  placeholder = "Search...",
  menuPlacement = "bottom",
  customOnChange,
  classes = {},
}) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef(null);
  const { control } = useFormContext();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const fieldValue = field.value;

        // Reflect existing value in UI
        useEffect(() => {
          const matched = options.find((opt) => opt.value === fieldValue);
          if (matched) setSearchQuery(matched.label);
        }, [options, fieldValue]);

        const filteredOptions = options.filter((option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const selectOption = (option) => {
          field.onChange(option.value);
          customOnChange && customOnChange(option.value);
          setSearchQuery(option.label);
          setOpen(false);
        };

        const handleKeyDown = (e) => {
          if (e.key === "ArrowDown") {
            setHighlightedIndex((prev) =>
              Math.min(prev + 1, filteredOptions.length - 1)
            );
          } else if (e.key === "ArrowUp") {
            setHighlightedIndex((prev) => Math.max(prev - 1, 0));
          } else if (e.key === "Enter") {
            selectOption(filteredOptions[highlightedIndex]);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        };

        return (
          <div
            className={`relative w-full ${classes.dropdown || ""}`}
            ref={dropdownRef}
          >
            {/* Search Input */}
            <div
              className={`w-full border p-2 rounded bg-white flex justify-between items-center transition-all duration-300 focus-within:ring-2 focus-within:ring-emerald-600 ${
                classes.button || ""
              }`}
            >
              <input
                type="text"
                placeholder={placeholder}
                className="w-full outline-none bg-transparent rounded transition-all duration-300"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setOpen(true);
                }}
                onKeyDown={handleKeyDown}
              />

              {/* Clear Button */}
              {searchQuery && (
                <CloseIcon
                  className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={() => {
                    setSearchQuery("");
                    field.onChange("");
                    customOnChange && customOnChange("");
                  }}
                />
              )}
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {open && filteredOptions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute w-full border bg-white shadow-lg rounded max-h-60 overflow-auto z-10 ${
                    menuPlacement === "top"
                      ? "bottom-full mb-1"
                      : "top-full mt-1"
                  } ${classes.menu || ""}`}
                >
                  {filteredOptions.map((option, index) => (
                    <motion.div
                      key={option.value}
                      whileHover={{
                        backgroundColor: "rgba(229, 231, 235, 0.5)",
                      }}
                      className={`p-2 flex items-center gap-2 cursor-pointer transition ${
                        highlightedIndex === index ? "bg-green-300" : ""
                      } ${classes.item || ""}`}
                      onClick={() => selectOption(option)}
                    >
                      {option.icon && <span>{option.icon}</span>}
                      <span>{option.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      }}
    />
  );
}
