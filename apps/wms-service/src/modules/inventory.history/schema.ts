import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "src/database";
import { ModelTokens } from "wms-models/lib/common";
import { HistoricalInventory } from "wms-models/lib/inventory.history";

@Schema({
  collection: ModelTokens.HistoricalInventory,
  autoIndex: true,
  timestamps: true,
})
export class HistoricalInventoryDocument
  extends BaseSchema
  implements HistoricalInventory
{
  @Prop(String)
  itemNo: string;

  @Prop(Number)
  inventories: number;

  @Prop(Number)
  availableInventories: number;

  @Prop(String)
  _id: string;
}

export const HistoricalInventorySchema = SchemaFactory.createForClass(
  HistoricalInventoryDocument
);
