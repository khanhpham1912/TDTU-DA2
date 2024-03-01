import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseWriteRepository, ItemDeletedResponse } from "src/database";
import { ModelTokens } from "wms-models/lib/common";
import { CounterService } from "src/modules/counter/counter.service";
import { Item } from "wms-models/lib/items";
import { CounterFormat, CounterPrefix } from "src/common";
import { ItemDto } from "../dto/base";
import { OutboundOrderReadRepository } from "src/modules/outbound.order/repository";
import { InboundOrderReadRepository } from "src/modules/inbound.order/repository";
import { ItemReadRepository } from "./read.repository";
import { InboundOrder } from "wms-models/lib/inbound";
import { OutboundOrder } from "wms-models/lib/outbound.order";
import { ValidationError } from "wms-utils/lib/error";

export class ItemWriteRepository extends BaseWriteRepository<Item> {
  constructor(
    @InjectModel(ModelTokens.Item) readonly model: Model<Item>,
    private readonly counterService: CounterService,
    private readonly inboundReadRepo: InboundOrderReadRepository,
    private readonly outboundReadRepo: OutboundOrderReadRepository,
    private readonly readRepo: ItemReadRepository
  ) {
    super(model);
  }

  public async createItem(item: ItemDto): Promise<Item> {
    item.no = await this.counterService.getNextSequence(
      ModelTokens.Item,
      CounterPrefix.Item,
      CounterFormat.Item
    );

    return await this.create(item);
  }

  public async deleteItem(id: string): Promise<ItemDeletedResponse> {
    const item: Item = await this.readRepo.findOne({ _id: id });

    const inbound: Promise<InboundOrder> = this.inboundReadRepo.findOne({
      "items.no": item.no,
    });

    const outbound: Promise<OutboundOrder> = this.outboundReadRepo.findOne({
      "items.no": item.no,
    });

    const result: [InboundOrder, OutboundOrder] = await Promise.all([
      inbound,
      outbound,
    ]);

    if (result[0] || result[1]) throw new ValidationError();

    return await this.delete(id);
  }
}
