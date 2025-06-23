"use client";

import dynamic from "next/dynamic";

const ConfettiExplosion = dynamic(() => import("react-confetti-explosion"), { ssr: false });

const Confetti = () => {
  return (
    <ConfettiExplosion
      className="absolute top-0 left-1/2 z-50 -translate-x-1/2"
      particleCount={200}
      duration={2000}
      width={2000}
    />
  );
};

export default Confetti;
