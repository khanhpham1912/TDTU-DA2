import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { EStatus } from 'src/enums/status.enum';
import getCode from 'src/utils/random.code.util';
import { ItemQuantityInbound } from './item.quantity.inbound.schema';

export type InboundDocument = HydratedDocument<Inbound>;
@Schema({
  timestamps: true,
})
export class Inbound {
  @Prop({
    default: `IB${getCode()}`,
    unique: true,
    type: String,
  })
  code: string;

  @Prop({
    default: EStatus.NEW,
    type: String,
  })
  status: EStatus;

  @Prop([{ type: ItemQuantityInbound }])
  items: ItemQuantityInbound[];

  @Prop(Boolean)
  active: boolean;
}

export const InboundSchema = SchemaFactory.createForClass(Inbound);
