"use client";

import { useState, useRef, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CheckboxIcon, DownIcon } from "@/imports/icons";
import { motion, AnimatePresence } from "framer-motion";
import GeneralDropdown from "./GeneralDropdown";

export default function PriceRangeDropdown({
  name,
  fromOptions = [],
  toOptions = [],
  placeholder = "Price Range",
  menuPlacement = "bottom",
  classes = {},
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { control, watch } = useFormContext();

  const fromValue = watch(`${name}_from`);
  const toValue = watch(`${name}_to`);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDisplayValue = () => {
    if (fromValue && toValue) {
      return `${fromValue} - ${toValue}`;
    } else if (fromValue) {
      return `From - ${fromValue}`;
    }
    return placeholder;
  };

  return (
    <div
      className={`relative w-full ${classes.dropdown || ""}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        className={`w-full border rounded text-left flex justify-between items-center focus:ring-2 focus:ring-emerald-500 transition-all duration-300 p-2 ${
          fromValue || toValue
            ? "bg-emerald-100 border-emerald-600 text-black"
            : "bg-white text-gray-400"
        } ${classes.button || ""}`}
        onClick={() => setOpen(!open)}
      >
        <span>{getDisplayValue()}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <DownIcon className="w-4 h-4 text-black" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute w-full border bg-white shadow-lg rounded p-4 z-10 min-w-64 top-full right-0 ${
              menuPlacement === "top" ? "bottom-[110%] mb-1" : "top-[110%] mt-1"
            } ${classes.menu || ""}`}
          >
            <div className="flex gap-4">
              <GeneralDropdown
                name={`${name}_from`}
                options={fromOptions}
                placeholder="From"
              />
              <GeneralDropdown
                name={`${name}_to`}
                options={toOptions}
                placeholder="To"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
