import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class BaseItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty()
  @Expose()
  sku: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  @ApiProperty()
  @Expose()
  name: string;
}
