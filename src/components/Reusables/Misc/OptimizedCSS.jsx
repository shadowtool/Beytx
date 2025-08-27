"use client";
import { useEffect } from "react";

/**
 * Component to handle non-critical CSS loading after initial render
 * This helps reduce render-blocking CSS and improves LCP
 */
export default function OptimizedCSS() {
  useEffect(() => {
    // Load non-critical CSS after initial render
    const loadNonCriticalCSS = () => {
      // Check if CSS is already loaded to prevent duplicate loading
      if (document.querySelector("link[data-non-critical-css]")) {
        return;
      }

      // Create and append non-critical stylesheets
      const nonCriticalStyles = [
        // Add any third-party CSS that's not critical for above-the-fold content
        // Example: 'https://cdn.jsdelivr.net/npm/some-library@1.0.0/dist/style.css'
      ];

      nonCriticalStyles.forEach((href) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.setAttribute("data-non-critical-css", "true");
        link.media = "print";
        link.onload = function () {
          this.media = "all";
        };
        document.head.appendChild(link);
      });
    };

    // Use requestIdleCallback if available, otherwise use setTimeout
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(loadNonCriticalCSS);
    } else {
      setTimeout(loadNonCriticalCSS, 100);
    }
  }, []);

  return null;
}
