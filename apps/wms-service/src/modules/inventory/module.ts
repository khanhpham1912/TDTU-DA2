import { Module } from "@nestjs/common";
import { InventoryService } from "./service";
import { InboundOrderModule } from "../inbound.order/module";
import { OutboundOrderModule } from "../outbound.order/module";
import { InventoryController } from "./controller";
import { HistoricalInventoryModule } from "../inventory.history/module";

@Module({
  imports: [InboundOrderModule, OutboundOrderModule, HistoricalInventoryModule],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
