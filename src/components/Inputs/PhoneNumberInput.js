import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const PhoneNumberInput = ({ name, error, validation = {} }) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1"); // Default to US
  const { control } = useFormContext();
  const countryCodes = [
    { code: "+973", country: "BH" }, // Bahrain
    { code: "+965", country: "KW" }, // Kuwait
    { code: "+971", country: "AE" }, // UAE
    { code: "+962", country: "JO" }, // Jordan
    { code: "+968", country: "OM" }, // Oman
    { code: "+974", country: "QA" }, // Qatar
  ];

  return (
    <div className="w-full">
      <div className="flex gap-2">
        <select
          value={selectedCountryCode}
          onChange={(e) => setSelectedCountryCode(e.target.value)}
          className="px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
        >
          {countryCodes.map((country) => (
            <option key={country.code} value={country.code}>
              {country.code} ({country.country})
            </option>
          ))}
        </select>

        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={validation}
          render={({ field }) => (
            <input
              type="tel"
              placeholder="Enter phone number"
              className={`w-full px-4 py-2 border rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              {...field}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                field.onChange(selectedCountryCode + value);
              }}
              value={field.value?.replace(selectedCountryCode, "") || ""}
            />
          )}
        />
      </div>
      {error && <p className="text-red-500   mt-1">{error.message}</p>}
    </div>
  );
};

export default PhoneNumberInput;
