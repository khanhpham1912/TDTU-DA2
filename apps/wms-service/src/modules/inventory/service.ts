import { InventoryItem } from "wms-models/lib/inventory";
import { InboundOrderReadRepository } from "../inbound.order/repository";
import { OutboundOrderReadRepository } from "../outbound.order/repository";
import { InboundOrder } from "wms-models/lib/inbound";
import { OutboundOrder } from "wms-models/lib/outbound.order";
import { EStatus } from "wms-models/lib/shared";
import { calculateQuantity } from "./util/calculate.quantity";

export class InventoryService {
  constructor(
    private readonly inboundReadRepo: InboundOrderReadRepository,
    private readonly outboundReadRepo: OutboundOrderReadRepository
  ) {}

  public async getInventoryItem(no: string): Promise<InventoryItem> {
    const inboundComplete: Promise<InboundOrder[]> = this.inboundReadRepo.find({
      "items.no": no,
      status: EStatus.COMPLETED,
    });

    const outboundComplete: Promise<OutboundOrder[]> =
      this.outboundReadRepo.find({
        "items.no": no,
        status: EStatus.COMPLETED,
      });

    const inboundNew: Promise<InboundOrder[]> = this.inboundReadRepo.find({
      "items.no": no,
      status: EStatus.NEW,
    });

    const inboundInProgress: Promise<InboundOrder[]> =
      this.inboundReadRepo.find({
        "items.no": no,
        status: EStatus.INPROGRESS,
      });

    const [inComplete, outComplete, inNew, inInProgress] = await Promise.all([
      inboundComplete,
      outboundComplete,
      inboundNew,
      inboundInProgress,
    ]);

    let inCompleteQuantity: number = calculateQuantity(inComplete, no);

    let outCompleteQuantity: number = calculateQuantity(outComplete, no);

    let inNewQuantity: number = calculateQuantity(inNew, no);

    let inInProgressQuantity: number = calculateQuantity(inInProgress, no);

    return {
      itemNo: no,
      inventories:
        inCompleteQuantity -
        outCompleteQuantity +
        inNewQuantity +
        inInProgressQuantity,
    } as InventoryItem;
  }
}
