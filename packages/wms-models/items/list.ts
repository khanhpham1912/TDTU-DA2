import { PaginateRequest } from 'wms-utils/lib/paging';
import { EProductType } from './enum';

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
  type?: EProductType
}

export interface ListItemRequest extends PaginateRequest<ListItemFilter> {}
