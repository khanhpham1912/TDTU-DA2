import { BaseWriteRepository, ItemDeletedResponse } from "src/database";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ModelTokens } from "wms-models/lib/common";
import { CustomFieldMapping } from "wms-models/lib/custom.field.mapping";
import {
  CustomFieldMappingDto,
  ReSortCustomFieldMappingDto,
  UpdateCustomFieldMappingDto,
} from "../dto";
import { CustomField } from "wms-models/lib/custom.field";
import { NotFoundError } from "wms-utils/lib/error";
import { ModuleRef } from "@nestjs/core";
import { CustomFieldService } from "src/modules/custom.field/service";
import { CustomFieldMappingReadRepository } from "./read.repository";
import { mergeObj } from "wms-utils/lib/db";

export class CustomFieldMappingWriteRepository extends BaseWriteRepository<CustomFieldMapping> {
  constructor(
    @InjectModel(ModelTokens.CustomFieldMapping)
    readonly model: Model<CustomFieldMapping>,
    private readonly moduleRef: ModuleRef,
    private readonly readRepo: CustomFieldMappingReadRepository,
    private readonly writeRepo: CustomFieldMappingWriteRepository
  ) {
    super(model);
  }

  public async createCFM(
    createCustomFieldMapping: CustomFieldMappingDto
  ): Promise<CustomFieldMapping> {
    let request: Partial<CustomFieldMapping> = createCustomFieldMapping;

    const customFieldService = await this.moduleRef.resolve(CustomFieldService);

    // Case: not found custom field
    const customFieldId: string = request.customField?._id;
    const customField: CustomField = await customFieldService.findOne({
      _id: customFieldId,
    });
    if (!customField) throw new NotFoundError();

    request._id = `${request.entity}_${customField._id}`.toLowerCase();

    const before: CustomFieldMapping = await this.readRepo.findOne({
      _id: request._id,
    });

    // Case: Field already exists
    if (before) throw new NotFoundError();

    request.deletedAt = null;
    request.active = true;
    request.customField = {
      _id: customField._id,
      name: customField.name,
      type: customField.type,
      extraData: customField.extraData,
    };
    request.isHead = false;
    request.next = null;

    const item = {
      ...request,
      next: null,
    };

    const extra = {
      options: {
        upsert: true,
        new: true,
      },
    };

    const oldField: CustomFieldMapping = await this.readRepo.findLast({
      entity: request.entity,
      _id: {
        $ne: request._id,
      },
      next: null,
    });

    if (!oldField) {
      const customFieldMapping: CustomFieldMapping = await this.writeRepo.save(
        {
          ...item,
          isHead: true,
        },
        extra
      );

      return customFieldMapping;
    }

    await this.writeRepo.update({ _id: oldField._id }, { next: request._id });

    const customFieldMapping: CustomFieldMapping = await this.writeRepo.save(
      item,
      extra
    );

    return customFieldMapping;
  }

  public async updateCFM(
    id: string,
    updateCustomFieldMapping: UpdateCustomFieldMappingDto
  ): Promise<CustomFieldMapping> {
    let request: Partial<CustomFieldMapping> = updateCustomFieldMapping;

    const newData = {
      ...request,
    };

    const before: CustomFieldMapping = await this.readRepo.findOne({
      _id: id,
    });

    const after: CustomFieldMapping = await this.update(
      {
        _id: before._id,
      },
      mergeObj(before, newData)
    );

    return after;
  }

  public async deleteCFM(id: string): Promise<ItemDeletedResponse> {
    const before: CustomFieldMapping = await this.readRepo.findOne({
      _id: id,
    });

    // Delete head node
    if (before.isHead) {
      await this.update(
        {
          _id: before.next,
        },
        {
          isHead: true,
        }
      );
    }

    // Delete last node
    if (!before.next) {
      await this.update(
        {
          next: before._id,
        },
        {
          next: null,
        }
      );
    }

    // Delete in normal case
    if (before.next) {
      const next: CustomFieldMapping = await this.readRepo.findOne({
        _id: before.next,
      });

      await this.update(
        {
          next: before._id,
        },
        {
          next: next._id,
        }
      );
    }

    const after: ItemDeletedResponse = await this.delete(before._id, {});

    return after;
  }

