import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { VenueUser } from 'src/venues/venue-user.entity';
import { RolesGuard } from './guards/roles/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User, VenueUser])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
