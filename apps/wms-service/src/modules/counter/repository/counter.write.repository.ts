import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseWriteRepository } from "src/database";
import { ModelTokens } from "wms-models/lib/common";
import { Counter } from "wms-models/lib/counter";

export class CounterWriteRepository extends BaseWriteRepository<Counter> {
  constructor(
    @InjectModel(ModelTokens.Counter) readonly model: Model<Counter>
  ) {
    super(model);
  }

  async inscrCounter(name: string, current: string) {
    const counter: Counter = await this.model
      .findOneAndUpdate(
        {
          name,
          currentDate: current,
        },
        {
          $setOnInsert: {
            name,
            currentDate: current,
            createdAt: new Date(),
          },
          $inc: {
            currentCounter: 1,
          },
        },
        {
          new: true,
          upsert: true,
        }
      )
      .lean();

    return counter;
  }

  async deleteCounter(name: string, ingoreCurrentDate: string) {
    this.model
      .deleteOne({
        name,
        currentDate: {
          $ne: ingoreCurrentDate,
        },
      })
      .lean()
      .catch((e) =>
        console.error(`Delete couter failed for name: ${name}, `, e)
      );
  }
}
