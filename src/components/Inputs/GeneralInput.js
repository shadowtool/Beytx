import React, { useEffect, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

const GeneralInput = ({
  name,
  placeholder,
  disabled,
  classes,
  type = "text",
  validation = {},
  error,
  debounce = false,
  debounceTime = 500,
  ...rest
}) => {
  const { control } = useFormContext();
  const debounceRef = useRef(null);

  return (
    <div className="w-full">
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={validation}
        render={({ field }) => {
          useEffect(() => {
            if (!debounce) return; // ✅ Skip debounce if not needed

            if (debounceRef.current) clearTimeout(debounceRef.current);

            debounceRef.current = setTimeout(() => {
              field.onChange(field.value);
            }, debounceTime);

            return () => clearTimeout(debounceRef.current);
          }, [field.value]);

          return (
            <input
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className={`w-full px-4 py-2 border rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all duration-300 text-black disabled:bg-gray-300 ${
                error ? "border-red-500" : "border-gray-300"
              } ${classes}`}
              {...field}
              {...rest}
              onInput={(e) => {
                if (type === "number") {
                  const sanitizedValue = e.target.value.replace(/[^\d]/g, "");
                  field.onChange(sanitizedValue);
                }
              }}
            />
          );
        }}
      />
      {error && <p className="text-red-500   mt-1">{error.message}</p>}
    </div>
  );
};

export default GeneralInput;
