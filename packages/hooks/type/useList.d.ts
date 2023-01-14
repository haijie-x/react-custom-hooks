export declare enum ACTION {
    SET_PAGE = "SET_PAGE",
    SET_SEARCH = "SET_SEARCH",
    SET_LIST = "SET_LIST",
    SET_IS_LOADING = "SET_IS_LOADING",
    SET_ERROR = "SET_ERROR"
}
interface IPageParams {
    pageSize: number;
    pageNum: number;
    total: number;
}
interface IState {
    data: any[];
    pageParams: IPageParams;
    searchParams: any;
    isLoading: boolean;
    error: any;
}
interface IUseListRes {
    config: IState;
    reset: () => void;
    fetch: (params?: any) => void;
    setField: (key: string, value: unknown) => void;
}
declare const useList: (fetchFn: (...args: unknown[]) => Promise<unknown>, initialConfig?: {
    initialData?: any;
    initialPageParams?: IPageParams;
    initialSearchParams?: any;
}) => IUseListRes;
export default useList;
