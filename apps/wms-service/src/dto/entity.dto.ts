import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { RefEntity } from "base-models";
import { IsOptional, IsString } from "class-validator";

export class RefEntityDto implements RefEntity {
  @ApiProperty()
  @IsString()
  _id: string;

  @ApiProperty()
  @IsString()
  no: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
