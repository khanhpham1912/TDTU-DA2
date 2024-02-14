import { BaseReadRepository } from "src/database";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { CustomField } from "wms-models/lib/custom.field";
import {
  ListAllCustomFieldRequestDto,
  ListCustomFieldRequestDto,
} from "../dto";
import {
  FilterBuilder,
  FilterOperator,
  FilterOrData,
  filterDate,
} from "wms-utils/lib/filter";
import { PaginateResponse } from "wms-utils/lib/paging";
import { ModelTokens } from "wms-models/lib/common";

@Injectable()
export class CustomFieldReadRepository extends BaseReadRepository<CustomField> {
  constructor(
    @InjectModel(ModelTokens.CustomField) readonly model: Model<CustomField>
  ) {
    super(model);
  }

  public async listAll(
    query: ListAllCustomFieldRequestDto
  ): Promise<CustomField[]> {
    const filterSearch: FilterOrData[] = [
      {
        modelKey: "name",
        modelValue: query?.search?.trim(),
        operator: FilterOperator.REGEX,
      },
    ];

    const filter: {} = FilterBuilder.init({})
      .withAnd(
        "createdAt",
        filterDate(query.filter?.createdAt?.from, query.filter?.createdAt?.to)
      )
      .withAnd(
        "updatedAt",
        filterDate(query.filter?.updatedAt?.from, query.filter?.updatedAt?.to)
      )
      .withOr(filterSearch)
      .build();
    return this.findWithFilterBuilder(filter, query.sort, {
      selects: query.selects,
    });
  }

  public async list(
    query: ListCustomFieldRequestDto
  ): Promise<PaginateResponse<CustomField>> {
    const filterSearch: FilterOrData[] = [
      {
        modelKey: "name",
        modelValue: query?.search?.trim(),
        operator: FilterOperator.REGEX,
      },
    ];

    const filter: {} = FilterBuilder.init({})
      .withAnd(
        "createdAt",
        filterDate(query.filter?.createdAt?.from, query.filter?.createdAt?.to)
      )
      .withAnd(
        "updatedAt",
        filterDate(query.filter?.updatedAt?.from, query.filter?.updatedAt?.to)
      )
      .withData("type", query.filter?.type, FilterOperator.EQUAL)
      .withOr(filterSearch)
      .build();
    return this.findWithPaging(filter, query.paging, query.sort, {
      selects: query.selects,
    });
  }

  public async unique(id: string): Promise<boolean> {
    const customField: CustomField = await this.findById(id.trim());
    return customField ? false : true;
  }
}
