import { BaseEntity } from "base-models";
import { IsSkip } from "src/utils/dto.utility";

export class BaseDto implements BaseEntity {
  @IsSkip()
  _id: string;

  @IsSkip()
  active?: boolean;

  @IsSkip()
  createdAt?: Date;

  @IsSkip()
  updatedAt?: Date;

  @IsSkip()
  __v: number;

  @IsSkip()
  deletedAt?: Date;
}
