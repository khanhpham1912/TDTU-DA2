import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { ItemQuantityInboundDto } from '../item.quantity.inbound.dto';

export class CreateUpdateInboundDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => ItemQuantityInboundDto)
  items: ItemQuantityInboundDto[];
}
