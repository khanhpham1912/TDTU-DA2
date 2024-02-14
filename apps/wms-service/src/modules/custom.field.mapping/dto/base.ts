import { IsSkip } from "src/utils/dto.utility";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsBoolean,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import {
  CustomFieldMapping,
  RefCustomField,
} from "wms-models/lib/custom.field.mapping";
import { ECustomFieldType, EEntity } from "wms-models/lib/shared";
import { ExtraData } from "wms-models/lib/shared/extra.data";

class RefCustomFieldDto implements RefCustomField {
  @ApiProperty()
  @IsString()
  _id: string;

  @IsSkip()
  name: string;

  @IsSkip()
  type: ECustomFieldType;

  @IsSkip()
  extraData: ExtraData;
}

export class CustomFieldMappingDto implements CustomFieldMapping {
  @IsSkip()
  _id: string;

  @IsSkip()
  tenantId: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  displayName: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  displayOnMobile: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isAllowMobileModified: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  displayOnWeb: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  required: boolean;

  @ApiProperty({ enum: EEntity })
  @IsEnum(EEntity)
  entity: EEntity;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => RefCustomFieldDto)
  customField: RefCustomFieldDto;

  @IsSkip()
  isHead: boolean;

  @IsSkip()
  next: string;
}

export class UpdateCustomFieldMappingDto
  extends CustomFieldMappingDto
  implements CustomFieldMapping
{
  @IsSkip()
  customField: RefCustomFieldDto;

  @IsSkip()
  entity: EEntity;
}

export class ReSortCustomFieldMappingDto
  implements Pick<CustomFieldMapping, "next">
{
  @IsSkip()
  _id: string;

  @ApiProperty()
  @ValidateIf((object, value) => value !== null || typeof value !== "string")
  next: string;
}
