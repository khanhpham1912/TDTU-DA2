import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { ItemQuantityOutboundDto } from '../item.quantity.outbound.dto';

export class CreateUpdateOutBoundDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => ItemQuantityOutboundDto)
  items: ItemQuantityOutboundDto[];
}
