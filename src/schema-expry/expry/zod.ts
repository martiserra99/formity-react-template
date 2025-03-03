import type { Executions } from "@expry/system";
import type { Resolver } from "react-hook-form";
import type { ZodType } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type ZodOperations = {
  zod$resolver: {
    params: unknown;
    return: Resolver;
  };
  zod$object: {
    params: Record<string, unknown>;
    return: ZodType;
  };
  zod$string: {
    params: (
      | { type: "min"; args: unknown; text: unknown }
      | { type: "max"; args: unknown; text: unknown }
    )[];
    return: ZodType;
  };
  zod$number: {
    params: (
      | { type: "min"; args: unknown; text: unknown }
      | { type: "max"; args: unknown; text: unknown }
    )[];
    return: ZodType;
  };
  zod$boolean: {
    params: [];
    return: ZodType;
  };
  zod$array: {
    params: unknown;
    return: ZodType;
  };
};

export const zodOperations: Executions<ZodOperations> = {
  zod$resolver: (args, vars, expry) => {
    const zod = expry(args, vars) as ZodType;
    return zodResolver(zod);
  },
  zod$object: (args, vars, expry) => {
    const object = Object.fromEntries(
      Object.entries(args).map(([key, value]) => {
        const zod = expry(value, vars) as ZodType;
        return [key, zod];
      }),
    );
    return z.object(object);
  },
  zod$string: (args, vars, expry) => {
    let current = z.string();
    for (const arg of args) {
      if (arg.type === "min") {
        const args = expry(arg.args, vars) as number;
        const text = expry(arg.text, vars) as string;
        current = current.min(args, text);
      } else if (arg.type === "max") {
        const args = expry(arg.args, vars) as number;
        const text = expry(arg.text, vars) as string;
        current = current.max(args, text);
      }
    }
    return current;
  },
  zod$number: (args, vars, expry) => {
    let current = z.number();
    for (const arg of args) {
      if (arg.type === "min") {
        const args = expry(arg.args, vars) as number;
        const text = expry(arg.text, vars) as string;
        current = current.min(args, text);
      } else if (arg.type === "max") {
        const args = expry(arg.args, vars) as number;
        const text = expry(arg.text, vars) as string;
        current = current.max(args, text);
      }
    }
    return current;
  },
  zod$boolean: () => {
    return z.boolean();
  },
  zod$array: (args, vars, expry) => {
    const zod = expry(args, vars) as ZodType;
    return z.array(zod);
  },
};
