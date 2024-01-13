import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EStatus } from 'src/enums/status.enum';

export class FilterInboundDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @IsEnum(EStatus)
  status: EStatus;
}
