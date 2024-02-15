import { DateDto, ListDto } from "src/dto";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsObject, IsOptional, ValidateNested } from "class-validator";
import {
  ListAllCustomFieldFilter,
  ListAllCustomFieldRequest,
} from "wms-models/lib/custom.field";

class ListAllCustomFieldFilterDto implements ListAllCustomFieldFilter {
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
}

export class ListAllCustomFieldRequestDto
  extends ListDto
  implements ListAllCustomFieldRequest
{
  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => ListAllCustomFieldFilterDto)
  filter?: ListAllCustomFieldFilterDto;
}
