import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

const PhoneNumberInput = ({ name, error, validation = {} }) => {
  const { control, setValue, watch } = useFormContext();

  const selectedCountryCode = watch("selectedCountryCode", "+965"); // Default to KW
  const phoneNumber = watch(name, "");

  const countryCodes = [
    { code: "+973", country: "BH" }, // Bahrain
    { code: "+965", country: "KW" }, // Kuwait
    { code: "+971", country: "AE" }, // UAE
    { code: "+962", country: "JO" }, // Jordan
    { code: "+968", country: "OM" }, // Oman
    { code: "+974", country: "QA" }, // Qatar
  ];

  const handleCountryCodeChange = (e) => {
    setValue("selectedCountryCode", e.target.value);
    // Ensure the phone number is updated without appending the country code repeatedly
    const currentPhoneNumber = phoneNumber.replace(/^\+\d+\s/, "");
    setValue(name, e.target.value + " " + currentPhoneNumber);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setValue(name, selectedCountryCode + " " + value);
  };

  useEffect(() => {
    setValue(
      name,
      selectedCountryCode + " " + phoneNumber.replace(/^\+\d+\s/, "")
    );
  }, [selectedCountryCode, setValue, phoneNumber, name]);

  return (
    <div className="w-full">
      <div className="flex gap-2" dir="ltr">
        <select
          value={selectedCountryCode}
          onChange={handleCountryCodeChange}
          className="px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 text-xs md:text-sm shrink-0"
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
              type="text" // Changed to text to avoid arrows
              placeholder="Enter phone number"
              className={`w-full px-4 py-2 border rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 text-left ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              {...field}
              onBeforeInput={(e) => {
                // Prevent non-numeric characters
                if (!/[0-9]/.test(e.data)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                // Sanitize input to allow only numbers
                const sanitizedValue = e.target.value.replace(/[^0-9]/g, "");
                handlePhoneNumberChange({ target: { value: sanitizedValue } });
                field.onChange({ target: { value: sanitizedValue } });
              }}
              value={phoneNumber.replace(selectedCountryCode + " ", "")}
            />
          )}
        />
      </div>
      {error && <p className="text-red-500 mt-1">{error.message}</p>}
    </div>
  );
};

export default PhoneNumberInput;
