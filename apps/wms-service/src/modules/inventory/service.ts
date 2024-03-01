import {
  AvailableInventoryItem,
  InventoryItem,
} from "wms-models/lib/inventory";
import { InboundOrderReadRepository } from "../inbound.order/repository";
import { OutboundOrderReadRepository } from "../outbound.order/repository";
import { InboundOrder } from "wms-models/lib/inbound";
import { OutboundOrder } from "wms-models/lib/outbound.order";
import { EStatus } from "wms-models/lib/shared";
import { calculateQuantity } from "./util/calculate.quantity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InventoryService {
  constructor(
    private readonly inboundReadRepo: InboundOrderReadRepository,
    private readonly outboundReadRepo: OutboundOrderReadRepository
  ) {}

  public async getInventoryItem(no: string): Promise<InventoryItem> {
    const inboundComplete: Promise<InboundOrder[]> = this.inboundReadRepo?.find(
      {
        "items.no": no,
        status: EStatus.COMPLETED,
      }
    );

    const outboundComplete: Promise<OutboundOrder[]> =
      this.outboundReadRepo?.find({
        "items.no": no,
        status: EStatus.COMPLETED,
      });

    const inboundNew: Promise<InboundOrder[]> = this.inboundReadRepo?.find({
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

    const inCompleteQuantity: number = calculateQuantity(inComplete, no);

    const outCompleteQuantity: number = calculateQuantity(outComplete, no);

    const inNewQuantity: number = calculateQuantity(inNew, no);

    const inInProgressQuantity: number = calculateQuantity(inInProgress, no);

    return {
      itemNo: no,
      inventories:
        inCompleteQuantity -
        outCompleteQuantity +
        inNewQuantity +
        inInProgressQuantity,
    } as InventoryItem;
  }

  public async getAvailableInventoryItem(
    no: string
  ): Promise<AvailableInventoryItem> {
    const inboundComplete: Promise<InboundOrder[]> = this.inboundReadRepo?.find(
      {
        "items.no": no,
        status: EStatus.COMPLETED,
      }
    );

    const outboundComplete: Promise<OutboundOrder[]> =
      this.outboundReadRepo?.find({
        "items.no": no,
        status: EStatus.COMPLETED,
      });

    const outboundNew: Promise<OutboundOrder[]> = this.outboundReadRepo?.find({
      "items.no": no,
      status: EStatus.NEW,
    });

    const outboundInProgress: Promise<OutboundOrder[]> =
      this.outboundReadRepo?.find({
        "items.no": no,
        status: EStatus.INPROGRESS,
      });

    const [inComplete, outComplete, outNew, outInProgress] = await Promise.all([
      inboundComplete,
      outboundComplete,
      outboundNew,
      outboundInProgress,
    ]);

    const inCompleteQuantity: number = calculateQuantity(inComplete, no);

    const outCompleteQuantity: number = calculateQuantity(outComplete, no);

    const outNewQuantity: number = calculateQuantity(outNew, no);

    const outInProgressQuantity: number = calculateQuantity(outInProgress, no);

    return {
      itemNo: no,
      availableInventories:
        inCompleteQuantity -
        outCompleteQuantity -
        outNewQuantity -
        outInProgressQuantity,
    } as AvailableInventoryItem;
  }
}
