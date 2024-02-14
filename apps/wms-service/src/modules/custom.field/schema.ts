import { BaseSchema } from "src/database";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CustomField } from "wms-models/lib/custom.field";
import { ModelTokens } from "wms-models/lib/common";
import { ECustomFieldType } from "wms-models/lib/shared";
import { SchemaTypes } from "mongoose";

@Schema({
  timestamps: true,
  collection: ModelTokens.CustomField,
})
export class CustomFieldDocument extends BaseSchema implements CustomField {
  @Prop(String)
  tenantId: string;

  @Prop(String)
  name: string;

  @Prop(String)
  type: ECustomFieldType;

  @Prop({ type: SchemaTypes.Mixed })
  extraData: any;
}
export const CustomFieldSchema =
  SchemaFactory.createForClass(CustomFieldDocument);
