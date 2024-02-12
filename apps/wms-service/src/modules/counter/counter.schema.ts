import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "../../database/base.schema";
import { ModelTokens } from "wms-models/lib/common";
import { Counter } from "wms-models/lib/counter";

@Schema({ timestamps: true, collection: ModelTokens.Counter, autoIndex: true })
export class CounterDocument extends BaseSchema implements Counter {
  @Prop(String)
  name: string;

  @Prop(String)
  prefix?: string;

  @Prop(String)
  format?: string;

  @Prop(Number)
  startingCounter: number;

  @Prop(Number)
  currentCounter: number;

  @Prop(String)
  currentDate?: string;
}

export const CounterSchema = SchemaFactory.createForClass(CounterDocument);
