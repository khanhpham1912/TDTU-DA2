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
import { InventoryService } from "src/modules/inventory/service";
import { Inject, forwardRef } from "@nestjs/common";

export class ItemReadRepository extends BaseReadRepository<Item> {
  constructor(
    @InjectModel(ModelTokens.Item) readonly model: Model<Item>,
    @Inject(forwardRef(() => InventoryService))
    private readonly inventoryService: InventoryService
  ) {
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
      {
        modelKey: "name",
        modelValue: query?.search?.trim(),
        operator: FilterOperator.REGEX,
      },
    ];

    const filter: {} = FilterBuilder.init({})
      .withData("supplier.no", query?.filter?.supplierNo, FilterOperator.EQUAL)
      .withData("uom", query?.filter?.uom, FilterOperator.EQUAL)
      .withData("type", query?.filter?.type, FilterOperator.EQUAL)
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

    const after = await this.findWithPaging(filter, query.paging, query.sort, {
      selects: query.selects,
    });

    return after;
  }

  public async checkSKU(sku: string): Promise<boolean> {
    const result: Item = await this.findOne({
      sku,
    });

    if (result) return false;
    return true;
  }

  public async listItemWithInventory(
    query: ListItemRequestDto
  ): Promise<PaginateResponse<any>> {
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
      {
        modelKey: "name",
        modelValue: query?.search?.trim(),
        operator: FilterOperator.REGEX,
      },
    ];

    const filter: {} = FilterBuilder.init({})
      .withData("supplier.no", query?.filter?.supplierNo, FilterOperator.EQUAL)
      .withData("uom", query?.filter?.uom, FilterOperator.EQUAL)
      .withData("type", query?.filter?.type, FilterOperator.EQUAL)
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

    const after = await this.findWithPaging(filter, query.paging, query.sort, {
      selects: query.selects,
    });

    return {
      ...after,
      docs: await Promise.all(
        after.docs.map(async (item) => {
          const inventory =
            await this.inventoryService.getAvailableInventoryItemFromMidNightToNow(
              item.no
            );
          return {
            ...item,
            availableInventories: inventory.availableInventories,
          };
        })
      ),
    };
  }
}
