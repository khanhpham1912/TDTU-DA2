import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsObject, IsString, ValidateNested } from "class-validator";
import { BaseDto } from "src/dto";
import { IsSkip } from "src/utils/dto.utility";
import {
  BankInfo,
  Supplier,
  SupplierContact,
  SupplierGeneral,
} from "wms-models/lib/suppliers";

class SupplierGeneralDto implements SupplierGeneral {
  @ApiProperty()
  @IsString()
  tax: string;

  @ApiProperty()
  @IsString()
  companyName: string;

  @ApiProperty()
  @IsString()
  companyPhone: string;

  @ApiProperty()
  @IsString()
  companyEmail: string;

  @ApiProperty()
  @IsString()
  officeAddress: string;
}

class SupplierContactDto implements SupplierContact {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  email: string;
}

class BankInfoDto implements BankInfo {
  @ApiProperty()
  @IsString()
  bankName: string;

  @ApiProperty()
  @IsString()
  accountName: string;

  @ApiProperty()
  @IsString()
  accountNumber: string;
}

export class SupplierDto extends BaseDto implements Supplier {
  @IsSkip()
  no: string;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => SupplierGeneralDto)
  general: SupplierGeneralDto;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => SupplierContactDto)
  contact: SupplierContactDto;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => BankInfoDto)
  bankInfo: BankInfoDto;
}
