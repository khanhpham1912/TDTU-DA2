import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { isObjectId } from 'src/decorators/is.object.td.decorator';

export class ItemQuantityInboundDto {
  @ApiProperty()
  @isObjectId()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
