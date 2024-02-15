import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsObject, IsOptional, ValidateNested } from "class-validator";
import { DateDto, ListDto } from "src/dto";
import {
  ListInboundOrderRequest,
  ListInboundOrderFilter,
} from "wms-models/lib/inbound";

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
