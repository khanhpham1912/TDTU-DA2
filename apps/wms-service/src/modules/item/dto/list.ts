import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { DateDto, ListDto } from "src/dto";
import {
  EProductType,
  ListItemFilter,
  ListItemRequest,
} from "wms-models/lib/Items";

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

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  uom?: string;

  @ApiPropertyOptional({ enum: EProductType })
  @IsOptional()
  @IsEnum(EProductType)
  type?: EProductType;
}

export class ListItemRequestDto extends ListDto implements ListItemRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ListItemFilterDto)
  filter?: ListItemFilterDto;
}
