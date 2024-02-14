
export interface RefEntity {
  _id: string;
  no: string;
  name?: string;
}

export interface BaseEntity {
  _id: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  __v?: number;
}
