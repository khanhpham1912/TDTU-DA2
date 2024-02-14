export type PartialDeep<T> = T extends object ? { [P in keyof T]?: PartialDeep<T[P]> } : T;
export type PickKey<T, K extends keyof T> = Extract<keyof T, K>;
export * from './utility';
