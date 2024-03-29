import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { BaseSchema } from "src/database";
import { RefEntityDocument, RefEntitySchema } from "src/schema/refEntity";
import { ModelTokens } from "wms-models/lib/common";
import { RefCustomFieldMapping } from "wms-models/lib/custom.field.mapping";
import { Dimension, EProductType, Item, UOM } from "wms-models/lib/items";

@Schema({ _id: false })
class DimensionDocument implements Dimension {
  @Prop(String)
  length?: number;

  @Prop(String)
  width?: number;

  @Prop(String)
  height?: number;
}
const DimensionSchema = SchemaFactory.createForClass(DimensionDocument);

@Schema({
  collection: ModelTokens.Item,
  autoIndex: true,
  timestamps: true,
})
export class ItemDocument extends BaseSchema implements Item {
  @Prop(String)
  _id: string;

  @Prop(String)
  no: string;

  @Prop(String)
  sku: string;

  @Prop(String)
  name?: string;

  @Prop(String)
  description?: string;

  @Prop(String)
  uom: UOM;

  @Prop(String)
  type: EProductType;

  @Prop(Number)
  grossWeight?: number;

  @Prop(Number)
  netWeight?: number;

  @Prop(Date)
  productionDate?: Date;

  @Prop(Date)
  expiryDate?: Date;

  @Prop({ type: RefEntitySchema })
  supplier?: RefEntityDocument;

  @Prop({ type: DimensionSchema })
  dimension?: DimensionDocument;

  @Prop(Number)
  unitValue?: number;

  @Prop({ type: SchemaTypes.Mixed })
  customFieldMapping?: RefCustomFieldMapping;
}

export const ItemSchema = SchemaFactory.createForClass(ItemDocument);
ItemSchema.index({ no: 1 }, { unique: true });
