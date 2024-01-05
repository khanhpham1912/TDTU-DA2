import { InboundDocument } from 'src/modules/inbounds/schemas/inbound.schema';
import { OutboundDocument } from 'src/modules/outbounds/schemas/outbound.schema';

export type ResponseAvailableInventoryType = [
  inboundsCompleted: InboundDocument[],
  outboundsCompleted: OutboundDocument[],
  outboundsNew: OutboundDocument[],
];
