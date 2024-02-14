import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  InboundOrderReadRepository,
  InboundOrderWriteRepository,
} from "./repository";
import { ModelTokens } from "wms-models/lib/common";
import { InboundOrderSchema } from "./schema";
import { InboundOrderController } from "./controller";
import { CounterModule } from "../counter/counter.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelTokens.InBound,
        schema: InboundOrderSchema,
      },
    ]),
    CounterModule,
  ],
  controllers: [InboundOrderController],
  providers: [InboundOrderReadRepository, InboundOrderWriteRepository],
  exports: [InboundOrderReadRepository],
})
export class InboundOrderModule {}
