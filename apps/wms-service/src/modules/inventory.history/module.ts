import { Module } from "@nestjs/common";
import { HistoricalInventoryService } from "./service";
import { MongooseModule } from "@nestjs/mongoose";
import { ModelTokens } from "wms-models/lib/common";
import { HistoricalInventorySchema } from "./schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelTokens.HistoricalInventory,
        schema: HistoricalInventorySchema,
      },
    ]),
  ],
  controllers: [],
  providers: [HistoricalInventoryService],
  exports: [HistoricalInventoryService],
})
export class HistoricalInventoryModule {}
