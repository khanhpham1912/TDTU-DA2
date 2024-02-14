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

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.URI),
    AuthModule,
    UsersModule,
    SupplierModule,
    CounterModule,
    ItemModule,
    InboundOrderModule,
    OutboundOrderModule,
    InventoryModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
