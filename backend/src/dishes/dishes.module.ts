import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './dish.entity';
import { DishesController } from './controller/dishes.controller';
import { DishesService } from './service/dishes.service';

@Module({
    imports: [TypeOrmModule.forFeature(
        [Dish]
    )],
    controllers: [DishesController],
    providers: [DishesService]
})
export class DishesModule {}
