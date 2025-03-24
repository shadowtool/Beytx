import React, { useEffect, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

const GeneralInput = ({ name, placeholder, disabled, classes }) => {
  const { control } = useFormContext();
  const debounceRef = useRef(null);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => {
        useEffect(() => {
          if (debounceRef.current) clearTimeout(debounceRef.current);

          debounceRef.current = setTimeout(() => {
            field.onChange(field.value);
          }, 500);

          return () => clearTimeout(debounceRef.current);
        }, [field.value]);

        return (
          <input
            type="text"
            placeholder={placeholder}
            disabled={disabled}
            className={`px-4 py-2 border rounded-md flex-grow outline-none focus:outline-none text-black ${classes}`}
            {...field}
          />
        );
      }}
    />
  );
};

export default GeneralInput;
