import { typeOf, Types } from "./type.utility";

export type ObjectType<T = any> = Record<PropertyKey, T>;

class ObjectUtility {
  public static isObject(value: any) {
    return typeOf(value) === Types.Object;
  }
  public static isArray(value: any) {
    return typeOf(value) === Types.Array;
  }

  public static isEmpty(obj: ObjectType | any): boolean {
    if (!obj) return true;
    if (!this.isObject(obj)) return false;
    return Object.keys(obj).length === 0;
  }

  public static omitValue(obj: ObjectType, values: any[]): ObjectType {
    if (!this.isObject(obj)) return obj;
    let newObj: any = {};
    Object.keys(obj).forEach((key) => {
      if (this.isObject(obj[key])) {
        newObj[key] = this.omitValue(obj[key], values);
      } else if (!values.includes(obj[key])) {
        newObj[key] = obj[key];
      }
    });

    return newObj;
  }

  public static replaceEmptyByNull(obj: ObjectType, values: any[]): any {
    if (!this.isObject(obj)) return obj;
    let newObj: any = {};
    Object.keys(obj).forEach((key) => {
      if (this.isObject(obj[key]) && !!Object.keys(obj[key]).length) {
        newObj[key] = this.replaceEmptyByNull(obj[key], values);
      } else if (values.includes(obj[key]) || Object.keys(obj).length === 0) {
        newObj[key] = null;
      } else {
        newObj[key] = obj[key];
      }
    });

    return newObj;
  }

  public static omitEmptyValue(obj: ObjectType): ObjectType {
    if (!this.isObject(obj)) return obj;
    let newObj: any = {};
    Object.keys(obj).forEach((key) => {
      if (this.isObject(obj[key])) {
        let newValue = this.omitEmptyValue(obj[key]);
        if (this.isEmpty(newValue)) return;
        else newObj[key] = newValue;
      } else if (
        (!!obj[key] ||
          typeOf(obj[key]) === Types.Boolean ||
          (typeOf(obj[key]) === Types.Number && !Number.isNaN(obj[key]))) &&
        !Array.isArray(obj[key])
      ) {
        newObj[key] = obj[key];
      } else if (Array.isArray(obj[key]) && !!obj[key]?.length) {
        newObj[key] = obj[key];
      }
    });

    return newObj;
  }

  public static clone<T = ObjectType>(o: T): T {
    return JSON.parse(JSON.stringify(o));
  }

  public static pick(o: ObjectType, keyStructure: string[] | ObjectType) {
    return this.isObject(keyStructure)
      ? this.pickWithObjectStructure(o, keyStructure as ObjectType)
      : this.pickWithArrayStructure(o, keyStructure as string[]);
  }

  public static pickWithArrayStructure(o: ObjectType, arrKey: string[]) {
    if (
      !this.isObject(o) ||
      typeOf(arrKey) !== Types.Array ||
      arrKey.length === 0
    )
      return o;
    return Object.fromEntries(
      new Map(arrKey?.map((key) => [key, o[key]])).entries()
    );
  }

  public static pickWithObjectStructure(
    o: ObjectType,
    objKey: ObjectType
  ): any {
    if (!this.isObject(o) || !this.isObject(objKey)) return o;
    const arrKey = Object.keys(objKey);
    return Object.fromEntries(
      new Map(
        arrKey?.map((key: any) => {
          if (typeOf(objKey[key]) !== Types.String) {
            return [key, this.pick(o[key], objKey[key])];
          }
          return [key, this.pickOneDeep(o, objKey[key])];
        })
      ).entries()
    );
  }

  public static pickOneDeep(o: ObjectType, keyChain: string): any {
    if (!(this.isObject(o) || this.isArray(o)) || !keyChain) return o;
    const arrKey: any = keyChain.split(".");
    if (arrKey.length === 1) return o[arrKey[0]];

    return this.pickOneDeep(o[arrKey.shift() as string], arrKey.join("."));
  }
}

export default ObjectUtility;
