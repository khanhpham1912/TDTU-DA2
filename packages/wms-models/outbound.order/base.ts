import { BaseEntity } from "base-models";
import { EStatus, OrderItem } from "../shared";
import { RefCustomFieldMapping } from "../custom.field.mapping";

export interface OutboundOrderItem extends OrderItem {
  batchNo?: string;
}

export interface Shipper {
  shipperName?: string;
  shipperPhone?: string;
  shipperLicense?: string;
}

export interface OutboundOrder extends BaseEntity {
  no: string;
  shipper: Shipper;
  items: OutboundOrderItem[];
  totalNetWeight: number;
  totalGrossWeight: number;
  totalVolume: number;
  totalValue: number;
  remark?: string;
  status: EStatus
  customFieldMapping?: RefCustomFieldMapping;

}