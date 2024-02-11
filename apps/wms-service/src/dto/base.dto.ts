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
  createdBy?: { _id: string; name: string };

  @IsSkip()
  updatedAt?: Date;

  @IsSkip()
  updatedBy?: { _id: string; name: string };

  @IsSkip()
  __v: number;
}
