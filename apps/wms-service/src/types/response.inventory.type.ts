import { InboundDocument } from 'src/modules/inbounds/schemas/inbound.schema';
import { OutboundDocument } from 'src/modules/outbounds/schemas/outbound.schema';

export type ResponseInventoryType = [
  inboundsCompleted: InboundDocument[],
  outboundsCompleted: OutboundDocument[],
  inboundsNew: InboundDocument[],
];
