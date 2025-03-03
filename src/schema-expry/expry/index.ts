import { expryInstance } from "@expry/system";
import { basicOperations, BasicPrototypes } from "@expry/basic";
import { formityOperations, FormityPrototypes } from "@expry/formity";

import { zodOperations, ZodPrototypes } from "./zod";
import { componentsOperations, ComponentsPrototypes } from "./components";

type Prototypes = [
  BasicPrototypes,
  ZodPrototypes,
  FormityPrototypes,
  ComponentsPrototypes,
];

export const expry = expryInstance<Prototypes>(
  basicOperations,
  zodOperations,
  formityOperations,
  componentsOperations,
);
