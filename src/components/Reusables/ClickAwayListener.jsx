import React, { useEffect, useRef } from "react";

const ClickAwayListener = ({ children, onClickAway, containerClasses }) => {
  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      onClickAway();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={`w-full ${containerClasses}`}>
      {children}
    </div>
  );
};

export default ClickAwayListener;
