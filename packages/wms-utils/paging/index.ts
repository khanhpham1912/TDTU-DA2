import { FilterOption, Sort } from '../filter';

export interface DetailRequest {
  _id: string;
  selects?: string[];
}

export interface PaginateRequest<T> {
  filter?: any;
  paging?: {
    currentPage?: number; // default = 1
    pageSize?: number; // limit 50
  };
  sort?: Sort;
  search?: string;
  selects?: string[];
  join?: string[];
}

export interface PaginateResponse<T> {
  docs: T[];
  paging: {
    currentPage: number;
    pageSize: number; // limit
    pageTotal: number; // total page
    totalSize: number; // total record
  };
}

export const mapPaging = <TDoc>(
  docs: TDoc[],
  total: number = 0,
  option: FilterOption,
): PaginateResponse<TDoc> => {
  const currentPage = option.offset / option.limit + 1;
  const totalPages = Math.ceil(total / option.limit);

  return {
    docs,
    paging: {
      currentPage,
      pageSize: option.limit,
      pageTotal: totalPages,
      totalSize: total,
    },
  };
};
