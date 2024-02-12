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
import { Supplier } from "wms-models/lib/suppliers";
import { ListSupplierRequestDto, SupplierDto } from "./dto";
import { SupplierReadRepository, SupplierWriteRepository } from "./repository";
import { IResponse, resOk } from "wms-utils/lib/apis";
import { ERROR_CODE } from "wms-utils/lib/error";
import { ItemDeletedResponse } from "src/database";
import { PaginateResponse } from "wms-utils/lib/paging";

@ApiBearerAuth()
@ApiTags("Suppliers")
@Controller("suppliers")
export class SupplierController {
  constructor(
    private readonly writeRepo: SupplierWriteRepository,
    private readonly readRepo: SupplierReadRepository
  ) {}

  @Post()
  async create(@Body() supplier: SupplierDto): Promise<IResponse<Supplier>> {
    const result: Supplier = await this.writeRepo.create(supplier);
    return resOk(ERROR_CODE.CreateSuccess["Success"], result);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() supplier: SupplierDto
  ): Promise<IResponse<Supplier>> {
    const result: Supplier = await this.writeRepo.update({ _id: id }, supplier);
    return resOk(ERROR_CODE.CreateSuccess["Success"], result);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<IResponse<boolean>> {
    const result: ItemDeletedResponse = await this.writeRepo.delete(id);
    return resOk(ERROR_CODE.DeleteSuccess["Success"], result.success);
  }

  @Get(":id")
  async get(@Param("id") id: string): Promise<IResponse<Supplier>> {
    const result: Supplier = await this.readRepo.findById(id);
    return resOk(ERROR_CODE.GetSuccess["Success"], result);
  }

  @Post("list")
  async list(
    @Body() body: ListSupplierRequestDto
  ): Promise<IResponse<PaginateResponse<Supplier>>> {
    const result: PaginateResponse<Supplier> = await this.readRepo.list(body);
    return resOk(ERROR_CODE.ListSuccess["Success"], result);
  }
}
