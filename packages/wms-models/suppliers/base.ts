import { BaseEntity } from "base-models";

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
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export interface Supplier extends BaseEntity {
  general: SupplierGeneral;
  contact: SupplierContact;
  bankInfo: BankInfo
}
