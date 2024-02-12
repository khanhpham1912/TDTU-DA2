import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "src/database";
import { RefEntityDocument, RefEntitySchema } from "src/schema/refEntity";
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

@Schema()
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
}

export const ItemSchema = SchemaFactory.createForClass(ItemDocument);
