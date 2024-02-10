import { typeOf, Types } from '../types';

export function mergeObj(oldData: Record<string, any>, newData: Record<string, any>): any {
  oldData = JSON.parse(JSON.stringify(oldData));

  // Only update data change
  const newTarget: any = {};
  Object.keys(newData).forEach((key) => {
    newTarget[key] = oldData[key];
  });

  return mergeObjImplement(newTarget, newData);
}

export function mergeObjImplement(target: any, source: any): any {
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeOf(source[key]) === Types.Object && typeOf(target[key]) === Types.Object) {
        mergeObjImplement(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}

export function mergeSelect(currentSelect: string[], fields: string[]) {
  if (!currentSelect) {
    return [];
  }

  const resultSelect: string[] = [];
  const combineSelect = Array.from(new Set([...currentSelect, ...fields])).sort();

  for (const select of combineSelect) {
    if (!resultSelect.find((v) => select.startsWith(v))) {
      resultSelect.push(select);
    }
  }

  return resultSelect;
}
