"use client";

import { motion } from "framer-motion";

export function Section({ children, className, id }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`py-20 md:py-32 px-6 max-w-5xl mx-auto ${className || ""}`}
    >
      {children}
    </motion.section>
  );
}
