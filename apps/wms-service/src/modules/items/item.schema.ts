import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ItemDocument = HydratedDocument<Item>;
@Schema({
  timestamps: true,
})
export class Item {
  @Prop({
    unique: true,
  })
  sku: string;

  @Prop()
  name: string;

  @Prop({
    default: 0,
  })
  inventory: number;

  @Prop({
    default: 0,
  })
  availableInventory: number;

  @Prop({
    default: true,
  })
  active: boolean;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
