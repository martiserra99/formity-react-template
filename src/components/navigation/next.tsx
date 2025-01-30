import type { ReactNode } from "react";

import Button from "../user-interface/button";

import { useController } from "@/controller";

interface ButtonProps {
  children: ReactNode;
}

export default function Next({ children }: ButtonProps) {
  const { shifting } = useController();
  return <Button disabled={shifting}>{children}</Button>;
}
