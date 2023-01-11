import { useState } from "react";
const debounce = (fn: Function, delay: number) => {
  let timer: NodeJS.Timer | null = null;
  return (...args: unknown[]) => {
    if (timer) {
      clearTimeout(timer);
      return;
    }
    timer = setInterval(() => {
      fn.apply(this, args);
    }, delay);
  };
};

const useDebounce = <T>(
  initialValue: T,
  delay: number
): [T, React.Dispatch<unknown>] => {
  const [state, setState] = useState(initialValue);
  const processedSetState = debounce(setState, delay);
  return [state, processedSetState];
};

export default useDebounce;
