import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { EProductType, UOM } from "wms-models/lib/items";

export class FilterItemDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  sku: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  uom: UOM;

  @ApiProperty()
  @IsOptional()
  @IsString()
  type: EProductType;
}
