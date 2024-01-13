import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { EStatus } from 'src/enums/status.enum';
import getCode from 'src/utils/random.code.util';
import { ItemQuantityOutbound } from './item.quantity.outbound.schema';

export type OutboundDocument = HydratedDocument<Outbound>;
@Schema({
  timestamps: true,
})
export class Outbound {
  @Prop({
    default: `OB${getCode()}`,
    unique: true,
  })
  code: string;

  @Prop({
    default: EStatus.NEW,
    type: String,
  })
  status: EStatus;

  @Prop({
    default: [],
  })
  items: ItemQuantityOutbound[];

  @Prop({
    default: true,
  })
  active: boolean;
}

export const OutboundSchema = SchemaFactory.createForClass(Outbound);
