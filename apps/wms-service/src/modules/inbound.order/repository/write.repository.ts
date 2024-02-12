import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseWriteRepository } from "src/database";
import { ModelTokens } from "wms-models/lib/common";
import { CounterService } from "src/modules/counter/counter.service";
import { InboundOrder } from "wms-models/lib/inbound";
import { InboundOrderDto } from "../dto";
import { CounterFormat, CounterPrefix } from "src/common";

export class InboundOrderWriteRepository extends BaseWriteRepository<InboundOrder> {
  constructor(
    @InjectModel(ModelTokens.InBound) readonly model: Model<InboundOrder>,
    private readonly counterService: CounterService
  ) {
    super(model);
  }

  public async createInboundOrder(
    inboundOrder: InboundOrderDto
  ): Promise<InboundOrder> {
    inboundOrder.no = await this.counterService.getNextSequence(
      ModelTokens.InBound,
      CounterPrefix.InboundRequest,
      CounterFormat.InboundRequest
    );

    return await this.create(inboundOrder);
  }
}
