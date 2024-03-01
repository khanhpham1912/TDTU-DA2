import { BaseWriteRepository, ItemDeletedResponse } from "src/database";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ModelTokens } from "wms-models/lib/common";
import { CustomField } from "wms-models/lib/custom.field";
import { CustomFieldDto, UpdateCustomFieldDto } from "../dto";
import { ValidationError } from "wms-utils/lib/error";
import { ECustomFieldType, ExtraData } from "wms-models/lib/shared";
import { CustomFieldMapping } from "wms-models/lib/custom.field.mapping";
import {
  CustomFieldMappingReadRepository,
  CustomFieldMappingWriteRepository,
} from "src/modules/custom.field.mapping/repository";
import { CustomFieldReadRepository } from "./read.repository";
import { mergeObj } from "wms-utils/lib/db";
import { Inject, forwardRef } from "@nestjs/common";

export class CustomFieldWriteRepository extends BaseWriteRepository<CustomField> {
  constructor(
    @InjectModel(ModelTokens.CustomField) readonly model: Model<CustomField>,

    private readonly readRepo: CustomFieldReadRepository,

    @Inject(forwardRef(() => CustomFieldMappingReadRepository))
    private readonly customFieldMappingReadRepository: CustomFieldMappingReadRepository,

    @Inject(forwardRef(() => CustomFieldMappingWriteRepository))
    private readonly customFieldMappingWriteRepository: CustomFieldMappingWriteRepository
  ) {
    super(model);
  }

  public async createCF(customFieldDto: CustomFieldDto): Promise<CustomField> {
    let request: Partial<CustomField> = customFieldDto;

    request._id = `${request.type}_${request.name}`.toLowerCase();
    request.active = true;
    request.deletedAt = null;

    const customField: CustomField = await this.readRepo.findOne({
      _id: request._id,
    });

    if (customField) throw new ValidationError();

    const type: ECustomFieldType = request.type;

    switch (type) {
      case ECustomFieldType.SELECT:
        if (!request.extraData?.selectConfig) throw new ValidationError();
        break;
      case ECustomFieldType.CHECKBOX:
        if (!request.extraData?.checkboxConfig) throw new ValidationError();
        break;
      case ECustomFieldType.RADIO:
        if (!request.extraData?.radioConfig) throw new ValidationError();
        break;
      default:
        break;
    }

    const after: CustomField = await this.save(
      {
        ...request,
      },
      {
        options: {
          upsert: true,
          new: true,
        },
      }
    );

    return after;
  }

  public async updateCF(
    id: string,
    updateCustomFieldDto: UpdateCustomFieldDto
  ): Promise<CustomField> {
    const before: CustomField = await this.readRepo.findById(id);
    let request: Partial<CustomField> = updateCustomFieldDto;

    // only accept selection type to update
    if (before.type !== ECustomFieldType.SELECT) throw new ValidationError();

    // Must have selections
    if (!request.extraData.selectConfig) throw new ValidationError();

    const { selectConfig } = request.extraData;

    const newData = {
      extraData: {
        selectConfig,
      },
    };

    const after: CustomField = await this.update(
      {
        _id: before._id,
      },
      mergeObj(before, newData)
    );

    await this.updateExtraDataByCustomField({
      customFieldId: after._id,
      extraData: after.extraData,
    });

    return after;
  }

  public async deleteCf(id: string): Promise<ItemDeletedResponse> {
    const after: ItemDeletedResponse = await this.delete(id);

    await this.deleteCustomFieldMappingsByCustomField({
      customFieldId: after._id,
    });
    return after;
  }

  async deleteCustomFieldMappingsByCustomField(match: {
    customFieldId: string;
  }): Promise<CustomFieldMapping[]> {
    const customFieldMappings: CustomFieldMapping[] =
      await this.customFieldMappingReadRepository.find({
        "customField._id": match.customFieldId,
      });

    if (!customFieldMappings) return;

    for (const customFieldMapping of customFieldMappings) {
      await this.customFieldMappingWriteRepository.deleteCFM(
        customFieldMapping._id
      );
    }

    return;
  }

  async updateExtraDataByCustomField(match: {
    customFieldId: string;
    extraData: ExtraData;
  }): Promise<CustomFieldMapping[]> {
    const customFieldMappings: CustomFieldMapping[] =
      await this.customFieldMappingReadRepository.find({
        "customField._id": match.customFieldId,
      });

    if (!customFieldMappings) return;

    const customFieldMappingIds: string[] = customFieldMappings.map(
      (customFieldMapping: CustomFieldMapping): string => {
        return customFieldMapping._id;
      }
    );

    const result: CustomFieldMapping[] =
      await this.customFieldMappingWriteRepository.updateMany(
        {
          ids: customFieldMappingIds,
        },
        {
          "customField.extraData": {
            ...match.extraData,
          },
        }
      );

    return result;
  }
}
