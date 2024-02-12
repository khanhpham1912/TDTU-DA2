import { BaseEntity } from "base-models";
import { OrderItem } from "../shared";

export interface InboundOrderItem extends OrderItem {
  batchNo?: string;
}

export interface Shipper {
  shipperName?: string;
  shipperPhone?: string;
  shipperLicense?: string;
}

export interface InboundOrder extends BaseEntity {
  no: string;
  shipper: Shipper;
  items: InboundOrderItem[];
  totalNetWeight: number;
  totalGrossWeight: number;
  totalVolume: number;
  totalValue: number;
  remark?: string;
}