import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { BaseDto } from "src/dto";
import { IsSkip } from "src/utils/dto.utility";
import { RefCustomFieldMapping } from "wms-models/lib/custom.field.mapping";
import {
  BankInfo,
  Supplier,
  SupplierContact,
  SupplierGeneral,
} from "wms-models/lib/suppliers";

class SupplierGeneralDto implements SupplierGeneral {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tax: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyPhone: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyEmail: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  officeAddress: string;
}

class SupplierContactDto implements SupplierContact {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email: string;
}

class BankInfoDto implements BankInfo {
  @ApiPropertyOptional()
  @IsOptional()
  bankName: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  accountName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  accountNumber: string;
}

export class SupplierDto extends BaseDto implements Supplier {
  @IsSkip()
  no: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SupplierGeneralDto)
  general: SupplierGeneralDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SupplierContactDto)
  contact: SupplierContactDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => BankInfoDto)
  bankInfo: BankInfoDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  customFieldMapping?: RefCustomFieldMapping;
}
