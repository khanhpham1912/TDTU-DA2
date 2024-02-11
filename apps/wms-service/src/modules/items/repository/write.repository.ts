import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseWriteRepository } from "src/database";
import { ModelTokens } from "wms-models/lib/common";
import { Item } from "wms-models/lib/items";

export class ItemWriteRepository extends BaseWriteRepository<Item> {
  constructor(@InjectModel(ModelTokens.Item) readonly model: Model<Item>) {
    super(model);
  }
}
