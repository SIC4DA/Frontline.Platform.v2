"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import logger from "@/services/logger";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    logger.error("Global error boundary:", {
      error,
    });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="w-full max-w-md rounded-xl border-0 bg-white/90 p-8 shadow-xl backdrop-blur">
        <div className="flex items-center gap-2 text-2xl font-bold text-red-600">
          <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z"
            />
          </svg>
          Something went wrong!
        </div>
        <div className="mt-2 text-gray-700">{error.message}</div>
        <div className="mt-6 flex justify-end">
          <Button variant="destructive" onClick={reset}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}

