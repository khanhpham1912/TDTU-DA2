import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseReadRepository } from "src/database";
import { ModelTokens } from "wms-models/lib/common";
import { Supplier } from "wms-models/lib/suppliers";
import { ListSupplierRequestDto } from "../dto";
import { PaginateResponse } from "wms-utils/lib/paging";
import {
  FilterBuilder,
  FilterOperator,
  FilterOrData,
  filterDate,
} from "wms-utils/lib/filter";

export class SupplierReadRepository extends BaseReadRepository<Supplier> {
  constructor(
    @InjectModel(ModelTokens.Supplier) readonly model: Model<Supplier>
  ) {
    super(model);
  }

  public async list(
    query: ListSupplierRequestDto
  ): Promise<PaginateResponse<Supplier>> {
    const filterSearch: FilterOrData[] = [
      {
        modelKey: "contact.name",
        modelValue: query?.search?.trim(),
        operator: FilterOperator.REGEX,
      },
      {
        modelKey: "contact.email",
        modelValue: query?.search?.trim(),
        operator: FilterOperator.REGEX,
      },
      {
        modelKey: "general.companyName",
        modelValue: query?.search?.trim(),
        operator: FilterOperator.REGEX,
      },
      {
        modelKey: "general.officeAddress",
        modelValue: query?.search?.trim(),
        operator: FilterOperator.REGEX,
      },
    ];

    const filter: {} = FilterBuilder.init({})
      .withAnd(
        "createdAt",
        filterDate(query?.filter?.createdAt?.from, query?.filter?.createdAt?.to)
      )
      .withAnd(
        "updatedAt",
        filterDate(query?.filter?.createdAt?.from, query?.filter?.createdAt?.to)
      )
      .withOr(filterSearch)
      .build();

    return this.findWithPaging(filter, query.paging, query.sort, {
      selects: query.selects,
    });
  }
}
