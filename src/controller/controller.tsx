import type { ReactNode } from "react";
import type { MotionProps } from "motion/react";
import type { OnNext, OnBack, GetState, SetState } from "@formity/react";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { ControllerContext } from "./controller-context";

interface ControllerProps {
  step: string;
  onNext: OnNext;
  onBack: OnBack;
  getState: GetState;
  setState: SetState;
  children: ReactNode;
}

export function Controller({
  step,
  onNext,
  onBack,
  getState,
  setState,
  children,
}: ControllerProps) {
  const [animate, setAnimate] = useState<"next" | "back" | false>(false);

  const handleNext = useCallback<OnNext>(
    (values) => {
      if (animate) return;
      setAnimate("next");
      setTimeout(() => onNext(values), 0);
    },
    [animate, onNext]
  );

  const handleBack = useCallback<OnBack>(
    (values) => {
      if (animate) return;
      setAnimate("back");
      setTimeout(() => onBack(values), 0);
    },
    [animate, onBack]
  );

  const values = useMemo(
    () => ({
      onNext: handleNext,
      onBack: handleBack,
      getState: getState,
      setState: setState,
    }),
    [handleNext, handleBack, getState, setState]
  );

  return (
    <AnimatePresence
      mode="popLayout"
      initial={false}
      onExitComplete={() => setAnimate(false)}
    >
      <motion.div
        key={step}
        animate={{
          x: 0,
          opacity: 1,
          transition: { delay: 0.25, duration: 0.25 },
        }}
        {...motionProps(animate)}
        className="h-full"
      >
        <ControllerContext.Provider value={values}>
          {children}
        </ControllerContext.Provider>
      </motion.div>
    </AnimatePresence>
  );
}

function motionProps(animate: "next" | "back" | false): MotionProps {
  switch (animate) {
    case "next":
      return {
        initial: { x: 100, opacity: 0 },
        exit: {
          x: -100,
          opacity: 0,
          transition: { delay: 0, duration: 0.25 },
        },
      };
    case "back":
      return {
        initial: { x: -100, opacity: 0 },
        exit: {
          x: 100,
          opacity: 0,
          transition: { delay: 0, duration: 0.25 },
        },
      };
    default:
      return {};
  }
}
