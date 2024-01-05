import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { FilterItemDto } from './filter.item.dto';
import { PaginationItemDto } from './pagination.item.dto';

export class FilterPaginationItemDto {
  @Type(() => FilterItemDto)
  @ValidateNested({
    each: true,
  })
  @ApiProperty()
  @IsObject()
  filter: FilterItemDto;

  @Type(() => PaginationItemDto)
  @ValidateNested({
    each: true,
  })
  @ApiProperty()
  @IsObject()
  pagination: PaginationItemDto;
}
