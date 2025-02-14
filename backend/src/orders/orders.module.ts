import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrdersController } from './controller/orders.controller';
import { OrdersService } from './service/orders.service';
import { OrderDish } from './order-dish.entity';
import { User } from 'src/users/user.entity';
import { Dish } from 'src/dishes/dish.entity';

@Module({
    imports: [TypeOrmModule.forFeature(
        [Order, OrderDish, User, Dish]
    )],
    controllers: [OrdersController],
    providers: [OrdersService]
})
export class OrdersModule {}
