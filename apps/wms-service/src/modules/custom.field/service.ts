import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { CustomFieldReadRepository } from "./repository";
import { CustomField } from "wms-models/lib/custom.field";
import { GetAllCustomFieldUnmappedDto } from "./dto";
import { EEntity } from "wms-models/lib/shared";
import { CustomFieldMapping } from "wms-models/lib/custom.field.mapping";
import { ValidationError } from "wms-utils/lib/error";
import { FilterQuery } from "mongoose";
import { CustomFieldMappingReadRepository } from "../custom.field.mapping/repository";

@Injectable()
export class CustomFieldService {
  constructor(
    private readonly customFieldReadRepository: CustomFieldReadRepository,
    // private readonly moduleRef: ModuleRef

    @Inject(forwardRef(() => CustomFieldMappingReadRepository))
    private customFieldMappingReadRepository: CustomFieldMappingReadRepository
  ) {}

  public async findOne(match: FilterQuery<CustomField>): Promise<CustomField> {
    return this.customFieldReadRepository.findOne(match);
  }

  public async unMappedCustomField(
    customFieldMappedIds: string[]
  ): Promise<CustomField[]> {
    return this.customFieldReadRepository.find({
      _id: {
        $nin: customFieldMappedIds,
      },
    });
  }

  public async getAllUnmapped(body: GetAllCustomFieldUnmappedDto) {
    if (!(body.entity in EEntity)) throw new ValidationError();

    const customFieldMappings: CustomFieldMapping[] =
      await this.customFieldMappingReadRepository.find(body);

    const customFieldMappedIds: string[] = customFieldMappings.map(
      (customFieldMapping: CustomFieldMapping): string => {
        return customFieldMapping.customField._id;
      }
    );

    const customFields: CustomField[] =
      await this.unMappedCustomField(customFieldMappedIds);

    return customFields;
  }
}
