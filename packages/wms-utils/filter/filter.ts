// @ts-nocheck
import { typeOf, Types } from '../types';
import { FilterOperator } from './filter.operator';

export enum SortType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface Sort {
  sortBy: string;
  sortType: SortType;
}

export interface FilterOption {
  offset: number;
  limit: number;
  sort?: string;
}

const mapMongoDbSort = (sort: Sort) => {
  if (sort?.sortBy && sort?.sortType) {
    if (sort.sortType === 'ASC') {
      return sort.sortBy;
    }

    return `-${sort.sortBy}`;
  }

  return `-createdAt`;
};

export const mapMongoDbAggregateSort = (sort: Sort): Record<string, 1 | -1> => {
  if (sort?.sortBy && sort?.sortType) {
    if (sort.sortType === 'ASC') {
      return { [sort.sortBy]: 1 };
    }

    return { [sort.sortBy]: -1 };
  }

  return { createdAt: -1 };
};

export const createMongoFilterOption = (
  paging?: {
    currentPage?: number;
    pageSize?: number;
  },
  sort: Sort,
): FilterOptiion => {
  if (!paging) {
    paging = {};
  }

  if (!paging.currentPage || paging.currentPage < 1) {
    paging.currentPage = 1;
  }

  if (!paging.pageSize || paging.pageSize > 50) {
    paging.pageSize = 50;
  }

  const mapSort = mapMongoDbSort(sort);

  return {
    offset: (paging.currentPage - 1) * paging.pageSize,
    limit: paging.pageSize,
    sort: mapSort,
  };
};

export const createMongoDbFilter = <TFilter>(filter: TFilter) => {
  const keys = Object.keys(filter);
  const data = keys.map((item: any) => {
    const elem = {};

    if (item === '$or') {
      elem['$or'] = filter['$or'].map((item) => createMongoDbFilter(item));
      return elem;
    }

    const op = filter[item].operator;

    switch (op) {
      case FilterOperator.EQUAL: {
        elem[item] = filter[item].data;
        break;
      }
      case FilterOperator.NOT_EQUAL: {
        elem[item] = { $neq: filter[item].data };
        break;
      }
      case FilterOperator.LESS_THAN_N_EQUAL: {
        elem[item] = { $lte: filter[item].data };
        break;
      }
      case FilterOperator.GREATER_THAN_N_EQUAL: {
        elem[item] = { $gte: filter[item].data };
        break;
      }
      case FilterOperator.ELEMENT_MATCH: {
        const dbFilter = filter[item].data && createMongoDbFilter(filter[item].data);
        if (dbFilter && Object.keys(dbFilter)?.length) {
          elem[item] = { $elemMatch: dbFilter };
        }
        break;
      }
      case FilterOperator.IN: {
        const arr =
          filter[item].data && typeOf(filter[item].data) !== Types.Array
            ? [filter[item].data]
            : filter[item].data;

        if (!arr?.length) {
          break;
        }

        elem[item] = { $in: arr };
        break;
      }
      case FilterOperator.NOT_IN: {
        const arr =
          filter[item].data && typeOf(filter[item].data) !== Types.Array
            ? [filter[item].data]
            : filter[item].data;

        if (!arr?.length) {
          break;
        }

        elem[item] = { $nin: arr };
        break;
      }
      case FilterOperator.REGEX: {
        elem[item] = {
          $regex: (filter[item].data as string)?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
          $options: 'i',
        };
        break;
      }
      default: {
        elem[item] = filter[item];
        break;
      }
    }
    return elem;
  });

  let dataObj: any = {};
  data.forEach((item) => {
    dataObj = { ...dataObj, ...item };
  });

  return dataObj;
};
