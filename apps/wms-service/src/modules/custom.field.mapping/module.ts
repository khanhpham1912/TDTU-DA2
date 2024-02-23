import { Module, forwardRef } from "@nestjs/common";
import { ModelTokens } from "wms-models/lib/common";
import { CustomFieldMappingSchema } from "./schema";
import { CustomFieldMappingController } from "./controller";
import {
  CustomFieldMappingReadRepository,
  CustomFieldMappingWriteRepository,
} from "./repository";
import { CustomFieldModule } from "../custom.field/module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelTokens.CustomFieldMapping,
        schema: CustomFieldMappingSchema,
      },
    ]),
    forwardRef(() => CustomFieldModule),
  ],
  controllers: [CustomFieldMappingController],
  providers: [
    CustomFieldMappingReadRepository,
    CustomFieldMappingWriteRepository,
  ],
  exports: [
    CustomFieldMappingReadRepository,
    CustomFieldMappingWriteRepository,
  ],
})
export class CustomFieldMappingModule {}
