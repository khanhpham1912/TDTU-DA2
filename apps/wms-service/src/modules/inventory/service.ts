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
import { HistoricalInventoryService } from "../inventory.history/service";
import { HistoricalInventory } from "wms-models/lib/inventory.history";

@Injectable()
export class InventoryService {
  constructor(
    private readonly inboundReadRepo: InboundOrderReadRepository,
    private readonly outboundReadRepo: OutboundOrderReadRepository,
    private readonly historicalInventoryService: HistoricalInventoryService
  ) {}

  public async getInventoryItem(no: string): Promise<InventoryItem> {
    const startTime: number = performance.now();

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

    const endTime: number = performance.now();

    console.log(
      `Calculate inventories took ${endTime - startTime} milliseconds`
    );
    return {
      itemNo: no,
      inventories:
        inCompleteQuantity -
        outCompleteQuantity +
        inNewQuantity +
        inInProgressQuantity,
    } as InventoryItem;
  }

  public async getInventoryItemLast24h(no: string): Promise<InventoryItem> {
    //60
    const createdAt = { $gte: new Date(Date.now() - 24 * 50 * 60 * 1000) };

    const inboundComplete: Promise<InboundOrder[]> = this.inboundReadRepo?.find(
      {
        "items.no": no,
        status: EStatus.COMPLETED,
        createdAt,
      }
    );

    const outboundComplete: Promise<OutboundOrder[]> =
      this.outboundReadRepo?.find({
        "items.no": no,
        status: EStatus.COMPLETED,
        createdAt,
      });

    const inboundNew: Promise<InboundOrder[]> = this.inboundReadRepo?.find({
      "items.no": no,
      status: EStatus.NEW,
      createdAt,
    });

    const inboundInProgress: Promise<InboundOrder[]> =
      this.inboundReadRepo.find({
        "items.no": no,
        status: EStatus.INPROGRESS,
        createdAt,
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

  public async getInventoryItemFromMidNightToNow(
    no: string
  ): Promise<InventoryItem> {
    const startTime: number = performance.now();

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const createdAt = { $gte: start, $lt: end };

    const inboundComplete: Promise<InboundOrder[]> = this.inboundReadRepo?.find(
      {
        "items.no": no,
        status: EStatus.COMPLETED,
        createdAt,
      }
    );
    const outboundComplete: Promise<OutboundOrder[]> =
      this.outboundReadRepo?.find({
        "items.no": no,
        status: EStatus.COMPLETED,
        createdAt,
      });

    const inboundNew: Promise<InboundOrder[]> = this.inboundReadRepo?.find({
      "items.no": no,
      status: EStatus.NEW,
      createdAt,
    });
    const inboundInProgress: Promise<InboundOrder[]> =
      this.inboundReadRepo.find({
        "items.no": no,
        status: EStatus.INPROGRESS,
        createdAt,
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

    const previousInventory: HistoricalInventory =
      await this.historicalInventoryService.getItemHistoricalInventory(no);
    const endTime: number = performance.now();
    console.log(
      `Calculate inventories took ${endTime - startTime} milliseconds`
    );

    return {
      itemNo: no,
      inventories:
        inCompleteQuantity -
        outCompleteQuantity +
        inNewQuantity +
        inInProgressQuantity +
        previousInventory.inventories,
    } as InventoryItem;
  }

  public async getAvailableInventoryItem(
    no: string
  ): Promise<AvailableInventoryItem> {
    const startTime: number = performance.now();

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

    const endTime: number = performance.now();

    console.log(
      `Calculate available inventories took ${endTime - startTime} milliseconds`
    );
    return {
      itemNo: no,
      availableInventories:
        inCompleteQuantity -
        outCompleteQuantity -
        outNewQuantity -
        outInProgressQuantity,
    } as AvailableInventoryItem;
  }

  public async getAvailableInventoryItemLast24h(
    no: string
  ): Promise<AvailableInventoryItem> {
    const createdAt = { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) };
    const inboundComplete: Promise<InboundOrder[]> = this.inboundReadRepo?.find(
      {
        "items.no": no,
        status: EStatus.COMPLETED,
        createdAt,
      }
    );
    const outboundComplete: Promise<OutboundOrder[]> =
      this.outboundReadRepo?.find({
        "items.no": no,
        status: EStatus.COMPLETED,
        createdAt,
      });
    const outboundNew: Promise<OutboundOrder[]> = this.outboundReadRepo?.find({
      "items.no": no,
      status: EStatus.NEW,
      createdAt,
    });
    const outboundInProgress: Promise<OutboundOrder[]> =
      this.outboundReadRepo?.find({
        "items.no": no,
        status: EStatus.INPROGRESS,
        createdAt,
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

  public async getAvailableInventoryItemFromMidNightToNow(
    no: string
  ): Promise<AvailableInventoryItem> {
    const startTime: number = performance.now();

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const createdAt = { $gte: start, $lt: end };

    const inboundComplete: Promise<InboundOrder[]> = this.inboundReadRepo?.find(
      {
        "items.no": no,
        status: EStatus.COMPLETED,
        createdAt,
      }
    );

    const outboundComplete: Promise<OutboundOrder[]> =
      this.outboundReadRepo?.find({
        "items.no": no,
        status: EStatus.COMPLETED,
        createdAt,
      });

    const outboundNew: Promise<OutboundOrder[]> = this.outboundReadRepo?.find({
      "items.no": no,
      status: EStatus.NEW,
      createdAt,
    });

    const outboundInProgress: Promise<OutboundOrder[]> =
      this.outboundReadRepo?.find({
        "items.no": no,
        status: EStatus.INPROGRESS,
        createdAt,
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

    const endTime: number = performance.now();

    const previousInventory: HistoricalInventory =
      await this.historicalInventoryService.getItemHistoricalInventory(no);

    console.log(
      `Calculate available inventories took ${endTime - startTime} milliseconds`
    );
    return {
      itemNo: no,
      availableInventories:
        inCompleteQuantity -
        outCompleteQuantity -
        outNewQuantity -
        outInProgressQuantity +
        previousInventory.availableInventories,
    } as AvailableInventoryItem;
  }
}
