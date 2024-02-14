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
import { CustomFieldMapping } from "wms-models/lib/custom.field.mapping";
import {
  CustomFieldMappingDto,
  ListAllCustomFieldMappingRequestDto,
  ReSortCustomFieldMappingDto,
  UpdateCustomFieldMappingDto,
} from "./dto";
import { ERROR_CODE } from "wms-utils/lib/error";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ItemDeletedResponse } from "src/database";
import {
  CustomFieldMappingReadRepository,
  CustomFieldMappingWriteRepository,
} from "./repository";
import { CustomField } from "wms-models/lib/custom.field";
import { IResponse, resOk } from "wms-utils/lib/apis";

@Injectable()
@ApiTags("Custom Field Mapping")
@Controller("custom-field-mapping")
@ApiBearerAuth()
export class CustomFieldMappingController {
  constructor(
    private readonly writeRepo: CustomFieldMappingWriteRepository,
    private readonly readRepo: CustomFieldMappingReadRepository
  ) {}

  @ApiOperation({ summary: "Use to map entity to custom field" })
  @Post()
  async create(
    @Body() createCustomFieldMapping: CustomFieldMappingDto
  ): Promise<IResponse<CustomFieldMapping>> {
    const result: CustomFieldMapping = await this.writeRepo.createCFM(
      createCustomFieldMapping
    );
    return resOk(ERROR_CODE.CreateSuccess["Success"], result);
  }

  @ApiOperation({ summary: "Id format: entity_type_name" })
  @Put("/:id")
  async update(
    @Param("id") id: string,
    @Body() updateCustomFieldMapping: UpdateCustomFieldMappingDto
  ): Promise<IResponse<CustomFieldMapping>> {
    const result: CustomFieldMapping = await this.writeRepo.updateCFM(
      id,
      updateCustomFieldMapping
    );
    return resOk(ERROR_CODE.CreateSuccess["Success"], result);
  }

  @Delete("/:id")
  async delete(@Param("id") id: string): Promise<IResponse<boolean>> {
    const result: ItemDeletedResponse = await this.writeRepo.deleteCFM(id);
    return resOk(ERROR_CODE.DeleteSuccess["Success"], result.success);
  }

  @Post("all")
  async listAll(
    @Body() filter: ListAllCustomFieldMappingRequestDto
  ): Promise<IResponse<CustomFieldMapping[]>> {
    const result: CustomFieldMapping[] = await this.readRepo.listAll(filter);
    return resOk(ERROR_CODE.GetSuccess["Success"], result);
  }

  @Get("/:id")
  async get(@Param("id") id: string): Promise<IResponse<CustomFieldMapping>> {
    const result: CustomFieldMapping = await this.readRepo.findOne({
      _id: id,
    });
    return resOk(ERROR_CODE.GetSuccess["Success"], result);
  }

  @Post("/all/unmapped")
  async unmapped(
    @Param("entity") entity: string
  ): Promise<IResponse<CustomField[]>> {
    const result: CustomField[] =
      await this.readRepo.findUnMappedCustomFields(entity);
    return resOk(ERROR_CODE.GetSuccess["Success"], result);
  }

  @Put("/:id/re-sorting")
  async reSort(
    @Param("id") id: string,
    @Body() customFieldMappingSorted: ReSortCustomFieldMappingDto
  ): Promise<IResponse<CustomFieldMapping>> {
    const result: CustomFieldMapping = await this.writeRepo.reSort(
      id,
      customFieldMappingSorted
    );
    return resOk(ERROR_CODE.GetSuccess["Success"], result);
  }
}
