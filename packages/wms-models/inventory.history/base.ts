import { BaseEntity } from "base-models";

export interface HistoricalInventory extends BaseEntity {
  itemNo: string;
  inventories: number;
  availableInventories: number;
}