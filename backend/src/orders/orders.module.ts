import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrdersController } from './controller/orders.controller';
import { OrdersService } from './service/orders.service';
import { OrderDish } from './order-dish.entity';
import { User } from 'src/users/user.entity';
import { Dish } from 'src/dishes/dish.entity';
import { AuthModule } from 'src/auth/auth.module';
import { VenueUser } from 'src/venues/venue-user.entity';
import { Venue } from 'src/venues/venue.entity';

@Module({
    imports: [TypeOrmModule.forFeature(
        [Order, OrderDish, User, Dish, Venue, VenueUser]
    )],
    controllers: [OrdersController],
    providers: [OrdersService]
})
export class OrdersModule {}
