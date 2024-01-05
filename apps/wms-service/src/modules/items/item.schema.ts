import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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

  @Prop()
  name: string;

  @Prop({
    default: true,
  })
  active: boolean;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
