import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterItemDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  sku: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;
}
