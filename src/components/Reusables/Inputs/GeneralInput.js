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

  // detect real “number” mode
  const isNumber = type === "number";
  // if it’s “number” we switch to a text input so we can accept Arabic digits,
  // but we tell mobile browsers to show a number pad
  const inputType = isNumber ? "text" : type;
  const inputProps = isNumber
    ? {
        inputMode: "numeric",
        pattern: "[0-9\u0660-\u0669\u06F0-\u06F9]*",
      }
    : {};

  return (
    <div className="w-full">
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={validation}
        render={({ field }) => {
          // handle debounced onChange
          useEffect(() => {
            if (!debounce) return;
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
              field.onChange(field.value);
            }, debounceTime);
            return () => clearTimeout(debounceRef.current);
          }, [field.value]);

          const handleChange = (e) => {
            let val = e.target.value;
            if (isNumber) {
              // strip out anything that isn't 0–9, Arabic-Indic (0660–0669), or Eastern Arabic (06F0–06F9)
              val = val.replace(/[^\d\u0660-\u0669\u06F0-\u06F9]/g, "");
            }
            field.onChange(val);
          };

          return (
            <>
              <input
                type={inputType}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full px-4 py-2 border rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all duration-300 text-black disabled:bg-gray-300 text-base min-h-12 ${
                  error ? "border-red-500" : "border-gray-300"
                } ${classes}`}
                {...inputProps}
                {...rest}
                {...field}
                onChange={handleChange}
              />
              {error && <p className="text-red-500 mt-1">{error.message}</p>}
            </>
          );
        }}
      />
    </div>
  );
};

export default GeneralInput;
