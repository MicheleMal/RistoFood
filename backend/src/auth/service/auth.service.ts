import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ResponseUserDto } from '../dtos/response-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../dtos/login-user.dto';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { ResponseTokenDto } from '../dtos/response-token.dto';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';

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
      createUserDto.refresh_toke = null;
      const newUser = this.userRepository.create(createUserDto);

      await this.userRepository.save(newUser);

      return {
        username: newUser.username,
      };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (error['code'] === 'ER_DUP_ENTRY') {
          throw new ConflictException('Email or username already registered');
        }
      }
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<ResponseTokenDto> {
    const user = await this.userRepository.findOne({
      where: {
        email: loginUserDto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const pwCheck = await bcrypt.compare(loginUserDto.password, user.password);
    if (!pwCheck) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const accessToken = await this.generateAccessToken(user.id);
    const refreshToken = await this.generateRefreshToken(user.id);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(refreshToken: RefreshTokenDto): Promise<ResponseTokenDto> {
    try {
      const decode = await this.jwtService.verifyAsync(refreshToken.token);

      const user = await this.userRepository.findOne({
        where: {
          id: decode.user_id,
        },
      });

      if (!user || !user.refresh_token) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return {
        access_token: await this.generateAccessToken(user.id),
      };
    } catch (error) {
      if(error instanceof TokenExpiredError){
        throw new UnauthorizedException('Jwt expired');
      }
    }
  }

  async logout(req: Request): Promise<{ message: string }> {
    const { user_id } = req['user'];
    await this.userRepository.update(user_id, {
      refresh_token: null,
    });

    return {
      message: 'Successfully logout',
    };
  }

  async generateAccessToken(userId: number) {
    const payload = { user_id: userId };

    return await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
  }

  async generateRefreshToken(userId: number) {
    const payload = { user_id: userId };

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    // Salva il token direttamente nel db senza hash
    await this.userRepository.update(userId, {
      refresh_token: refreshToken,
    });

    return refreshToken;
  }
}