  public async reSort(
    id: string,
    customFieldMappingSorted: ReSortCustomFieldMappingDto
  ) {
    const before: CustomFieldMapping = await this.readRepo.findOne({
      _id: id,
    });

    let request: Partial<CustomFieldMapping> = customFieldMappingSorted;

    const currentNode: CustomFieldMapping = {
      ...before,
    };

    if (currentNode.next === request.next) return before;

    const newNextNode: CustomFieldMapping = await this.readRepo.findOne({
      _id: request.next,
    });

    // Drag & drop headNode to the last
    if (currentNode.isHead && !newNextNode) {
      // lastNode
      await this.update(
        {
          next: null,
          entity: currentNode.entity,
        },
        {
          next: currentNode._id,
        }
      );

      // nextNodeOfHead
      await this.update(
        {
          _id: currentNode.next,
        },
        {
          isHead: true,
        }
      );

      // headNode
      const headNode: CustomFieldMapping = await this.update(
        {
          _id: currentNode._id,
        },
        {
          isHead: false,
          next: null,
        }
      );

      return headNode;
    }

    // Drag & drop headNode to the second  (swap)
    if (currentNode.isHead && currentNode.next === newNextNode._id) {
      // second
      await this.update(
        {
          _id: newNextNode._id,
        },
        {
          isHead: true,
          next: currentNode._id,
        }
      );

      // headNode
      const headNode: CustomFieldMapping = await this.update(
        {
          _id: currentNode._id,
        },
        {
          isHead: false,
          next: newNextNode.next,
        }
      );

      return headNode;
    }

    // Drag & drop headNode to the middle
    if (currentNode.isHead && newNextNode) {
      // nextNodeOfHead
      await this.update(
        {
          _id: currentNode.next,
        },
        {
          isHead: true,
        }
      );

      // newPreviousOfHeadNode
      await this.update(
        {
          next: newNextNode._id,
          entity: currentNode.entity,
        },
        {
          next: currentNode._id,
        }
      );

      // headNode
      const headNode: CustomFieldMapping = await this.update(
        {
          _id: currentNode._id,
        },
        {
          isHead: false,
          next: newNextNode._id,
        }
      );

      return headNode;
    }

    // Drag & drop lastNode to the head
    if (!currentNode.next && newNextNode?.isHead) {
      // previousOfLastNode
      await this.update(
        {
          next: currentNode._id,
          entity: currentNode.entity,
        },
        {
          next: null,
        }
      );

      // lastNode
      const lastNode: CustomFieldMapping = await this.update(
        {
          _id: currentNode._id,
        },
        {
          isHead: true,
          next: newNextNode._id,
        }
      );

      // newNextNodeOfLastNode
      await this.update(
        {
          _id: newNextNode._id,
        },
        {
          isHead: false,
        }
      );

      return lastNode;
    }

    // Drag & drop lastNode to the middle
    if (!currentNode.next && typeof !newNextNode?.next) {
      // previousOfLastNode
      await this.update(
        {
          next: currentNode._id,
        },
        {
          next: null,
        }
      );

      // lastNode
      const lastNode: CustomFieldMapping = await this.update(
        {
          _id: currentNode._id,
        },
        {
          next: newNextNode._id,
        }
      );

      // newPreviousNodeOfLastNode
      this.update(
        {
          next: newNextNode._id,
          entity: currentNode.entity,
        },
        {
          next: currentNode._id,
        }
      );

      return lastNode;
    }

    // Drag & drop middleNode to the middle
    if (
      !currentNode.isHead &&
      currentNode.next &&
      !newNextNode?.isHead &&
      newNextNode
    ) {
      // previousOfMiddleNode
      await this.update(
        {
          next: currentNode._id,
          entity: currentNode.entity,
        },
        {
          next: currentNode.next,
        }
      );

      // newPreviousNodeOfMiddleNode
      await this.update(
        {
          next: newNextNode._id,
          entity: currentNode.entity,
        },
        {
          next: currentNode._id,
        }
      );

      // middleNode
      const middleNode: CustomFieldMapping = await this.update(
        {
          _id: currentNode._id,
        },
        {
          next: newNextNode._id,
        }
      );

      return middleNode;
    }

    // Drag & drop middleNode to the last
    if (!currentNode.isHead && currentNode.next && !newNextNode) {
      // previousOfMiddleNode
      await this.update(
        {
          next: currentNode._id,
          entity: currentNode.entity,
        },
        {
          next: currentNode.next,
        }
      );

      // newNextNodeOfMiddleNode
      await this.update(
        {
          next: null,
          entity: currentNode.entity,
        },
        {
          next: currentNode._id,
        }
      );

      // middleNode
      const middleNode: CustomFieldMapping = await this.update(
        {
          _id: currentNode._id,
        },
        {
          next: null,
        }
      );

      return middleNode;
    }

    // Drag & drop middleNode to the head
    if (!currentNode.isHead && currentNode.next && newNextNode?.isHead) {
      // previousOfMiddleNode
      await this.update(
        {
          next: currentNode._id,
          entity: currentNode.entity,
        },
        {
          next: currentNode.next,
        }
      );

      // middleNode
      const middleNode: CustomFieldMapping = await this.update(
        {
          _id: currentNode._id,
        },
        {
          isHead: true,
          next: newNextNode._id,
        }
      );

      // newNextNodeOfMiddleNode
      await this.update(
        {
          _id: newNextNode._id,
        },
        {
          isHead: false,
        }
      );

      return middleNode;
    }
  }
}
