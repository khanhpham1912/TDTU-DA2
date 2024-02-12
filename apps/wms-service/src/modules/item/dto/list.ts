import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { DateDto, ListDto } from "src/dto";
import { ListItemFilter, ListItemRequest } from "wms-models/lib/Items";

class ListItemFilterDto implements ListItemFilter {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  supplierNo?: string;

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

export class ListItemRequestDto extends ListDto implements ListItemRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ListItemFilterDto)
  filter?: ListItemFilterDto;
}
