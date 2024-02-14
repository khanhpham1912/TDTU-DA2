import { Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { uuid } from "wms-utils/lib/uuid";
import { BaseEntity } from "base-models";

export class BaseSchema extends Document implements BaseEntity {
  @Prop({
    type: String,
    default: function genUUID(): any {
      return uuid();
    },
  })
  _id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ default: true })
  active?: boolean;

  @Prop({ type: Date })
  deletedAt?: Date;
}
