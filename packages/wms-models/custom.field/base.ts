import { BaseEntity } from 'base-models';
import { ECustomFieldType } from '../shared';
import { ExtraData } from '../shared';

export interface CustomField extends BaseEntity {
  name: string;
  type: ECustomFieldType;
  // defined but use as any
  extraData?: ExtraData;
}
