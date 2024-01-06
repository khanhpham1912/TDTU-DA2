import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { E_PRODUCT_TYPE } from 'src/enums/product.type.enum';
import { UOM } from 'src/enums/uom.enum';

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
  type: E_PRODUCT_TYPE;
}
