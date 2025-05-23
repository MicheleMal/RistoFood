import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Order } from './orders/order.entity';
import { Dish } from './dishes/dish.entity';
import { OrderDish } from './orders/order-dish.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DishesModule } from './dishes/dishes.module';
import { OrdersModule } from './orders/orders.module';
import { Venue } from './venues/venue.entity';
import { VenueUser } from './venues/venue-user.entity';
import { VenuesModule } from './venues/venues.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === "production" ? ".env.production" : ".env.local"
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: 3306,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [User, Order, Dish, Venue, VenueUser, OrderDish],
      synchronize: true, // true solo in sviluppo (sincronizza automaticamente lo schema)
      charset: 'utf8mb4',
      // logging: true
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: "15m"
      }
    }),
    AuthModule,
    UsersModule,
    DishesModule,
    OrdersModule,
    VenuesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
