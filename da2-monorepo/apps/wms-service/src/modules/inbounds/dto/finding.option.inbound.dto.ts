import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Status } from 'src/enums/status.enum';

export class FindingOptionInboundDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @Expose()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @IsEnum(Status)
  @Expose()
  status: Status;
}
