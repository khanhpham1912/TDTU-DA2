export function removeUndefinedValue(obj: { [key: string]: any }) {
  const result: any = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined) {
      result[`${key}`] = obj[key];
    }
  });

  return result;
}
