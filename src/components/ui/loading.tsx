"use client";

import { motion } from "framer-motion";

export function Loading() {
  return (
        <div className="flex min-h-[300px] items-center justify-center">
            <motion.div
            className="h-12 w-12 rounded-full border-4 border-zinc-300 border-t-black dark:border-zinc-700 dark:border-t-white"
            animate={{ rotate: 360 }}
            transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "linear",
            }}
            />
        </div>
  );
}