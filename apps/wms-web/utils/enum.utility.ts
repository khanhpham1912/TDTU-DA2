export function getEnumValues(_enum: any) {
  return Object.keys(_enum).filter((item) => {
    return isNaN(Number(item));
  });
}
