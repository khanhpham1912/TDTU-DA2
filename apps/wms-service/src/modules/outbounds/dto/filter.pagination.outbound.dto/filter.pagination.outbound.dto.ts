import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { FilterOutboundDto } from './filter.outbound.dto';
import { PaginationOutboundDto } from './pagination.outbound.dto';

export class FilterPaginationOutboundDto {
  @Type(() => FilterOutboundDto)
  @ValidateNested({
    each: true,
  })
  @ApiProperty()
  @IsObject()
  filter: FilterOutboundDto;

  @Type(() => PaginationOutboundDto)
  @ValidateNested({
    each: true,
  })
  @ApiProperty()
  @IsObject()
  pagination: PaginationOutboundDto;
}
