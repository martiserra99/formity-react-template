import { useCallback, useState } from "react";

import { Formity, OnReturn, ReturnValues } from "@formity/react";

import { Data } from "./components";

import { schema, Values, Inputs, Params } from "./schema";

import { Animate } from "./animate";

export default function App() {
  const [animate, setAnimate] = useState<Animate>("none");

  const [values, setValues] = useState<ReturnValues<Values> | null>(null);

  const onReturn = useCallback<OnReturn<Values>>((values) => {
    setValues(values);
  }, []);

  if (values) {
    return <Data data={values} onStart={() => setValues(null)} />;
  }

  return (
    <Formity<Values, Inputs, Params>
      schema={schema}
      params={{ animate, setAnimate }}
      onReturn={onReturn}
    />
  );
}
