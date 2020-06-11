import { useMemo } from "react";

// eslint-disable-next-line
export const useId = (prefix?: string) => useMemo( () => `${prefix ? prefix + "-" : ""}${Math.random()}`, [] );