import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Inbound, InboundSchema } from './inbound.schema';
import { InboundsController } from './inbounds.controller';
import { InboundsService } from './inbounds.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Inbound.name,
        schema: InboundSchema,
      },
    ]),
  ],
  controllers: [InboundsController],
  providers: [InboundsService],
})
export class InboundsModule {}
