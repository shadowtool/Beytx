import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useController, useFormContext } from "react-hook-form";

const PasswordInput = ({
  name,
  placeholder = "Enter password",
  validation = {},
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { control, register } = useFormContext();
  const { field } = useController({ control, name });

  return (
    <div className="w-full">
      <div className="relative w-full">
        <input
          {...field}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300   placeholder: "
          {...register(name, validation)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 border-none bg-transparent cursor-pointer"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {props.error && (
        <p className="text-red-500   mt-1">{props.error.message}</p>
      )}
    </div>
  );
};

export default PasswordInput;
