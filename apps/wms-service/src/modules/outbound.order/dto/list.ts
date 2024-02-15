import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsObject, IsOptional, ValidateNested } from "class-validator";
import { DateDto, ListDto } from "src/dto";
import {
  ListOutboundOrderRequest,
  ListOutboundOrderFilter,
} from "wms-models/lib/outbound.order";

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
