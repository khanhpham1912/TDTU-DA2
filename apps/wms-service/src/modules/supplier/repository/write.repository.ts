import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseWriteRepository } from "src/database";
import { ModelTokens } from "wms-models/lib/common";
import { Supplier } from "wms-models/lib/suppliers";

export class SupplierWriteRepository extends BaseWriteRepository<Supplier> {
  constructor(
    @InjectModel(ModelTokens.Supplier) readonly model: Model<Supplier>
  ) {
    super(model);
  }
}
