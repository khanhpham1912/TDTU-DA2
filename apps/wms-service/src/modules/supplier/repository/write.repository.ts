import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseWriteRepository } from "src/database";
import { ModelTokens } from "wms-models/lib/common";
import { Supplier } from "wms-models/lib/suppliers";
import { SupplierDto } from "../dto";
import { CounterService } from "src/modules/counter/counter.service";
import { CounterFormat, CounterPrefix } from "src/common";

export class SupplierWriteRepository extends BaseWriteRepository<Supplier> {
  constructor(
    @InjectModel(ModelTokens.Supplier) readonly model: Model<Supplier>,
    private readonly counterService: CounterService
  ) {
    super(model);
  }

  public async createSupplier(supplier: SupplierDto): Promise<Supplier> {
    supplier.no = await this.counterService.getNextSequence(
      ModelTokens.Supplier,
      CounterPrefix.Supplier,
      CounterFormat.Supplier
    );

    return await this.create(supplier);
  }
}
