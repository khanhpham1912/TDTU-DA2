import { BaseSchema } from "src/database";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { ModelTokens } from "wms-models/lib/common";
import {
  CustomFieldMapping,
  RefCustomField,
} from "wms-models/lib/custom.field.mapping";

import { ECustomFieldType, EEntity } from "wms-models/lib/shared";

@Schema()
class RefCustomFieldDocument implements RefCustomField {
  @Prop(String)
  _id: string;

  @Prop(String)
  name: string;

  @Prop(String)
  type: ECustomFieldType;

  @Prop({ type: SchemaTypes.Mixed })
  extraData: any;
}
export const RefCustomFieldSchema = SchemaFactory.createForClass(
  RefCustomFieldDocument
);

@Schema({
  timestamps: true,
  collection: ModelTokens.CustomFieldMapping,
})
export class CustomFieldMappingDocument
  extends BaseSchema
  implements CustomFieldMapping
{
  @Prop(Boolean)
  displayOnDocument: boolean;

  @Prop(String)
  tenantId: string;

  @Prop(String)
  displayName: string;

  @Prop(Boolean)
  displayOnWeb: boolean;

  @Prop({ type: Boolean, default: false })
  required: boolean;

  @Prop(String)
  entity: EEntity;

  @Prop(String)
  type: ECustomFieldType;

  @Prop({ type: RefCustomFieldSchema })
  customField: RefCustomFieldDocument;

  @Prop(Boolean)
  isHead: boolean;

  @Prop(String)
  next: string;
}
export const CustomFieldMappingSchema = SchemaFactory.createForClass(
  CustomFieldMappingDocument
);
