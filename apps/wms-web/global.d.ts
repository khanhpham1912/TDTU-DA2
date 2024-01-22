type Messages = typeof import("./locales/en.json");
declare interface IntlMessages extends Messages {}
type AnyFunction = (...args: any[]) => any;
type AnyRecord = Record<PropertyKey, any>;
