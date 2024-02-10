
export interface RefUser {
  _id: string;
  name: string;
}

export interface RefEntity {
  _id: string;
  no: string;
  name?: string;
  phone?: string;
}

export interface BaseEntity {
  _id: string;
  active?: boolean;
  createdAt?: Date;
  createdBy?: RefUser;
  updatedAt?: Date;
  updatedBy?: RefUser;
  deletedAt?: Date;
  __v?: number;
}
