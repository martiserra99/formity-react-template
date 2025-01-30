import type { OnNext, OnBack, GetState, SetState } from "@formity/react";

export interface ControllerValue {
  shifting: boolean;
  onNext: OnNext;
  onBack: OnBack;
  getState: GetState;
  setState: SetState;
}
