import { createExpry } from "@expry/system";
import { basicOperations, BasicOperations } from "@expry/basic";
import { formityOperations, FormityOperations } from "@expry/formity";

import { componentsOperations, ComponentsOperations } from "./components";
import { zodOperations, ZodOperations } from "./zod";

type Operations = [
  BasicOperations,
  FormityOperations,
  ComponentsOperations,
  ZodOperations,
];

export const expry = createExpry<Operations>(
  basicOperations,
  formityOperations,
  componentsOperations,
  zodOperations,
);
