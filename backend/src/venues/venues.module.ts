import { Module } from '@nestjs/common';
import { VenuesController } from './controller/venues.controller';
import { VenuesService } from './service/venues.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venue } from './venue.entity';
import { VenueUser } from './venue-user.entity';
import { User } from 'src/users/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature(
        [Venue, VenueUser, User]
    )], 
    controllers: [VenuesController],
    providers: [VenuesService]
})
export class VenuesModule {}
