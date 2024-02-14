import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsObject, IsOptional, ValidateNested } from "class-validator";
import { DateDto, ListDto } from "src/dto";
import {
  ListSupplierFilter,
  ListSupplierRequest,
} from "wms-models/lib/suppliers";

class ListSupplierFilterDto implements ListSupplierFilter {
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

export class ListSupplierRequestDto
  extends ListDto
  implements ListSupplierRequest
{
  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ListSupplierFilterDto)
  filter?: ListSupplierFilterDto;
}
