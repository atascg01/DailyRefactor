"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
const serverSnapshot = () => false;
export function useScrollThreshold(threshold: number): boolean {
  return useSyncExternalStore(subscribe, () => window.scrollY > threshold, serverSnapshot);
}
