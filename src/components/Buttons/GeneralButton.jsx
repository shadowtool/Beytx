"use client";

export default function GeneralButton({
  children,
  type = "default",
  onClick,
  disabled = false,
  className = "",
}) {
  const baseStyles = "px-6 py-2 rounded-md transition duration-200 font-medium";

  const buttonStyles = {
    default:
      "w-full bg-green-600 text-white hover:bg-green-700 disabled:bg-green-300",
    outlined:
      "w-full border-2 border-green-600 text-green-600 hover:bg-green-50 disabled:border-green-300 disabled:text-green-300",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${buttonStyles[type]} ${className}`}
    >
      {children}
    </button>
  );
}
