import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { BaseDto } from "src/dto";
import { RefEntityDto } from "src/dto/entity.dto";
import { IsSkip } from "src/utils/dto.utility";
import { RefCustomFieldMapping } from "wms-models/lib/custom.field.mapping";
import { Dimension, EProductType, Item, UOM } from "wms-models/lib/items";

class DimensionDto implements Dimension {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  length?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  width?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  height?: number;
}

export class ItemDto extends BaseDto implements Item {
  @IsSkip()
  no: string;

  @ApiProperty()
  @IsString()
  sku: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: UOM })
  @IsEnum(UOM)
  uom: UOM;

  @ApiProperty({ enum: EProductType })
  @IsEnum(EProductType)
  type: EProductType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  grossWeight?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  netWeight?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  productionDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expiryDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => RefEntityDto)
  supplier?: RefEntityDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => DimensionDto)
  dimension?: DimensionDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  unitValue?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  customFieldMapping?: RefCustomFieldMapping;
}
