import { Module, forwardRef } from "@nestjs/common";
import { CustomFieldSchema } from "./schema";
import { CustomFieldController } from "./controller";
import {
  CustomFieldReadRepository,
  CustomFieldWriteRepository,
} from "./repository";
import { CustomFieldService } from "./service";
import { MongooseModule } from "@nestjs/mongoose";
import { ModelTokens } from "wms-models/lib/common";
import { CustomFieldMappingModule } from "../custom.field.mapping/module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelTokens.CustomField, schema: CustomFieldSchema },
    ]),
    forwardRef(() => CustomFieldMappingModule),
  ],
  controllers: [CustomFieldController],
  providers: [
    CustomFieldReadRepository,
    CustomFieldWriteRepository,
    CustomFieldService,
  ],
  exports: [
    CustomFieldReadRepository,
    CustomFieldWriteRepository,
    CustomFieldService,
  ],
})
export class CustomFieldModule {}
