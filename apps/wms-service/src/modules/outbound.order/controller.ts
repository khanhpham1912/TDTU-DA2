import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  OutboundOrderReadRepository,
  OutboundOrderWriteRepository,
} from "./repository";
import { IResponse, resOk } from "wms-utils/lib/apis";
import { ERROR_CODE } from "wms-utils/lib/error";
import { ItemDeletedResponse } from "src/database";
import { PaginateResponse } from "wms-utils/lib/paging";
import { OutboundOrder } from "wms-models/lib/outbound.order";
import { OutboundOrderDto, ListOutboundOrderRequestDto } from "./dto";
import { generateOutbound } from "./util/generate";

@ApiBearerAuth()
@ApiTags("OutboundOrders")
@Controller("outbound-orders")
export class OutboundOrderController {
  constructor(
    private readonly writeRepo: OutboundOrderWriteRepository,
    private readonly readRepo: OutboundOrderReadRepository
  ) {}

  @Post()
  async create(
    @Body() inboundOrder: OutboundOrderDto
  ): Promise<IResponse<OutboundOrder>> {
    const result: OutboundOrder =
      await this.writeRepo.createOutboundOrder(inboundOrder);
    return resOk(ERROR_CODE.CreateSuccess["Success"], result);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() inboundOrder: OutboundOrderDto
  ): Promise<IResponse<OutboundOrder>> {
    const result: OutboundOrder = await this.writeRepo.update(
      { _id: id },
      inboundOrder
    );
    return resOk(ERROR_CODE.UpdateSuccess["Success"], result);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<IResponse<boolean>> {
    const result: ItemDeletedResponse = await this.writeRepo.delete(id);
    return resOk(ERROR_CODE.DeleteSuccess["Success"], result.success);
  }

  @Get(":id")
  async get(@Param("id") id: string): Promise<IResponse<OutboundOrder>> {
    const result: OutboundOrder = await this.readRepo.findById(id);
    return resOk(ERROR_CODE.GetSuccess["Success"], result);
  }

  @Post("list")
  async list(
    @Body() body: ListOutboundOrderRequestDto
  ): Promise<IResponse<PaginateResponse<OutboundOrder>>> {
    const result: PaginateResponse<OutboundOrder> =
      await this.readRepo.list(body);
    return resOk(ERROR_CODE.ListSuccess["Success"], result);
  }

  @Post("all")
  async all(
    @Body() body: ListOutboundOrderRequestDto
  ): Promise<IResponse<OutboundOrder[]>> {
    const result: OutboundOrder[] = await this.readRepo.all(body);
    return resOk(ERROR_CODE.ListSuccess["Success"], result);
  }

  @Post("generate")
  async generate(): Promise<IResponse<void>> {
    const result: void = await generateOutbound();
    return resOk(ERROR_CODE.ListSuccess["Success"], result);
  }
}
