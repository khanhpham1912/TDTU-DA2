import { Module } from "@nestjs/common";
import { TasksService } from "./cron.job.service";
import { InventoryModule } from "../inventory/module";
import { ItemModule } from "../item/module";
import { HistoricalInventoryModule } from "../inventory.history/module";

@Module({
  imports: [InventoryModule, ItemModule, HistoricalInventoryModule],
  controllers: [],
  providers: [TasksService],
  exports: [],
})
export class CronJobModule {}
