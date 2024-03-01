import { BaseEntity } from 'base-models';
import { ECustomFieldType, EEntity } from '../shared';
import { ExtraData } from '../shared';

export interface RefCustomField {
  _id: string; // txt_hoten
  name: string; // HoTen
  type: ECustomFieldType;
  // defined but use as any
  extraData: ExtraData;
}

export interface CustomFieldMapping extends BaseEntity {
  // _id format: account_txt_hoten
  displayName: string;
  displayOnWeb: boolean;
  displayOnDocument: boolean;
  required: boolean;
  entity: EEntity;
  customField: RefCustomField;
  isHead: boolean;
  next: string;
}

export interface RefCustomFieldMapping {
  [key: string]: any;
}
