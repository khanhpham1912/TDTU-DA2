// @ts-nocheck
import { FilterOperator } from './filter.operator';

export interface FilterAndData {
  modelValue: any;
  operator: FilterOperator;
}

export interface FilterOrData {
  modelKey: string;
  modelValue: any;
  operator: FilterOperator;
}
export class FilterBuilder<TFilter> {
  private readonly filter: TFilter;

  public constructor(initFilter: TFilter) {
    this.filter = initFilter;
  }

  public static init<TFilter>(initFilter: TFilter) {
    return new FilterBuilder<TFilter>(initFilter);
  }

  public withData(modelKey: string, modelValue: any, operator: FilterOperator): this {
    if (modelValue !== undefined) {
      this.filter[modelKey] = {
        operator,
        data: modelValue,
      };
    }
    return this;
  }

  public withAnd(modelKey: string, data: FilterAndData[]): this {
    if (!data?.length) {
      return this;
    }

    data.forEach((item) => {
      if (item.modelValue !== undefined) {
        if (!this.filter[modelKey]) {
          this.filter[modelKey] = {};
        }

        this.filter[modelKey][item.operator] = item.modelValue;
      }
    });

    return this;
  }

  public withOr(data: FilterOrData[]): this {
    const modelKey = '$or';

    if (!data?.length) {
      return this;
    }

    data.forEach((item) => {
      if (item.modelValue !== undefined) {
        if (!this.filter[modelKey]) {
          this.filter[modelKey] = [];
        }

        this.filter[modelKey].push({
          [item.modelKey]: {
            operator: item.operator,
            data: item.modelValue,
          },
        });
      }
    });

    return this;
  }

  public build(): TFilter {
    return this.filter;
  }
}
