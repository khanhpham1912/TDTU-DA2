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
import { Item } from "wms-models/lib/Items";
import { IResponse, resOk } from "wms-utils/lib/apis";
import { ERROR_CODE } from "wms-utils/lib/error";
import { ItemDeletedResponse } from "src/database";
import { PaginateResponse } from "wms-utils/lib/paging";
import { ItemReadRepository, ItemWriteRepository } from "./repository";
import { ItemDto } from "./dto/base";
import { ListItemRequestDto } from "./dto/list";

@ApiBearerAuth()
@ApiTags("Items")
@Controller("items")
export class ItemController {
  constructor(
    private readonly writeRepo: ItemWriteRepository,
    private readonly readRepo: ItemReadRepository
  ) {}

  @Post()
  async create(@Body() item: ItemDto): Promise<IResponse<Item>> {
    const result: Item = await this.writeRepo.createItem(item);
    return resOk(ERROR_CODE.CreateSuccess["Success"], result);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() Item: ItemDto
  ): Promise<IResponse<Item>> {
    const result: Item = await this.writeRepo.update({ _id: id }, Item);
    return resOk(ERROR_CODE.UpdateSuccess["Success"], result);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<IResponse<boolean>> {
    const result: ItemDeletedResponse = await this.writeRepo.deleteItem(id);
    return resOk(ERROR_CODE.DeleteSuccess["Success"], result.success);
  }

  @Get(":id")
  async get(@Param("id") id: string): Promise<IResponse<Item>> {
    const result: Item = await this.readRepo.findById(id);
    return resOk(ERROR_CODE.GetSuccess["Success"], result);
  }

  @Post("list")
  async list(
    @Body() body: ListItemRequestDto
  ): Promise<IResponse<PaginateResponse<Item>>> {
    const result: PaginateResponse<Item> = await this.readRepo.list(body);
    return resOk(ERROR_CODE.ListSuccess["Success"], result);
  }

  @Get(":sku/check-sku")
  async checkSKU(@Param("sku") sku: string): Promise<IResponse<boolean>> {
    const result: boolean = await this.readRepo.checkSKU(sku);
    return resOk(ERROR_CODE.ListSuccess["Success"], result);
  }
}
