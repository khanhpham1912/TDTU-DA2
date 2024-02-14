

export interface WMSEntity {
  _id: string;
  active?: boolean;
  createdAt?: Date;
  createdBy?: {
    _id: string;
    name: string;
  };
  updatedAt?: Date;
  updatedBy?: {
    _id: string;
    name: string;
  };
}