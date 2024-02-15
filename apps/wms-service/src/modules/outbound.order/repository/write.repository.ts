import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseWriteRepository } from "src/database";
import { ModelTokens } from "wms-models/lib/common";
import { CounterService } from "src/modules/counter/counter.service";
import { OutboundOrder } from "wms-models/lib/outbound.order";
import { OutboundOrderDto } from "../dto";
import { CounterFormat, CounterPrefix } from "src/common";
import { EStatus } from "wms-models/lib/shared";

export class OutboundOrderWriteRepository extends BaseWriteRepository<OutboundOrder> {
  constructor(
    @InjectModel(ModelTokens.OutBound) readonly model: Model<OutboundOrder>,
    private readonly counterService: CounterService
  ) {
    super(model);
  }

  public async createOutboundOrder(
    outboundOrder: OutboundOrderDto
  ): Promise<OutboundOrder> {
    outboundOrder.no = await this.counterService.getNextSequence(
      ModelTokens.OutBound,
      CounterPrefix.OutboundRequest,
      CounterFormat.OutboundRequest
    );

    outboundOrder.status = EStatus.NEW;

    return await this.create(outboundOrder);
  }
}
