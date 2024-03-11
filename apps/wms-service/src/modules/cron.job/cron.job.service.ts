import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InventoryService } from "../inventory/service";
import { HistoricalInventoryService } from "../inventory.history/service";
import { ItemReadRepository } from "../item/repository";
import { Item } from "wms-models/lib/items";

@Injectable()
export class TasksService {
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly historicalInventoryService: HistoricalInventoryService,
    private readonly itemReadRepository: ItemReadRepository
  ) {}

  private readonly logger = new Logger(TasksService.name);
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    timeZone: "Asia/Ho_Chi_Minh",
  })
  async handleCron(): Promise<void> {
    const items: Item[] = await this.itemReadRepository.find({});

    const itemsNo: string[] = items.map((item: Item): string => item.no);

    for (const no of itemsNo) {
      const [
        itemHistoricalInventory,
        inventoriesLast24h,
        availableInventoriesLast24h,
      ] = await Promise.all([
        this.historicalInventoryService.getItemHistoricalInventory(no),
        this.inventoryService.getInventoryItemLast24h(no),
        this.inventoryService.getAvailableInventoryItemLast24h(no),
      ]);
      await this.historicalInventoryService.create({
        itemNo: no,
        inventories:
          (itemHistoricalInventory?.inventories || 0) +
          (inventoriesLast24h?.inventories || 0),
        availableInventories:
          (itemHistoricalInventory?.availableInventories || 0) +
          (availableInventoriesLast24h?.availableInventories || 0),
      });
    }

    this.logger.debug("Called when the every day at 12PM");
  }
}
