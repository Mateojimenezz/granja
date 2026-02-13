import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FarmsModule } from './farms/farms.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { PorcinoModule } from './porcino/porcino.module';
import { PiscicolaModule } from './piscicola/piscicola.module';
import { GanaderoModule } from './ganadero/ganadero.module';
import { BodegaModule } from './bodega/bodega.module';
import { SalesModule } from './sales/sales.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    FarmsModule,
    SubscriptionsModule,
    PorcinoModule,
    PiscicolaModule,
    GanaderoModule,
    BodegaModule,
    SalesModule,
    ReportsModule,
  ],
})
export class AppModule {}
