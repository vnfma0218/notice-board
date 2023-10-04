export enum AlertTypes {
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
}

export enum SearchTypes {
  asc = 'asc',
  desc = 'desc',
  likeCount = 'likeCount',
}

export type PagingParamsType = {
  page: number;
  limit: number;
  type: SearchTypes;
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
