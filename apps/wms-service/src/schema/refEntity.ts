import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { RefEntity } from "base-models";

@Schema()
export class RefEntityDocument implements RefEntity {
  @Prop(String)
  _id: string;

  @Prop(String)
  no: string;

  @Prop(String)
  name?: string;
}

export const RefEntitySchema = SchemaFactory.createForClass(RefEntityDocument);
