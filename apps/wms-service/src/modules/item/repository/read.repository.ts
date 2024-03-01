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
        modelKey: "type",
        modelValue: query?.search?.trim(),
        operator: FilterOperator.REGEX,
      },
      {
        modelKey: "supplier.no",
        modelValue: query?.search?.trim(),
        operator: FilterOperator.REGEX,
      },
      {
        modelKey: "uom",
        modelValue: query?.search?.trim(),
        operator: FilterOperator.REGEX,
      },
    ];

    const filter: {} = FilterBuilder.init({})
      .withData("supplier.no", query?.filter.supplierNo, FilterOperator.EQUAL)
      .withData("uom", query?.filter?.uom, FilterOperator.EQUAL)
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

  public async checkSKU(sku: string): Promise<boolean> {
    const result: Item = await this.findOne({
      sku,
    });

    if (result) return false;
    return true;
  }
}
