import { BaseEntity } from "base-models";
import { EProductType, UOM } from "./enum";

export interface Item extends BaseEntity {
  sku: string;
  name?: string;
  description?: string;
  uom: UOM;
  type: EProductType;
  grossWeight?: number;
  netWeight?: number;
  productionDate?: Date;
  expiryDate?: Date;
  supplier?: string;
  length?: number;
  width?: number;
  height?: number;
}