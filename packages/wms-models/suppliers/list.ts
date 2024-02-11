import { PaginateRequest } from 'wms-utils/lib/paging';

export interface ListSupplierFilter {
  createdAt?: {
    from?: Date;
    to?: Date;
  };
  updatedAt?: {
    from?: Date;
    to?: Date;
  };
}

export interface ListSupplierRequest extends PaginateRequest<ListSupplierFilter> {}
