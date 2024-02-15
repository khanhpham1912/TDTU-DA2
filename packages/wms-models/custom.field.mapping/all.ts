import { PaginateRequest } from 'wms-utils/lib/paging';

export interface ListAllCustomFieldMappingFilter {
  entity: string;
}

export interface ListAllCustomFieldMappingRequest
  extends PaginateRequest<ListAllCustomFieldMappingFilter> {}
