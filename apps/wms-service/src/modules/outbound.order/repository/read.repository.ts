import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseReadRepository } from "src/database";
import { ModelTokens } from "wms-models/lib/common";
import { OutboundOrder } from "wms-models/lib/outbound.order";
import { ListOutboundOrderRequestDto } from "../dto";
import { PaginateResponse } from "wms-utils/lib/paging";
import {
  FilterBuilder,
  FilterOperator,
  FilterOrData,
  filterDate,
} from "wms-utils/lib/filter";

export class OutboundOrderReadRepository extends BaseReadRepository<OutboundOrder> {
  constructor(
    @InjectModel(ModelTokens.OutBound) readonly model: Model<OutboundOrder>
  ) {
    super(model);
  }

  public async list(
    query: ListOutboundOrderRequestDto
  ): Promise<PaginateResponse<OutboundOrder>> {
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
}
