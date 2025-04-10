import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const Popup = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const popupRef = useRef(null);

  const handleToggle = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    }
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
      >
        Options
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={popupRef}
            className="absolute z-50 w-48 bg-white rounded-md shadow-lg ring-2 overflow-hidden ring-emerald-600 ring-opacity-25"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => {
                  option.onClick();
                  setIsOpen(false);
                }}
                className="cursor-pointer px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
              >
                {option.title}
              </div>
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

export default Popup;
