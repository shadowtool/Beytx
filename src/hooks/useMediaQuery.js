import { useState, useEffect } from "react";

const useMediaQuery = () => {
  const [matches, setMatches] = useState(false); // Start with `null` to prevent SSR mismatch

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    // Set value after mounting to match client-side state
    setMatches(mediaQuery.matches);

    const handleChange = (e) => setMatches(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return { isBigScreen: matches };
};

export default useMediaQuery;
