import { FilterQuery, Model, PopulateOptions, QueryOptions } from "mongoose";
import { WMSEntity } from "wms-models/lib/entity";
import { mergeSelect } from "wms-utils/lib/db";
import { NotFoundError, ValidationError } from "wms-utils/lib/error";
import {
  Sort,
  createMongoDbFilter,
  createMongoFilterOption,
} from "wms-utils/lib/filter";
import { PaginateResponse, mapPaging } from "wms-utils/lib/paging";

export { FilterQuery } from "mongoose";
export interface Populate {
  /** space delimited path(s) to populate */
  path: string;
  /** fields to select */
  select?: string[];
  /** query conditions to match */
  match?: any;
  /** optional model to use for population */
  model?: string | Model<any>;
  /** optional query options like sort, limit, etc */
  options?: QueryOptions;
  /** correct limit on populated array */
  perDocumentLimit?: number;
  /** optional boolean, set to `false` to allow populating paths that aren't in the schema */
  strictPopulate?: boolean;
  /** deep populate */
  populate?: string | PopulateOptions | (string | PopulateOptions)[];
  /**
   * If true Mongoose will always set `path` to a document, or `null` if no document was found.
   * If false Mongoose will always set `path` to an array, which will be empty if no documents are found.
   * Inferred from schema by default.
   */
  justOne?: boolean;
  /** transform function to call on every populated doc */
  transform?: (doc: any, id: any) => any;
  /** Overwrite the schema-level local field to populate on if this is a populated virtual. */
  localField?: string;
  /** Overwrite the schema-level foreign field to populate on if this is a populated virtual. */
  foreignField?: string;
}

export interface FilterOption {
  populate?: Populate[];
  selects?: string[];
  sort?: { [key: string]: number } | string;
}

export class BaseReadRepository<T extends WMSEntity> {
  constructor(protected document: Model<T>) {}

  public async findById(
    id: string,
    option?: FilterOption,
    active = true
  ): Promise<T> {
    if (!id) {
      throw new ValidationError({ en: "Missing id" });
    }

    const { selects, ...filterOption } = this.transformFilterOption(option);
    const item = await this.document
      .findOne({ _id: id, active }, undefined, filterOption)
      .select(selects)
      .lean();

    return item as T;
  }

  public async find(
    match: FilterQuery<T>,
    option?: FilterOption,
    active = true
  ): Promise<T[]> {
    match.active = active;
    const { selects, ...filterOption } = this.transformFilterOption(option);
    const items = await this.document
      .find(match, undefined, filterOption)
      .select(selects)
      .lean();

    return items as T[];
  }

  public async findLast(
    match: FilterQuery<T>,
    option?: FilterOption,
    active = true
  ): Promise<T> {
    match.active = active;
    const { selects, ...filterOption } = this.transformFilterOption(option);
    const items = await this.document
      .find(match, undefined, filterOption)
      .select(selects)
      .lean();

    return items?.[0] as T;
  }

  public async findWithFilterBuilder(
    filter: FilterQuery<T>,
    sort?: Sort,
    option?: FilterOption,
    active = true
  ): Promise<T[]> {
    filter.active = active;

    const mongoFilter = createMongoDbFilter(filter);
    const mongoOption = createMongoFilterOption({}, sort);

    const { selects, ...filterOption } = this.transformFilterOption(option);

    const items: T[] = await this.document
      .find(mongoFilter, undefined, filterOption)
      .sort(mongoOption.sort)
      .select(selects)
      .lean();

    return items;
  }

  public async findOne(
    match: FilterQuery<T>,
    option?: FilterOption,
    active = true
  ): Promise<T> {
    match.active = active;
    const { selects, ...filterOption } = this.transformFilterOption(option);
    const item = await this.document
      .findOne(match, undefined, filterOption)
      .select(selects)
      .lean();

    return item as T;
  }

  public async strictFindOne(
    match: FilterQuery<T>,
    option?: FilterOption,
    active = true
  ): Promise<T> {
    const result = await this.findOne(match, option, active);

    if (!result) {
      throw new NotFoundError();
    }

    return result;
  }

  public async findWithPaging(
    filter: FilterQuery<T>,
    paging?: {
      currentPage?: number; // default = 1
      pageSize?: number; // limit 50
    },
    sort?: Sort,
    option?: FilterOption,
    active = true
  ): Promise<PaginateResponse<T>> {
    filter.active = active;

    const mongoFilter = createMongoDbFilter(filter);
    const mongoOption = createMongoFilterOption(paging, sort);

    const { selects, ...filterOption } = this.transformFilterOption(option);

    const [items, count] = await Promise.all([
      this.document
        .find(mongoFilter, undefined, filterOption)
        .sort(mongoOption.sort)
        .skip(mongoOption.offset)
        .limit(mongoOption.limit)
        .select(selects)
        .lean(),

      this.document.countDocuments(mongoFilter),
    ]);

    return mapPaging(items as T[], count, {
      offset: mongoOption.offset,
      limit: mongoOption.limit,
    });
  }

  public async aggregate(pipeline: any[]): Promise<any[]> {
    const items = await this.document.aggregate(pipeline).exec();
    return items;
  }

  public async count(match: FilterQuery<T> = {}, active = true) {
    match.active = active;
    return this.document.countDocuments(match);
  }

  public transformFilterOption(option: FilterOption) {
    if (!option?.populate?.length || !option?.selects?.length) {
      return {
        ...option,
        selects: option?.selects?.length ? mergeSelect(option.selects, []) : [],
      };
    }

    option.selects = mergeSelect(option.selects, []);

    const $ROOT = "$$root";
    const newPopulates: Populate[] = [];
    const selectMap: Map<string, string[]> = new Map();

    // Enrich select map per populate
    for (const select of option.selects) {
      const findPopulate = option.populate.find((p) =>
        select.startsWith(p.path)
      );
      const rootSelect = findPopulate ? findPopulate.path : $ROOT;
      const subSelect =
        rootSelect === select ? [] : [select.replace(`${rootSelect}.`, "")];

      const findSelectMap = selectMap.get(rootSelect);
      if (findSelectMap) {
        findSelectMap.push(...subSelect);
        continue;
      }

      selectMap.set(rootSelect, subSelect);
    }

    const rootSelectFields: string[] = selectMap.get($ROOT) || [];

    for (const populate of option.populate) {
      const findPopulateSelect = selectMap.get(populate.path);
      if (!findPopulateSelect) {
        continue;
      }

      rootSelectFields.push(populate.path);
      newPopulates.push({
        ...populate,
        select: findPopulateSelect.length
          ? findPopulateSelect
          : populate.select,
      });
    }

    return {
      ...option,
      selects: rootSelectFields,
      populate: newPopulates,
    };
  }
}
