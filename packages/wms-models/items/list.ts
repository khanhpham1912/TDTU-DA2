import { PaginateRequest } from 'wms-utils/lib/paging';

export interface ListItemFilter {
  createdAt?: {
    from?: Date;
    to?: Date;
  };
  updatedAt?: {
    from?: Date;
    to?: Date;
  };
  supplierNo?: string
  uom?: string
}

export interface ListItemRequest extends PaginateRequest<ListItemFilter> {}
