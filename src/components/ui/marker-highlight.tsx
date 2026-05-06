"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export interface MarkerHighlightProps {
  before?: string;
  highlight: string;
  after?: string;
  markerColor?: string;
  baseColor?: string;
  highlightedTextColor?: string;
  className?: string;
}

export function MarkerHighlight({
  before = "",
  highlight,
  after = "",
  markerColor = "#facc15",
  baseColor = "#171717",
  highlightedTextColor = "#171717",
  className = "",
}: MarkerHighlightProps) {
  const [key, setKey] = useState(0);

  // Trigger animation refresh when the text changes
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [highlight]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      {before && <span className="mr-0.5">{before}</span>}
      <span className="relative inline-block mx-1" key={key}>
        <motion.span
          className="absolute inset-[0_-0.1em] origin-left z-0 rounded-[0.2em]"
          style={{ background: markerColor }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ type: "spring", damping: 14, stiffness: 60, delay: 0.2 }}
        />
        <motion.span
          className="relative z-10 transition-colors duration-300 delay-200"
          style={{ color: baseColor }}
          animate={{ color: highlightedTextColor }}
        >
          {highlight}
        </motion.span>
      </span>
      {after && <span className="ml-0.5">{after}</span>}
    </span>
  );
}
