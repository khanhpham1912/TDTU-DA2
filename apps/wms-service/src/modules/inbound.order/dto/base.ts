import { ApiPropertyOptional } from "@nestjs/swagger";
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

  @ApiPropertyOptional()
  @IsOptional()
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

  @ApiPropertyOptional({ enum: UOM })
  @IsEnum(UOM)
  uom: UOM;

  @ApiPropertyOptional({ enum: EProductType })
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

  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  itemCount: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  barcode: string;
}

export class InboundOrderDto extends BaseDto implements InboundOrder {
  @ApiPropertyOptional()
  @IsOptional()
  @IsSkip()
  arrivalTime: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  no: string;

  @ApiPropertyOptional()
  @IsObject()
  @ValidateNested()
  @IsOptional()
  @Type(() => ShipperDto)
  shipper: ShipperDto;

  @ApiPropertyOptional({ type: InboundOrderItemDto, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => InboundOrderItemDto)
  items: InboundOrderItemDto[];

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  totalNetWeight: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  totalGrossWeight: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  totalVolume: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  totalValue: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  remark?: string;

  @ApiPropertyOptional({ enum: EStatus })
  @IsEnum(EStatus)
  status: EStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  customFieldMapping?: RefCustomFieldMapping;
}
