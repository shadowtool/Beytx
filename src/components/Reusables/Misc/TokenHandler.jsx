"use client";
import { useEffect } from "react";
import { setToken } from "@/lib/axios";

export default function TokenHandler() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    if (token) {
      setToken(token);
      url.searchParams.delete("token");
      // Replace URL without token param, keep rest intact
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  return null; // no UI
}
