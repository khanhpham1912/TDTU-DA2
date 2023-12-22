import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { ItemQuantity } from 'src/modules/inbounds/dto/item.quantity.type';

export class BaseInboundDto {
  @Expose()
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => ItemQuantity)
  items: ItemQuantity[];
}
