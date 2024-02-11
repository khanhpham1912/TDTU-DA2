import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Inbound, InboundSchema } from "../inbounds/schemas/inbound.schema";
import { Outbound, OutboundSchema } from "../outbounds/schemas/outbound.schema";
import { Item, ItemSchema } from "./item.schema";
import { ItemsController } from "./items.controller";
import { ItemsRepository } from "./items.repository";
import { ItemsService } from "./items.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Item.name,
        schema: ItemSchema,
      },
      {
        name: Outbound.name,
        schema: OutboundSchema,
      },
      {
        name: Inbound.name,
        schema: InboundSchema,
      },
    ]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService, ItemsRepository],
  exports: [ItemsRepository],
})
export class ItemsModule {}
