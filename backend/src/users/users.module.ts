import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';

@Module({
    imports: [TypeOrmModule.forFeature(
        [User]
    )],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}
