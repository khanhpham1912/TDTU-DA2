import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseSchema } from "src/database";
import { EProductType, UOM } from "wms-models/lib/items";
import { ModelTokens } from "wms-models/lib/common";

export type ItemDocument = HydratedDocument<Item>;

@Schema({
  timestamps: true,
  collection: ModelTokens.Item,
  autoIndex: true,
})
export class Item extends BaseSchema {
  @Prop(Boolean)
  sku: string;

  @Prop(String)
  name: string;

  @Prop(String)
  description: string;

  @Prop(String)
  uom: UOM;

  @Prop(String)
  type: EProductType;

  @Prop(Boolean)
  active: boolean;

  @Prop(Number)
  grossWeight: number;

  @Prop(Number)
  netWeight: Number;

  @Prop(Date)
  productionDate: Date;

  @Prop(Date)
  expiryDate: Date;

  @Prop(String)
  supplier: string;

  @Prop(Number)
  length: number;

  @Prop(Number)
  width: number;

  @Prop(Number)
  height: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
