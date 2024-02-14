import { PaginateRequest } from 'wms-utils/lib/paging';

export interface ListInboundOrderFilter {
  createdAt?: {
    from?: Date;
    to?: Date;
  };
  updatedAt?: {
    from?: Date;
    to?: Date;
  };
}

export interface ListInboundOrderRequest extends PaginateRequest<ListInboundOrderFilter> {}
