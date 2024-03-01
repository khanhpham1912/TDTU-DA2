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
import {
  OutboundOrder,
  OutboundOrderItem,
  Shipper,
} from "wms-models/lib/outbound.order";
import { UOM, EProductType, Dimension } from "wms-models/lib/items";
import { EStatus } from "wms-models/lib/shared";
import { RefCustomFieldMapping } from "wms-models/lib/custom.field.mapping";
import { IsSkip } from "src/utils/dto.utility";

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

export class OutboundOrderItemDto implements OutboundOrderItem {
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
  @IsOptional()
  uom: UOM;

  @ApiPropertyOptional({ enum: EProductType })
  @IsEnum(EProductType)
  @IsOptional()
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
  @IsOptional()
  @Type(() => Number)
  itemCount: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  barcode: string;
}

export class OutboundOrderDto extends BaseDto implements OutboundOrder {
  @ApiPropertyOptional()
  @IsOptional()
  @IsSkip()
  deliveryTime: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  no: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ShipperDto)
  shipper: ShipperDto;

  @ApiPropertyOptional({ type: OutboundOrderItemDto, isArray: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OutboundOrderItemDto)
  items: OutboundOrderItemDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  totalNetWeight: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  totalGrossWeight: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  totalVolume: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  totalValue: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  remark?: string;

  @ApiPropertyOptional({ enum: EStatus })
  @IsOptional()
  @IsEnum(EStatus)
  status: EStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  customFieldMapping?: RefCustomFieldMapping;
}
