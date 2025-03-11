import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfileDto } from '../dtos/user-profile.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/enums/roles.enum';
import { ResponseUserUpdateDeleteDto } from '../dtos/response-user.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getProfile(req: Request): Promise<UserProfileDto> {
    const { user_id, role } = req['user'];

    const user = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new NotFoundException('No user found');
    }

    return {
      username: user.username,
      email: user.email,
      role: role,
    };
  }

  async updateUser(
    req: Request,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserUpdateDeleteDto> {
    const { user_id } = req['user'];

    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    const updateUser = await this.userRepository.update(user_id, updateUserDto);

    if (updateUser.affected === 0) {
      throw new NotFoundException('No user found');
    }

    const user = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
      select: ['username'],
    });

    return {
      message: 'User updated successfully',
      error: null,
      statusCode: 200,
      data: user,
    };
  }


  async deleteUser(req: Request): Promise<ResponseUserUpdateDeleteDto> {
    const { user_id } = req['user'];
    const deletedUser = await this.userRepository.delete(user_id);

    if (deletedUser.affected === 0) {
      throw new NotFoundException('No user found');
    }

    return {
      message: 'User deleted successfully',
      error: null,
      statusCode: 200,
    };
  }
}
