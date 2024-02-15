import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { BaseSchema } from "src/database";
import { ModelTokens } from "wms-models/lib/common";
import { RefCustomFieldMapping } from "wms-models/lib/custom.field.mapping";
import {
  BankInfo,
  Supplier,
  SupplierContact,
  SupplierGeneral,
} from "wms-models/lib/suppliers";

@Schema({ _id: false })
export class BankInfoDocument implements BankInfo {
  @Prop(String)
  bankName: string;

  @Prop(String)
  accountName: string;

  @Prop(String)
  accountNumber: string;
}
export const bankInfoSchema = SchemaFactory.createForClass(BankInfoDocument);

@Schema({ _id: false })
export class SupplierGeneralDocument implements SupplierGeneral {
  @Prop(String)
  tax: string;

  @Prop(String)
  companyName: string;

  @Prop(String)
  companyPhone: string;

  @Prop(String)
  companyEmail: string;

  @Prop(String)
  officeAddress: string;
}
export const supplierGeneralSchema = SchemaFactory.createForClass(
  SupplierGeneralDocument
);

@Schema({ _id: false })
export class SupplierContactDocument implements SupplierContact {
  @Prop(String)
  name: string;

  @Prop(String)
  phone: string;

  @Prop(String)
  email: string;
}
export const SupplierContactSchema = SchemaFactory.createForClass(
  SupplierContactDocument
);

@Schema({
  timestamps: true,
  collection: ModelTokens.Supplier,
  autoIndex: true,
})
export class SupplierDocument extends BaseSchema implements Supplier {
  @Prop(String)
  no: string;

  @Prop({ type: bankInfoSchema })
  bankInfo: BankInfoDocument;

  @Prop({ type: supplierGeneralSchema })
  general: SupplierGeneralDocument;

  @Prop({ type: SupplierContactSchema })
  contact: SupplierContactDocument;

  @Prop({ type: SchemaTypes.Mixed })
  customFieldMapping?: RefCustomFieldMapping;
}

export const supplierSchema = SchemaFactory.createForClass(SupplierDocument);
