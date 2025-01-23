import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDish } from './order-dish.entity';

@Module({
    imports: [TypeOrmModule.forFeature(
        [OrderDish]
    )]
})
export class OrderDishModule {}
