import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Order } from './orders/order.entity';
import { Dish } from './dishes/dish.entity';
import { OrderDish } from './order-dish/order-dish.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "ristofood",
      entities: [User, Order, Dish, OrderDish],
      synchronize: true, // true solo in sviluppo (sincronizza automaticamente lo schema)
      charset: "utf8mb4",
    })
  ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule { 
}
