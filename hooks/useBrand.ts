import { useState, useEffect } from "react";
import { BRAND } from "../config/brand";

/**
 * Reactive hook to get brand configuration with URL overrides.
 * Updates in real-time when query parameters change without page reload.
 */
export function useBrand() {
  const [params, setParams] = useState<URLSearchParams>(
    new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : ""
    )
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateParams = () => {
      setParams(new URLSearchParams(window.location.search));
    };

    // Listen for back/forward navigation
    window.addEventListener("popstate", updateParams);

    // Listen for custom "urlchange" event for pushState/replaceState
    window.addEventListener("urlchange", updateParams);

    // Patch pushState and replaceState to trigger the custom event
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      originalPushState.apply(this, args);
      window.dispatchEvent(new Event("urlchange"));
    };

    window.history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      window.dispatchEvent(new Event("urlchange"));
    };

    return () => {
      window.removeEventListener("popstate", updateParams);
      window.removeEventListener("urlchange", updateParams);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  const brand = {
    ...BRAND,
    name: params.get("brandName") || BRAND.name,
    tagline: params.get("tagline") || BRAND.tagline,
    description: params.get("description") || BRAND.description,
  };

  // Reactively update document metadata
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = `${brand.name} — ${brand.tagline}`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", brand.description);
      }
    }
  }, [brand.name, brand.tagline, brand.description]);

  return brand;
}
