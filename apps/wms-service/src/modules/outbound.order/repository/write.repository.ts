import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseWriteRepository } from "src/database";
import { ModelTokens } from "wms-models/lib/common";
import { CounterService } from "src/modules/counter/counter.service";
import { OutboundOrder } from "wms-models/lib/outbound.order";
import { OutboundOrderDto } from "../dto";
import { CounterFormat, CounterPrefix } from "src/common";
import { EStatus } from "wms-models/lib/shared";
import { InventoryService } from "src/modules/inventory/service";
import { Inject, forwardRef } from "@nestjs/common";
import { AvailableInventoryItem } from "wms-models/lib/inventory";
import { ValidationError } from "wms-utils/lib/error";

export class OutboundOrderWriteRepository extends BaseWriteRepository<OutboundOrder> {
  constructor(
    @InjectModel(ModelTokens.OutBound) readonly model: Model<OutboundOrder>,
    private readonly counterService: CounterService,
    @Inject(forwardRef(() => InventoryService))
    private readonly inventoryService: InventoryService
  ) {
    super(model);
  }

  public async createOutboundOrder(
    outboundOrder: OutboundOrderDto
  ): Promise<OutboundOrder> {
    for await (const item of outboundOrder.items) {
      const findItem: AvailableInventoryItem =
        await this.inventoryService.getAvailableInventoryItemFromMidNightToNow(
          item.no
        );
      if (
        item.itemCount <= 0 ||
        item.itemCount > findItem.availableInventories
      ) {
        throw new ValidationError({
          en: `Item ${item.name} is not enough in the inventory`,
          vi: `Sản phẩm ${item.name} không đủ tồn kho`,
        });
      }
    }

    outboundOrder.no = await this.counterService.getNextSequence(
      ModelTokens.OutBound,
      CounterPrefix.OutboundRequest,
      CounterFormat.OutboundRequest
    );

    outboundOrder.status = EStatus.NEW;
    outboundOrder.deliveryTime = new Date();
    return await this.create(outboundOrder);
  }
}
