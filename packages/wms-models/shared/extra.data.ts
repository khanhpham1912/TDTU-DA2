export interface SelectCustomField {
  multiple: boolean;
  options: string[];
}

export interface CheckboxCustomField {
  options: string[];
}

export interface RadioCustomField {
  options: string[];
}

export interface NumberCustomField {
  min?: number;
  max?: number;
}

export interface AttachmentCustomField {
  maxCount?: number;
  minCount?: number;
  filePath?: string;
  fileType?: (
    | 'image/jpeg'
    | 'image/png'
    | 'application/pdf'
    | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  )[];
  fileSize?: number;
}

export interface ExtraData {
  selectConfig?: SelectCustomField;
  checkboxConfig?: CheckboxCustomField;
  radioConfig?: RadioCustomField;
  numberConfig?: NumberCustomField;
  attachmentConfig?: AttachmentCustomField;
}
