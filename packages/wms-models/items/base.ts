import { BaseEntity, RefEntity } from "base-models";
import { EProductType, UOM } from "./enum";


export interface Dimension {
  length?: number;
  width?: number;
  height?: number;
}

export interface Item extends BaseEntity {
  no: string;
  sku: string;
  name?: string;
  description?: string;
  uom: UOM;
  type: EProductType;
  grossWeight?: number;
  netWeight?: number;
  productionDate?: Date;
  unitValue?: number;
  expiryDate?: Date;
  supplier?: RefEntity;
  dimension?: Dimension;

}