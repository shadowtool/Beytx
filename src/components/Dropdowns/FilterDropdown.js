"use client";

import { DownIcon } from "@/imports/icons";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import GeneralInput from "../Inputs/GeneralInput";
import GeneralDropdown from "./GeneralDropdown";

export default function FilterDropdown({
  title,
  options,
  name,
  type,
  rangeInputOptionsOne,
  rangeInputOptionsTwo,
}) {
  const [open, setOpen] = useState(false);

  const { control } = useFormContext();

  return (
    <div className="border-b w-full">
      {/* Accordion Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-4 text-left font-normal"
      >
        {title}
        <DownIcon
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Content */}
      {open && (
        <div className="pb-4">
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <div className="px-4 flex flex-col gap-2.5">
                {type === "input" && (
                  <GeneralInput
                    type="text"
                    name={name}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder={`Enter ${title.toLowerCase()}...`}
                    classes={"!p-3"}
                  />
                )}

                {type === "checkboxList" &&
                  options.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={field.value?.includes(option.value) || false}
                        onChange={() => {
                          const newValue = field.value?.includes(option.value)
                            ? field.value.filter((v) => v !== option.value)
                            : [...(field.value || []), option.value];
                          field.onChange(newValue);
                        }}
                      />
                      {option.label}
                    </label>
                  ))}

                {type === "radioList" &&
                  options.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        className="w-4 h-4"
                        checked={field.value === option.value}
                        onChange={() => field.onChange(option.value)}
                      />
                      {option.label}
                    </label>
                  ))}

                {type === "rangeFilter" && (
                  <div className="w-full flex gap-4">
                    <Controller
                      name={`${name}_from`}
                      control={control}
                      render={({ field }) => (
                        <GeneralDropdown
                          field={field}
                          placeholder={"From"}
                          options={rangeInputOptionsOne}
                        />
                      )}
                    />
                    <Controller
                      name={`${name}_to`}
                      control={control}
                      render={({ field }) => (
                        <GeneralDropdown
                          field={field}
                          placeholder={"To"}
                          options={rangeInputOptionsTwo}
                        />
                      )}
                    />
                  </div>
                )}
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
}
[];
