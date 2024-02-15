import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { DetailRequest } from "wms-utils/lib/paging";

export class DetailDto implements DetailRequest {
  @ApiProperty()
  @IsString()
  _id: string;

  @ApiPropertyOptional({ isArray: true, default: ["_id", "no"] })
  @IsOptional()
  @IsString({ each: true })
  selects?: string[];
}
