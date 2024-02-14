import { Type } from "class-transformer";
import {
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Sort, SortType } from "wms-utils/lib/filter";
import { PaginateRequest } from "wms-utils/lib/paging";
import { IsSkip } from "src/utils/dto.utility";

export class SortDto implements Sort {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sortBy: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(SortType)
  sortType: SortType;
}

export class PagingDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  currentPage?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pageSize?: number;
}

export class ListDto implements PaginateRequest<any> {
  @IsSkip()
  filter?: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SortDto)
  sort?: SortDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PagingDto)
  paging?: PagingDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ each: true })
  selects?: string[];

  @ApiPropertyOptional({ isArray: true })
  @IsOptional()
  @IsString({ each: true })
  join?: string[];
}
