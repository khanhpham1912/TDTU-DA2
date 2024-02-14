import { RefEntity } from "base-models";
import { Dimension, EProductType, UOM } from "../items";

export interface OrderItem{
  no: string;
  sku: string;
  name?: string;
  description?: string;
  uom: UOM;
  type: EProductType;
  grossWeight?: number;
  netWeight?: number;
  unitValue?: number;
  productionDate?: Date;
  expiryDate?: Date;
  supplier?: RefEntity;
  dimension?: Dimension;
  itemCount: number;
  barcode: string;

}
