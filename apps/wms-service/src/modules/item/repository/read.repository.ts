import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseReadRepository } from "src/database";
import { ModelTokens } from "wms-models/lib/common";
import { Item } from "wms-models/lib/items";
import {
  FilterBuilder,
  FilterOperator,
  FilterOrData,
  filterDate,
} from "wms-utils/lib/filter";
import { PaginateResponse } from "wms-utils/lib/paging";
import { ListItemRequestDto } from "../dto/list";

export class ItemReadRepository extends BaseReadRepository<Item> {
  constructor(@InjectModel(ModelTokens.Item) readonly model: Model<Item>) {
    super(model);
  }

  public async list(
    query: ListItemRequestDto
  ): Promise<PaginateResponse<Item>> {
    const filterSearch: FilterOrData[] = [
      {
        modelKey: "no",
        modelValue: query?.search?.trim(),
        operator: FilterOperator.REGEX,
      },
      {
        modelKey: "supplier.no",
        modelValue: query?.search?.trim(),
        operator: FilterOperator.REGEX,
      },
      {
        modelKey: "sku",
        modelValue: query?.search?.trim(),
        operator: FilterOperator.REGEX,
      },
      {
        modelKey: "no",
        modelValue: query?.search?.trim(),
        operator: FilterOperator.REGEX,
      },
    ];

    const filter: {} = FilterBuilder.init({})
      .withData("supplier.no", query?.filter.supplierNo, FilterOperator.EQUAL)
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
