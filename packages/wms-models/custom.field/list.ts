import { PaginateRequest } from 'wms-utils/lib/paging';
import { ECustomFieldType } from '../shared';

export interface ListCustomFieldFilter {
  createdAt?: {
    from?: Date;
    to?: Date;
  };
  updatedAt?: {
    from?: Date;
    to?: Date;
  };
  type?: ECustomFieldType;
}

export interface ListCustomFieldRequest extends PaginateRequest<ListCustomFieldFilter> {}
