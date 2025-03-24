"use client";

import { useState, useEffect, useRef } from "react";
import { CheckboxIcon, DownIcon } from "@/imports/icons";

export default function GeneralDropdown({
  field,
  options,
  classes = {},
  placeholder,
  menuPlacement = "bottom",
  customOnChange,
}) {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) =>
        prev === null ? 0 : Math.min(prev + 1, options.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) =>
        prev === null ? options.length - 1 : Math.max(prev - 1, 0)
      );
    } else if (e.key === "Enter" && highlightedIndex !== null) {
      field.onChange(options[highlightedIndex].value);
      setOpen(false);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div
      className={`relative w-full grow ${classes?.dropdown || ""}`}
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        className={`w-full border p-2 rounded bg-white text-left flex justify-between items-center focus:ring-2 ${
          classes?.button || ""
        }`}
        onClick={() => setOpen(!open)}
      >
        <span>
          {field.value
            ? options.find((o) => o.value === field.value)?.selectedLabel ??
              options.find((o) => o.value === field.value)?.label
            : placeholder ?? "Select an option"}
        </span>
        <DownIcon className="w-4 h-4" />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className={`absolute w-full border bg-white shadow-lg rounded max-h-40 overflow-auto z-10 ${
            menuPlacement === "top" ? "bottom-[110%] mb-1" : "top-[110%] mt-1"
          } ${classes?.menu || ""}`}
        >
          {options.map((option, index) => (
            <div
              key={option.value}
              className={`p-2 flex items-center gap-2 cursor-pointer transition ${
                field.value === option.value
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              } ${highlightedIndex === index ? "bg-gray-300" : ""} ${
                classes?.item || ""
              }`}
              onClick={() => {
                field.onChange(option.value);
                customOnChange && customOnChange(option?.value);
                setOpen(false);
              }}
            >
              <p>{option.icon}</p> {option.label}
              {field.value === option.value && (
                <CheckboxIcon className="ml-auto w-4 h-4" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
