import { BaseEntity } from "base-models";
import { RefCustomFieldMapping } from "../custom.field.mapping";

export interface SupplierGeneral {
  tax: string;
  companyName: string;
  companyPhone: string;
  companyEmail: string;
  officeAddress: string;
}

export interface SupplierContact {
  name: string;
  phone: string;
  email: string;
}

export interface BankInfo {
  bankName: any;
  accountName: string;
  accountNumber: string;
}

export interface Supplier extends BaseEntity {
  no: string;
  general: SupplierGeneral;
  contact: SupplierContact;
  bankInfo: BankInfo
  customFieldMapping?: RefCustomFieldMapping;

}
