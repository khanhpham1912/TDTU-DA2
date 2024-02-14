import {
  ClientSession,
  Document,
  FilterQuery,
  Model,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import { uuid } from "wms-utils/lib/uuid";
import { Logger } from "@nestjs/common";
import { PartialDeep } from "wms-utils/lib/types";
import { BaseEntity } from "base-models";

export interface ItemDeletedResponse {
  _id: string;
  error?: string;
  success: boolean;
  data: any;
}

export type StringIdDocument<T extends BaseEntity> = T & Document<string>;

export interface ExtraInfo<T extends BaseEntity> {
  flow?: string;
  extraData?: any;
  options?: QueryOptions<T>;
  session?: ClientSession;
}

export class BaseWriteRepository<T extends BaseEntity> {
  constructor(
    private document: Model<T>,
    protected logger: Logger = null
  ) {}

  public async bulkCreate(
    items: PartialDeep<T>[],
    extra?: ExtraInfo<T>
  ): Promise<T[]> {
    try {
      items.forEach((item) => {
        item.active = true;
        item.deletedAt = null;
        if (!item._id) {
          item._id = uuid();
        }
      });

      const entities: T[] = await this.document.create(items, {
        session: extra?.session,
      });

      return entities;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async create(item: PartialDeep<T>, extra?: ExtraInfo<T>): Promise<T> {
    try {
      if (!item._id) {
        item._id = uuid();
      }

      const entities: T[] = await this.document.create(
        [
          {
            ...item,
            active: true,
            deletedAt: null,
          },
        ],
        { session: extra?.session }
      );

      const entity = entities[0];

      return entity;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async save(item: PartialDeep<T>, extra?: ExtraInfo<T>): Promise<T> {
    try {
      const update = {
        $set: item,
      } as any;

      const options = {
        new: true,
        upsert: false,
        ...extra?.options,
      };

      if (!item._id) {
        // Create new
        item._id = uuid();
        item["active"] = item?.active ?? true;
        item["deletedAt"] = item?.deletedAt ?? null;
        options.upsert = true;
      } else {
        // Update
        item["$inc"] = { ...item?.["$inc"], __v: 1 };
      }

      const entity: T = await this.document
        .findByIdAndUpdate(item._id, update, options)
        .session(extra?.session)
        .lean();

      return entity;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async delete(
    id: string,
    item?: UpdateQuery<T> & PartialDeep<T>,
    extra?: ExtraInfo<T>
  ): Promise<ItemDeletedResponse> {
    try {
      const query = {
        _id: id,
      } as FilterQuery<any>;

      const update = {
        $set: {
          ...item,
          active: false,
          deletedAt: new Date(),
        },
      } as any;

      if (extra?.extraData?.updatedBy) {
        update.$set.updatedBy = extra.extraData.updatedBy;
      }

      const options = {
        ...extra?.options,
        new: true,
      };

      const entity: T = await this.document
        .findOneAndUpdate(query, update, options)
        .session(extra?.session)
        .lean();

      const isUpdated = entity ? true : false;

      return {
        success: isUpdated,
        _id: id,
        data: entity,
      } as ItemDeletedResponse;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async hardDelete(
    id: string,
    extra?: ExtraInfo<T>
  ): Promise<ItemDeletedResponse> {
    try {
      const entity: T = await this.document
        .findOneAndDelete({ _id: id })
        .session(extra?.session)
        .lean();

      const isDeleted = entity ? true : false;

      return {
        success: isDeleted,
        _id: id,
        data: entity,
      } as ItemDeletedResponse;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async update(
    query: FilterQuery<T>,
    item: UpdateQuery<T> & PartialDeep<T>,
    extra?: ExtraInfo<T>
  ): Promise<T> {
    try {
      const options = {
        ...extra?.options,
        new: true,
      };

      this.removeFields(item);

      const result: T = await this.document
        .findOneAndUpdate(
          query,
          { ...item, $inc: { ...item?.$inc, __v: 1 } },
          options
        )
        .session(extra?.session)
        .lean();

      if (!result) {
        return result;
      }

      return result;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async updateMany(
    match: {
      ids: string[];
      [key: string]: any;
    },
    item: UpdateQuery<T> & PartialDeep<T>,
    extra?: ExtraInfo<T>
  ): Promise<T[]> {
    const { ids, ...filter } = match;
    // Update many is very dangerous. So, only allow update from ids
    if (!ids?.length) {
      return [];
    }

    try {
      const options = {
        ...extra?.options,
        new: true,
      };

      this.removeFields(item);

      await this.document
        .updateMany(
          { _id: { $in: ids }, ...filter },
          { ...item, $inc: { ...item?.$inc, __v: 1 } },
          options
        )
        .session(extra?.session)
        .lean();

      const listResult: T[] = await this.document
        .find({ _id: { $in: ids } })
        .lean();

      return listResult;
    } catch (error) {
      this.handleError(error);
    }
  }

  private removeFields(item: UpdateQuery<T> & PartialDeep<T>) {
    delete item._id;
    delete item.__v;
    delete item.updatedAt;
  }

  private handleError(error: any) {
    if (this.logger) {
      this.logger.error(error);
    } else {
      console.error(error);
    }

    throw error;
  }
}
