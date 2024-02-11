import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { BaseDto } from "src/dto";
import { EProductType, Item, UOM } from "wms-models/lib/items";

export class CreateUpdateItemDto extends BaseDto implements Item {
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
  @IsString()
  supplier?: string;

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
