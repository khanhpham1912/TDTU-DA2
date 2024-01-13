import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { E_PRODUCT_TYPE } from "src/enums/product.type.enum";
import { UOM } from "src/enums/uom.enum";

export class CreateUpdateItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty()
  sku: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  uom: UOM;

  @IsString()
  @ApiProperty()
  type: E_PRODUCT_TYPE;

  @IsNumber()
  @ApiProperty()
  grossWeight: number;

  @IsNumber()
  @ApiProperty()
  netWeight: Number;

  @IsDate()
  @ApiProperty()
  productionDate: Date;

  @IsDate()
  @ApiProperty()
  expiryDate: Date;
}
