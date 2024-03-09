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
  InboundOrderReadRepository,
  InboundOrderWriteRepository,
} from "./repository";
import { IResponse, resOk } from "wms-utils/lib/apis";
import { ERROR_CODE } from "wms-utils/lib/error";
import { ItemDeletedResponse } from "src/database";
import { PaginateResponse } from "wms-utils/lib/paging";
import { InboundOrder } from "wms-models/lib/inbound";
import { InboundOrderDto, ListInboundOrderRequestDto } from "./dto";
import { generateInbound } from "./util/generate";

@ApiBearerAuth()
@ApiTags("InboundOrders")
@Controller("inbound-orders")
export class InboundOrderController {
  constructor(
    private readonly writeRepo: InboundOrderWriteRepository,
    private readonly readRepo: InboundOrderReadRepository
  ) {}

  @Post()
  async create(
    @Body() inboundOrder: InboundOrderDto
  ): Promise<IResponse<InboundOrder>> {
    const result: InboundOrder =
      await this.writeRepo.createInboundOrder(inboundOrder);
    return resOk(ERROR_CODE.CreateSuccess["Success"], result);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() inboundOrder: InboundOrderDto
  ): Promise<IResponse<InboundOrder>> {
    const result: InboundOrder = await this.writeRepo.update(
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
  async get(@Param("id") id: string): Promise<IResponse<InboundOrder>> {
    const result: InboundOrder = await this.readRepo.findById(id);
    return resOk(ERROR_CODE.GetSuccess["Success"], result);
  }

  @Post("list")
  async list(
    @Body() body: ListInboundOrderRequestDto
  ): Promise<IResponse<PaginateResponse<InboundOrder>>> {
    const result: PaginateResponse<InboundOrder> =
      await this.readRepo.list(body);
    return resOk(ERROR_CODE.ListSuccess["Success"], result);
  }

  @Post("all")
  async all(
    @Body() body: ListInboundOrderRequestDto
  ): Promise<IResponse<InboundOrder[]>> {
    const result: InboundOrder[] = await this.readRepo.all(body);
    return resOk(ERROR_CODE.ListSuccess["Success"], result);
  }

  @Post("generate")
  async generate(): Promise<IResponse<void>> {
    const result: void = await generateInbound();
    return resOk(ERROR_CODE.ListSuccess["Success"], result);
  }
}
