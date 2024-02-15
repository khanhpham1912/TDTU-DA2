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
import { RefCustomFieldMapping } from "wms-models/lib/custom.field.mapping";
import {
  InboundOrder,
  InboundOrderItem,
  Shipper,
} from "wms-models/lib/inbound";
import { UOM, EProductType, Dimension } from "wms-models/lib/items";
import { EStatus } from "wms-models/lib/shared";

export class DimensionDto implements Dimension {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  length?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  width?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  height?: number;
}

export class ShipperDto implements Shipper {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  shipperName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  shipperPhone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  shipperLicense?: string;
}

export class InboundOrderItemDto implements InboundOrderItem {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  batchNo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  no: string;
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
  @IsNumber()
  @Type(() => Number)
  unitValue?: number;

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

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  itemCount: number;

  @ApiProperty()
  @IsString()
  barcode: string;
}

export class InboundOrderDto extends BaseDto implements InboundOrder {
  @ApiProperty()
  @IsString()
  no: string;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => ShipperDto)
  shipper: ShipperDto;

  @ApiProperty({ type: InboundOrderItemDto, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => InboundOrderItemDto)
  items: InboundOrderItemDto[];

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  totalNetWeight: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  totalGrossWeight: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  totalVolume: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  totalValue: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  remark?: string;

  @ApiProperty({ enum: EStatus })
  @IsEnum(EStatus)
  status: EStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  customFieldMapping?: RefCustomFieldMapping;
}
