import {
  ListAllCustomFieldMappingFilter,
  ListAllCustomFieldMappingRequest,
} from "wms-models/lib/custom.field.mapping";
import { ListDto } from "src/dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsObject, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { EEntity } from "wms-models/lib/shared";

class ListAllCustomFieldMappingFilterDto
  implements ListAllCustomFieldMappingFilter
{
  @ApiProperty({ enum: EEntity })
  @IsEnum(EEntity)
  entity: EEntity;
}

export class ListAllCustomFieldMappingRequestDto
  extends ListDto
  implements ListAllCustomFieldMappingRequest
{
  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => ListAllCustomFieldMappingFilterDto)
  filter?: ListAllCustomFieldMappingFilterDto;
}
