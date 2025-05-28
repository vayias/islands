"use client";

import { useEffect } from "react";

export function TempoInit() {
  useEffect(() => {
    const init = async () => {
      if (process.env.NEXT_PUBLIC_TEMPO) {
        try {
          const { TempoDevtools } = await import("tempo-devtools");
          TempoDevtools.init();
        } catch (err) {
          console.error("Failed to load tempo-devtools:", err);
        }
      }
    };

    init();
  }, []);

  return null;
}
