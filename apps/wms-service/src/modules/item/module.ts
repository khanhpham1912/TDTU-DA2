import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ModelTokens } from "wms-models/lib/common";

import { CounterModule } from "../counter/counter.module";
import { ItemReadRepository, ItemWriteRepository } from "./repository";
import { ItemSchema } from "./schema";
import { ItemController } from "./controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelTokens.Item,
        schema: ItemSchema,
      },
    ]),
    CounterModule,
  ],
  controllers: [ItemController],
  providers: [ItemReadRepository, ItemWriteRepository],
  exports: [],
})
export class ItemModule {}
