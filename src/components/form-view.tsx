import type { ReactElement } from "react";
import type { OnNext } from "@formity/react";

import { useCallback } from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";

import { SetAnimate } from "../animate";

interface FormViewProps {
  defaultValues: UseFormProps["defaultValues"];
  resolver: UseFormProps["resolver"];
  onNext: OnNext;
  setAnimate: SetAnimate;
  children: ReactElement;
}

export default function FormView({
  defaultValues,
  resolver,
  onNext,
  setAnimate,
  children,
}: FormViewProps) {
  const form = useForm({ defaultValues, resolver });

  const handleSubmit = useCallback(
    (values: object) => {
      setAnimate("next");
      setTimeout(() => onNext(values), 0);
    },
    [onNext, setAnimate]
  );

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="h-full">
      <FormProvider {...form}>{children}</FormProvider>
    </form>
  );
}
