"use client";

import { useState, useEffect, useRef } from "react";
import { CheckboxIcon, CloseIcon, DownIcon, XIcon } from "@/imports/icons";

export default function SearchableDropdown({
  field,
  options = [],
  classes = {},
  placeholder,
  menuPlacement = "bottom",
  customOnChange,
}) {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
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
        prev === null ? 0 : Math.min(prev + 1, filteredOptions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) =>
        prev === null ? filteredOptions.length - 1 : Math.max(prev - 1, 0)
      );
    } else if (e.key === "Enter" && highlightedIndex !== null) {
      field.onChange(filteredOptions[highlightedIndex].value);
      setOpen(false);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const filteredOptions = options?.filter((option) =>
    option?.label?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  return (
    <div
      className={`relative w-full grow ${classes?.dropdown || ""}`}
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        className={`w-full border p-2 rounded bg-white text-left flex justify-between items-center  ${
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

        <div className="flex items-center gap-2">
          {field.value && (
            <CloseIcon
              className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                field.onChange("");
                setSearchQuery("");
                customOnChange && customOnChange("");
              }}
            />
          )}
          <DownIcon className="w-4 h-4" />
        </div>
      </button>

      {open && (
        <div
          className={`absolute w-full border bg-white shadow-lg rounded max-h-60 overflow-auto z-10 ${
            menuPlacement === "top" ? "bottom-[110%] mb-1" : "top-[110%] mt-1"
          } ${classes?.menu || ""}`}
        >
          <div className="bg-white sticky top-0 p-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border border-solid border-gray-200 rounded-md outline-none sticky top-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>

          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
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
                  setSearchQuery("");
                }}
              >
                <p>{option.icon}</p> {option.label}
                {field.value === option.value && (
                  <CheckboxIcon className="ml-auto w-4 h-4" />
                )}
              </div>
            ))
          ) : (
            <p className="p-2 text-gray-500 text-sm text-center">
              No options found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
