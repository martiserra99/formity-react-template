import { ReactNode } from "react";
import { AnimatePresence, motion, MotionProps } from "framer-motion";

export type Animate = "none" | "next" | "back";
export type SetAnimate = (animate: Animate) => void;

interface AnimateContentProps {
  step: string;
  animate: Animate;
  setAnimate: SetAnimate;
  children: ReactNode;
}

export function AnimateContent({
  step,
  animate,
  setAnimate,
  children,
}: AnimateContentProps) {
  return (
    <AnimatePresence
      mode="popLayout"
      initial={false}
      onExitComplete={() => setAnimate("none")}
    >
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 100 }}
        animate={{
          x: 0,
          opacity: 1,
          transition: { delay: 0.25, duration: 0.25 },
        }}
        {...motionProps(animate)}
        className="h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function motionProps(animate: Animate): MotionProps {
  if (animate === "next") {
    return {
      initial: { x: 100, opacity: 0 },
      exit: {
        x: -100,
        opacity: 0,
        transition: { delay: 0, duration: 0.25 },
      },
    };
  }
  if (animate === "back") {
    return {
      initial: { x: -100, opacity: 0 },
      exit: {
        x: 100,
        opacity: 0,
        transition: { delay: 0, duration: 0.25 },
      },
    };
  }
  return {};
}
