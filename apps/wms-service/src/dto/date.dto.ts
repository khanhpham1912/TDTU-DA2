import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class DateDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  from: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  to: Date;
}
