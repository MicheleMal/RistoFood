import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature(
        [User]
    )],
})
export class UsersModule {}
