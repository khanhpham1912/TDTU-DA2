import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseReadRepository } from "src/database";
import { ModelTokens } from "wms-models/lib/common";
import { InboundOrder } from "wms-models/lib/inbound";
import { ListInboundOrderRequestDto } from "../dto";
import { PaginateResponse } from "wms-utils/lib/paging";
import {
  FilterBuilder,
  FilterOperator,
  FilterOrData,
  filterDate,
} from "wms-utils/lib/filter";

export class InboundOrderReadRepository extends BaseReadRepository<InboundOrder> {
  constructor(
    @InjectModel(ModelTokens.InBound) readonly model: Model<InboundOrder>
  ) {
    super(model);
  }

  public async list(
    query: ListInboundOrderRequestDto
  ): Promise<PaginateResponse<InboundOrder>> {
    const filterSearch: FilterOrData[] = [
      {
        modelKey: "no",
        modelValue: query?.search?.trim(),
        operator: FilterOperator.REGEX,
      },
      {
        modelKey: "shipper.shipperName",
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

  public async all(query: ListInboundOrderRequestDto): Promise<InboundOrder[]> {
    const filterSearch: FilterOrData[] = [
      {
        modelKey: "no",
        modelValue: query?.search?.trim(),
        operator: FilterOperator.REGEX,
      },
      {
        modelKey: "shipper.shipperName",
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

    return this.findWithFilterBuilder(filter, query.sort, {
      selects: query.selects,
    });
  }
}
