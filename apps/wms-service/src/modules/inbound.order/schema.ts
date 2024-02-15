import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { BaseSchema } from "src/database";
import { RefEntityDocument, RefEntitySchema } from "src/schema/refEntity";
import { ModelTokens } from "wms-models/lib/common";
import { RefCustomFieldMapping } from "wms-models/lib/custom.field.mapping";
import {
  InboundOrder,
  InboundOrderItem,
  Shipper,
} from "wms-models/lib/inbound";
import { UOM, EProductType, Dimension } from "wms-models/lib/items";
import { EStatus } from "wms-models/lib/shared";

@Schema({ _id: false })
class ShipperDocument implements Shipper {
  @Prop(String)
  shipperName?: string;

  @Prop(String)
  shipperPhone?: string;

  @Prop(String)
  shipperLicense?: string;
}
const ShipperSchema = SchemaFactory.createForClass(ShipperDocument);

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

@Schema({ _id: false })
class InboundOrderItemDocument implements InboundOrderItem {
  @Prop(String)
  batchNo?: string;

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

  @Prop(Number)
  unitValue?: number;

  @Prop(Date)
  productionDate?: Date;

  @Prop(Date)
  expiryDate?: Date;

  @Prop({ type: RefEntitySchema })
  supplier?: RefEntityDocument;

  @Prop({ type: DimensionSchema })
  dimension?: DimensionDocument;

  @Prop(Number)
  itemCount: number;

  @Prop(String)
  barcode: string;
}
const InboundOrderItemSchema = SchemaFactory.createForClass(
  InboundOrderItemDocument
);

@Schema({
  collection: ModelTokens.InBound,
  autoIndex: true,
  timestamps: true,
})
export class InboundOrderDocument extends BaseSchema implements InboundOrder {
  @Prop(String)
  no: string;

  @Prop({ type: ShipperSchema })
  shipper: ShipperDocument;

  @Prop([{ type: InboundOrderItemSchema }])
  items: InboundOrderItemDocument[];

  @Prop(Number)
  totalNetWeight: number;

  @Prop(Number)
  totalGrossWeight: number;

  @Prop(Number)
  totalVolume: number;

  @Prop(Number)
  totalValue: number;

  @Prop(String)
  remark?: string;

  @Prop(String)
  status: EStatus;

  @Prop({ type: SchemaTypes.Mixed })
  customFieldMapping?: RefCustomFieldMapping;
}

export const InboundOrderSchema =
  SchemaFactory.createForClass(InboundOrderDocument);
