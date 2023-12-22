import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { isObjectId } from 'src/decorators/is.object.td.decorator';

export class ItemQuantity {
  @IsString()
  @isObjectId()
  @Expose()
  id: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @Expose()
  quantity: number;
}
