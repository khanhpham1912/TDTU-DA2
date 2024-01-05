import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { FilterInboundDto } from './filter.inbound.dto';
import { PaginationInboundDto } from './pagination.inbound.dto';

export class FilterPaginationInboundDto {
  @Type(() => FilterInboundDto)
  @ValidateNested({
    each: true,
  })
  @ApiProperty()
  @IsObject()
  filter: FilterInboundDto;

  @Type(() => PaginationInboundDto)
  @ValidateNested({
    each: true,
  })
  @ApiProperty()
  @IsObject()
  pagination: PaginationInboundDto;
}
