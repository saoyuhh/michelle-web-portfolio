"use client";

import { motion } from "framer-motion";

export function Section({ children, className, id }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-150px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={`py-20 md:py-32 px-6 max-w-6xl mx-auto ${className || ""}`}
    >
      {children}
    </motion.section>
  );
}
