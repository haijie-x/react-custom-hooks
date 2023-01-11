import { useState, useRef } from "react";

const useSyncState = (
  initialValue?: unknown
): [any, (val: unknown) => void] => {
  const state = useRef(initialValue);
  const [, forceUpdate] = useState<null | {}>(null);

  const dispatch = (val: unknown) => {
    state.current = typeof val === "function" ? val(state.current) : val;
    forceUpdate({});
  };

  return [state, dispatch];
};

export default useSyncState;
