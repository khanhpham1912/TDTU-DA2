import { BaseReadRepository } from "src/database";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import {
  FilterBuilder,
  FilterOperator,
  FilterOrData,
} from "wms-utils/lib/filter";
import { CustomFieldMapping } from "wms-models/lib/custom.field.mapping";
import { ListAllCustomFieldMappingRequestDto } from "../dto";
import { CustomField } from "wms-models/lib/custom.field";
import { EEntity } from "wms-models/lib/shared";
import { ValidationError } from "wms-utils/lib/error";
import { ModelTokens } from "wms-models/lib/common";
import { CustomFieldService } from "src/modules/custom.field/service";

@Injectable()
export class CustomFieldMappingReadRepository extends BaseReadRepository<CustomFieldMapping> {
  constructor(
    @InjectModel(ModelTokens.CustomFieldMapping)
    readonly model: Model<CustomFieldMapping>,
    private readonly customFieldService: CustomFieldService
  ) {
    super(model);
  }

  public async listAll(
    query: ListAllCustomFieldMappingRequestDto
  ): Promise<CustomFieldMapping[]> {
    const filterSearch: FilterOrData[] = [
      {
        modelKey: "displayName",
        modelValue: query?.search?.trim(),
        operator: FilterOperator.REGEX,
      },
    ];

    const filter: {} = FilterBuilder.init({})
      .withData("entity", query.filter?.entity, FilterOperator.EQUAL)
      .withOr(filterSearch)
      .build();

    const customFieldMappings: CustomFieldMapping[] =
      await this.findWithFilterBuilder(filter, query.sort, {
        selects: query.selects,
      });

    const afterCustomFieldMappings: CustomFieldMapping[] = [];

    const mappingMap = new Map(
      customFieldMappings.map((v) => {
        if (v.isHead) {
          return ["head", v];
        }
        return [v._id, v];
      })
    );

    const length: number = customFieldMappings.length;
    let next: string = "head";
    let totalLoop: number = 0;

    do {
      const findMapping = mappingMap.get(next);
      if (findMapping) {
        afterCustomFieldMappings.push(findMapping);
        next = findMapping.next;
      }
      totalLoop++;
    } while (next && totalLoop < length);

    return afterCustomFieldMappings;
  }

  public async findUnMappedCustomFields(
    entity: string
  ): Promise<CustomField[]> {
    if (!(entity in EEntity)) throw new ValidationError();

    const customFieldMappings: CustomFieldMapping[] = await this.find({
      entity,
    });

    const customFieldMappedIds: string[] = customFieldMappings.map(
      (customFieldMapping: CustomFieldMapping): string => {
        return customFieldMapping.customField._id;
      }
    );

    const customFields: CustomField[] =
      await this.customFieldService.unMappedCustomField(customFieldMappedIds);

    return customFields;
  }
}
