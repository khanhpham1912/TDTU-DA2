import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ERROR_CODE } from "wms-utils/lib/error";
import { CustomField } from "wms-models/lib/custom.field";
import {
  CustomFieldDto,
  GetAllCustomFieldUnmappedDto,
  ListAllCustomFieldRequestDto,
  ListCustomFieldRequestDto,
  UpdateCustomFieldDto,
} from "./dto";
import {
  CustomFieldReadRepository,
  CustomFieldWriteRepository,
} from "./repository";
import { ItemDeletedResponse } from "src/database";
import { ApiOperation } from "@nestjs/swagger";
import { PaginateResponse } from "wms-utils/lib/paging";
import { CustomFieldService } from "./service";
import { IResponse, resOk } from "wms-utils/lib/apis";

@Injectable()
@Controller("custom-fields")
export class CustomFieldController {
  constructor(
    private readonly customFieldReadRepository: CustomFieldReadRepository,
    private readonly customFieldWriteRepository: CustomFieldWriteRepository,
    private readonly service: CustomFieldService
  ) {}

  @Post()
  async create(
    @Body() createCustomFieldDto: CustomFieldDto
  ): Promise<IResponse<CustomField>> {
    const result: CustomField =
      await this.customFieldWriteRepository.createCF(createCustomFieldDto);
    return resOk(ERROR_CODE.CreateSuccess["Success"], result);
  }

  @ApiOperation({ summary: "Id format: type_name" })
  @Put("/:id")
  async update(
    @Param("id") id: string,
    @Body() updateCustomFieldDto: UpdateCustomFieldDto
  ): Promise<IResponse<CustomField>> {
    const result: CustomField = await this.customFieldWriteRepository.updateCF(
      id,
      updateCustomFieldDto
    );
    return resOk(ERROR_CODE.UpdateSuccess["Success"], result);
  }

  @Post("all")
  async listAll(
    @Body() filter: ListAllCustomFieldRequestDto
  ): Promise<IResponse<CustomField[]>> {
    const result: CustomField[] =
      await this.customFieldReadRepository.listAll(filter);
    return resOk(ERROR_CODE.GetSuccess["Success"], result);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Id format: type_name" })
  async delete(@Param("id") id: string): Promise<IResponse<boolean>> {
    const result: ItemDeletedResponse =
      await this.customFieldWriteRepository.deleteCf(id);
    return resOk(ERROR_CODE.GetSuccess["Success"], result.success);
  }

  @Get("/:id")
  async get(@Param("id") id: string): Promise<IResponse<CustomField>> {
    const result: CustomField = await this.customFieldReadRepository.findOne({
      _id: id,
    });
    return resOk(ERROR_CODE.GetSuccess["Success"], result);
  }

  @Post("/list")
  async list(
    @Body() filter: ListCustomFieldRequestDto
  ): Promise<IResponse<PaginateResponse<CustomField>>> {
    const result: PaginateResponse<CustomField> =
      await this.customFieldReadRepository.list(filter);
    return resOk(ERROR_CODE.GetSuccess["Success"], result);
  }

  @ApiOperation({ summary: "Use to check if _id is unique or not" })
  @Get("/:id/unique")
  async unique(@Param("id") id: string): Promise<IResponse<boolean>> {
    const result: boolean = await this.customFieldReadRepository.unique(id);
    return resOk(ERROR_CODE.GetSuccess["Success"], result);
  }

  @Post("all/unmapped")
  async getAllUnmapped(
    @Body() filter: GetAllCustomFieldUnmappedDto
  ): Promise<IResponse<CustomField[]>> {
    const result: CustomField[] = await this.service.getAllUnmapped(filter);
    return resOk(ERROR_CODE.GetSuccess["Success"], result);
  }
}
