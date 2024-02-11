import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SupplierReadRepository, SupplierWriteRepository } from "./repository";
import { ModelTokens } from "wms-models/lib/common";
import { supplierSchema } from "./schema";
import { SupplierController } from "./controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelTokens.Supplier,
        schema: supplierSchema,
      },
    ]),
  ],
  controllers: [SupplierController],
  providers: [SupplierReadRepository, SupplierWriteRepository],
  exports: [],
})
export class SupplierModule {}
