declare const useFetch: (fetchFn: (...args: unknown[]) => Promise<unknown>, fetchConfig?: {
    isManual?: boolean;
    initialValue?: unknown;
}) => {
    data: any;
    error: string;
    isLoading: boolean;
    fetch: () => void;
};
export default useFetch;
