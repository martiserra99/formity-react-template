import { expryInstance } from "@expry/system";
import { basicOperations, BasicPrototypes } from "@expry/basic";
import { formityOperations, FormityPrototypes } from "@expry/formity";

import { componentsOperations, ComponentsPrototypes } from "./components";
import { zodOperations, ZodPrototypes } from "./zod";

type Prototypes = [
  BasicPrototypes,
  FormityPrototypes,
  ComponentsPrototypes,
  ZodPrototypes,
];

export const expry = expryInstance<Prototypes>(
  basicOperations,
  formityOperations,
  componentsOperations,
  zodOperations,
);
