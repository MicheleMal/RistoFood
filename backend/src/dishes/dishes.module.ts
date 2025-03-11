import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './dish.entity';
import { DishesController } from './controller/dishes.controller';
import { DishesService } from './service/dishes.service';
import { AuthModule } from 'src/auth/auth.module';
import { VenueUser } from 'src/venues/venue-user.entity';

@Module({
    imports: [TypeOrmModule.forFeature(
        [Dish, VenueUser]
    )],
    controllers: [DishesController],
    providers: [DishesService]
})
export class DishesModule {}
