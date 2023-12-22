import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Status } from 'src/enums/status.enum';
import { ItemQuantity } from 'src/modules/inbounds/dto/item.quantity.type';
import getCode from 'src/utils/random.code.util';

export type InboundDocument = HydratedDocument<Inbound>;
@Schema({
  timestamps: true,
})
export class Inbound {
  @Prop({
    default: `IB${getCode()}`,
  })
  code: string;

  @Prop({
    default: Status.New,
    enum: Status,
  })
  status: string;

  @Prop({
    default: [],
  })
  items: ItemQuantity[];

  @Prop({
    default: true,
  })
  active: boolean;
}

export const InboundSchema = SchemaFactory.createForClass(Inbound);
