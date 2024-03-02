import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsObject, IsOptional, ValidateNested } from "class-validator";
import { DateDto, ListDto } from "src/dto";
import {
  ListInboundOrderRequest,
  ListInboundOrderFilter,
} from "wms-models/lib/inbound";
import { EStatus } from "wms-models/lib/shared";

export class ListInboundOrderFilterDto implements ListInboundOrderFilter {
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

  @ApiPropertyOptional({ enum: EStatus })
  @IsOptional()
  @IsEnum(EStatus)
  status: EStatus;
}

export class ListInboundOrderRequestDto
  extends ListDto
  implements ListInboundOrderRequest
{
  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ListInboundOrderFilterDto)
  filter?: ListInboundOrderFilterDto;
}
