import { FilterAndData } from './filter.builder';
import { FilterOperator } from './filter.operator';

export const convertStrToDate = (str: string | Date) => {
  return str ? new Date(str) : undefined;
};

export const filterDate = (from: string | Date, to: string | Date) => {
  const filterLicenseExpiryDate: FilterAndData[] = [
    {
      modelValue: convertStrToDate(from),
      operator: FilterOperator.GREATER_THAN_N_EQUAL,
    },
    {
      modelValue: convertStrToDate(to),
      operator: FilterOperator.LESS_THAN_N_EQUAL,
    },
  ];

  return filterLicenseExpiryDate;
};

export const filterMinMax = (min: number, max: number) => {
  const filterLicenseExpiryDate: FilterAndData[] = [
    {
      modelValue: min,
      operator: FilterOperator.GREATER_THAN_N_EQUAL,
    },
    {
      modelValue: max,
      operator: FilterOperator.LESS_THAN_N_EQUAL,
    },
  ];

  return filterLicenseExpiryDate;
};

export function generatePopulateSelect(populate: string, rootSelect: string[]) {
  if (!rootSelect?.length) {
    return {
      newRootSelect: [],
      populateField: null,
      populateSelect: null,
    };
  }

  let isAllow = false;
  const selectSet: Set<string> = new Set();
  const newRootSelect: string[] = [];

  // Enrich select map per populate
  for (const select of rootSelect) {
    if (!select.startsWith(populate)) {
      newRootSelect.push(select);
      continue;
    }

    isAllow = true;
    const subSelect = populate === select ? null : select.replace(`${populate}.`, '');

    if (subSelect) {
      selectSet.add(subSelect);
    }
  }

  if (isAllow) {
    return {
      newRootSelect: [...newRootSelect, populate],
      populateField: populate,
      populateSelect: Array.from(selectSet),
    };
  }

  return {
    newRootSelect: rootSelect,
    populateField: null,
    populateSelect: null,
  };
}
