import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './dish.entity';

@Module({
    imports: [TypeOrmModule.forFeature(
        [Dish]
    )]
})
export class DishesModule {}
