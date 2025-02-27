import {
  ConflictException,
  Injectable,
  NotFoundException,
  Req,
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
import { Role } from 'src/enums/roles.enum';
import { ResponseTokenDto } from '../dtos/response-token.dto';

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
      createUserDto.refresh_toke = null
      const newUser = this.userRepository.create(createUserDto);

      await this.userRepository.save(newUser);

      return {
        username: newUser.username,
        role: newUser.role,
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

    const pwCheck = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!pwCheck) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const accessToken = await this.generateAccessToken(user.id, user.role)
    const refreshToken = await this.generateRefreshToken(user.id)

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }

  async refreshToken(id: number, refreshToken: string): Promise<ResponseTokenDto>{

    const user = await this.userRepository.findOne({
      where: {
        id: id
      }
    })

    if(!user || !user.refresh_token){
      throw new UnauthorizedException("Invalid refresh token")
    }

    const checkRefreshToken = await bcrypt.compare(refreshToken, user.refresh_token)

    if(!checkRefreshToken){
      throw new UnauthorizedException("Invalid refresh token")
    }

    return {
      access_token: await this.generateAccessToken(user.id, user.role)
    }
  }

  async logout(req: Request): Promise<{message: string}>{
    const {user_id} = req["user"]
    await this.userRepository.update(user_id, {
      refresh_token: null
    })

    return {
      message: "Successfully logout"
    }
  }

  async generateAccessToken(userId: number, role: Role){
    const payload = { user_id: userId, role: role };

    return await this.jwtService.signAsync(payload)
  }

  async generateRefreshToken(id: number){
    const refreshToken = crypto.randomUUID()
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt)

    await this.userRepository.update(id, {
      refresh_token: hashedRefreshToken
    })

    return refreshToken
  }
  
}
