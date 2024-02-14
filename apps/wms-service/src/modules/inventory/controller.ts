import { Controller, Get, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { IResponse, resOk } from "wms-utils/lib/apis";
import { ERROR_CODE } from "wms-utils/lib/error";
import { InventoryService } from "./service";
import { InventoryItem } from "wms-models/lib/inventory";

@ApiBearerAuth()
@ApiTags("Inventory")
@Controller("inventories")
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @Get(":no")
  async getInventoriesItem(
    @Param("no") no: string
  ): Promise<IResponse<InventoryItem>> {
    const result: InventoryItem = await this.service.getInventoryItem(no);
    return resOk(ERROR_CODE.GetSuccess["Success"], result);
  }
}
