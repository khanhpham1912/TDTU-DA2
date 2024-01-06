import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { E_PRODUCT_TYPE } from 'src/enums/product.type.enum';
import { UOM } from 'src/enums/uom.enum';

export type ItemDocument = HydratedDocument<Item>;
@Schema({
  timestamps: true,
})
export class Item {
  @Prop({
    type: String,
    unique: true,
  })
  sku: string;

  @Prop(String)
  name: string;

  @Prop(String)
  description: string;

  @Prop(String)
  uom: UOM;

  @Prop(String)
  type: E_PRODUCT_TYPE;

  @Prop({
    default: true,
    type: Boolean,
  })
  active: boolean;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
