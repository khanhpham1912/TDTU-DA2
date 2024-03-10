import { Module, forwardRef } from "@nestjs/common";
import { InventoryService } from "./service";
import { InboundOrderModule } from "../inbound.order/module";
import { OutboundOrderModule } from "../outbound.order/module";
import { InventoryController } from "./controller";
import { HistoricalInventoryModule } from "../inventory.history/module";

@Module({
  imports: [
    forwardRef(() => OutboundOrderModule),
    forwardRef(() => InboundOrderModule),
    HistoricalInventoryModule,
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
