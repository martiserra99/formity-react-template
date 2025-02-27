import type { ComponentPropsWithoutRef } from "react";

import Button from "../user-interface/button";

export default function NextButton({
  ...props
}: ComponentPropsWithoutRef<"button">) {
  return <Button {...props} />;
}
