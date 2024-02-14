import { PaginateRequest } from 'wms-utils/lib/paging';

export interface ListOutboundOrderFilter {
  createdAt?: {
    from?: Date;
    to?: Date;
  };
  updatedAt?: {
    from?: Date;
    to?: Date;
  };
}

export interface ListOutboundOrderRequest extends PaginateRequest<ListOutboundOrderFilter> {}
