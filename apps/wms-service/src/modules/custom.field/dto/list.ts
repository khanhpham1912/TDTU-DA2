import { DateDto, ListDto } from "src/dto";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsObject, IsOptional, ValidateNested } from "class-validator";
import {
  ListCustomFieldFilter,
  ListCustomFieldRequest,
} from "wms-models/lib/custom.field";
import { ECustomFieldType } from "wms-models/lib/shared";

class ListCustomFieldFilterDto implements ListCustomFieldFilter {
  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => DateDto)
  createdAt?: DateDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => DateDto)
  updatedAt?: DateDto;

  @ApiPropertyOptional({ enum: ECustomFieldType })
  @IsOptional()
  @IsEnum(ECustomFieldType)
  type: ECustomFieldType;
}

export class ListCustomFieldRequestDto
  extends ListDto
  implements ListCustomFieldRequest
{
  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => ListCustomFieldFilterDto)
  filter?: ListCustomFieldFilterDto;
}
