import type { ReactNode } from "react";
import type { MotionProps } from "motion/react";
import type { OnNext, OnBack, GetState, SetState } from "@formity/react";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { MultiStepContext } from "./multi-step-context";

interface MultiStepProps {
  step: string;
  onNext: OnNext;
  onBack: OnBack;
  getState: GetState;
  setState: SetState;
  children: ReactNode;
}

export function MultiStep({
  step,
  onNext,
  onBack,
  getState,
  setState,
  children,
}: MultiStepProps) {
  const [animate, setAnimate] = useState<"next" | "back" | false>(false);

  const handleNext = useCallback<OnNext>(
    (values) => {
      setAnimate("next");
      setTimeout(() => onNext(values), 0);
    },
    [onNext],
  );

  const handleBack = useCallback<OnBack>(
    (values) => {
      setAnimate("back");
      setTimeout(() => onBack(values), 0);
    },
    [onBack],
  );

  const values = useMemo(
    () => ({ onNext: handleNext, onBack: handleBack, getState, setState }),
    [handleNext, handleBack, getState, setState],
  );

  return (
    <AnimatePresence
      mode="popLayout"
      initial={false}
      onExitComplete={() => setAnimate(false)}
    >
      <motion.div
        key={step}
        inert={Boolean(animate)}
        animate={{
          x: 0,
          opacity: 1,
          transition: { delay: 0.25, duration: 0.25 },
        }}
        {...motionProps(animate)}
        className="h-full"
      >
        <MultiStepContext.Provider value={values}>
          {children}
        </MultiStepContext.Provider>
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
