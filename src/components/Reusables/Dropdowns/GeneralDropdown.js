"use client";

import { useState, useRef, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CheckboxIcon, DownIcon } from "@/imports/icons";
import { motion, AnimatePresence } from "framer-motion";

export default function GeneralDropdown({
  name,
  options,
  placeholder = "Select an option",
  menuPlacement = "bottom",
  customOnChange,
  classes = {},
  isMulti = false,
  showSelectedEffect = false,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { control } = useFormContext();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDisplayValue = (value) => {
    if (!value) return placeholder;
    if (isMulti) {
      if (!value.length) return placeholder;
      const displayText = value
        .map((v) => options.find((o) => o.value === v)?.label)
        .join(", ");
      return displayText.length > 10
        ? displayText.substring(0, 10) + "..."
        : displayText;
    } else {
      const displayText =
        options.find((o) => o.value === value)?.label || placeholder;
      return displayText.length > 10
        ? displayText.substring(0, 10) + "..."
        : displayText;
    }
  };

  const handleOptionClick = (field, optionValue) => {
    if (isMulti) {
      const newValue = field.value || [];
      const updatedValue = newValue.includes(optionValue)
        ? newValue.filter((v) => v !== optionValue)
        : [...newValue, optionValue];
      field.onChange(updatedValue);
      if (customOnChange) customOnChange(updatedValue);
    } else {
      field.onChange(optionValue);
      if (customOnChange) customOnChange(optionValue);
      setOpen(false);
    }
  };

  const isOptionSelected = (fieldValue, optionValue) => {
    if (isMulti) {
      return (fieldValue || [])?.includes(optionValue);
    }
    return fieldValue === optionValue;
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={isMulti ? [] : ""}
      render={({ field }) => (
        <div
          className={`relative w-full ${classes.dropdown || ""}`}
          ref={dropdownRef}
        >
          {/* Dropdown Button */}
          <button
            type="button"
            className={`w-full border rounded text-left flex justify-between items-center focus:ring-2 focus:ring-emerald-500 transition-all duration-300 px-4 py-2 ${
              showSelectedEffect
                ? field.value &&
                  (isMulti ? field.value.length > 0 : field.value)
                  ? "bg-green-100 border-emerald-600"
                  : "bg-white border-gray-200"
                : "bg-white"
            } ${classes.button || ""}`}
            onClick={() => setOpen(!open)}
          >
            <span
              className={`${
                getDisplayValue(field.value) === placeholder
                  ? "text-gray-400"
                  : "text-black"
              }`}
            >
              {getDisplayValue(field.value)}
            </span>
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <DownIcon className="w-4 h-4" />
            </motion.div>
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`absolute w-full border bg-white shadow-lg rounded max-h-40 overflow-auto z-10 ${
                  menuPlacement === "top"
                    ? "bottom-[110%] mb-1"
                    : "top-[110%] mt-1"
                } ${classes.menu || ""}`}
              >
                {options.map((option) => (
                  <motion.div
                    key={option.value}
                    className={`p-2 flex items-center gap-2 cursor-pointer transition-all duration-200 ${
                      isOptionSelected(field.value, option.value)
                        ? "bg-emerald-600 hover:bg-emerald-600 text-white"
                        : "hover:bg-gray-100 "
                    } ${classes.item || ""}`}
                    onClick={() => handleOptionClick(field, option.value)}
                  >
                    {option.icon && <p>{option.icon}</p>}
                    {option.label}
                    {isOptionSelected(field.value, option.value) && (
                      <CheckboxIcon className="ml-auto w-4 h-4" />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    />
  );
}
