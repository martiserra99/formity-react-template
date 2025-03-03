import type { ReactNode } from "react";

import type { Executions } from "@expry/system";
import type { Resolver } from "react-hook-form";
import type { OnBack, OnNext, GetState, SetState } from "@formity/react";

import { MultiStep } from "@/multi-step";
import {
  Screen,
  Step,
  Layout,
  Row,
  TextField,
  NumberField,
  MultiSelect,
  Listbox,
  Select,
  YesNo,
  NextButton,
  BackButton,
} from "@/components";

export type ComponentsOperations = {
  jsx$screen: {
    params: {
      progress: { total: unknown; current: unknown };
      children: unknown;
    };
    return: ReactNode;
  };
  jsx$multiStep: {
    params: {
      step: string;
      onNext: OnNext;
      onBack: OnBack;
      getState: GetState;
      setState: SetState;
      children: unknown;
    };
    return: ReactNode;
  };
  jsx$step: {
    params: {
      defaultValues: unknown;
      resolver: unknown;
      children: unknown;
    };
    return: ReactNode;
  };
  jsx$layout: {
    params: {
      heading: unknown;
      description: unknown;
      fields: unknown[];
      button: unknown;
      back: unknown;
    };
    return: ReactNode;
  };
  jsx$row: {
    params: {
      key: unknown;
      items: unknown[];
    };
    return: ReactNode;
  };
  jsx$textField: {
    params: {
      key: unknown;
      name: unknown;
      label: unknown;
    };
    return: ReactNode;
  };
  jsx$numberField: {
    params: {
      key: unknown;
      name: unknown;
      label: unknown;
    };
    return: ReactNode;
  };
  jsx$multiSelect: {
    params: {
      key: unknown;
      name: unknown;
      label: unknown;
      options: unknown;
      direction: unknown;
    };
    return: ReactNode;
  };
  jsx$listbox: {
    params: {
      key: unknown;
      name: unknown;
      label: unknown;
      options: unknown;
    };
    return: ReactNode;
  };
  jsx$select: {
    params: {
      key: unknown;
      name: unknown;
      label: unknown;
      options: unknown;
      direction: unknown;
    };
    return: ReactNode;
  };
  jsx$yesNo: {
    params: {
      key: unknown;
      name: unknown;
      label: unknown;
    };
    return: ReactNode;
  };
  jsx$nextButton: {
    params: {
      children: unknown;
    };
    return: ReactNode;
  };
  jsx$backButton: {
    params: Record<string, never>;
    return: ReactNode;
  };
};

export const componentsOperations: Executions<ComponentsOperations> = {
  jsx$screen: (args, vars, expry) => {
    const total = expry(args.progress.total, vars) as number;
    const current = expry(args.progress.current, vars) as number;
    const children = expry(args.children, vars) as ReactNode;
    return <Screen progress={{ total, current }}>{children}</Screen>;
  },
  jsx$multiStep: (args, vars, expry) => {
    const step = expry(args.step, vars) as string;
    const onNext = expry(args.onNext, vars) as OnNext;
    const onBack = expry(args.onBack, vars) as OnBack;
    const getState = expry(args.getState, vars) as GetState;
    const setState = expry(args.setState, vars) as SetState;
    const children = expry(args.children, vars) as ReactNode;
    return (
      <MultiStep
        step={step}
        onNext={onNext}
        onBack={onBack}
        getState={getState}
        setState={setState}
      >
        {children}
      </MultiStep>
    );
  },
  jsx$step: (args, vars, expry) => {
    const defaultValues = expry(args.defaultValues, vars) as object;
    const resolver = expry(args.resolver, vars) as Resolver;
    const children = expry(args.children, vars) as ReactNode;
    return (
      <Step defaultValues={defaultValues} resolver={resolver}>
        {children}
      </Step>
    );
  },
  jsx$layout: (args, vars, expry) => {
    const heading = expry(args.heading, vars) as string;
    const description = expry(args.description, vars) as string;
    const fields = args.fields.map((i) => expry(i, vars)) as ReactNode[];
    const button = expry(args.button, vars) as ReactNode;
    const back = expry(args.back, vars) as ReactNode | undefined;
    return (
      <Layout
        heading={heading}
        description={description}
        fields={fields}
        button={button}
        back={back}
      />
    );
  },
  jsx$row: (args, vars, expry) => {
    const key = expry(args.key, vars) as string;
    const items = args.items.map((i) => expry(i, vars)) as ReactNode[];
    return <Row key={key} items={items} />;
  },
  jsx$textField: (args, vars, expry) => {
    const key = expry(args.key, vars) as string;
    const name = expry(args.name, vars) as string;
    const label = expry(args.label, vars) as string;
    return <TextField key={key} name={name} label={label} />;
  },
  jsx$numberField: (args, vars, expry) => {
    const key = expry(args.key, vars) as string;
    const name = expry(args.name, vars) as string;
    const label = expry(args.label, vars) as string;
    return <NumberField key={key} name={name} label={label} />;
  },
  jsx$multiSelect: (args, vars, expry) => {
    const key = expry(args.key, vars) as string;
    const name = expry(args.name, vars) as string;
    const label = expry(args.label, vars) as string;
    const options = expry(args.options, vars) as {
      value: string;
      label: string;
    }[];
    const direction = expry(args.direction, vars) as "y" | "x";
    return (
      <MultiSelect
        key={key}
        name={name}
        label={label}
        options={options}
        direction={direction}
      />
    );
  },
  jsx$listbox: (args, vars, expry) => {
    const key = expry(args.key, vars) as string;
    const name = expry(args.name, vars) as string;
    const label = expry(args.label, vars) as string;
    const options = expry(args.options, vars) as {
      value: string;
      label: string;
    }[];
    return <Listbox key={key} name={name} label={label} options={options} />;
  },
  jsx$select: (args, vars, expry) => {
    const key = expry(args.key, vars) as string;
    const name = expry(args.name, vars) as string;
    const label = expry(args.label, vars) as string;
    const options = expry(args.options, vars) as {
      value: string;
      label: string;
    }[];
    const direction = expry(args.direction, vars) as "y" | "x";
    return (
      <Select
        key={key}
        name={name}
        label={label}
        options={options}
        direction={direction}
      />
    );
  },
  jsx$yesNo: (args, vars, expry) => {
    const key = expry(args.key, vars) as string;
    const name = expry(args.name, vars) as string;
    const label = expry(args.label, vars) as string;
    return <YesNo key={key} name={name} label={label} />;
  },
  jsx$nextButton: (args, vars, expry) => {
    const children = expry(args.children, vars) as ReactNode;
    return <NextButton>{children}</NextButton>;
  },
  jsx$backButton: () => {
    return <BackButton />;
  },
};
