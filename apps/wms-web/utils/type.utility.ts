export enum Types {
  Object = "Object",
  Array = "Array",
  Number = "Number",
  String = "String",
  Undefined = "Undefined",
  Null = "Null",
  Date = "Date",
  Boolean = "Boolean",
  RegExp = "RegExp",
}

export const typeOf = (value: any): Types =>
  Object.prototype.toString.call(value).slice(8, -1) as Types;
