import { BaseEntity } from 'base-models';

export interface Counter extends BaseEntity {
  name: string;
  prefix?: string;
  format?: string;
  startingCounter: number;
  currentCounter: number;
  currentDate?: string;
}
