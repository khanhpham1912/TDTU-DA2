import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUpdateItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty()
  sku: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  @ApiProperty()
  name: string;
}
