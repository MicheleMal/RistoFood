import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ResponseUserDto } from '../dtos/response-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    try {
      const salt = await bcrypt.genSalt();
      createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

      const newUser = this.userRepository.create(createUserDto);

      await this.userRepository.save(newUser);

      return {
        username: newUser.username,
        role: newUser.role,
      };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (error['code'] === 'ER_DUP_ENTRY') {
          throw new ConflictException('Email already registered');
        }
      }
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<{ token: string }> {
    const userCheck = await this.userRepository.findOne({
      where: {
        email: loginUserDto.email,
      },
    });

    if (!userCheck) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const pwCheck = await bcrypt.compare(
      loginUserDto.password,
      userCheck.password,
    );
    if (!pwCheck) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const payload = { id_user: userCheck.id, username: userCheck.username };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
