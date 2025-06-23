"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const FadeInView = ({
  children,
  className,
  direction = "up",
  movement = 100,
  delay = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "none";
  movement?: number;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: direction === "up" ? movement : direction === "down" ? -movement : 0 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : direction === "up" ? movement : direction === "down" ? -movement : 0,
      }}
      transition={{ duration: 0.5, ease: "easeInOut", delay }}
      className={className}>
      {children}
    </motion.div>
  );
};

export default FadeInView;
