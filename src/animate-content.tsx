import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AnimateContentProps {
  step: string;
  children: ReactNode;
}

export default function AnimateContent({
  step,
  children,
}: AnimateContentProps) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 100 }}
        animate={{
          x: 0,
          opacity: 1,
          transition: { delay: 0.25, duration: 0.25 },
        }}
        exit={{
          x: -100,
          opacity: 0,
          transition: { delay: 0, duration: 0.25 },
        }}
        className="h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
