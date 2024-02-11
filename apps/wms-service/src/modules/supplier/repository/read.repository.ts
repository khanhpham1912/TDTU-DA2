import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseReadRepository } from "src/database";
import { ModelTokens } from "wms-models/lib/common";
import { Supplier } from "wms-models/lib/suppliers";

export class SupplierReadRepository extends BaseReadRepository<Supplier> {
  constructor(
    @InjectModel(ModelTokens.Supplier) readonly model: Model<Supplier>
  ) {
    super(model);
  }
}
