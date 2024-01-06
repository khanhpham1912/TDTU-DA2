import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, NotEquals } from 'class-validator';
import { EStatus } from 'src/enums/status.enum';

export class UpdateStatusInboundDto {
  @NotEquals(EStatus[EStatus.NEW])
  @IsEnum(EStatus)
  @ApiProperty()
  @IsNotEmpty()
  status: EStatus;
}
