import { Module } from "@nestjs/common";
import { CustomFieldSchema } from "./schema";
import { CustomFieldController } from "./controller";
import {
  CustomFieldReadRepository,
  CustomFieldWriteRepository,
} from "./repository";
import { CustomFieldService } from "./service";
import { MongooseModule } from "@nestjs/mongoose";
import { ModelTokens } from "wms-models/lib/common";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelTokens.CustomField, schema: CustomFieldSchema },
    ]),
  ],
  controllers: [CustomFieldController],
  providers: [
    CustomFieldReadRepository,
    CustomFieldWriteRepository,
    CustomFieldService,
  ],
  exports: [CustomFieldService],
})
export class CustomFieldModule {}
