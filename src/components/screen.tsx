import type { ReactNode } from "react";

import { motion } from "framer-motion";

interface ScreenProps {
  progress: { total: number; current: number };
  children: ReactNode;
}

export default function Screen({ progress, children }: ScreenProps) {
  return (
    <div className="relative h-full w-full">
      <Progress total={progress.total} current={progress.current} />
      {children}
    </div>
  );
}

interface ProgressProps {
  total: number;
  current: number;
}

function Progress({ total, current }: ProgressProps) {
  return (
    <div className="absolute left-0 right-0 top-0 h-1 bg-indigo-500/50">
      <motion.div
        className="h-full bg-indigo-500"
        animate={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  );
}
