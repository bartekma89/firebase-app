import { useState } from "react";

export function useAsyncState<T = unknown>(
  initialValue: T
): [T, (arg: T) => Promise<T>] {
  const [value, setValue] = useState(initialValue);
  const setter = (x: T): Promise<T> =>
    new Promise((resolve) => {
      setValue(x);
      resolve(x);
    });
  return [value, setter];
}
