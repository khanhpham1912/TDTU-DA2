import { BaseEntity } from "base-models";
import { EProductType, UOM } from "./enum";
import { RefEntity } from "../shared";


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
  expiryDate?: Date;
  supplier?: RefEntity;
  dimensions?: Dimension;
}