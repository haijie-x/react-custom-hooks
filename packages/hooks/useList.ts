import { useReducer } from "react";

export enum ACTION {
  SET_PAGE = "SET_PAGE",
  SET_SEARCH = "SET_SEARCH",
  SET_LIST = "SET_LIST",
  SET_IS_LOADING = "SET_IS_LOADING",
  SET_ERROR = "SET_ERROR",
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

interface IAction {
  type: ACTION;
  payload: any;
}

interface IUseListRes {
  config: IState;
  reset: () => void;
  fetch: (params?: any) => void;
  setField: (key: string, value: unknown) => void;
}
const useList = (
  fetchFn: (...args: unknown[]) => Promise<unknown>,
  initialConfig?: {
    initialData?: any;
    initialPageParams?: IPageParams;
    initialSearchParams?: any;
  }
): IUseListRes => {
  const {
    initialData = [],
    initialPageParams = {},
    initialSearchParams = {},
  } = initialConfig || {};

  const reducer = (state: IState, action: IAction) => {
    const { type, payload } = action;
    switch (type) {
      case ACTION.SET_LIST:
        return {
          ...state,
          data: payload,
        };
      case ACTION.SET_SEARCH:
        console.log(payload);

        return {
          ...state,
          searchParams: payload,
        };
      case ACTION.SET_PAGE:
        return {
          ...state,
          pageParams: payload,
        };
      case ACTION.SET_IS_LOADING:
        return {
          ...state,
          isLoading: payload,
        };
      case ACTION.SET_ERROR:
        return {
          ...state,
          error: payload,
        };
      default:
        return state;
    }
  };

  const [config, dispatch] = useReducer(reducer, {
    data: initialData,
    pageParams: initialPageParams,
    searchParams: initialSearchParams,
    isLoading: false,
    error: undefined,
  });

  const fetch = (params?: IPageParams & any) => {
    dispatch({ type: ACTION.SET_IS_LOADING, payload: true });
    fetchFn(params ? params : { ...config.pageParams, ...config.searchParams })
      .then((res) => {
        dispatch({ type: ACTION.SET_ERROR, payload: false });
        dispatch({ type: ACTION.SET_LIST, payload: res });
      })
      .catch((error) => {
        dispatch({ type: ACTION.SET_ERROR, payload: error });
      })
      .finally(() => {
        dispatch({ type: ACTION.SET_IS_LOADING, payload: false });
      });
  };

  const reset = () => {
    dispatch({ type: ACTION.SET_SEARCH, payload: { ...initialSearchParams } });
    fetch({ ...initialSearchParams, ...initialPageParams });
  };

  const setField = (key: string, value: unknown) => {
    dispatch({
      type: ACTION.SET_SEARCH,
      payload: { [key]: value },
    });
  };
  return {
    config,
    fetch,
    reset,
    setField,
  };
};

export default useList;
