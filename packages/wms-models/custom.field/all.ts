import { PaginateRequest } from 'wms-utils/lib/paging';

export interface ListAllCustomFieldFilter {
  createdAt?: {
    from?: Date;
    to?: Date;
  };
  updatedAt?: {
    from?: Date;
    to?: Date;
  };
}

export interface ListAllCustomFieldRequest extends PaginateRequest<ListAllCustomFieldFilter> {}
