import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  OutboundOrderReadRepository,
  OutboundOrderWriteRepository,
} from "./repository";
import { ModelTokens } from "wms-models/lib/common";
import { OutboundOrderSchema } from "./schema";
import { OutboundOrderController } from "./controller";
import { CounterModule } from "../counter/counter.module";
import { InventoryModule } from "../inventory/module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelTokens.OutBound,
        schema: OutboundOrderSchema,
      },
    ]),
    CounterModule,
    forwardRef(() => InventoryModule),
  ],
  controllers: [OutboundOrderController],
  providers: [OutboundOrderReadRepository, OutboundOrderWriteRepository],
  exports: [OutboundOrderReadRepository],
})
export class OutboundOrderModule {}
