import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ModelTokens } from "wms-models/lib/common";

import { CounterModule } from "../counter/counter.module";
import { ItemReadRepository, ItemWriteRepository } from "./repository";
import { ItemSchema } from "./schema";
import { ItemController } from "./controller";
import { InboundOrderModule } from "../inbound.order/module";
import { OutboundOrderModule } from "../outbound.order/module";
import { InventoryModule } from "../inventory/module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelTokens.Item,
        schema: ItemSchema,
      },
    ]),
    CounterModule,
    InboundOrderModule,
    OutboundOrderModule,
    forwardRef(() => InventoryModule),
  ],
  controllers: [ItemController],
  providers: [ItemReadRepository, ItemWriteRepository],
  exports: [ItemReadRepository],
})
export class ItemModule {}
