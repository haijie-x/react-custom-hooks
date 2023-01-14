/// <reference types="react" />
declare const useDebounce: <T>(initialValue: T, delay: number) => [T, import("react").Dispatch<unknown>];
export default useDebounce;
