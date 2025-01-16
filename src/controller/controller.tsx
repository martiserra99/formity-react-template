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
  const [animate, setAnimate] = useState<"none" | "next" | "back">("none");

  const handleNext = useCallback<OnNext>(
    (values) => {
      setAnimate("next");
      setTimeout(() => onNext(values), 0);
    },
    [onNext]
  );

  const handleBack = useCallback<OnBack>(
    (values) => {
      setAnimate("back");
      setTimeout(() => onBack(values), 0);
    },
    [onBack]
  );

  const values = useMemo(
    () => ({
      onNext: handleNext,
      onBack: handleBack,
      getState,
      setState,
    }),
    [handleNext, handleBack, getState, setState]
  );

  return (
    <ControllerContext.Provider value={values}>
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
    </ControllerContext.Provider>
  );
}

function motionProps(animate: "none" | "next" | "back"): MotionProps {
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
