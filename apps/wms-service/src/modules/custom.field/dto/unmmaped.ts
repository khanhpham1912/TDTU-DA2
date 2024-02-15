import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { GetAllCustomFieldUnmapped } from "wms-models/lib/custom.field";
import { EEntity } from "wms-models/lib/shared";

export class GetAllCustomFieldUnmappedDto implements GetAllCustomFieldUnmapped {
  @ApiProperty({ enum: EEntity })
  @IsEnum(EEntity)
  entity: EEntity;
}
