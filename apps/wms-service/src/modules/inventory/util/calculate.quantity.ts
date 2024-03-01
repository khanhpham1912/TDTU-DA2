import { InboundOrder, InboundOrderItem } from "wms-models/lib/inbound";
import {
  OutboundOrder,
  OutboundOrderItem,
} from "wms-models/lib/outbound.order";

export function calculateQuantity(
  list: InboundOrder[] | OutboundOrder[],
  itemNo: string
): number {
  let quantity: number = 0;
  list?.forEach((inbound: InboundOrder | OutboundOrder): void => {
    inbound?.items?.forEach(
      (item: InboundOrderItem | OutboundOrderItem): void => {
        if (item.no === itemNo) quantity += item.itemCount;
      }
    );
  });

  return quantity;
}
