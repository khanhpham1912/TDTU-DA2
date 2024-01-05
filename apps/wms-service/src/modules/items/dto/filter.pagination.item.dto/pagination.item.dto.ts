import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class PaginationItemDto {
  @Min(0)
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  perPage: number;

  @Min(0)
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  page: number;
}
