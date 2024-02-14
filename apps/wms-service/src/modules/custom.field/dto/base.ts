import { IsSkip } from "src/utils/dto.utility";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from "class-validator";
import { CustomField } from "wms-models/lib/custom.field";
import { ECustomFieldType } from "wms-models/lib/shared";
import {
  AttachmentCustomField,
  CheckboxCustomField,
  ExtraData,
  NumberCustomField,
  RadioCustomField,
  SelectCustomField,
} from "wms-models/lib/shared/extra.data";

class SelectCustomFieldDto implements SelectCustomField {
  @ApiProperty()
  @IsBoolean()
  multiple: boolean;

  @ApiProperty({ isArray: true })
  @IsString({ each: true })
  @ArrayMaxSize(10)
  @ArrayMinSize(1)
  @MaxLength(120, { each: true })
  options: string[];
}

class CheckboxCustomFieldDto implements CheckboxCustomField {
  @ApiProperty({ isArray: true })
  @IsString({ each: true })
  @ArrayMaxSize(10)
  @ArrayMinSize(1)
  @MaxLength(120, { each: true })
  options: string[];
}

class RadioCustomFieldDto implements RadioCustomField {
  @ApiProperty({ isArray: true })
  @IsString({ each: true })
  @ArrayMaxSize(10)
  @ArrayMinSize(1)
  @MaxLength(120, { each: true })
  options: string[];
}

class NumberCustomFieldDto implements NumberCustomField {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  min?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  max?: number;
}

class AttachmentCustomFieldDto implements AttachmentCustomField {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxCount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minCount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  filePath?: string;

  @ApiPropertyOptional({ isArray: true })
  @IsOptional()
  @IsString({ each: true })
  fileType?: (
    | "image/jpeg"
    | "image/png"
    | "application/pdf"
    | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  )[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  fileSize?: number;
}

class ExtraDataDto implements ExtraData {
  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SelectCustomFieldDto)
  selectConfig?: SelectCustomFieldDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CheckboxCustomFieldDto)
  checkboxConfig?: CheckboxCustomFieldDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => RadioCustomFieldDto)
  radioConfig?: RadioCustomFieldDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => NumberCustomFieldDto)
  numberConfig?: NumberCustomFieldDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => AttachmentCustomFieldDto)
  attachmentConfig?: AttachmentCustomFieldDto;
}

export class CustomFieldDto implements CustomField {
  @IsSkip()
  _id: string;

  @IsSkip()
  tenantId: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  @Matches(/^[a-zA-Z0-9]+$/)
  name: string;

  @ApiProperty({ enum: ECustomFieldType })
  @IsEnum(ECustomFieldType)
  @IsNotEmpty()
  type: ECustomFieldType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ExtraDataDto)
  extraData?: ExtraDataDto;
}

export class UpdateCustomFieldDto implements CustomField {
  @IsSkip()
  _id: string;

  @IsSkip()
  tenantId: string;

  @IsSkip()
  name: string;

  @IsSkip()
  type: ECustomFieldType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ExtraDataDto)
  extraData?: ExtraDataDto;
}
