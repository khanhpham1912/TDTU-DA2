import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsObject, IsOptional, ValidateNested } from "class-validator";
import { DateDto, ListDto } from "src/dto";
import {
  ListOutboundOrderRequest,
  ListOutboundOrderFilter,
} from "wms-models/lib/outbound.order";
import { EStatus } from "wms-models/lib/shared";

export class ListOutboundOrderFilterDto implements ListOutboundOrderFilter {
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

export class ListOutboundOrderRequestDto
  extends ListDto
  implements ListOutboundOrderRequest
{
  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ListOutboundOrderFilterDto)
  filter?: ListOutboundOrderFilterDto;
}
