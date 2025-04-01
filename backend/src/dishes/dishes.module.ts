import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './dish.entity';
import { DishesController } from './controller/dishes.controller';
import { DishesService } from './service/dishes.service';
import { AuthModule } from 'src/auth/auth.module';
import { VenueUser } from 'src/venues/venue-user.entity';
import { Venue } from 'src/venues/venue.entity';

@Module({
    imports: [TypeOrmModule.forFeature(
        [Dish, Venue, VenueUser]
    )],
    controllers: [DishesController],
    providers: [DishesService]
})
export class DishesModule {}
