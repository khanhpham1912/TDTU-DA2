import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthGuard } from "./auth/auth.guard";
import { AuthModule } from "./auth/auth.module";

import { UsersModule } from "./users/users.module";
import { SupplierModule } from "./supplier/module";
import { CounterModule } from "./counter/counter.module";
import { ItemModule } from "./item/module";
import { InboundOrderModule } from "./inbound.order/module";
import { OutboundOrderModule } from "./outbound.order/module";
import { InventoryModule } from "./inventory/module";
import { CustomFieldModule } from "./custom.field/module";
import { CustomFieldMappingModule } from "./custom.field.mapping/module";
import { CronJobModule } from "./cron.job/cron.job.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI),
    ScheduleModule.forRoot(),
    CronJobModule,
    AuthModule,
    UsersModule,
    SupplierModule,
    CounterModule,
    ItemModule,
    InboundOrderModule,
    OutboundOrderModule,
    InventoryModule,
    CustomFieldModule,
    CustomFieldMappingModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
