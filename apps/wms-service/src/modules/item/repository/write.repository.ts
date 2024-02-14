import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseWriteRepository } from "src/database";
import { ModelTokens } from "wms-models/lib/common";
import { CounterService } from "src/modules/counter/counter.service";
import { Item } from "wms-models/lib/items";
import { CounterFormat, CounterPrefix } from "src/common";
import { ItemDto } from "../dto/base";

export class ItemWriteRepository extends BaseWriteRepository<Item> {
  constructor(
    @InjectModel(ModelTokens.Item) readonly model: Model<Item>,
    private readonly counterService: CounterService
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
}
