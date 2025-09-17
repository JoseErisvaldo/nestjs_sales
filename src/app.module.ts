import { Module } from '@nestjs/common';
import { TypeOrmConfigService } from './database/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { EstablishmentModule } from './establishment/establishment.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    EstablishmentModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [],
  providers: [TypeOrmConfigService],
})
export class AppModule {}
