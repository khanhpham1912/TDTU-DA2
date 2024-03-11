import { Injectable } from "@nestjs/common";
import { BaseWriteRepository } from "src/database";
import { Model } from "mongoose";
import { ModelTokens } from "wms-models/lib/common";
import { InjectModel } from "@nestjs/mongoose";
import { HistoricalInventory } from "wms-models/lib/inventory.history";

@Injectable()
export class HistoricalInventoryService extends BaseWriteRepository<HistoricalInventory> {
  constructor(
    @InjectModel(ModelTokens.HistoricalInventory)
    readonly model: Model<HistoricalInventory>
  ) {
    super(model);
  }

  public async getItemHistoricalInventory(
    no: string
  ): Promise<HistoricalInventory> {
    const after = await this.model
      .find({
        itemNo: no,
      })
      .sort({ createdAt: -1 })
      .limit(1);

    return after[0];
  }
}
