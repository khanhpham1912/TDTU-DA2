import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, NotEquals } from 'class-validator';
import { Status } from 'src/enums/status.enum';

export class UpdateStatusOutboundDto {
  @NotEquals(Status[Status.NEW])
  @IsEnum(Status)
  @ApiProperty()
  @IsNotEmpty()
  status: Status;
}
