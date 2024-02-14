import { Module } from "@nestjs/common";
import { InventoryService } from "./service";
import { InboundOrderModule } from "../inbound.order/module";
import { OutboundOrderModule } from "../outbound.order/module";
import { InventoryController } from "./controller";

@Module({
  imports: [InboundOrderModule, OutboundOrderModule],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [],
})
export class InventoryModule {}
