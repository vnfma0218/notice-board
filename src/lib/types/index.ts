export enum AlertTypes {
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
}

export type PagingParamsType = {
  page: number;
  limit: number;
};
export interface PagingResponseType<T> {
  total: number;
  pageCount: number;
  next?: {
    page: number;
    limit: number;
  };
  prev?: {
    page: number;
    limit: number;
  };
  results: T;
}
