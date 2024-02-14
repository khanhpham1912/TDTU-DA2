import { Module } from "@nestjs/common";
import { CounterSchema } from "./counter.schema";
import { CounterService } from "./counter.service";
import { CounterWriteRepository } from "./repository";
import { MongooseModule } from "@nestjs/mongoose";
import { ModelTokens } from "wms-models/lib/common";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelTokens.Counter,
        schema: CounterSchema,
      },
    ]),
  ],
  providers: [CounterService, CounterWriteRepository],
  exports: [CounterService],
})
export class CounterModule {}
